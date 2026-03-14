const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyOtpValidation,
  resetPasswordValidation,
} = require('../validations/authValidation');

const router = express.Router();

// ─── Rate Limiters ──────────────────────────────────────────────

// General auth rate limiter (30 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for OTP routes (5 requests per 15 minutes)
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Routes ─────────────────────────────────────────────────────

// POST /api/auth/signup
router.post('/signup', authLimiter, signupValidation, authController.signup);

// POST /api/auth/login
router.post('/login', authLimiter, loginValidation, authController.login);

// POST /api/auth/forgot-password
router.post('/forgot-password', otpLimiter, forgotPasswordValidation, authController.forgotPassword);

// POST /api/auth/verify-otp
router.post('/verify-otp', otpLimiter, verifyOtpValidation, authController.verifyOtp);

// POST /api/auth/reset-password
router.post('/reset-password', authLimiter, resetPasswordValidation, authController.resetPassword);

module.exports = router;
