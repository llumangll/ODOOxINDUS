import { Package, AlertCircle, Truck, ClipboardList, ArrowLeftRight } from "lucide-react";
import { cn } from "../lib/utils";

const kpis = [
  { name: "Total Products in Stock", value: "24,567", icon: Package, change: "+2.1%", trend: "up" },
  { name: "Low Stock / Out of Stock", value: "345 / 89", icon: AlertCircle, color: "text-warning" },
  { name: "Pending Receipts", value: "12", icon: ClipboardList, tags: ["Due Today", "Pending"] },
  { name: "Pending Deliveries", value: "18", icon: Truck, subtext: "Status: Pending", color: "text-info" },
  { name: "Internal Transfers Scheduled", value: "6", icon: ArrowLeftRight, hasTimeline: true },
];

const recentActivity = [
  { date: "Oct 24, 2023", operation: "Receipt", product: "Steel Rods", qty: "+50", wh: "Main WH", status: "Done" },
  { date: "Oct 24, 2023", operation: "Delivery", product: "Chairs", qty: "-10", wh: "East WH", status: "Pending" },
  { date: "Oct 23, 2023", operation: "Transfer", product: "Monitors", qty: "20", wh: "East → West", status: "Done" },
  { date: "Oct 23, 2023", operation: "Delivery", product: "Desks", qty: "-5", wh: "West WH", status: "Cancelled" },
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Dashboard</h1>
        <p className="text-text-secondary">Inventory Overview</p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx} 
            className="bg-card-background rounded-2xl p-4 shadow-sm border border-borders hover:shadow-md transition-shadow group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-text-secondary line-clamp-2 pr-2">{kpi.name}</span>
              <div className={cn("p-2 rounded-lg bg-background group-hover:bg-primary/5 transition-colors shrink-0", kpi.color)}>
                <kpi.icon className={cn("h-5 w-5 text-text-primary", kpi.color && kpi.color)} />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary">{kpi.value}</span>
                {kpi.change && (
                  <span className={cn("text-xs font-semibold", kpi.trend === "up" ? "text-success" : "text-critical")}>
                    {kpi.change}
                  </span>
                )}
              </div>
              
              {kpi.tags && (
                <div className="flex gap-2 mt-2">
                  {kpi.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-info/10 text-info text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {kpi.subtext && <p className="text-xs text-text-secondary mt-1">{kpi.subtext}</p>}
              
              {idx === 0 && (
                <div className="h-1 w-full bg-background rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-success w-[70%]" />
                </div>
              )}
              {idx === 1 && (
                <div className="flex h-1 w-full bg-background rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-warning w-[60%]" />
                  <div className="h-full bg-critical w-[15%]" />
                </div>
              )}
              {kpi.hasTimeline && (
                 <div className="flex items-center gap-1 mt-3">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                   <div className="flex-1 border-t-2 border-dashed border-borders" />
                   <div className="h-1.5 w-1.5 rounded-full bg-borders" />
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SECOND SECTION */}
      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
        <div className="px-6 py-5 border-b border-borders flex justify-between items-center bg-white">
          <h2 className="text-[20px] font-semibold text-text-primary">Recent Activity</h2>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-3 border-b border-borders">Date</th>
                <th className="px-6 py-3 border-b border-borders">Operation</th>
                <th className="px-6 py-3 border-b border-borders">Product</th>
                <th className="px-6 py-3 border-b border-borders">Quantity</th>
                <th className="px-6 py-3 border-b border-borders">Warehouse</th>
                <th className="px-6 py-3 border-b border-borders">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders text-sm text-text-primary">
              {recentActivity.map((row, i) => (
                <tr key={i} className="hover:bg-background/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{row.operation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.product}</td>
                  <td className={cn("px-6 py-4 whitespace-nowrap font-medium", row.qty.startsWith('+') ? 'text-success' : row.qty.startsWith('-') ? 'text-critical' : '')}>
                    {row.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{row.wh}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      row.status === "Done" ? "bg-success/10 text-success" : 
                      row.status === "Pending" ? "bg-warning/10 text-warning" : 
                      "bg-critical/10 text-critical"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
