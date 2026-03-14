import { Search, List, LayoutGrid, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

type MoveType = "IN" | "OUT";
type MoveStatus = "Ready" | "Done" | "Waiting" | "Draft";

interface MoveRecord {
  id: number;
  reference: string;
  date: string;
  contact: string;
  from: string;
  to: string;
  quantity: number;
  status: MoveStatus;
  type: MoveType;
}

const statusColors: Record<MoveStatus, string> = {
  Ready: "bg-blue-100 text-blue-700",
  Done: "bg-emerald-100 text-emerald-700",
  Waiting: "bg-amber-100 text-amber-700",
  Draft: "bg-slate-100 text-slate-500",
};

export function MoveHistory() {
  const [moveData, setMoveData] = useState<MoveRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoves();
  }, []);

  const fetchMoves = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stock-ledger");
      const data = await res.json();
      setMoveData(data);
    } catch (err) {
      console.error("Failed to fetch move history:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = moveData.filter(
    (m) =>
      m.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by status for kanban view
  const statuses: MoveStatus[] = ["Draft", "Waiting", "Ready", "Done"];
  const grouped = statuses.reduce((acc, status) => {
    acc[status] = filtered.filter((m) => m.status === status);
    return acc;
  }, {} as Record<MoveStatus, MoveRecord[]>);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-[0.98] flex items-center gap-2">
            <Plus size={16} />
            NEW
          </button>
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight">
            Move History
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference or contact..."
              className="w-full h-10 pl-10 pr-4 bg-card-background border border-borders rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          {/* View Toggle */}
          <div className="flex border border-borders rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-card-background text-text-secondary hover:bg-background"
              )}
              title="List View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "kanban"
                  ? "bg-primary text-white"
                  : "bg-card-background text-text-secondary hover:bg-background"
              )}
              title="Kanban View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                    Reference
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                    Date
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                    From
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide">
                    To
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide text-center">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-text-primary tracking-wide text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-text-secondary text-sm">
                      Loading move history...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-text-secondary text-sm">
                      No moves found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-b border-dashed border-borders/60 transition-colors hover:bg-background/50",
                        row.type === "IN" ? "bg-emerald-50/40" : "bg-red-50/40"
                      )}
                    >
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-semibold",
                          row.type === "IN" ? "text-emerald-700" : "text-red-600"
                        )}
                      >
                        {row.reference}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary font-medium">
                        {row.contact}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">
                        {row.from}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">
                        {row.to}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-text-primary">
                        {row.quantity}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={cn(
                            "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                            statusColors[row.status]
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kanban View — grouped by Status */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statuses.map((status) => (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-t-xl font-semibold text-sm",
                  statusColors[status]
                )}
              >
                <span>{status}</span>
                <span className="bg-white/60 rounded-full px-2 py-0.5 text-xs font-bold">
                  {grouped[status].length}
                </span>
              </div>
              {/* Cards */}
              <div className="bg-background/50 border border-t-0 border-borders rounded-b-xl p-3 space-y-3 min-h-[200px]">
                {grouped[status].length === 0 && (
                  <p className="text-xs text-text-secondary text-center py-8">
                    No moves
                  </p>
                )}
                {grouped[status].map((row) => (
                  <div
                    key={row.id}
                    className={cn(
                      "bg-card-background rounded-lg p-4 border shadow-sm transition-all hover:shadow-md cursor-pointer",
                      row.type === "IN"
                        ? "border-l-4 border-l-emerald-500 border-t-borders border-r-borders border-b-borders"
                        : "border-l-4 border-l-red-500 border-t-borders border-r-borders border-b-borders"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          row.type === "IN" ? "text-emerald-700" : "text-red-600"
                        )}
                      >
                        {row.reference}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {row.date}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary font-medium mb-2">
                      {row.contact}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>
                        {row.from} → {row.to}
                      </span>
                      <span className="font-bold text-text-primary text-sm">
                        Qty: {row.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
