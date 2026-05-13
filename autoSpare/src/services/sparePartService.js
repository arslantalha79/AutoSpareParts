const sparePartRepository = require('../repositories/sparePartRepository');

class SparePartService {
    
    // Tüm parçaları listeleme
    async listAllParts() {
        return await sparePartRepository.getAll();
    }

    // Yeni parça ekleme (İş kuralları burada işletilir)
    async addNewPart(data) {

        const existingPart = await sparePartRepository.findBySku(data.sku);

        if(existingPart){
            throw new Error(`Bu stok kodu (${data.sku}) ile sistemde zaten bir parça kayıtlı!`);
        }

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

    // Parça güncelleme
    async updatePartDetails(id, data) {
        const existingPart = await sparePartRepository.getById(id);
        if (!existingPart) throw new Error('Güncellenecek parça bulunamadı.');
        
        // Eğer SKU değişmişse ve yeni SKU başkasına aitse engelleyelim
        if (data.sku !== existingPart.sku) {
            const skuCheck = await sparePartRepository.findBySku(data.sku); 
            if (skuCheck) throw new Error('Bu stok kodu (SKU) başka bir parçada kullanılıyor.');
        }

        return await sparePartRepository.update(id, data);
    }

    // Stok Düşme İşlemi
    async decreaseStock(id, amount) {
        const part = await sparePartRepository.getById(id);
        if (!part) throw new Error('Parça bulunamadı.');
        if (part.stock_quantity < amount) throw new Error(`Yetersiz stok! Mevcut stok: ${part.stock_quantity}`);
        
        // Eksi değer göndererek stoğu düşürüyoruz
        return await sparePartRepository.changeStock(id, -Math.abs(amount));
    }

    // Stok Yenileme İşlemi
    async replenishStock(id, amount) {
        const part = await sparePartRepository.getById(id);
        if (!part) throw new Error('Parça bulunamadı.');
        
        // Artı değer göndererek stoğu artırıyoruz
        return await sparePartRepository.changeStock(id, Math.abs(amount));
    }
}

module.exports = new SparePartService();