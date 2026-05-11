const brandRepository = require('../repositories/brandRepository');

class BrandService {
    async listAllBrands() {
        return await brandRepository.getAll();
    }
}

module.exports = new BrandService();