import { useState } from "react";
import { Building2, Package, Bell, Shield, LayoutDashboard, Settings2, Globe, ChevronRight, Save, CheckCircle, Plus, X, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";

const tabs = [
  { id: "product", label: "Product", icon: Package },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "roles", label: "Users & Roles", icon: Shield },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inventory", label: "Inventory Control", icon: Settings2 },
  { id: "system", label: "System Preferences", icon: Globe },
];

// ─── Toggle Switch ────────────────────────────────────────────
function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn("relative w-11 h-6 rounded-full transition-colors", checked ? "bg-primary" : "bg-gray-300")}
      >
        <div className={cn("absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", checked && "translate-x-5")} />
      </button>
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────
function SettingsCard({ title, description, children, onSave, saving }: { title: string; description?: string; children: React.ReactNode; onSave?: () => void; saving?: boolean }) {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="bg-card-background rounded-xl border border-borders shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-borders">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        {description && <p className="text-sm text-text-secondary mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5 space-y-1">{children}</div>
      {onSave && (
        <div className="px-6 py-3 border-t border-borders bg-background/30 flex justify-end">
          {saved ? (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle size={16} /> Saved successfully
            </span>
          ) : (
            <button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
              <Save size={16} /> Save Changes
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Input field ──────────────────────────────────────────────
function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
    </div>
  );
}

// ─── Select field ─────────────────────────────────────────────
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-10 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// WAREHOUSE SETTINGS TAB
// ═════════════════════════════════════════════════════════════
function WarehouseTab() {
  const [warehouses] = useState([
    { id: 1, name: "Main Warehouse", code: "MAIN-WH", location: "Block A, Industrial Area", manager: "Admin", is_default: true },
    { id: 2, name: "East Warehouse", code: "EAST-WH", location: "Block C, East Zone", manager: "Admin", is_default: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", location: "", manager: "" });

  return (
    <div className="space-y-4">
      <SettingsCard title="Warehouse Locations" description="Manage warehouse locations and storage sites">
        <div className="space-y-3">
          {warehouses.map(wh => (
            <div key={wh.id} className="flex items-center justify-between p-3 rounded-lg border border-borders bg-background/30 hover:bg-background/60 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-text-primary">{wh.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{wh.code}</span>
                  {wh.is_default && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Default</span>}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{wh.location} · Manager: {wh.manager}</p>
              </div>
              <button className="p-1.5 text-text-secondary hover:text-critical hover:bg-critical/10 rounded-md transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} className="mt-3 flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          <Plus size={16} /> Add Warehouse
        </button>
        {showForm && (
          <div className="mt-3 p-4 rounded-lg border border-borders bg-background/30 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Warehouse Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="e.g. West Warehouse" />
              <Field label="Code" value={form.code} onChange={v => setForm({ ...form, code: v })} placeholder="e.g. WEST-WH" />
              <Field label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="Block D, West Zone" />
              <Field label="Manager" value={form.manager} onChange={v => setForm({ ...form, manager: v })} placeholder="Manager Name" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm border border-borders rounded-lg hover:bg-background transition-colors">Cancel</button>
              <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </div>
        )}
      </SettingsCard>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// PRODUCT SETTINGS TAB
// ═════════════════════════════════════════════════════════════
function ProductTab() {
  const [unit, setUnit] = useState("Pcs");
  const [skuAuto, setSkuAuto] = useState(false);
  const [reorderRule, setReorderRule] = useState("manual");
  const [threshold, setThreshold] = useState("10");
  const [categories] = useState(["Equipment", "Parts", "Raw Material", "General"]);
  const [newCat, setNewCat] = useState("");

  return (
    <div className="space-y-4">
      <SettingsCard title="Product Configuration" description="Default values for product management" onSave={() => {}}>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Default Unit of Measure" value={unit} onChange={setUnit} options={[
            { value: "Pcs", label: "Pieces" }, { value: "Kg", label: "Kilograms" }, { value: "Liters", label: "Liters" },
            { value: "Meters", label: "Meters" }, { value: "Box", label: "Box" },
          ]} />
          <SelectField label="Reorder Rule" value={reorderRule} onChange={setReorderRule} options={[
            { value: "manual", label: "Manual" }, { value: "automatic", label: "Automatic" },
          ]} />
          <Field label="Low Stock Threshold" value={threshold} onChange={setThreshold} type="number" />
        </div>
        <div className="pt-2">
          <Toggle checked={skuAuto} onChange={setSkuAuto} label="Auto-generate SKU" description="Automatically generate SKU codes for new products" />
        </div>
      </SettingsCard>

      <SettingsCard title="Product Categories" description="Manage product classification categories">
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <span key={c} className="inline-flex items-center gap-1 px-3 py-1.5 bg-background border border-borders rounded-lg text-sm font-medium text-text-primary">
              {c}
              <button className="text-text-secondary hover:text-critical transition-colors"><X size={14} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New category name" className="flex-1 h-9 px-3 bg-background border border-borders rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-1.5"><Plus size={14} /> Add</button>
        </div>
      </SettingsCard>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// NOTIFICATION SETTINGS TAB
// ═════════════════════════════════════════════════════════════
function NotificationTab() {
  const [settings, setSettings] = useState({
    low_stock_alert: true, delivery_alert: true, receipt_alert: true,
    email_notifications: false, inapp_notifications: true,
  });
  const update = (key: string, val: boolean) => setSettings({ ...settings, [key]: val });

  return (
    <SettingsCard title="Notification Preferences" description="Configure when and how you receive alerts" onSave={() => {}}>
      <div className="divide-y divide-borders">
        <Toggle checked={settings.low_stock_alert} onChange={v => update('low_stock_alert', v)} label="Low Stock Alerts" description="Notify when product stock falls below reorder level" />
        <Toggle checked={settings.delivery_alert} onChange={v => update('delivery_alert', v)} label="Pending Delivery Alerts" description="Notify about pending outbound delivery orders" />
        <Toggle checked={settings.receipt_alert} onChange={v => update('receipt_alert', v)} label="Pending Receipt Alerts" description="Notify about pending incoming receipts" />
        <div className="h-px bg-borders my-2" />
        <Toggle checked={settings.email_notifications} onChange={v => update('email_notifications', v)} label="Email Notifications" description="Send notifications via email" />
        <Toggle checked={settings.inapp_notifications} onChange={v => update('inapp_notifications', v)} label="In-App Notifications" description="Show notifications within the application" />
      </div>
    </SettingsCard>
  );
}

// ═════════════════════════════════════════════════════════════
// ROLES & PERMISSIONS TAB
// ═════════════════════════════════════════════════════════════
function RolesTab() {
  const [roles] = useState([
    { id: 1, role_name: "Admin", product_management: true, receipts: true, delivery_orders: true, inventory_adjustment: true, internal_transfers: true },
    { id: 2, role_name: "Inventory Manager", product_management: true, receipts: true, delivery_orders: true, inventory_adjustment: true, internal_transfers: false },
    { id: 3, role_name: "Warehouse Staff", product_management: false, receipts: true, delivery_orders: false, inventory_adjustment: false, internal_transfers: true },
  ]);
  const perms = ["product_management", "receipts", "delivery_orders", "inventory_adjustment", "internal_transfers"];
  const permLabels: Record<string, string> = {
    product_management: "Product Mgmt", receipts: "Receipts", delivery_orders: "Delivery Orders",
    inventory_adjustment: "Adjustment", internal_transfers: "Transfers",
  };

  return (
    <SettingsCard title="Roles & Permissions" description="Configure role-based access control" onSave={() => {}}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-borders">
              <th className="text-left py-3 pr-4 font-semibold text-text-secondary text-xs uppercase tracking-wider">Role</th>
              {perms.map(p => (
                <th key={p} className="text-center py-3 px-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">{permLabels[p]}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-borders">
            {roles.map(role => (
              <tr key={role.id} className="hover:bg-background/30 transition-colors">
                <td className="py-3 pr-4 font-medium text-text-primary">
                  <span className="inline-flex items-center gap-2">
                    <Shield size={14} className="text-primary" />
                    {role.role_name}
                  </span>
                </td>
                {perms.map(p => (
                  <td key={p} className="text-center py-3 px-3">
                    <input type="checkbox" defaultChecked={(role as any)[p]}
                      className="h-4 w-4 rounded border-borders text-primary focus:ring-primary/20 cursor-pointer" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsCard>
  );
}

// ═════════════════════════════════════════════════════════════
// DASHBOARD SETTINGS TAB
// ═════════════════════════════════════════════════════════════
function DashboardTab() {
  const [settings, setSettings] = useState({
    show_total_products: true, show_low_stock: true, show_pending_receipts: true,
    show_pending_deliveries: true, show_transfers: true, status_filters: "all",
  });
  const update = (key: string, val: boolean) => setSettings({ ...settings, [key]: val });

  return (
    <SettingsCard title="Dashboard Configuration" description="Customize which KPIs and filters appear on your dashboard" onSave={() => {}}>
      <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">KPI Display Options</h4>
      <div className="divide-y divide-borders">
        <Toggle checked={settings.show_total_products} onChange={v => update('show_total_products', v)} label="Total Products" description="Show total product count card" />
        <Toggle checked={settings.show_low_stock} onChange={v => update('show_low_stock', v)} label="Low Stock / Out of Stock" description="Show low stock warning card" />
        <Toggle checked={settings.show_pending_receipts} onChange={v => update('show_pending_receipts', v)} label="Pending Receipts" description="Show pending receipts count" />
        <Toggle checked={settings.show_pending_deliveries} onChange={v => update('show_pending_deliveries', v)} label="Pending Deliveries" description="Show pending delivery count" />
        <Toggle checked={settings.show_transfers} onChange={v => update('show_transfers', v)} label="Internal Transfers" description="Show scheduled transfers" />
      </div>
      <div className="pt-4">
        <SelectField label="Default Status Filter" value={settings.status_filters} onChange={v => setSettings({ ...settings, status_filters: v })} options={[
          { value: "all", label: "All Statuses" }, { value: "pending", label: "Pending Only" }, { value: "done", label: "Completed Only" },
        ]} />
      </div>
    </SettingsCard>
  );
}

// ═════════════════════════════════════════════════════════════
// INVENTORY CONTROL TAB
// ═════════════════════════════════════════════════════════════
function InventoryControlTab() {
  const [settings, setSettings] = useState({
    allow_negative_stock: false, auto_adjustment_logs: true,
    transfer_approval_required: false, auto_stock_update: true,
  });
  const update = (key: string, val: boolean) => setSettings({ ...settings, [key]: val });

  return (
    <SettingsCard title="Inventory Control" description="Control stock behavior and validation rules" onSave={() => {}}>
      <div className="divide-y divide-borders">
        <Toggle checked={settings.allow_negative_stock} onChange={v => update('allow_negative_stock', v)} label="Allow Negative Stock" description="Allow stock quantities to go below zero" />
        <Toggle checked={settings.auto_adjustment_logs} onChange={v => update('auto_adjustment_logs', v)} label="Automatic Adjustment Logs" description="Automatically log stock adjustment history" />
        <Toggle checked={settings.transfer_approval_required} onChange={v => update('transfer_approval_required', v)} label="Transfer Approval Required" description="Require manager approval for internal transfers" />
        <Toggle checked={settings.auto_stock_update} onChange={v => update('auto_stock_update', v)} label="Auto Stock Update on Validation" description="Automatically update stock when receipts/deliveries are validated" />
      </div>
    </SettingsCard>
  );
}

// ═════════════════════════════════════════════════════════════
// SYSTEM PREFERENCES TAB
// ═════════════════════════════════════════════════════════════
function SystemTab() {
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [language, setLanguage] = useState("English");

  return (
    <SettingsCard title="System Preferences" description="Configure system-wide defaults" onSave={() => {}}>
      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Currency" value={currency} onChange={setCurrency} options={[
          { value: "INR", label: "₹ INR – Indian Rupee" }, { value: "USD", label: "$ USD – US Dollar" },
          { value: "EUR", label: "€ EUR – Euro" }, { value: "GBP", label: "£ GBP – British Pound" },
        ]} />
        <SelectField label="Timezone" value={timezone} onChange={setTimezone} options={[
          { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" }, { value: "America/New_York", label: "America/New York (EST)" },
          { value: "Europe/London", label: "Europe/London (GMT)" }, { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
        ]} />
        <SelectField label="Date Format" value={dateFormat} onChange={setDateFormat} options={[
          { value: "DD/MM/YYYY", label: "DD/MM/YYYY" }, { value: "MM/DD/YYYY", label: "MM/DD/YYYY" }, { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
        ]} />
        <SelectField label="Language" value={language} onChange={setLanguage} options={[
          { value: "English", label: "English" }, { value: "Hindi", label: "Hindi" },
          { value: "Spanish", label: "Spanish" }, { value: "French", label: "French" },
        ]} />
      </div>
    </SettingsCard>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN SETTINGS PAGE
// ═════════════════════════════════════════════════════════════
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("product");

  const renderTab = () => {
    switch (activeTab) {
      case "product": return <ProductTab />;
      case "notifications": return <NotificationTab />;
      case "roles": return <RolesTab />;
      case "dashboard": return <DashboardTab />;
      case "inventory": return <InventoryControlTab />;
      case "system": return <SystemTab />;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-1">Manage system configuration and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0">
          <nav className="bg-card-background rounded-xl border border-borders shadow-sm overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-primary/5 text-primary border-l-2 border-primary"
                    : "text-text-secondary hover:bg-background hover:text-text-primary border-l-2 border-transparent"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
