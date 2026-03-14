<<<<<<< HEAD
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
=======
import { Plus, Search, Filter, Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
>>>>>>> origin/priyansh-local

interface StockItem {
  id: number;
  product: string;
  perUnitCost: number;
  onHand: number;
  freeToUse: number;
}

export function Products() {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stock");
      const data = await res.json();
      setStockData(data);
    } catch (err) {
      console.error("Failed to fetch stock:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = stockData.filter((item) =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-primary tracking-tight">
          Stock
        </h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 pl-10 pr-4 bg-card-background border border-borders rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                  Product
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                  Per Unit Cost
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide text-center">
                  On Hand
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide text-center">
                  Free to Use
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-secondary text-sm">
                    Loading stock data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-secondary text-sm">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-dashed border-borders/60 hover:bg-background/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-text-primary text-sm">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary">
                      <span>{item.perUnitCost.toLocaleString()} Rs</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span className="font-semibold text-text-primary">
                        {item.onHand}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span className="font-semibold text-text-primary">
                        {item.freeToUse}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
