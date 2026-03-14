import { Plus, Search, Filter, Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Industrial Compressor V2", sku: "COMP-001-B", cat: "Equipment", unit: "Pcs", stock: 120, wh: "Main WH" },
  { id: 2, name: "High-Pressure Pump", sku: "PUMP-99", cat: "Parts", unit: "Pcs", stock: 45, wh: "East WH" },
  { id: 3, name: "Galvanized Steel Pipes", sku: "PIPE-ST-05", cat: "Raw Material", unit: "Meters", stock: 5000, wh: "Main WH" },
];

export function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden flex flex-col">
        <div className="p-4 border-b border-borders flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by product name or SKU..." 
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
                <th className="px-6 py-3 border-b border-borders">Product Name</th>
                <th className="px-6 py-3 border-b border-borders">SKU</th>
                <th className="px-6 py-3 border-b border-borders">Category</th>
                <th className="px-6 py-3 border-b border-borders text-right">Stock Quantity</th>
                <th className="px-6 py-3 border-b border-borders">Warehouse</th>
                <th className="px-6 py-3 border-b border-borders text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders text-sm text-text-primary">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-text-secondary">{p.sku}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-background text-text-secondary rounded-md text-xs">{p.cat}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold">{p.stock}</span> <span className="text-text-secondary text-xs">{p.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{p.wh}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Eye size={16} /></button>
                      <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Edit2 size={16} /></button>
                      <button className="p-1.5 text-text-secondary hover:text-critical hover:bg-critical/10 rounded-md transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-borders flex items-center justify-between text-sm text-text-secondary bg-background/30">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-borders rounded-md hover:bg-background disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-borders rounded-md hover:bg-background disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card-background rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-borders">
            <div className="px-6 py-4 border-b border-borders flex justify-between items-center">
              <h3 className="text-[20px] font-semibold text-text-primary">Add New Product</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2">
                   <label className="block text-sm font-medium text-text-primary mb-1">Product Name</label>
                   <input type="text" className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-text-primary mb-1">SKU Code</label>
                   <input type="text" className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
                   <select className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                     <option>Equipment</option>
                     <option>Parts</option>
                     <option>Raw Material</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-text-primary mb-1">Initial Stock</label>
                   <input type="number" className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-text-primary mb-1">Unit of Measure</label>
                   <input type="text" className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                 </div>
                 <div className="col-span-2">
                   <label className="block text-sm font-medium text-text-primary mb-1">Warehouse Location</label>
                   <select className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                     <option>Main WH</option>
                     <option>East WH</option>
                   </select>
                 </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-borders flex justify-end gap-3 bg-background/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-borders rounded-lg text-sm font-medium text-text-primary hover:bg-background transition-colors"
               >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
               >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
