const express = require('express');
const categoryService = require('../services/categoryService');
const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Tüm aktif kategorileri listeler
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Kategori listesi başarıyla getirildi
 */
router.get('/', async (req, res) => {
    try {
        const categories = await categoryService.listAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;