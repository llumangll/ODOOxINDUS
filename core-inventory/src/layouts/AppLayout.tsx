import { Outlet } from "react-router-dom";
import { SidebarNavigation } from "../components/SidebarNavigation";
import { TopHeaderBar } from "../components/TopHeaderBar";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-text-primary">
      <SidebarNavigation />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeaderBar />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
