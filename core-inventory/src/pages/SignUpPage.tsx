import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { AnimatedButton } from '../components/AnimatedButton';

export function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || 'Signup failed');
      }

      console.log('Signup successful:', data);
      localStorage.setItem('token', data.data?.token || data.token); // Handle token correctly
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Create an Account</h2>
        <p className="text-gray-400 text-sm">Join CoreInventory to streamline your supply chain</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4 text-left">
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          icon={<User size={18} />}
        />
        
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

        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          icon={<Lock size={18} />}
        />

        <AnimatedButton
          type="submit"
          fullWidth
          isLoading={isLoading}
          loadingText="Creating account..."
          className="mt-4"
        >
          Create Account
        </AnimatedButton>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-400">Already have an account? </span>
        <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
          Log in
        </Link>
      </div>
    </AuthCard>
  );
}
