const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel');
const otpService = require('../services/otpService');
const config = require('../config/envConfig');

// ─── Helper: format validation errors ───────────────────────────
function handleValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  return null;
}

// ─── 1. SIGNUP ──────────────────────────────────────────────────
async function signup(req, res) {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await UserModel.create({
      fullName: name,
      email,
      passwordHash,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred during signup',
    });
  }
}

// ─── 2. LOGIN ───────────────────────────────────────────────────
async function login(req, res) {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { email, password } = req.body;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred during login',
    });
  }
}

// ─── 3. FORGOT PASSWORD (Send OTP) ─────────────────────────────
async function forgotPassword(req, res) {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { email } = req.body;

    // Check if user exists
    const user = await UserModel.findByEmail(email);
    if (!user) {
      // Don't reveal whether email exists (security best practice)
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a verification code has been sent.',
      });
    }

    // Generate OTP
    const otp = otpService.generateOTP();
    const otpExpiry = otpService.getOtpExpiry();

    // Save OTP to database
    await UserModel.updateOtp(email, otp, otpExpiry);

    // Send OTP via email
    await otpService.sendOtpEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a verification code has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request',
    });
  }
}

// ─── 4. VERIFY OTP ──────────────────────────────────────────────
async function verifyOtp(req, res) {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { email, otp } = req.body;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or OTP',
      });
    }

    // Check OTP exists
    if (!user.otp_code) {
      return res.status(400).json({
        success: false,
        message: 'No OTP was requested for this account',
      });
    }

    // Check OTP expiry
    if (new Date() > new Date(user.otp_expiry)) {
      await UserModel.clearOtp(email);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    // Compare OTP
    if (user.otp_code !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
      });
    }

    // OTP verified — generate a temporary reset token
    const resetToken = jwt.sign(
      { id: user.id, email: user.email, purpose: 'password-reset' },
      config.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: { resetToken },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while verifying OTP',
    });
  }
}

// ─── 5. RESET PASSWORD ─────────────────────────────────────────
async function resetPassword(req, res) {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { email, newPassword } = req.body;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    await UserModel.updatePassword(email, passwordHash);

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while resetting password',
    });
  }
}

module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
