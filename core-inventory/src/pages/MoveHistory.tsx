import { Download } from "lucide-react";
import { cn } from "../lib/utils";

const history = [
  { id: 1, date: "Oct 25, 2023 14:30", prodDesc: "Industrial Compressor V2\nSKU: COMP-001-B", action: "Stock In", actionColor: "bg-success/15 text-success-700", srcDest: "Main Warehouse A", qty: "+50.00", qtyColor: "text-success", user: "JD" },
  { id: 2, date: "Oct 25, 2023 12:15", prodDesc: "High-Pressure Hydraulic Pump\nSKU: PUMP-99", action: "Dispatch", actionColor: "bg-critical/15 text-critical-700", srcDest: "Customer Order #882", qty: "-12.00", qtyColor: "text-critical", user: "JS" },
  { id: 3, date: "Oct 24, 2023 09:45", prodDesc: "Galvanized Steel Pipes\nSKU: PIPE-ST-05", action: "Adjustment", actionColor: "bg-warning/20 text-warning-800", srcDest: "Physical Audit", qty: "-5.00", qtyColor: "text-critical", user: "SA", isSystem: true },
  { id: 4, date: "Oct 24, 2023 08:00", prodDesc: "Premium Copper Wiring 100m\nSKU: WIRE-CU-PREM", action: "Stock In", actionColor: "bg-success/15 text-success-700", srcDest: "Supplier: Global Elec", qty: "+100.00", qtyColor: "text-success", user: "JD" },
  { id: 5, date: "Oct 23, 2023 16:20", prodDesc: "Electronic Valve Assembly\nSKU: VALVE-E-92", action: "Transfer", actionColor: "bg-info/15 text-info-700", srcDest: "WH-A → WH-B", qty: "0.00", qtyColor: "text-text-secondary", user: "JS" },
];

export function MoveHistory() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Move History</h1>
          <p className="text-text-secondary mt-1">Audit log of all material movements, adjustments, and transfers.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm shrink-0">
          <Download size={18} />
          Export Ledger
        </button>
      </div>

      <div className="flex flex-wrap gap-3 py-2 border-b border-borders text-sm font-medium mb-4">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-borders bg-white hover:bg-background rounded-md shadow-sm transition-colors text-text-primary">
          <span className="text-text-secondary">📅 Date:</span> All Time ∨
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-borders bg-white hover:bg-background rounded-md shadow-sm transition-colors text-text-primary">
          <span className="text-text-secondary">📦 Product:</span> All Products ∨
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-borders bg-white hover:bg-background rounded-md shadow-sm transition-colors text-text-primary">
          <span className="text-text-secondary">⚙️ Operation:</span> All ∨
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-borders bg-white hover:bg-background rounded-md shadow-sm transition-colors text-text-primary">
          <span className="text-text-secondary">📍 Location:</span> Global ∨
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-borders overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-background/40 text-xs font-bold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-borders">Timestamp</th>
                <th className="px-6 py-4 border-b border-borders">Product Description</th>
                <th className="px-6 py-4 border-b border-borders">Action</th>
                <th className="px-6 py-4 border-b border-borders">Origin/Dest</th>
                <th className="px-6 py-4 border-b border-borders text-right">Qty Delta</th>
                <th className="px-6 py-4 border-b border-borders">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders text-sm text-text-primary bg-white">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap text-text-secondary font-medium">
                    {row.date.split(' ')[0]} <br/> <span className="text-xs">{row.date.split(' ')[1]}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-text-primary block mb-1">{row.prodDesc.split('\n')[0]}</span>
                    <span className="text-xs text-text-secondary tracking-wider uppercase">{row.prodDesc.split('\n')[1]}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded border border-transparent font-semibold text-[11px] uppercase tracking-wider",
                      row.actionColor
                    )}>
                      {row.action}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-text-primary text-sm font-medium">
                    {row.srcDest}
                  </td>
                  <td className={cn("px-6 py-5 whitespace-nowrap text-right font-bold text-base tracking-tight", row.qtyColor)}>
                    {row.qty}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className={cn(
                         "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                         row.isSystem ? "bg-primary text-white" : "bg-primary/20 text-primary"
                       )}>
                         {row.isSystem ? "SA" : row.user}
                       </div>
                       <span className="text-sm font-medium text-text-secondary">
                         {row.isSystem ? "System Admin" : row.user === "JD" ? "John Doe" : "Jane Smith"}
                       </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-borders flex items-center justify-between text-sm text-text-secondary bg-background/20">
          <span>Showing <strong className="font-semibold text-text-primary">1</strong> to <strong className="font-semibold text-text-primary">5</strong> of <strong className="font-semibold text-text-primary">482</strong> entries</span>
          <div className="flex gap-1 items-center">
            <button className="w-8 h-8 flex items-center justify-center border border-borders rounded bg-white hover:bg-background hover:text-primary transition-colors disabled:opacity-50">{"<"}</button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary rounded bg-primary text-white font-bold transition-colors shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-borders rounded bg-white hover:bg-background hover:text-primary transition-colors disabled:opacity-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-borders rounded bg-white hover:bg-background hover:text-primary transition-colors disabled:opacity-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-borders rounded bg-white hover:bg-background hover:text-primary transition-colors disabled:opacity-50">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
