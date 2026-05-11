const { validationResult } = require('express-validator');

// Bu fonksiyon, route'lardan gelen hataları yakalayıp frontend'e fırlatacak olan kapı görevlimizdir.
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Eğer formatta bir hata varsa (örneğin mail formata uymuyorsa), 400 koduyla hataları dön
        return res.status(400).json({ 
            message: "Girdi doğrulama hatası!",
            errors: errors.array() 
        });
    }
    
    // Hata yoksa bir sonraki adıma (Controller'a) geçmesine izin ver
    next();
};

module.exports = validateRequest;