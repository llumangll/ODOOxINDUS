const db = require('../utils/db');

module.exports = {
  async findAll() {
    const r = await db.query(`
      SELECT r.*, u.full_name as created_by_name, w.name as warehouse_name,
        (SELECT json_agg(json_build_object('id', ri.id, 'product_id', ri.product_id, 'quantity', ri.quantity, 'product_name', p.name, 'sku', p.sku))
         FROM receipt_items ri JOIN products p ON ri.product_id = p.id WHERE ri.receipt_id = r.id) as items
      FROM receipts r
      LEFT JOIN users u ON r.created_by = u.id
      LEFT JOIN warehouses w ON r.warehouse_id = w.id
      ORDER BY r.created_at DESC
    `);
    return r.rows;
  },

  async findById(id) {
    const r = await db.query(`
      SELECT r.*, u.full_name as created_by_name, w.name as warehouse_name
      FROM receipts r
      LEFT JOIN users u ON r.created_by = u.id
      LEFT JOIN warehouses w ON r.warehouse_id = w.id
      WHERE r.id = $1
    `, [id]);
    return r.rows[0] || null;
  },

  async create({ reference, supplier, warehouse_id, notes, created_by, items }) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      const ref = reference || `RCP-${Date.now().toString(36).toUpperCase()}`;
      const receipt = await client.query(
        `INSERT INTO receipts (reference, supplier, warehouse_id, notes, created_by)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [ref, supplier, warehouse_id, notes, created_by]
      );

      if (items && items.length > 0) {
        for (const item of items) {
          await client.query(
            'INSERT INTO receipt_items (receipt_id, product_id, quantity) VALUES ($1,$2,$3)',
            [receipt.rows[0].id, item.product_id, item.quantity]
          );
        }
      }

      await client.query('COMMIT');
      return receipt.rows[0];
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

      // Update receipt status
      await client.query(
        "UPDATE receipts SET status = 'validated', validated_at = NOW() WHERE id = $1",
        [id]
      );

      // Get items
      const items = await client.query(
        'SELECT * FROM receipt_items WHERE receipt_id = $1', [id]
      );

      // Increase stock and log to ledger for each item
      for (const item of items.rows) {
        await client.query(
          'UPDATE products SET stock = stock + $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );

        const receipt = await client.query('SELECT * FROM receipts WHERE id = $1', [id]);
        await client.query(
          `INSERT INTO stock_ledger (product_id, operation_type, quantity, reference, warehouse_id, user_id)
           VALUES ($1, 'receipt', $2, $3, $4, $5)`,
          [item.product_id, item.quantity, receipt.rows[0].reference, receipt.rows[0].warehouse_id, userId]
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
    const r = await db.query("SELECT COUNT(*)::int as count FROM receipts WHERE status = 'draft'");
    return r.rows[0].count;
  },
};
