const sparePartService = require('../services/sparePartService');
const { validationResult } = require('express-validator');

class SparePartController {
    //sisteme yedek parça eklemesi yapıyoruz
    create = async (req, res) => {
        try {
            const data = req.body;
            if (req.file) {
                data.image_url = `/uploads/parts/${req.file.filename}`;
            }

            const newPart = await sparePartService.addNewPart(data);
            res.status(201).json({
                message: "Yedek parça başarıyla eklendi",
                part: newPart
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    //db'deki kayıtlı yedek parçaları listeliyoruz.
    getAll = async (req, res) => {
        const parts = await sparePartService.listAllParts();
        res.status(200).json(parts);
    };

    //sisteme kayıtlı yedek parçayı siliyoruz.
    delete = async (req, res) => {
        try {
            await sparePartService.removePart(req.params.id);
            res.status(200).json({ message: 'Parça silindi (Soft Delete)' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    //sisteme kayıtlı yedek parçanın bilgilerini güncelliyoruz
    update = async (req, res) => {
        try {
            const updatedPart = await sparePartService.updatePartDetails(req.params.id, req.body);
            res.status(200).json({ message: "Parça başarıyla güncellendi", part: updatedPart });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    //sisteme kayıtlı yedek parçanın stoğunu düşüyoruz.
    decreaseStock = async (req, res) => {
        try {
            const { amount } = req.body;
            const updatedPart = await sparePartService.decreaseStock(req.params.id, amount);
            res.status(200).json({ message: "Stok başarıyla düşüldü", stock: updatedPart.stock_quantity });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    ////sisteme kayıtlı yedek parçanın stoğuna ekleme yapıyoruz.
    replenishStock = async (req, res) => {
        try {
            const { amount } = req.body;
            const updatedPart = await sparePartService.replenishStock(req.params.id, amount);
            res.status(200).json({ message: "Stok başarıyla eklendi", stock: updatedPart.stock_quantity });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new SparePartController();