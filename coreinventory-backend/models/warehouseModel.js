const db = require('../utils/db');

module.exports = {
  async findAll() {
    const r = await db.query('SELECT * FROM warehouses ORDER BY created_at DESC');
    return r.rows;
  },
  async findById(id) {
    const r = await db.query('SELECT * FROM warehouses WHERE id = $1', [id]);
    return r.rows[0] || null;
  },
  async create({ name, code, location, manager }) {
    const r = await db.query(
      'INSERT INTO warehouses (name, code, location, manager) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, code, location, manager]
    );
    return r.rows[0];
  },
  async update(id, { name, code, location, manager }) {
    const r = await db.query(
      'UPDATE warehouses SET name=$1, code=$2, location=$3, manager=$4 WHERE id=$5 RETURNING *',
      [name, code, location, manager, id]
    );
    return r.rows[0];
  },
  async delete(id) {
    await db.query('DELETE FROM warehouses WHERE id = $1', [id]);
  },
};
