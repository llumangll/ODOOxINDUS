import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { OTPInput } from '../components/OTPInput';
import { AnimatedButton } from '../components/AnimatedButton';

export function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1200);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1200);
  };

  return (
    <AuthCard>
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to login
        </Link>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send you a 6-digit verification code.</p>
              
              <form onSubmit={handleSendOtp} className="space-y-6 text-left">
                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  icon={<Mail size={18} />}
                />
                
                <AnimatedButton type="submit" fullWidth isLoading={isLoading} loadingText="Sending code...">
                  Send Verification Code
                </AnimatedButton>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-gray-400 text-sm mb-8">We've sent a 6-digit confirmation code to <strong className="text-white">{email}</strong>.</p>
              
              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div className="flex justify-center">
                  <OTPInput length={6} value={otp} onChange={setOtp} />
                </div>
                
                <AnimatedButton 
                  type="submit" 
                  fullWidth 
                  disabled={otp.length !== 6 || isLoading}
                  isLoading={isLoading} 
                  loadingText="Verifying..."
                >
                  Verify Code
                </AnimatedButton>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-gray-400">Didn't receive the code? </span>
                <button 
                  type="button" 
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // trigger resend
                  }}
                >
                  Click to resend
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Create new password</h2>
              <p className="text-gray-400 text-sm mb-6">Your new password must be different from previous used passwords.</p>
              
              <form onSubmit={handleResetPassword} className="space-y-4 text-left">
                <InputField
                  label="New Password"
                  type="password"
                  required
                  icon={<Lock size={18} />}
                />
                
                <InputField
                  label="Confirm Password"
                  type="password"
                  required
                  icon={<Lock size={18} />}
                />
                
                <div className="pt-2">
                  <AnimatedButton type="submit" fullWidth isLoading={isLoading} loadingText="Resetting...">
                    Reset Password
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Password Reset</h2>
              <p className="text-gray-400 text-sm mb-8">Your password has been successfully reset. Click below to log in magically.</p>
              
              <AnimatedButton onClick={() => navigate('/login')} fullWidth>
                Continue to Login
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthCard>
  );
}
