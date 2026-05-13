const jwt = require('jsonwebtoken');
// ASP.NET'teki [Authorize] etiketinin Node.js karşılığı
const authorize = (req, res, next) => {
    let token = req.cookies?.token;
    
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // "Bearer <token>" stringini ayır
    }

    //token yoksa hata dön (401 - Unauthorized)
    if (!token) {
        return res.status(401).json({ message: "Bu işlemi yapmak için sisteme giriş yapmalısınız." });
    }

    try {
        //JWT Signature kısmı doğrulama
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Çözülen kullanıcı bilgilerini (id, email, role vb.) req objesine aktarıyoruz
        req.user = decoded; 
        next(); 
    } catch (error) {
        // Token olabilir ama yetkisi yoktur veya token süresi dolmuştur.(403 Forbidden)
        return res.status(403).json({ message: "Oturum süreniz dolmuş veya yetkisiz erişim." });
    }
};

module.exports = authorize;