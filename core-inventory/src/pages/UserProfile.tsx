import { User, Mail, Shield, Smartphone } from "lucide-react";

export function UserProfile() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">User Profile</h1>
        <p className="text-text-secondary">Manage your personal information and security settings.</p>
      </div>

      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
        <div className="p-8 border-b border-borders bg-gradient-to-r from-primary/5 to-transparent flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl border-4 border-white shadow-sm">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Jane Doe</h2>
            <p className="text-text-secondary flex items-center gap-2 mt-1">
              <Shield size={16} className="text-primary" />
              System Administrator
            </p>
          </div>
          <div className="ml-auto">
             <button className="px-4 py-2 border border-borders rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-sm bg-background">
               Change Avatar
             </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <User size={18} className="text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input type="text" defaultValue="Jane Doe" className="w-full h-11 px-3 bg-white border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Company Role</label>
                <input type="text" defaultValue="System Administrator" disabled className="w-full h-11 px-3 bg-background/50 border border-borders rounded-lg text-sm cursor-not-allowed text-text-secondary" />
              </div>
            </div>
          </div>

          <div className="h-px bg-borders/50 w-full" />

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Mail size={18} className="text-primary" />
              Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <input type="email" defaultValue="jane.doe@coreinventory.com" className="w-full h-11 px-3 bg-white border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-2">
                  <Smartphone size={14} className="text-text-secondary" />
                  Phone Number
                </label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full h-11 px-3 bg-white border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-borders bg-background/30 flex justify-end gap-3">
          <button className="px-5 py-2.5 border border-borders rounded-lg font-medium hover:bg-background transition-colors shadow-sm bg-white">
            Discard Changes
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
