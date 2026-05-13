const express = require('express');
const router = express.Router();
const sparePartController = require('../controllers/sparePartController');
const upload = require('../middlewares/uploadMiddleware');
const { sparePartValidation, validateRequest } = require('../middlewares/validationMiddleware');
const authorize = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /api/spare-parts:
 *   post:
 *     summary: Yeni yedek parça ekler (Resim yüklemeli)
 *     tags: [SpareParts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - model_id
 *               - name
 *               - sku
 *               - price
 *             properties:
 *               category_id:
 *                 type: integer
 *                 description: Seçilen alt kategorinin ID'si
 *                 example: 7
 *               model_id:
 *                 type: integer
 *                 description: Seçilen araç modelinin ID'si
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Parçanın adı
 *                 example: "Valeo Ön Fren Balatası"
 *               sku:
 *                 type: string
 *                 description: Benzersiz stok kodu
 *                 example: "VAL-FRN-001"
 *               description:
 *                 type: string
 *                 description: Parça açıklaması (opsiyonel)
 *                 example: "Ses yapmaz, uzun ömürlü seramik balata."
 *               price:
 *                 type: number
 *                 description: Parça fiyatı
 *                 example: 1250.50
 *               stock_quantity:
 *                 type: integer
 *                 description: Depodaki stok adedi
 *                 example: 45
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Parçanın görseli (JPG/PNG)
 *     responses:
 *       201:
 *         description: Yedek parça başarıyla eklendi
 *       400:
 *         description: Validasyon veya iş kuralı hatası
 *
 *   get:
 *     summary: Tüm yedek parçaları listeler
 *     tags: [SpareParts]
 *     responses:
 *       200:
 *         description: Yedek parça listesi başarıyla getirildi
 *
 * /api/spare-parts/{id}:
 *   delete:
 *     summary: Belirtilen yedek parçayı siler
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinecek yedek parçanın ID'si
 *     responses:
 *       200:
 *         description: Yedek parça başarıyla silindi
 *       404:
 *         description: Yedek parça bulunamadı
 */

/**
 * @swagger
 * /api/spare-parts/{id}:
 *   put:
 *     summary: Yedek parça bilgilerini günceller
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Parça başarıyla güncellendi
 *
 * /api/spare-parts/{id}/decrease-stock:
 *   patch:
 *     summary: Parçanın stoğunu düşürür
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Stok düşüldü
 *
 * /api/spare-parts/{id}/replenish-stock:
 *   patch:
 *     summary: Parçaya stok ekler
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Stok eklendi
 */
router.post('/', authorize, upload.single('image'), sparePartValidation, validateRequest, sparePartController.create);
router.get('/',  authorize, sparePartController.getAll);
router.delete('/:id', authorize, sparePartController.delete);
router.put('/:id', authorize, sparePartController.update);
router.patch('/:id/decrease-stock', authorize, sparePartController.decreaseStock);
router.patch('/:id/replenish-stock', authorize, sparePartController.replenishStock);

module.exports = router;