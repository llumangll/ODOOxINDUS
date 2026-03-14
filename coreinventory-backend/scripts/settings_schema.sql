-- CoreInventory — Settings Module Schema
-- Run: psql -U patelpriyansh -d coreinventory -f scripts/settings_schema.sql

-- ═══════════════════════════════════════════════════════════════
-- 1. WAREHOUSE LOCATIONS / RACKS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS warehouse_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
  location_name VARCHAR(100) NOT NULL,
  rack_code VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- 2. PRODUCT SETTINGS (singleton row)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS product_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  default_unit VARCHAR(30) DEFAULT 'Pcs',
  sku_auto_generation BOOLEAN DEFAULT false,
  reorder_rule VARCHAR(50) DEFAULT 'manual',
  low_stock_threshold INTEGER DEFAULT 10,
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO product_settings (default_unit) VALUES ('Pcs') ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. PRODUCT CATEGORIES (already referenced, now explicit)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO product_categories (name, description) VALUES
  ('Equipment', 'Industrial equipment and machinery'),
  ('Parts', 'Machine parts and components'),
  ('Raw Material', 'Raw materials for production'),
  ('General', 'General inventory items')
ON CONFLICT (name) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. NOTIFICATION SETTINGS (singleton row)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  low_stock_alert BOOLEAN DEFAULT true,
  delivery_alert BOOLEAN DEFAULT true,
  receipt_alert BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT false,
  inapp_notifications BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO notification_settings (low_stock_alert) VALUES (true) ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. ROLES & PERMISSIONS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO roles (role_name) VALUES ('Admin'), ('Inventory Manager'), ('Warehouse Staff') ON CONFLICT (role_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  product_management BOOLEAN DEFAULT false,
  receipts BOOLEAN DEFAULT false,
  delivery_orders BOOLEAN DEFAULT false,
  inventory_adjustment BOOLEAN DEFAULT false,
  internal_transfers BOOLEAN DEFAULT false
);

-- ═══════════════════════════════════════════════════════════════
-- 6. DASHBOARD SETTINGS (singleton row)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS dashboard_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  default_warehouse UUID REFERENCES warehouses(id) ON DELETE SET NULL,
  show_total_products BOOLEAN DEFAULT true,
  show_low_stock BOOLEAN DEFAULT true,
  show_pending_receipts BOOLEAN DEFAULT true,
  show_pending_deliveries BOOLEAN DEFAULT true,
  show_transfers BOOLEAN DEFAULT true,
  status_filters TEXT DEFAULT 'all',
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO dashboard_settings (show_total_products) VALUES (true) ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 7. INVENTORY CONTROL (singleton row)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS inventory_control (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  allow_negative_stock BOOLEAN DEFAULT false,
  auto_adjustment_logs BOOLEAN DEFAULT true,
  transfer_approval_required BOOLEAN DEFAULT false,
  auto_stock_update BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO inventory_control (allow_negative_stock) VALUES (false) ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 8. SYSTEM PREFERENCES (singleton row)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS system_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  currency VARCHAR(10) DEFAULT 'INR',
  timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
  date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY',
  language VARCHAR(20) DEFAULT 'English',
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO system_preferences (currency) VALUES ('INR') ON CONFLICT DO NOTHING;
