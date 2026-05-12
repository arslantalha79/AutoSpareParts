const { validationResult, body } = require('express-validator');

// Merkezi hata fırlatıcı kapı görevlimiz
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Girdi doğrulama hatası!",
            errors: errors.array() 
        });
    }
    next();
};

// --- AUTH DOĞRULAMALARI (Silinen kısmı geri getirdik) ---
const registerValidation = [
    body('fullName').notEmpty().withMessage('Ad Soyad alanı boş bırakılamaz'),
    body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
    body('password').isLength({ min: 8 }).withMessage('Şifreniz en az 8 karakter olmalıdır')
];

const loginValidation = [
    body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
    body('password').notEmpty().withMessage('Şifre alanı boş bırakılamaz')
];

// --- SPARE PART DOĞRULAMALARI (Yeni eklediğimiz) ---
const sparePartValidation = [
    body('name').notEmpty().withMessage('Parça adı boş olamaz'),
    body('category_id').isInt().withMessage('Geçerli bir kategori seçin'),
    body('model_id').isInt().withMessage('Geçerli bir araç modeli seçin'),
    body('sku').notEmpty().withMessage('Stok kodu (SKU) zorunludur'),
    body('price').isFloat({ min: 0 }).withMessage('Fiyat geçersiz'),
    body('stock_quantity').isInt({ min: 0 }).withMessage('Stok adedi 0 veya daha büyük olmalı')
];

// Hepsini dışarı aktarıyoruz ki route'lar bulabilsin
module.exports = { 
    validateRequest, 
    registerValidation, 
    loginValidation, 
    sparePartValidation 
};