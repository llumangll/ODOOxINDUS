const db = require('../utils/db');

module.exports = {
  async findAll() {
    const r = await db.query(`
      SELECT t.*, u.full_name as created_by_name, p.name as product_name, p.sku,
        fw.name as from_warehouse_name, tw.name as to_warehouse_name
      FROM transfers t
      LEFT JOIN users u ON t.created_by = u.id
      LEFT JOIN products p ON t.product_id = p.id
      LEFT JOIN warehouses fw ON t.from_warehouse_id = fw.id
      LEFT JOIN warehouses tw ON t.to_warehouse_id = tw.id
      ORDER BY t.created_at DESC
    `);
    return r.rows;
  },

  async create({ reference, from_warehouse_id, to_warehouse_id, product_id, quantity, notes, created_by }) {
    const ref = reference || `TRF-${Date.now().toString(36).toUpperCase()}`;
    const r = await db.query(
      `INSERT INTO transfers (reference, from_warehouse_id, to_warehouse_id, product_id, quantity, notes, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [ref, from_warehouse_id, to_warehouse_id, product_id, quantity, notes, created_by]
    );
    return r.rows[0];
  },

  async validate(id, userId) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const transfer = await client.query('SELECT * FROM transfers WHERE id = $1', [id]);
      const t = transfer.rows[0];

      // Check stock at source
      const product = await client.query('SELECT stock FROM products WHERE id = $1', [t.product_id]);
      if (product.rows[0].stock < t.quantity) {
        throw new Error('Insufficient stock at source warehouse');
      }

      await client.query("UPDATE transfers SET status = 'validated', validated_at = NOW() WHERE id = $1", [id]);

      // Log outgoing from source
      await client.query(
        `INSERT INTO stock_ledger (product_id, operation_type, quantity, reference, warehouse_id, user_id)
         VALUES ($1, 'transfer_out', $2, $3, $4, $5)`,
        [t.product_id, -t.quantity, t.reference, t.from_warehouse_id, userId]
      );
      // Log incoming to destination
      await client.query(
        `INSERT INTO stock_ledger (product_id, operation_type, quantity, reference, warehouse_id, user_id)
         VALUES ($1, 'transfer_in', $2, $3, $4, $5)`,
        [t.product_id, t.quantity, t.reference, t.to_warehouse_id, userId]
      );

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
    const r = await db.query("SELECT COUNT(*)::int as count FROM transfers WHERE status = 'draft'");
    return r.rows[0].count;
  },
};
