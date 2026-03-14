import React from 'react';
import { Inventory3DBackground } from './Inventory3DBackground';
import { CustomLogo } from './CustomLogo';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8" style={{ background: '#0a0a1a' }}>
      {/* Full screen 3D Background */}
      <div className="absolute inset-0 z-0">
        <Inventory3DBackground />
      </div>

      {/* Blur overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-[#0a0a1a]/40 backdrop-blur-[2px]" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Centered Logo & Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-white/[0.07] rounded-2xl flex items-center justify-center border border-white/[0.12] backdrop-blur-md p-2 shadow-2xl mb-6">
            <CustomLogo className="w-14 h-14" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white/90 mb-2">
            Smart Inventory Management
          </h2>
          <p className="text-gray-400 text-sm max-w-sm">
            Optimize your supply chain and track assets in real-time.
          </p>
        </div>

        {/* The Form Card */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
