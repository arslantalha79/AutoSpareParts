const pool = require('../config/db');

class UserRepository{
    //sisteme kayıtlı mail var mı ve hesap aktif mi?
    async findByEmail(email){
        const query = 'SELECT * FROM Users WHERE email = $1 AND is_active = true';

        const result = await pool.query(query, [email]);

        //firstordefault fonksiyonu gibi düşün
        return result.rows[0];
    }

    //kayıt olma
    async createUser(fullName, email, passwordHash){
        const query = `
        INSERT INTO Users (full_name, email, password_hash) 
        VALUES ($1, $2, $3)
        RETURNING *
        `;
        // RETURNING * kısmı PostgreSQL'e özel harika bir özelliktir. 
        // C#'taki SCOPE_IDENTITY() gibi çalışır; eklenen satırın oluşan ID'sini ve tüm bilgilerini ekstra bir SELECT atmadan anında geri verir.

        const values = [fullName, email, passwordHash];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    //hesap bilgilerini güncelleme
    async update(id, fullName, role, email){
        const query = `
            UPDATE Users
            SET full_name = $1, role = $2, email = $3,updated_date = CURRENT_TIMESTAMP
            WHERE id = $4 AND is_active = true
            RETURNING id, full_name, email, role, updated_date;
        `;

        const values = [fullName, role, email, id];
        const result = await pool.query(query, values);
        
        return result.rows[0];
    }

    //kullanıcı hesabını pasife çekme
    async softDeleteUser(id){
        const query = `
            UPDATE Users
            SET is_active = false, updated_date = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING id, full_name, is_active, updated_date;
        `;

        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

}


module.exports = new UserRepository();