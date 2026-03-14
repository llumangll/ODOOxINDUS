const db = require('../utils/db');

module.exports = {
  async findAll() {
    const r = await db.query(`
      SELECT d.*, u.full_name as created_by_name, w.name as warehouse_name,
        (SELECT json_agg(json_build_object('id', di.id, 'product_id', di.product_id, 'quantity', di.quantity, 'product_name', p.name, 'sku', p.sku))
         FROM delivery_items di JOIN products p ON di.product_id = p.id WHERE di.delivery_id = d.id) as items
      FROM deliveries d
      LEFT JOIN users u ON d.created_by = u.id
      LEFT JOIN warehouses w ON d.warehouse_id = w.id
      ORDER BY d.created_at DESC
    `);
    return r.rows;
  },

  async findById(id) {
    const r = await db.query(`
      SELECT d.*, u.full_name as created_by_name, w.name as warehouse_name
      FROM deliveries d LEFT JOIN users u ON d.created_by = u.id
      LEFT JOIN warehouses w ON d.warehouse_id = w.id WHERE d.id = $1
    `, [id]);
    return r.rows[0] || null;
  },

  async create({ reference, customer, warehouse_id, notes, created_by, items }) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const ref = reference || `DEL-${Date.now().toString(36).toUpperCase()}`;
      const delivery = await client.query(
        `INSERT INTO deliveries (reference, customer, warehouse_id, notes, created_by)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [ref, customer, warehouse_id, notes, created_by]
      );
      if (items && items.length > 0) {
        for (const item of items) {
          await client.query(
            'INSERT INTO delivery_items (delivery_id, product_id, quantity) VALUES ($1,$2,$3)',
            [delivery.rows[0].id, item.product_id, item.quantity]
          );
        }
      }
      await client.query('COMMIT');
      return delivery.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async validate(id, userId) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query("UPDATE deliveries SET status = 'validated', validated_at = NOW() WHERE id = $1", [id]);
      const items = await client.query('SELECT * FROM delivery_items WHERE delivery_id = $1', [id]);
      for (const item of items.rows) {
        // Check sufficient stock
        const product = await client.query('SELECT stock FROM products WHERE id = $1', [item.product_id]);
        if (product.rows[0].stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.product_id}`);
        }
        await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
        const delivery = await client.query('SELECT * FROM deliveries WHERE id = $1', [id]);
        await client.query(
          `INSERT INTO stock_ledger (product_id, operation_type, quantity, reference, warehouse_id, user_id)
           VALUES ($1, 'delivery', $2, $3, $4, $5)`,
          [item.product_id, -item.quantity, delivery.rows[0].reference, delivery.rows[0].warehouse_id, userId]
        );
      }
      await client.query('COMMIT');
      return { success: true };
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async getPendingCount() {
    const r = await db.query("SELECT COUNT(*)::int as count FROM deliveries WHERE status = 'draft'");
    return r.rows[0].count;
  },
};
