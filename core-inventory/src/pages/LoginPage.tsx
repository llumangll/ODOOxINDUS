import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { AnimatedButton } from '../components/AnimatedButton';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);
      localStorage.setItem('token', data.data?.token || data.token); // Handle token correctly
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm">Sign in to your CoreInventory account to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 text-left">
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<Mail size={18} />}
        />
        
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={<Lock size={18} />}
        />

        <div className="flex items-center justify-between text-sm py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4 rounded border border-white/10 bg-white/[0.05] group-hover:border-teal-400 transition-colors pt-0">
               <input type="checkbox" className="appearance-none absolute inset-0 rounded focus:outline-none checked:bg-teal-500 transition-colors" />
               <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
          </label>
          
          <Link to="/forgot-password" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
            Forgot password?
          </Link>
        </div>

        <AnimatedButton
          type="submit"
          fullWidth
          isLoading={isLoading}
          loadingText="Verifying credentials..."
          className="mt-4"
        >
          Sign In
        </AnimatedButton>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-400">Don't have an account? </span>
        <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
          Sign up
        </Link>
      </div>
    </AuthCard>
  );
}
