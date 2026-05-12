const express = require('express');
const router = express.Router();
const sparePartController = require('../controllers/sparePartController');
const upload = require('../middlewares/uploadMiddleware');
const { sparePartValidation, validateRequest } = require('../middlewares/validationMiddleware');

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
router.post('/', upload.single('image'), sparePartValidation, validateRequest, sparePartController.create);
router.get('/', sparePartController.getAll);
router.delete('/:id', sparePartController.delete);

module.exports = router;