import { Save, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function InventoryAdjustment() {
  const [counted, setCounted] = useState<number | "">("");
  const systemQty = 100;
  
  const diff = typeof counted === "number" ? counted - systemQty : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Inventory Adjustment</h1>
        <p className="text-text-secondary">Used to correct stock mismatch between system and physical count.</p>
      </div>

      <div className="bg-card-background rounded-2xl p-6 shadow-sm border border-borders">
        <div className="flex items-start gap-4 mb-8 p-4 bg-warning/10 border border-warning/20 rounded-xl">
          <AlertTriangle className="text-warning shrink-0" />
          <p className="text-sm font-medium text-warning-800">
            Warning: Inventory adjustments immediately update stock levels and generate a variance report. 
            All adjustments are logged and require an audit trail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Product</label>
            <select className="w-full h-11 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Industrial Compressor V2 (COMP-001-B)</option>
              <option>High-Pressure Pump (PUMP-99)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Warehouse</label>
            <select className="w-full h-11 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Main WH</option>
              <option>East WH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Location (Bin/Rack)</label>
            <input type="text" defaultValue="A1-R4-B12" className="w-full h-11 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>

        <div className="p-6 border border-borders rounded-2xl bg-background/50 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-6">Stock Reconciliation</h3>
            
            <div className="flex items-center gap-12 w-full justify-center">
              <div className="flex flex-col items-center">
                <span className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-2">System Quantity</span>
                <span className="text-4xl font-bold bg-white px-8 py-4 rounded-xl border border-borders shadow-sm">{systemQty}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center pt-8">
                <span className="text-text-secondary font-medium">Difference</span>
                <span className={cn(
                  "text-2xl font-bold mt-1",
                  diff > 0 ? "text-success" : diff < 0 ? "text-critical" : "text-text-secondary"
                )}>
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-2">Counted Quantity</span>
                <input 
                  type="number" 
                  value={counted}
                  onChange={(e) => setCounted(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0"
                  className="w-32 h-[74px] text-center text-4xl font-bold bg-white text-primary px-4 rounded-xl border-2 border-primary shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
              </div>
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button className="px-6 py-2.5 border border-borders rounded-lg font-medium hover:bg-background transition-colors shadow-sm bg-white">
            Cancel
          </button>
          <button 
            disabled={counted === "" || diff === 0}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all active:scale-[0.98] shadow-sm"
          >
            <Save size={18} />
            Confirm Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}
