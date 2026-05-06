const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db'); //Veritabanı bağlantısını yaptığım dosyayı çağırıyorum.
//routerları import edelim
const authRoutes = require('./routes/authRoutes');

// Swagger config dosyasını çağırıyoruz
const { swaggerUi, specs } = require('./config/swagger');

const app = express();

//Middlewarelerim
app.use(cors());
app.use(express.json()); //json format yapılandırması

// Swagger UI arayüzünü /api-docs adresinde ayağa kaldırıyoruz
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);

    try{
        const res = await pool.query('SELECT NOW()');
        console.log('Veritabanı saati: ', res.rows[0].now);
    }catch (err){
        console.error("Veritabanına bağlanılamadı. Lütfen pgAdmin üzerinden veritabanını oluşturduğundan emin ol.", err.message);
    }
});