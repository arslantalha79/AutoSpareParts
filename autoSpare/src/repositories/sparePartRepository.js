const pool = require('../config/db');

class SparePartRepository {
    async getAll() {
        const query = `
            SELECT p.*, c.name as category_name, m.name as model_name, b.name as brand_name
            FROM SparePart p
            JOIN Category c ON p.category_id = c.id
            JOIN Models m ON p.model_id = m.id
            JOIN Brands b ON m.brand_id = b.id
            WHERE p.is_active = true ORDER BY p.created_date DESC`;
        const result = await pool.query(query);
        return result.rows;
    }

    async getById(id) {
        const result = await pool.query('SELECT * FROM SparePart WHERE id = $1 AND is_active = true', [id]);
        return result.rows[0];
    }

    async create(data) {
        const { category_id, model_id, name, sku, description, price, stock_quantity, image_url } = data;
        const query = `INSERT INTO SparePart (category_id, model_id, name, sku, description, price, stock_quantity, image_url) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const result = await pool.query(query, [category_id, model_id, name, sku, description, price, stock_quantity, image_url]);
        return result.rows[0];
    }

    // Soft Delete: is_active = false
    async softDelete(id) {
        const result = await pool.query('UPDATE SparePart SET is_active = false WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = new SparePartRepository();