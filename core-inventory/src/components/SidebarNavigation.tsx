import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Truck, 
  ArrowLeftRight, 
  SlidersHorizontal,
  History,
  Building2,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Box
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const mainLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Stock", href: "/products", icon: Package },
];

const operationLinks = [
  { name: "Receipts", href: "/receipts", icon: ClipboardList },
  { name: "Delivery Orders", href: "/deliveries", icon: Truck },
  { name: "Internal Transfers", href: "/transfers", icon: ArrowLeftRight },
  { name: "Inventory Adjustment", href: "/adjustments", icon: SlidersHorizontal },
];

const bottomLinks = [
  { name: "Move History", href: "/move-history", icon: History },
  { name: "Warehouses", href: "/warehouses", icon: Building2 },
  { name: "Profile", href: "/profile", icon: User },
];

export function SidebarNavigation() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "flex flex-col bg-primary text-white transition-all duration-300 relative z-20",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex h-16 items-center px-4 justify-between border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Box className="h-6 w-6 text-secondary" />
            <span>CoreInventory</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <Box className="h-8 w-8 text-secondary" />
          </div>
        )}
      </div>
      
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-card-background border border-borders text-text-primary rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="px-3 mb-6">
          <ul className="space-y-1">
            {mainLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors group",
                    isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 mb-6">
          {!collapsed && (
            <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-white/50 uppercase">
              Operations
            </div>
          )}
          <ul className="space-y-1">
            {operationLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors group",
                    isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3">
          {!collapsed && (
            <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-white/50 uppercase">
              System
            </div>
          )}
          <ul className="space-y-1">
            {bottomLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors group",
                    isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-3 border-t border-white/10 mt-auto">
        <NavLink
            to="/login"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
}
