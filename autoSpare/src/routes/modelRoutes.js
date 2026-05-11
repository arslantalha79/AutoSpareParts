const express = require('express');
const modelController = require('../controllers/modelController');
const router = express.Router();

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Tüm araç modellerini bağlı olduğu marka adıyla birlikte listeler
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Model listesi başarıyla getirildi
 */
router.get('/', modelController.getAll);

/**
 * @swagger
 * /api/models/brand/{brandId}:
 *   get:
 *     summary: Belirli bir markaya (ID) ait modelleri listeler
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Modelleri getirilecek markanın ID'si
 *     responses:
 *       200:
 *         description: Markaya ait modeller başarıyla getirildi
 */
router.get('/brand/:brandId', modelController.getByBrand);

/**
 * @swagger
 * /api/models:
 *   post:
 *     summary: Yeni bir araç modeli ekler
 *     tags: [Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [brand_id, name, engine_type]
 *             properties:
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Megane 4"
 *               year_start:
 *                 type: integer
 *                 example: 2016
 *               year_end:
 *                 type: integer
 *                 example: 2024
 *               engine_type:
 *                 type: string
 *                 example: "1.3 TCe"
 *     responses:
 *       201:
 *         description: Model başarıyla eklendi
 *       400:
 *         description: Validasyon veya iş kuralı hatası
 */
router.post('/', modelController.create);

module.exports = router;