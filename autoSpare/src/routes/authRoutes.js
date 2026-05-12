const express = require('express');
const authController = require('../controllers/authController');

const { 
    validateRequest, 
    registerValidation, 
    loginValidation 
} = require('../middlewares/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Sisteme yeni bir kullanıcı kaydeder
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Ömer Talha"
 *               email:
 *                 type: string
 *                 example: "omer@example.com"
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       400:
 *         description: İş kuralı hatası (Validasyon)
 */
router.post('/register', registerValidation, validateRequest, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT token döner
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "omer@example.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       400:
 *         description: Hatalı giriş
 */
router.post('/login', loginValidation, validateRequest, authController.login);

module.exports = router;