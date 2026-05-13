const pool = require('../config/db');

class SparePartRepository {

    async findBySku(sku){
        const query = 'SELECT * FROM Sparepart WHERE sku = $1 AND is_active = true';
        const result = await pool.query(query, [sku]);
        return result.rows[0];
    }

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

    async update(id, data) {
        const { name, sku, description, price } = data;
        const query = `
            UPDATE SparePart
            SET name = $1, sku = $2, description = $3, price = $4
            WHERE id = $5 RETURNING *
        `;

        const result = await pool.query(query, [name, sku, description, price, id]);
        return result.rows[0];
    }

    async changeStock(id, amount){
        const query = `
            UPDATE SparePart
            SET stock_quantity = stock_quantity + $1
            WHERE id = $2 RETURNING *   
        `;

        const result = await pool.query(query, [amount, id]);
        return result.rows[0];
    }

    // Soft Delete: is_active = false
    //soft delete güncel olarak firmalarda da böyle geliştiriliyor. Sistemden tamamen bir kaydı silmiyoruz.
    async softDelete(id) {
        const result = await pool.query('UPDATE SparePart SET is_active = false WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = new SparePartRepository();