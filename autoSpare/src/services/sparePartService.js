const sparePartRepository = require('../repositories/sparePartRepository');

class SparePartService {
    
    // Tüm parçaları listeleme
    async listAllParts() {
        return await sparePartRepository.getAll();
    }

    // Yeni parça ekleme (İş kuralları burada işletilir)
    async addNewPart(data) {
        // İleride buraya "Bu SKU (Stok Kodu) ile daha önce parça eklenmiş mi?" 
        // gibi ekstra iş kuralları (business rules) yazabiliriz.
        // Şimdilik doğrudan veritabanına yazması için Repository'e gönderiyoruz.
        return await sparePartRepository.create(data);
    }

    // Parçayı silme (Soft Delete)
    async removePart(id) {
        // Önce parçanın veritabanında olup olmadığını kontrol edelim
        const existingPart = await sparePartRepository.getById(id);
        if (!existingPart) {
            throw new Error('Silinmek istenen yedek parça bulunamadı.');
        }

        // Varsa Repository'deki softDelete metodunu tetikle
        return await sparePartRepository.softDelete(id);
    }
}

module.exports = new SparePartService();