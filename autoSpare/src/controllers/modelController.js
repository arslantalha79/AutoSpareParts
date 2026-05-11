const modelService = require('../services/modelService');

class ModelController {
    
    getAll = async (req, res) => {
        try {
            const models = await modelService.listAllModels();
            res.status(200).json(models);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getByBrand = async (req, res) => {
        try {
            const { brandId } = req.params;
            const models = await modelService.listModelsByBrand(brandId);
            res.status(200).json(models);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const newModel = await modelService.addNewModel(req.body);
            res.status(201).json({
                message: 'Model başarıyla eklendi',
                model: newModel
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new ModelController();