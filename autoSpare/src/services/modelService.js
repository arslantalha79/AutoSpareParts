const modelRepository = require('../repositories/modelRepository');

class ModelService {
    async listAllModels() {
        return await modelRepository.getAll();
    }

    async listModelsByBrand(brandId) {
        if (!brandId) throw new Error('Marka ID zorunludur.');
        return await modelRepository.getByBrandId(brandId);
    }

    async addNewModel(data) {
        const { brand_id, name, year_start, year_end, engine_type } = data;
        
        if (!brand_id || !name || !engine_type) {
            throw new Error('Marka, Model Adı ve Motor Tipi zorunlu alanlardır.');
        }

        return await modelRepository.create(brand_id, name, year_start, year_end, engine_type);
    }
}

module.exports = new ModelService();