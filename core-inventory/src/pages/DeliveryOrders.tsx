import { Search, List, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

type DeliveryOrder = {
  id: number;
  reference: string;
  from: string;
  to: string;
  contact: string;
  scheduleDate: string;
  status: "Ready" | "Draft" | "Done";
};

const initialData: DeliveryOrder[] = [
  { id: 1, reference: "WH/OUT/00001", from: "WH/Stock1", to: "Customer", contact: "Tech Solutions Corp", scheduleDate: "10/24/2023 10:00:00", status: "Done" },
  { id: 2, reference: "WH/OUT/00002", from: "WH/Stock1", to: "Customer", contact: "Omega Industries", scheduleDate: "10/25/2023 14:30:00", status: "Ready" },
  { id: 3, reference: "WH/OUT/00003", from: "WH/Stock1", to: "Customer", contact: "Apex Manufacturing", scheduleDate: "10/26/2023 09:15:00", status: "Draft" },
];

export function DeliveryOrders() {
  const [deliveries, setDeliveries] = useState<DeliveryOrder[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Modal State
  const [newFrom, setNewFrom] = useState("WH/Stock1");
  const [newTo, setNewTo] = useState("Customer");
  const [newContact, setNewContact] = useState("");
  const [newScheduleDate, setNewScheduleDate] = useState("");

  const nextId = deliveries.length > 0 ? Math.max(...deliveries.map(r => r.id)) + 1 : 1;
  const newRef = `WH/OUT/${String(nextId).padStart(5, '0')}`;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleSearchClick = () => {
    setActiveSearch(searchQuery);
  };

  const handleSave = () => {
    const newDelivery: DeliveryOrder = {
      id: nextId,
      reference: newRef,
      from: newFrom,
      to: newTo,
      contact: newContact || "Unknown Customer",
      scheduleDate: newScheduleDate || new Date().toLocaleString(),
      status: "Draft"
    };
    
    setDeliveries([newDelivery, ...deliveries]);
    setIsModalOpen(false);
    
    // reset form
    setNewFrom("WH/Stock1");
    setNewTo("Customer");
    setNewContact("");
    setNewScheduleDate("");
  };

  const displayedDeliveries = deliveries.filter(r => {
    if (!activeSearch) return true;
    const lowerQuery = activeSearch.toLowerCase();
    return r.reference.toLowerCase().includes(lowerQuery) || r.contact.toLowerCase().includes(lowerQuery);
  });

  return (
    <div className="flex flex-col h-full bg-white text-[13px] animate-in fade-in duration-300 rounded-lg shadow-sm border border-borders relative">

      {/* Header Actions & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-borders bg-white relative z-10">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-primary tracking-tight">Delivery Orders</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors shadow-sm ml-2"
          >
            NEW
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 h-8 px-2 pr-8 bg-background/50 hover:bg-white focus:bg-white border border-transparent hover:border-borders focus:border-primary text-[13px] focus:outline-none transition-all rounded-md"
            />
          </div>
          <button 
            type="button"
            onClick={handleSearchClick}
            className="h-8 w-8 flex items-center justify-center border border-borders rounded-md bg-background/50 hover:bg-white hover:text-primary text-text-secondary transition-colors shadow-sm text-[13px] font-bold"
          >
            A
          </button>
          {/* View Switcher Panel */}
          <div className="flex border border-borders rounded-md overflow-hidden bg-white shadow-sm">
            <button className="p-1.5 text-white bg-critical transition-colors border-r border-borders" title="List View">
              <List size={16} />
            </button>
            <button className="p-1.5 text-text-secondary hover:bg-background hover:text-text-primary transition-colors" title="Kanban View">
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white z-0">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 bg-white shadow-[0_1px_0_var(--color-borders)] z-10">
            <tr className="text-text-secondary bg-white">
              <th className="px-4 py-2.5 font-semibold w-6"><input type="checkbox" className="rounded-[3px] border-borders align-middle text-primary focus:ring-primary h-3.5 w-3.5"/></th>
              <th className="px-4 py-2.5 font-semibold">Reference</th>
              <th className="px-4 py-2.5 font-semibold">From</th>
              <th className="px-4 py-2.5 font-semibold">To</th>
              <th className="px-4 py-2.5 font-semibold">Contact</th>
              <th className="px-4 py-2.5 font-semibold">Schedule date</th>
              <th className="px-4 py-2.5 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borders/50">
            {displayedDeliveries.map((r) => (
              <tr 
                key={r.id}
                className="hover:bg-background/50 cursor-pointer group transition-colors"
                onClick={() => navigate(`/delivery/${encodeURIComponent(r.reference)}`)}
              >
                <td className="px-4 py-2"><input type="checkbox" className="rounded-[3px] border-borders align-middle text-primary focus:ring-primary h-3.5 w-3.5" onClick={(e) => e.stopPropagation()}/></td>
                <td className="px-4 py-2 font-bold text-critical">{r.reference}</td>
                <td className="px-4 py-2 text-text-primary">{r.from}</td>
                <td className="px-4 py-2 text-text-primary">{r.to}</td>
                <td className="px-4 py-2 font-medium text-text-primary">{r.contact}</td>
                <td className="px-4 py-2 text-text-secondary">{r.scheduleDate}</td>
                <td className="px-4 py-2 text-right">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wider",
                    r.status === "Done" ? "bg-borders/60 text-text-primary border border-borders/80" : 
                    r.status === "Ready" ? "bg-success/15 text-success-700 border border-success/20" : 
                    "bg-borders/40 text-text-secondary border border-borders/60"
                  )}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {displayedDeliveries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                  No delivery orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card-background rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-borders">
            <div className="px-6 py-4 border-b border-borders flex justify-between items-center bg-white">
              <h3 className="text-lg font-semibold text-text-primary">Create Delivery Order</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Reference</label>
                <input 
                  type="text" 
                  value={newRef} 
                  disabled 
                  className="w-full h-10 px-3 bg-background/50 border border-borders rounded-lg text-sm text-text-secondary font-medium cursor-not-allowed" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">From</label>
                  <select 
                    value={newFrom}
                    onChange={(e) => setNewFrom(e.target.value)}
                    className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="WH/Stock1">WH/Stock1</option>
                    <option value="WH/Stock2">WH/Stock2</option>
                    <option value="WH/Quality">WH/Quality</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">To</label>
                  <select 
                    value={newTo}
                    onChange={(e) => setNewTo(e.target.value)}
                    className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Customer">Customer</option>
                    <option value="ScrapLocation">Scrap Location</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Contact</label>
                <input 
                  type="text" 
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  placeholder="Customer name or ID"
                  className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Schedule Date</label>
                <input 
                  type="datetime-local" 
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-borders flex justify-end gap-3 bg-background/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-borders bg-white rounded-lg text-sm font-medium text-text-primary hover:bg-background transition-colors shadow-sm"
               >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
               >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
