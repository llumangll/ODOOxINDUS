import { Search, Bell, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export function TopHeaderBar() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-16 px-6 bg-white border-b border-borders flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search products, SKU, operations..." 
            className="w-full h-10 pl-10 pr-4 bg-background border border-borders rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-secondary/70"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-critical rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-borders mx-1" />

        <div className="relative">
          <button 
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className={cn(
              "flex items-center gap-2 p-1 pr-3 rounded-full border border-transparent hover:bg-background transition-colors",
              isAvatarOpen && "bg-background border-borders"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              JD
            </div>
            <span className="text-sm font-medium text-text-primary hidden sm:block">Jane Doe</span>
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-borders py-1 overflow-hidden">
              <div className="px-4 py-3 bg-background/50 mb-1 border-b border-borders">
                <p className="text-sm text-text-primary font-medium">Jane Doe</p>
                <p className="text-xs text-text-secondary truncate">jane.doe@example.com</p>
              </div>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background flex items-center gap-2 transition-colors"
                onClick={() => { setIsAvatarOpen(false); navigate('/profile'); }}
              >
                <User className="h-4 w-4 text-text-secondary" />
                My Profile
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background flex items-center gap-2 transition-colors"
                onClick={() => { setIsAvatarOpen(false); navigate('/settings'); }}
              >
                <Settings className="h-4 w-4 text-text-secondary" />
                Settings
              </button>
              <div className="h-px bg-borders my-1" />
              <button 
                className="w-full text-left px-4 py-2 text-sm text-critical hover:bg-critical/5 flex items-center gap-2 transition-colors"
                onClick={() => { 
                  setIsAvatarOpen(false); 
                  localStorage.removeItem('token');
                  navigate('/login'); 
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
