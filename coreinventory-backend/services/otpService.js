const nodemailer = require('nodemailer');
const config = require('../config/envConfig');

/**
 * Generate a random 6-digit OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Calculate OTP expiry timestamp
 */
function getOtpExpiry() {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + Number(config.OTP_EXPIRY_MINUTES));
  return expiry;
}

/**
 * Create Nodemailer transporter
 * Uses Ethereal (fake SMTP) if no real SMTP credentials are provided
 */
async function createTransporter() {
  // If SMTP credentials are provided, use them
  if (config.SMTP_USER && config.SMTP_PASS) {
    return nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT == 465,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });
  }

  // Otherwise, create an Ethereal test account for development
  const testAccount = await nodemailer.createTestAccount();
  console.log('📧 Using Ethereal test email account:', testAccount.user);

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

/**
 * Send OTP email to user
 */
async function sendOtpEmail(email, otp) {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"CoreInventory" <${config.SMTP_FROM}>`,
      to: email,
      subject: 'CoreInventory — Password Reset OTP',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0f172a; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #14b8a6; font-size: 24px; margin: 0;">CoreInventory</h1>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 8px;">Password Reset Request</p>
          </div>
          
          <div style="background: #1e293b; border-radius: 12px; padding: 32px; text-align: center;">
            <p style="color: #e2e8f0; font-size: 16px; margin: 0 0 24px 0;">Your verification code is:</p>
            <div style="background: #0f766e; color: white; font-size: 32px; font-weight: 700; letter-spacing: 12px; padding: 16px 24px; border-radius: 8px; display: inline-block;">
              ${otp}
            </div>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">This code expires in ${config.OTP_EXPIRY_MINUTES} minutes.</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 24px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // If using Ethereal, log the preview URL
    if (!config.SMTP_USER) {
      console.log('📧 OTP Email Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = {
  generateOTP,
  getOtpExpiry,
  sendOtpEmail,
};
