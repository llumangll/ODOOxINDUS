import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Receipts } from "./pages/Receipts";
import { DeliveryOrders } from "./pages/DeliveryOrders";
import { InternalTransfers } from "./pages/InternalTransfers";
import { InventoryAdjustment } from "./pages/InventoryAdjustment";
import { MoveHistory } from "./pages/MoveHistory";
import { WarehouseSettings } from "./pages/WarehouseSettings";
import { UserProfile } from "./pages/UserProfile";
import { SettingsPage } from "./pages/SettingsPage";

import { AuthLayout } from "./components/AuthLayout";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";

// A helper wrapper for page transitions
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full flex-1 flex flex-col items-center justify-center p-4 lg:p-12 h-auto text-center"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes wrapped in AuthLayout */}
        <Route path="/login" element={
          <AuthLayout>
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          </AuthLayout>
        } />
        
        <Route path="/signup" element={
          <AuthLayout>
            <PageWrapper>
              <SignUpPage />
            </PageWrapper>
          </AuthLayout>
        } />
        
        <Route path="/forgot-password" element={
          <AuthLayout>
            <PageWrapper>
              <ForgotPasswordPage />
            </PageWrapper>
          </AuthLayout>
        } />

        {/* Protected Dashboard/App Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="receipts" element={<Receipts />} />
          <Route path="deliveries" element={<DeliveryOrders />} />
          <Route path="transfers" element={<InternalTransfers />} />
          <Route path="adjustments" element={<InventoryAdjustment />} />
          <Route path="move-history" element={<MoveHistory />} />
          <Route path="warehouses" element={<WarehouseSettings />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
