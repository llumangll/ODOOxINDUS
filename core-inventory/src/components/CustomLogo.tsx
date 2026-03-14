export function CustomLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={className}>
      {/* mix-blend-screen removes dark backgrounds on our dark theme */}
      <img 
        src="/logo.png" 
        alt="CoreInventory Logo" 
        className="w-full h-full object-contain mix-blend-screen brightness-110" 
      />
    </div>
  );
}
