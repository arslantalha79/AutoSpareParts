const pool = require('../config/db');

class BrandRepository {
    async getAll() {
        const result = await pool.query('SELECT * FROM Brands WHERE is_active = true ORDER BY name ASC');
        return result.rows;
    }
}

module.exports = new BrandRepository();