const db = require("../config/db");

const Books = {
  getAll: async () => {
    const [rows] = await db.execute("SELECT * FROM books");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM books WHERE book_id = ?", [
      id,
    ]);
    return rows[0] || null;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO books
      (book_id, title, isbn, description, price, stock_quantity,
       publisher_id, published_date, language, cover_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.book_id,
      data.title,
      data.isbn || null,
      data.description || null,
      data.price,
      data.stock_quantity ?? 0,
      data.publisher_id || null,
      data.published_date || null,
      data.language || null,
      data.cover_image || null,
    ];
    const [result] = await db.execute(sql, params);
    return result;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE books
      SET title = ?, isbn = ?, description = ?, price = ?, stock_quantity = ?,
          publisher_id = ?, published_date = ?, language = ?, cover_image = ?
      WHERE book_id = ?
    `;
    const params = [
      data.title,
      data.isbn || null,
      data.description || null,
      data.price,
      data.stock_quantity ?? 0,
      data.publisher_id || null,
      data.published_date || null,
      data.language || null,
      data.cover_image || null,
      id,
    ];
    const [result] = await db.execute(sql, params);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM books WHERE book_id = ?", [
      id,
    ]);
    return result;
  },

  // Trừ số lượng tồn kho
  decreaseStock: async (book_id, quantity) => {
    const sql = `
      UPDATE books
      SET stock_quantity = GREATEST(0, stock_quantity - ?)
      WHERE book_id = ?
    `;
    const [result] = await db.execute(sql, [quantity, book_id]);
    return result;
  },

  // Tăng số lượng tồn kho (khi hủy đơn)
  increaseStock: async (book_id, quantity) => {
    const sql = `
      UPDATE books
      SET stock_quantity = stock_quantity + ?
      WHERE book_id = ?
    `;
    const [result] = await db.execute(sql, [quantity, book_id]);
    return result;
  },

  // Lấy các sách liên quan (cùng category, loại trừ sách hiện tại)
  getRelated: async (bookId, limit = 4) => {
    limit = Number(limit) || 4;

    const sql = `
      SELECT DISTINCT b.*
      FROM books b
      INNER JOIN book_categories bc1 ON bc1.book_id = b.book_id
      INNER JOIN book_categories bc2 ON bc2.category_id = bc1.category_id
      WHERE bc2.book_id = ? AND b.book_id != ?
      LIMIT ${limit}
    `;

    const [rows] = await db.execute(sql, [bookId, bookId]);
    return rows;
  },
};

module.exports = Books;
