import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Printer, Check, X, ArrowLeft } from "lucide-react";

export function DeliveryOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Decoding the path parameter, e.g. WH/OUT/00001
  const decodedId = decodeURIComponent(id || "NEW");

  return (
    <div className="flex flex-col h-full bg-white text-[13px] animate-in fade-in duration-300 rounded-lg shadow-sm border border-borders overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-borders bg-white">
        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => navigate('/deliveries')} 
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-xl font-semibold text-text-primary">Delivery Orders</h1>
          <button className="px-3 py-1.5 border border-borders rounded-[4px] text-sm font-medium hover:bg-background transition-colors text-text-primary shadow-sm bg-white">
            NEW
          </button>
        </div>

        {/* Status Progress Bar */}
        <div className="flex items-center text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          <span className="text-primary bg-primary/10 px-2 py-1 rounded-sm">Draft</span>
          <ChevronRight size={14} className="mx-1 text-borders" />
          <span className="px-2 py-1">Ready</span>
          <ChevronRight size={14} className="mx-1 text-borders" />
          <span className="px-2 py-1">Done</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-2 border-b border-borders bg-background/50 flex gap-2">
        <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-[4px] font-medium transition-colors shadow-sm flex items-center gap-1.5">
          <Check size={14} /> Validate
        </button>
        <button className="px-3 py-1.5 border border-borders bg-white rounded-[4px] font-medium hover:bg-background transition-colors text-text-primary shadow-sm flex items-center gap-1.5">
          <Printer size={14} /> Print
        </button>
        <button className="px-3 py-1.5 border border-borders bg-white rounded-[4px] font-medium hover:bg-background transition-colors text-text-primary shadow-sm flex items-center gap-1.5">
          <X size={14} /> Cancel
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-white">
        {/* Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">{decodedId}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
            <div className="flex items-center justify-between border-b border-borders/60 pb-1">
              <span className="text-text-secondary font-medium mr-4">Delivery Address</span>
              <span className="text-text-primary font-semibold text-sm">Customer / Tech Solutions Corp</span>
            </div>
            <div className="flex items-center justify-between border-b border-borders/60 pb-1">
              <span className="text-text-secondary font-medium mr-4">Schedule Date</span>
              <span className="text-text-primary font-semibold text-sm">10/24/2023 10:00:00</span>
            </div>
            <div className="flex items-center justify-between border-b border-borders/60 pb-1 md:col-start-1">
              <span className="text-text-secondary font-medium mr-4">Responsible</span>
              <span className="text-text-primary font-semibold text-sm">Mitchell Admin</span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="max-w-4xl">
          <div className="flex gap-4 border-b border-borders mb-4">
            <button className="text-primary font-semibold border-b-2 border-primary pb-2 px-1">Products</button>
            <button className="text-text-secondary hover:text-text-primary font-medium pb-2 px-1 transition-colors">Additional Info</button>
            <button className="text-text-secondary hover:text-text-primary font-medium pb-2 px-1 transition-colors">Note</button>
          </div>
          
          <div className="border border-borders rounded-md overflow-hidden bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-background/50 border-b border-borders">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-2 font-semibold border-r border-borders/30">Product</th>
                  <th className="px-4 py-2 font-semibold text-right">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders/50">
                <tr className="hover:bg-background/50 transition-colors group">
                  <td className="px-4 py-2.5 text-text-primary font-medium border-r border-borders/30">[DESK001] Desk</td>
                  <td className="px-4 py-2.5 text-text-primary text-right font-semibold relative">
                    6.00
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-4 py-2.5">
                    <button className="text-text-secondary hover:text-text-primary font-medium transition-colors cursor-pointer text-[13px]">
                      Add a line
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
