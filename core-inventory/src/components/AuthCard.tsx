import React from 'react';
import { motion } from 'framer-motion';

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white/[0.06] backdrop-blur-2xl w-full max-w-md p-8 sm:p-10 rounded-[24px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-80" />
      
      {/* Decorative ambient gradients */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
