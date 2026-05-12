const pool = require('../config/db');

class CategoryRepository {
    //kategorileri listeliyoruz.
    async getAll() {
        const result = await pool.query('SELECT * FROM Category WHERE is_active = true ORDER BY name ASC');
        return result.rows;
    }
}

module.exports = new CategoryRepository();