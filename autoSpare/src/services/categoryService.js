const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
    async listAllCategories() {
        return await categoryRepository.getAll();
    }
}

module.exports = new CategoryService();