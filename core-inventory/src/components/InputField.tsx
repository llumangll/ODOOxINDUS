import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const inputType = type === 'password' && showPassword ? 'text' : type || 'text';
    const isPassword = type === 'password';

    return (
      <div className={cn("relative w-full max-w-full mb-5", className)}>
        <div className="relative group flex items-center w-full bg-white/[0.05] border rounded-xl focus-within:ring-4 transition-all duration-300 overflow-hidden border-white/[0.1] hover:border-white/[0.2] focus-within:!border-teal-500 focus-within:ring-teal-500/10 focus-within:bg-white/[0.08]"
          style={error ? { borderColor: '#ef4444' } : {}}
        >
          {icon && (
            <div className="pl-4 text-gray-500 group-focus-within:text-teal-400 transition-colors duration-300">
              {icon}
            </div>
          )}

          <div className="relative flex-1 px-4 pt-6 pb-2">
            <input
              ref={ref}
              type={inputType}

              className="block w-full bg-transparent text-white border-none p-0 focus:ring-0 sm:text-sm peer placeholder-transparent focus:outline-none"
              placeholder={label}
              {...props}
            />
            
            <label className={cn(
              "absolute text-gray-400 transition-all duration-300 pointer-events-none transform origin-left",
              "left-4 top-4",
              "peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-teal-400",
              "peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75",
              error && "peer-focus:text-red-400 text-red-500"
            )}>
              {label}
            </label>
          </div>

          {isPassword && (
            <button
              type="button"
              className="pr-4 text-gray-500 hover:text-teal-400 focus:outline-none transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {error && !isPassword && (
            <div className="pr-4 text-red-500">
              <AlertCircle size={18} />
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="text-red-400 text-xs mt-1.5 ml-1 text-left"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputField.displayName = "InputField";
