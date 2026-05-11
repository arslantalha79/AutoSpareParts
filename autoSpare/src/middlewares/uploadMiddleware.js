const multer = require('multer');
const path = require('path');

// Resimlerin nereye ve hangi isimle kaydedileceğini ayarlıyoruz
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Dosyaların kaydedileceği klasör (wwwroot/images mantığı)
        cb(null, './uploads/brands/');
    },
    filename: function (req, file, cb) {
        // Çakışmayı önlemek için ismin başına o anki milisaniyeyi ekliyoruz
        // Örn: 1684939201-logo.png
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Sadece resim formatlarına izin veren güvenlik filtresi
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Lütfen sadece resim dosyası yükleyin!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Maksimum 5MB sınır koyduk
});

module.exports = upload;