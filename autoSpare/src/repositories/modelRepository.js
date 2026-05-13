const pool = require('../config/db');

class ModelRepository {
    //veritabanına yapılan sorgular
    async getAll() {
        const query = `
            SELECT m.*, b.name as brand_name 
            FROM Models m
            INNER JOIN Brands b ON m.brand_id = b.id
            WHERE m.is_active = true
            ORDER BY b.name ASC, m.name ASC
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getByBrandId(brandId) {
        // Sadece seçili markanın aktif olan modellerini getiren sorgu
        const query = 'SELECT * FROM Models WHERE brand_id = $1 AND is_active = true ORDER BY name ASC';
        const result = await pool.query(query, [brandId]);
        return result.rows;
    }

    async create(brand_id, name, year_start, year_end, engine_type) {
        const query = `
            INSERT INTO Models (brand_id, name, year_start, year_end, engine_type) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const result = await pool.query(query, [brand_id, name, year_start, year_end, engine_type]);
        return result.rows[0];
    }
}

module.exports = new ModelRepository();