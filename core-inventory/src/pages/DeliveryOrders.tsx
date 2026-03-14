import { Plus, Search, Filter } from "lucide-react";
import { cn } from "../lib/utils";

const deliveries = [
  { id: "DO-2023-089", customer: "Tech Solutions Corp", items: 3, qty: 120, wh: "Main WH", date: "Oct 24, 2023", status: "Ready" },
  { id: "DO-2023-090", customer: "Omega Industries", items: 1, qty: 5, wh: "East WH", date: "Oct 25, 2023", status: "Waiting" },
  { id: "DO-2023-091", customer: "Apex Manufacturing", items: 8, qty: 240, wh: "Main WH", date: "Oct 26, 2023", status: "Done" },
];

export function DeliveryOrders() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Delivery Orders</h1>
        <button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm">
          <Plus size={18} />
          Create Delivery Order
        </button>
      </div>

      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden flex flex-col">
        <div className="p-4 border-b border-borders flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search deliveries..." 
              className="w-full h-10 pl-10 pr-4 bg-background border border-borders rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-borders rounded-lg text-sm font-medium text-text-primary hover:bg-background transition-colors">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-background/50 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-3 border-b border-borders">Order ID</th>
                <th className="px-6 py-3 border-b border-borders">Customer</th>
                <th className="px-6 py-3 border-b border-borders text-right">Products</th>
                <th className="px-6 py-3 border-b border-borders text-right">Quantity</th>
                <th className="px-6 py-3 border-b border-borders">Warehouse</th>
                <th className="px-6 py-3 border-b border-borders">Delivery Date</th>
                <th className="px-6 py-3 border-b border-borders">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders text-sm text-text-primary">
              {deliveries.map((r) => (
                <tr key={r.id} className="hover:bg-background/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-info">{r.id}</td>
                  <td className="px-6 py-4 font-medium">{r.customer}</td>
                  <td className="px-6 py-4 text-right text-text-secondary">{r.items} skus</td>
                  <td className="px-6 py-4 text-right font-semibold">{r.qty}</td>
                  <td className="px-6 py-4 text-text-secondary">{r.wh}</td>
                  <td className="px-6 py-4 text-text-secondary">{r.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      r.status === "Done" ? "bg-success/10 text-success" : 
                      r.status === "Waiting" ? "bg-warning/10 text-warning" : 
                      "bg-info/10 text-info"
                    )}>
                      {r.status}
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
