const db = require('../utils/db');

const UserModel = {
  // ... existing methods ...

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    return result.rows[0] || null;
  },

  async findById(id) {
    // Ensure avatar_url column exists
    try {
      await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT`);
    } catch(e) {}

    const result = await db.query(
      'SELECT id, full_name as "fullName", email, role, phone, employee_id as "employeeId", warehouse_id as "warehouseId", avatar_url as "avatarUrl", created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async create({ fullName, email, passwordHash }) {
    const result = await db.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name as "fullName", email, created_at as "createdAt"`,
      [fullName, email.toLowerCase(), passwordHash]
    );
    return result.rows[0];
  },

  async updateOtp(email, otpCode, otpExpiry) {
    const result = await db.query(
      `UPDATE users SET otp_code = $1, otp_expiry = $2 WHERE email = $3
       RETURNING id, email`,
      [otpCode, otpExpiry, email.toLowerCase()]
    );
    return result.rows[0];
  },

  async updatePassword(email, passwordHash) {
    const result = await db.query(
      `UPDATE users SET password_hash = $1, otp_code = NULL, otp_expiry = NULL WHERE email = $2
       RETURNING id, email`,
      [passwordHash, email.toLowerCase()]
    );
    return result.rows[0];
  },

  async clearOtp(email) {
    await db.query(
      'UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE email = $1',
      [email.toLowerCase()]
    );
  },

  // ─── NEW METHODS ───────────────────────────────────────────

  async updateProfile(id, { fullName, phone, email, role, avatarUrl }) {
    const result = await db.query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name),
           phone = COALESCE($2, phone),
           email = COALESCE($3, email),
           role = COALESCE($4, role),
           avatar_url = COALESCE($5, avatar_url)
       WHERE id = $6
       RETURNING id, full_name as "fullName", email, role, phone, employee_id as "employeeId", warehouse_id as "warehouseId", avatar_url as "avatarUrl", updated_at as "updatedAt"`,
      [fullName ?? null, phone ?? null, email ?? null, role ?? null, avatarUrl ?? null, id]
    );
    return result.rows[0] || null;
  }
};

module.exports = UserModel;
