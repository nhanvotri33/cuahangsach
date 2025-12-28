const db = require("../config/db");

const Reviews = {
  getAll: async () => {
    const sql = `
      SELECT
        r.review_id,
        r.book_id,
        r.customer_id,
        r.rating,
        r.comment,
        r.created_at,
        c.full_name AS user_name
      FROM reviews r
      LEFT JOIN customers c
        ON c.customer_id = r.customer_id
      ORDER BY r.created_at DESC
    `;
    const [rows] = await db.execute(sql);
    return rows;
  },

  getById: async (id) => {
    const sql = `
      SELECT
        r.review_id,
        r.book_id,
        r.customer_id,
        r.rating,
        r.comment,
        r.created_at,
        c.name AS user_name
      FROM reviews r
      LEFT JOIN customers c
        ON c.customer_id = r.customer_id
      WHERE r.review_id = ?
    `;
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  },

  getByBook: async (bookId) => {
    const sql = `
      SELECT
        r.review_id,
        r.book_id,
        r.customer_id,
        r.rating,
        r.comment,
        r.created_at,
        c.name AS user_name
      FROM reviews r
      LEFT JOIN customers c
        ON c.customer_id = r.customer_id
      WHERE r.book_id = ?
      ORDER BY r.created_at DESC
    `;

    const [rows] = await db.execute(sql, [bookId]);
    return rows;
  },
  create: async (data) => {
    const sql = `
      INSERT INTO reviews (review_id, book_id, customer_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      data.review_id,
      data.book_id,
      data.customer_id,
      data.rating,
      data.comment || null,
    ]);
    return result;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE reviews
      SET rating = ?, comment = ?
      WHERE review_id = ?
    `;
    const [result] = await db.execute(sql, [
      data.rating,
      data.comment || null,
      id,
    ]);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.execute(
      "DELETE FROM reviews WHERE review_id = ?",
      [id]
    );
    return result;
  },
};

module.exports = Reviews;
