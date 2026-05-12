const sparePartService = require('../services/sparePartService');
const { validationResult } = require('express-validator');

class SparePartController {
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

    getAll = async (req, res) => {
        const parts = await sparePartService.listAllParts();
        res.status(200).json(parts);
    };

    delete = async (req, res) => {
        try {
            await sparePartService.removePart(req.params.id);
            res.status(200).json({ message: 'Parça silindi (Soft Delete)' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new SparePartController();