const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- İŞTE EKSİK OLAN SİHİRLİ SATIR BU!
require('dotenv').config();
const pool = require('./config/db'); //Veritabanı bağlantısını yaptığım dosyayı çağırıyorum.

//routerları import edelim
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const modelRoutes = require('./routes/modelRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sparePartRoutes = require('./routes/sparePartRoutes');

// Swagger config dosyasını çağırıyoruz
const { swaggerUi, specs } = require('./config/swagger');

const app = express();

//Middlewarelerim
app.use(cors());
app.use(express.json()); //json format yapılandırması

// wwwroot mantığı: 'uploads' klasörünü dış dünyaya '/uploads' URL'i ile açıyoruz
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger UI arayüzünü /api-docs adresinde ayağa kaldırıyoruz
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/spare-parts', sparePartRoutes);


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