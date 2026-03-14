import { Info, Plus, Trash2 } from "lucide-react";

export function InternalTransfers() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Internal Stock Transfer</h1>
          <p className="text-text-secondary mt-1 text-sm">Move products efficiently between warehouse locations</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-borders rounded-lg font-medium hover:bg-background transition-colors shadow-sm bg-white">
            Cancel
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm">
            Submit Transfer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Details Card */}
          <div className="bg-card-background rounded-2xl p-6 shadow-sm border border-borders">
            <h2 className="flex items-center gap-2 font-semibold text-text-primary mb-5">
              <Info size={18} className="text-primary" />
              Transfer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                 <label className="block text-sm font-medium text-text-primary mb-1.5">Source Warehouse</label>
                 <select className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                   <option>Main Distribution Center (A1)</option>
                   <option>East WH</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-text-primary mb-1.5">Destination Warehouse</label>
                 <select className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-secondary">
                   <option>Select Destination</option>
                   <option>East WH</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-text-primary mb-1.5">Transfer Date</label>
                 <input type="date" defaultValue="2023-10-24" className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-text-primary mb-1.5">Priority Level</label>
                 <div className="flex gap-2 h-10">
                   <button className="flex-1 rounded-lg border border-borders hover:bg-background text-sm font-medium transition-colors">Low</button>
                   <button className="flex-1 rounded-lg border-2 border-primary bg-primary/5 text-primary text-sm font-semibold transition-colors">Standard</button>
                   <button className="flex-1 rounded-lg border border-borders hover:bg-background text-sm font-medium transition-colors">Urgent</button>
                 </div>
              </div>
            </div>
          </div>

          {/* Items To Transfer */}
          <div className="bg-card-background rounded-2xl p-6 shadow-sm border border-borders">
            <div className="flex justify-between items-center mb-5">
              <h2 className="flex items-center gap-2 font-semibold text-text-primary">
                <span className="w-5 h-5 bg-primary/10 text-primary rounded flex items-center justify-center text-xs">■</span>
                Items to Transfer
              </h2>
              <button className="text-primary font-medium text-sm flex items-center gap-1 hover:text-primary/80 transition-colors">
                <Plus size={16} /> Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-borders">
                    <th className="pb-3 text-left w-10"></th>
                    <th className="pb-3 text-left">Product</th>
                    <th className="pb-3 text-left">SKU</th>
                    <th className="pb-3 text-right">In Stock</th>
                    <th className="pb-3 text-center">Quantity</th>
                    <th className="pb-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borders/50">
                  <tr className="group">
                    <td className="py-4">
                      <div className="w-8 h-8 rounded bg-background flex items-center justify-center">
                        <span className="w-4 h-4 bg-primary rounded-sm opacity-50"></span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                       <span className="font-medium text-text-primary block">ThinkPad X1 Carbon</span>
                    </td>
                    <td className="py-4 px-2 text-text-secondary text-sm">TP-X1C-G11</td>
                    <td className="py-4 px-2 text-right font-medium text-text-primary text-sm">42 units</td>
                    <td className="py-4 px-2">
                      <input type="number" defaultValue={5} className="w-20 h-9 mx-auto block px-3 border border-borders rounded-md text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-text-secondary hover:text-critical p-1 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                  <tr className="group">
                    <td className="py-4">
                      <div className="w-8 h-8 rounded bg-background flex items-center justify-center">
                        <span className="w-4 h-4 bg-primary rounded-sm opacity-50"></span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                       <span className="font-medium text-text-primary block">MX Master 3S</span>
                    </td>
                    <td className="py-4 px-2 text-text-secondary text-sm">LG-MX3S-BL</td>
                    <td className="py-4 px-2 text-right font-medium text-text-primary text-sm">156 units</td>
                    <td className="py-4 px-2">
                      <input type="number" defaultValue={12} className="w-20 h-9 mx-auto block px-3 border border-borders rounded-md text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-text-secondary hover:text-critical p-1 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="bg-primary text-white rounded-2xl p-6 shadow-md shadow-primary/20">
            <h3 className="font-semibold text-lg mb-4">Transfer Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-white/80 text-sm">Total Items</span>
                <span className="font-bold">2 SKUs</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-white/80 text-sm">Total Quantity</span>
                <span className="font-bold">17 units</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-white/80 text-sm">Est. Weight</span>
                <span className="font-bold">24.5 kg</span>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-4 italic">* Requires standard courier transport</p>
          </div>

          <div className="bg-card-background rounded-2xl p-6 shadow-sm border border-borders">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">Notes</h3>
            <textarea 
              placeholder="Add internal handling instructions or reasons for transfer..." 
              className="w-full h-28 p-3 bg-background border border-borders rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none placeholder:text-text-secondary/70"
            ></textarea>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-3">
            <Info className="text-primary shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-sm font-semibold text-text-primary">Need help?</h4>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Transfers between regions may take up to 48 hours for logistics coordination. Contact support if urgent.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
