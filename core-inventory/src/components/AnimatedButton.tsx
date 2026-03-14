import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from './InputField';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, isLoading, loadingText, variant = 'primary', fullWidth, className, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-lg transition-colors overflow-hidden focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.25)] border border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]",
      secondary: "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] hover:border-white/[0.2]",
      outline: "bg-transparent hover:bg-teal-500/10 text-teal-400 border border-teal-500/50 hover:border-teal-400"
    };

    const sizing = fullWidth ? "w-full py-2.5 px-4" : "py-2 px-6";

    return (
      <motion.button
        ref={ref}
        whileHover={!props.disabled && !isLoading ? { scale: 1.01 } : {}}
        whileTap={!props.disabled && !isLoading ? { scale: 0.98 } : {}}
        disabled={isLoading || props.disabled}
        className={cn(baseStyles, variants[variant], sizing, className)}
        {...props}
      >
        <span className={cn("flex items-center justify-center gap-2", isLoading ? "opacity-0" : "opacity-100")}>
          {children as React.ReactNode}
        </span>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-current" />
            {loadingText && <span className="text-sm">{loadingText}</span>}
          </div>
        )}
        
        {/* Shimmer effect */}
        {variant === 'primary' && !isLoading && !props.disabled && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
