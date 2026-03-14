const db = require('../utils/db');

module.exports = {
  async findAll({ product_id, operation_type, limit = 100 }) {
    let sql = `
      SELECT sl.*, p.name as product_name, p.sku, w.name as warehouse_name, u.full_name as user_name
      FROM stock_ledger sl
      LEFT JOIN products p ON sl.product_id = p.id
      LEFT JOIN warehouses w ON sl.warehouse_id = w.id
      LEFT JOIN users u ON sl.user_id = u.id
      WHERE 1=1`;
    const params = [];
    let idx = 1;
    if (product_id) { sql += ` AND sl.product_id = $${idx}`; params.push(product_id); idx++; }
    if (operation_type) { sql += ` AND sl.operation_type = $${idx}`; params.push(operation_type); idx++; }
    sql += ` ORDER BY sl.created_at DESC LIMIT $${idx}`;
    params.push(limit);
    const r = await db.query(sql, params);
    return r.rows;
  },

  async create({ product_id, operation_type, quantity, reference, warehouse_id, user_id }) {
    const r = await db.query(
      `INSERT INTO stock_ledger (product_id, operation_type, quantity, reference, warehouse_id, user_id)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [product_id, operation_type, quantity, reference, warehouse_id, user_id]
    );
    return r.rows[0];
  },

  async getRecentActivity(limit = 10) {
    const r = await db.query(`
      SELECT sl.*, p.name as product_name, w.name as warehouse_name
      FROM stock_ledger sl
      LEFT JOIN products p ON sl.product_id = p.id
      LEFT JOIN warehouses w ON sl.warehouse_id = w.id
      ORDER BY sl.created_at DESC LIMIT $1
    `, [limit]);
    return r.rows;
  },
};
