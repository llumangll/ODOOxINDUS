const db = require('../utils/db');

// Helper: get first row or create default
async function getOrCreate(table, defaults) {
  let r = await db.query(`SELECT * FROM ${table} LIMIT 1`);
  if (r.rows.length === 0) {
    const keys = Object.keys(defaults);
    const vals = Object.values(defaults);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(',');
    r = await db.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders}) RETURNING *`, vals);
  }
  return r.rows[0];
}

module.exports = {
  // ─── PRODUCT SETTINGS ─────────────────────────────────────────
  async getProductSettings() {
    return getOrCreate('product_settings', { default_unit: 'Pcs' });
  },
  async updateProductSettings(data) {
    const r = await db.query(
      `UPDATE product_settings SET default_unit=$1, sku_auto_generation=$2, reorder_rule=$3, low_stock_threshold=$4, updated_at=NOW()
       WHERE id = (SELECT id FROM product_settings LIMIT 1) RETURNING *`,
      [data.default_unit, data.sku_auto_generation, data.reorder_rule, data.low_stock_threshold]
    );
    return r.rows[0];
  },

  // ─── PRODUCT CATEGORIES ───────────────────────────────────────
  async getCategories() {
    const r = await db.query('SELECT * FROM product_categories ORDER BY name');
    return r.rows;
  },
  async createCategory(name, description) {
    const r = await db.query('INSERT INTO product_categories (name, description) VALUES ($1,$2) RETURNING *', [name, description]);
    return r.rows[0];
  },
  async deleteCategory(id) {
    await db.query('DELETE FROM product_categories WHERE id = $1', [id]);
  },

  // ─── NOTIFICATION SETTINGS ────────────────────────────────────
  async getNotificationSettings() {
    return getOrCreate('notification_settings', { low_stock_alert: true });
  },
  async updateNotificationSettings(data) {
    const r = await db.query(
      `UPDATE notification_settings SET low_stock_alert=$1, delivery_alert=$2, receipt_alert=$3,
       email_notifications=$4, inapp_notifications=$5, updated_at=NOW()
       WHERE id = (SELECT id FROM notification_settings LIMIT 1) RETURNING *`,
      [data.low_stock_alert, data.delivery_alert, data.receipt_alert, data.email_notifications, data.inapp_notifications]
    );
    return r.rows[0];
  },

  // ─── ROLES & PERMISSIONS ──────────────────────────────────────
  async getRoles() {
    const r = await db.query(`
      SELECT r.*, p.product_management, p.receipts, p.delivery_orders, p.inventory_adjustment, p.internal_transfers
      FROM roles r LEFT JOIN permissions p ON r.id = p.role_id ORDER BY r.created_at
    `);
    return r.rows;
  },
  async createRole(role_name) {
    const r = await db.query('INSERT INTO roles (role_name) VALUES ($1) RETURNING *', [role_name]);
    // Create default permissions
    await db.query('INSERT INTO permissions (role_id) VALUES ($1)', [r.rows[0].id]);
    return r.rows[0];
  },
  async updatePermissions(role_id, perms) {
    const exists = await db.query('SELECT id FROM permissions WHERE role_id = $1', [role_id]);
    if (exists.rows.length === 0) {
      await db.query(
        `INSERT INTO permissions (role_id, product_management, receipts, delivery_orders, inventory_adjustment, internal_transfers)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [role_id, perms.product_management, perms.receipts, perms.delivery_orders, perms.inventory_adjustment, perms.internal_transfers]
      );
    } else {
      await db.query(
        `UPDATE permissions SET product_management=$1, receipts=$2, delivery_orders=$3, inventory_adjustment=$4, internal_transfers=$5
         WHERE role_id=$6`,
        [perms.product_management, perms.receipts, perms.delivery_orders, perms.inventory_adjustment, perms.internal_transfers, role_id]
      );
    }
    return { success: true };
  },

  // ─── DASHBOARD SETTINGS ───────────────────────────────────────
  async getDashboardSettings() {
    return getOrCreate('dashboard_settings', { show_total_products: true });
  },
  async updateDashboardSettings(data) {
    const r = await db.query(
      `UPDATE dashboard_settings SET default_warehouse=$1, show_total_products=$2, show_low_stock=$3,
       show_pending_receipts=$4, show_pending_deliveries=$5, show_transfers=$6, status_filters=$7, updated_at=NOW()
       WHERE id = (SELECT id FROM dashboard_settings LIMIT 1) RETURNING *`,
      [data.default_warehouse || null, data.show_total_products, data.show_low_stock, data.show_pending_receipts,
       data.show_pending_deliveries, data.show_transfers, data.status_filters]
    );
    return r.rows[0];
  },

  // ─── INVENTORY CONTROL ────────────────────────────────────────
  async getInventoryControl() {
    return getOrCreate('inventory_control', { allow_negative_stock: false });
  },
  async updateInventoryControl(data) {
    const r = await db.query(
      `UPDATE inventory_control SET allow_negative_stock=$1, auto_adjustment_logs=$2,
       transfer_approval_required=$3, auto_stock_update=$4, updated_at=NOW()
       WHERE id = (SELECT id FROM inventory_control LIMIT 1) RETURNING *`,
      [data.allow_negative_stock, data.auto_adjustment_logs, data.transfer_approval_required, data.auto_stock_update]
    );
    return r.rows[0];
  },

  // ─── SYSTEM PREFERENCES ──────────────────────────────────────
  async getSystemPreferences() {
    return getOrCreate('system_preferences', { currency: 'INR' });
  },
  async updateSystemPreferences(data) {
    const r = await db.query(
      `UPDATE system_preferences SET currency=$1, timezone=$2, date_format=$3, language=$4, updated_at=NOW()
       WHERE id = (SELECT id FROM system_preferences LIMIT 1) RETURNING *`,
      [data.currency, data.timezone, data.date_format, data.language]
    );
    return r.rows[0];
  },
};
