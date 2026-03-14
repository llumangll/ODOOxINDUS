const db = require('../utils/db');

module.exports = {
  async findAll({ search, category, warehouse_id }) {
    let sql = `SELECT p.*, w.name as warehouse_name FROM products p
               LEFT JOIN warehouses w ON p.warehouse_id = w.id WHERE 1=1`;
    const params = [];
    let idx = 1;

    if (search) {
      sql += ` AND (p.name ILIKE $${idx} OR p.sku ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }
    if (category) {
      sql += ` AND p.category = $${idx}`;
      params.push(category);
      idx++;
    }
    if (warehouse_id) {
      sql += ` AND p.warehouse_id = $${idx}`;
      params.push(warehouse_id);
      idx++;
    }
    sql += ' ORDER BY p.created_at DESC';
    const r = await db.query(sql, params);
    return r.rows;
  },

  async findById(id) {
    const r = await db.query(
      `SELECT p.*, w.name as warehouse_name FROM products p
       LEFT JOIN warehouses w ON p.warehouse_id = w.id WHERE p.id = $1`, [id]
    );
    return r.rows[0] || null;
  },

  async create({ name, sku, category, unit, stock, reorder_level, warehouse_id }) {
    const r = await db.query(
      `INSERT INTO products (name, sku, category, unit, stock, reorder_level, warehouse_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [name, sku, category || 'General', unit || 'Pcs', stock || 0, reorder_level || 10, warehouse_id || null]
    );
    return r.rows[0];
  },

  async update(id, fields) {
    const { name, sku, category, unit, stock, reorder_level, warehouse_id } = fields;
    const r = await db.query(
      `UPDATE products SET name=$1, sku=$2, category=$3, unit=$4, stock=$5, reorder_level=$6, warehouse_id=$7
       WHERE id=$8 RETURNING *`,
      [name, sku, category, unit, stock, reorder_level, warehouse_id, id]
    );
    return r.rows[0];
  },

  async updateStock(id, quantityChange) {
    const r = await db.query(
      'UPDATE products SET stock = stock + $1 WHERE id = $2 RETURNING *',
      [quantityChange, id]
    );
    return r.rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
  },

  async getStats() {
    const r = await db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE stock > 0 AND stock <= reorder_level)::int AS low_stock,
        COUNT(*) FILTER (WHERE stock = 0)::int AS out_of_stock
      FROM products
    `);
    return r.rows[0];
  },

  async getCategories() {
    const r = await db.query('SELECT DISTINCT category FROM products ORDER BY category');
    return r.rows.map(row => row.category);
  },
};
