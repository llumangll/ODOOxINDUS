import { Map, Plus, Settings, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

const warehouses = [
  { id: "WH-NY-001", name: "Central Logistics Hub", loc: "New York, NY", manager: "Jonathan Doe", util: 85, cap: "12.5k Units", status: "Active" },
  { id: "WH-LA-004", name: "West Coast Branch", loc: "Los Angeles, CA", manager: "Sarah Jenkins", util: 60, cap: "8.2k Units", status: "Active" },
  { id: "WH-TX-008", name: "Southern Depot", loc: "Austin, TX", manager: "Robert Vance", util: 95, cap: "20k Units", status: "Critical" },
  { id: "WH-MA-002", name: "East Logistics", loc: "Boston, MA", manager: "Elena Fisher", util: 20, cap: "4.5k Units", status: "Inactive" },
];

export function WarehouseSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Warehouse Locations</h1>
          <p className="text-text-secondary mt-1">Global logistics and storage infrastructure management.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm shrink-0">
          <Plus size={18} />
          Add Warehouse
        </button>
      </div>

      <div className="flex gap-6 pb-2 border-b border-borders text-sm font-semibold mb-6 overflow-x-auto">
        <button className="text-primary border-b-2 border-primary pb-2 px-1">All Sites</button>
        <button className="text-text-secondary hover:text-text-primary transition-colors pb-2 px-1">Active</button>
        <button className="text-text-secondary hover:text-text-primary transition-colors pb-2 px-1">Maintenance</button>
      </div>

      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background/40 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-borders w-[30%]">Name</th>
                <th className="px-6 py-4 border-b border-borders w-[20%]">Location</th>
                <th className="px-6 py-4 border-b border-borders w-[20%]">Manager</th>
                <th className="px-6 py-4 border-b border-borders w-[20%]">Capacity</th>
                <th className="px-6 py-4 border-b border-borders w-[10%] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders">
              {warehouses.map((wh) => (
                <tr key={wh.id} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary text-base flex items-center gap-2">
                        {wh.status === "Active" ? <CheckCircle2 size={16} className="text-success" /> : 
                         wh.status === "Critical" ? <AlertCircle size={16} className="text-warning" /> : 
                         <Settings size={16} className="text-text-secondary" />}
                        {wh.name}
                      </span>
                      <span className="text-xs font-semibold text-text-secondary tracking-wider ml-6 mt-0.5">ID: {wh.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-text-secondary font-medium flex items-center gap-1.5 pt-7">
                    <Map size={16} /> {wh.loc}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-text-primary text-white flex items-center justify-center text-xs font-bold">
                        {wh.manager.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span className="font-medium text-text-primary text-sm">{wh.manager}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <div className="flex flex-col gap-1 w-full max-w-[150px]">
                       <div className="flex justify-between text-xs font-bold">
                         <span className={cn(wh.util > 90 ? "text-critical" : "text-primary")}>{wh.util}% Utilized</span>
                         <span className="text-text-secondary">{wh.cap}</span>
                       </div>
                       <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                         <div className={cn("h-full rounded-full w-full", wh.util > 90 ? "bg-warning" : wh.status === "Inactive" ? "bg-borders" : "bg-primary")} style={{width: `${wh.util}%`}} />
                       </div>
                     </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                     <span className={cn(
                       "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold",
                       wh.status === "Active" ? "bg-success/15 text-success-700" :
                       wh.status === "Critical" ? "bg-warning/20 text-warning-800" :
                       "bg-background text-text-secondary border border-borders"
                     )}>
                       {wh.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-borders flex items-center justify-between text-sm text-text-secondary bg-background/20">
          <span>Showing <strong className="font-semibold text-text-primary">4</strong> of <strong className="font-semibold text-text-primary">24</strong> warehouses</span>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-xs font-bold tracking-wider text-text-primary uppercase bg-white border border-borders rounded shadow-sm hover:bg-background transition-colors disabled:opacity-50">Previous</button>
            <button className="px-4 py-1.5 text-xs font-bold tracking-wider text-text-primary uppercase bg-white border border-borders rounded shadow-sm hover:bg-background transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-card-background rounded-xl p-5 border border-borders shadow-sm flex flex-col justify-between h-40">
           <div className="w-full h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-lg flex items-center justify-center mb-3">
             <Map className="text-primary/40 h-8 w-8" />
           </div>
           <div>
             <h4 className="font-bold text-sm text-text-primary">New York Hub</h4>
             <p className="text-xs text-text-secondary">Region: North East</p>
           </div>
        </div>
        <div className="bg-card-background rounded-xl p-5 border border-borders shadow-sm flex flex-col justify-between h-40">
           <div className="w-full h-16 bg-gradient-to-br from-info/10 to-transparent rounded-lg flex items-center justify-center mb-3">
             <Map className="text-info/40 h-8 w-8" />
           </div>
           <div>
             <h4 className="font-bold text-sm text-text-primary">LA Branch</h4>
             <p className="text-xs text-text-secondary">Region: West Coast</p>
           </div>
        </div>
        <div className="bg-card-background rounded-xl p-5 border border-borders shadow-sm flex flex-col justify-between h-40">
           <div className="w-full h-16 bg-gradient-to-br from-warning/10 to-transparent rounded-lg flex items-center justify-center mb-3">
             <Map className="text-warning/40 h-8 w-8" />
           </div>
           <div>
             <h4 className="font-bold text-sm text-text-primary">Texas Depot</h4>
             <p className="text-xs text-text-secondary">Region: South</p>
           </div>
        </div>
        <button className="bg-background/50 rounded-xl p-5 border border-dashed border-borders shadow-sm flex flex-col items-center justify-center h-40 hover:bg-background hover:border-primary/50 transition-colors group">
           <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-text-secondary group-hover:text-primary transition-colors">
             <Plus size={20} />
           </div>
           <span className="text-sm font-semibold text-text-secondary group-hover:text-primary transition-colors">Add Site Visualization</span>
        </button>
      </div>

    </div>
  );
}
