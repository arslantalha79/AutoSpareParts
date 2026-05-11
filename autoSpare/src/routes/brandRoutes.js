const express = require('express');
const brandService = require('../services/brandService');
const router = express.Router();

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Tüm aktif markaları listeler
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Marka listesi başarıyla getirildi
 */
router.get('/', async (req, res) => {
    try {
        const brands = await brandService.listAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Yeni bir marka ekler
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Renault"
 *     responses:
 *       201:
 *         description: Marka başarıyla eklendi
 *       400:
 *         description: Validasyon veya iş kuralı hatası
 */
router.post('/', async (req, res) => {
    try {
        const newBrand = await brandService.addNewBrand(req.body.name);
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;