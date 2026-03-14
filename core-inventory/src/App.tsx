import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Receipts } from "./pages/Receipts";
import { DeliveryOrders } from "./pages/DeliveryOrders";
import { InternalTransfers } from "./pages/InternalTransfers";
import { InventoryAdjustment } from "./pages/InventoryAdjustment";
import { MoveHistory } from "./pages/MoveHistory";
import { WarehouseSettings } from "./pages/WarehouseSettings";
import { UserProfile } from "./pages/UserProfile";
import { ReceiptDetail } from "./pages/ReceiptDetail";
import { DeliveryOrderDetail } from "./pages/DeliveryOrderDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="receipts" element={<Receipts />} />
          <Route path="receipt/:id" element={<ReceiptDetail />} />
          <Route path="deliveries" element={<DeliveryOrders />} />
          <Route path="delivery/:id" element={<DeliveryOrderDetail />} />
          <Route path="transfers" element={<InternalTransfers />} />
          <Route path="adjustments" element={<InventoryAdjustment />} />
          <Route path="move-history" element={<MoveHistory />} />
          <Route path="warehouses" element={<WarehouseSettings />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
