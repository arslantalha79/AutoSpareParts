import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';
import Validator from '../utils/validator.js';

// State (Hafıza) - Kullanıcının seçimlerini tutacağız
let state = {
    brandId: null,
    modelId: null,
    categoryId: null
};

const SparePartsView = {
    render: () => {
        return `
            <div class="auth-card" style="max-width: 800px;"> <h2><i class="fa-solid fa-gears"></i> Yeni Parça Ekle</h2>
                <p class="subtitle" id="step-title">Adım 1: Marka Seçin</p>
                
                <div id="wizard-container">
                    <div style="text-align:center;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Yükleniyor...</div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        await SparePartsView.loadBrands();
    },

    // --- ADIM 1: MARKALARI YÜKLE ---
    loadBrands: async () => {
        const container = document.getElementById('wizard-container');
        document.getElementById('step-title').innerText = "Adım 1: Marka Seçin";
        
        try {
            const brands = await ApiService.get('/brands');
            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;">`;
            
            brands.forEach(brand => {
                // Clearbit logoları çok şık duracak
                html += `
                    <div class="brand-card" data-id="${brand.id}" style="border: 1px solid #334155; padding: 15px; border-radius: 10px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <img src="${brand.logo_url}" alt="${brand.name}" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png';" style="width: 50px; height: 50px; object-fit: contain; margin-bottom: 10px; border-radius: 5px; background: white; padding: 2px;">
                        <div style="font-size: 0.9rem; font-weight: 500;">${brand.name}</div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;

            // Marka kartlarına tıklama olayı
            document.querySelectorAll('.brand-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    state.brandId = e.currentTarget.getAttribute('data-id');
                    SparePartsView.loadModels(state.brandId); // Adım 2'ye geç
                });
            });

        } catch (error) { Notification.error("Markalar yüklenemedi."); }
    },

    // --- ADIM 2: MODELLERİ YÜKLE ---
    loadModels: async (brandId) => {
        const container = document.getElementById('wizard-container');
        document.getElementById('step-title').innerText = "Adım 2: Model Seçin";
        container.innerHTML = `<div style="text-align:center;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Modeller Aranıyor...</div>`;
        
        try {
            const models = await ApiService.get(`/models/brand/${brandId}`);
            
            if(models.length === 0) {
                container.innerHTML = `<p style="text-align:center; color:#f97316;">Bu markaya ait model bulunamadı.</p><button class="submit-btn" id="back-btn" style="margin-top:20px;">Geri Dön</button>`;
                document.getElementById('back-btn').addEventListener('click', SparePartsView.loadBrands);
                return;
            }

            let html = `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">`;
            models.forEach(model => {
                html += `
                    <div class="model-card" data-id="${model.id}" style="background: rgba(15, 23, 42, 0.5); padding: 15px; border: 1px solid #334155; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-weight: 600; font-size: 1.1rem; color: #f97316;">${model.name}</div>
                        <div style="font-size: 0.85rem; color: #94a3b8;">${model.year_start} - ${model.year_end || 'Günümüz'} | Motor: ${model.engine_type}</div>
                    </div>
                `;
            });
            html += `</div><button class="submit-btn" id="back-btn" style="margin-top:20px; background: transparent; border: 1px solid #f97316;">Geri Dön</button>`;
            
            container.innerHTML = html;

            document.getElementById('back-btn').addEventListener('click', SparePartsView.loadBrands);
            document.querySelectorAll('.model-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    state.modelId = e.currentTarget.getAttribute('data-id');
                    SparePartsView.loadForm(); // Adım 3'e geç
                });
            });
        } catch (error) { Notification.error("Modeller yüklenemedi."); }
    },

    // --- ADIM 3 & 4: KATEGORİ SEÇİMİ VE FORM ---
    loadForm: async () => {
        const container = document.getElementById('wizard-container');
        document.getElementById('step-title').innerText = "Adım 3: Parça Bilgilerini Girin";
        
        try {
            const categories = await ApiService.get('/categories');
            // Sadece alt kategorileri (parent_id'si olanları) listele (Alo Parça mantığı)
            const subCategories = categories.filter(c => c.parent_id !== null);

            let catOptions = `<option value="">Kategori Seçiniz...</option>`;
            subCategories.forEach(c => {
                catOptions += `<option value="${c.id}">${c.name}</option>`;
            });

            container.innerHTML = `
                <form id="sparePartForm">
                    <div class="input-group">
                        <select id="category" required style="width: 100%; padding: 15px; background-color: rgba(15, 23, 42, 0.5); border: 1px solid #334155; border-radius: 10px; color: white; outline: none; appearance: none;">
                            ${catOptions}
                        </select>
                    </div>

                    <div style="display: flex; gap: 15px;">
                        <div class="input-group" style="flex: 2;">
                            <i class="fa-solid fa-wrench"></i>
                            <input type="text" id="part-name" placeholder="Parça Adı (Örn: Bosch Ön Fren Balatası)" required>
                        </div>
                        <div class="input-group" style="flex: 1;">
                            <i class="fa-solid fa-barcode"></i>
                            <input type="text" id="sku" placeholder="Stok Kodu" required>
                        </div>
                    </div>

                    <div style="display: flex; gap: 15px;">
                        <div class="input-group" style="flex: 1;">
                            <i class="fa-solid fa-turkish-lira-sign"></i>
                            <input type="number" id="price" step="0.01" placeholder="Fiyat (TL)" required>
                        </div>
                        <div class="input-group" style="flex: 1;">
                            <i class="fa-solid fa-boxes-stacked"></i>
                            <input type="number" id="stock" placeholder="Stok Adedi" required>
                        </div>
                    </div>

                    <div class="input-group">
                        <i class="fa-solid fa-file-image"></i>
                        <input type="file" id="image" accept="image/*" style="padding-left: 55px;" required>
                    </div>

                    <div class="input-group">
                        <textarea id="description" placeholder="Parça Açıklaması (Opsiyonel)" style="width: 100%; padding: 15px; background-color: rgba(15, 23, 42, 0.5); border: 1px solid #334155; border-radius: 10px; color: white; outline: none; min-height: 80px;"></textarea>
                    </div>

                    <div style="display:flex; gap: 15px;">
                        <button type="button" class="submit-btn" id="back-btn" style="flex:1; background: transparent; border: 1px solid #f97316;">İptal / Geri</button>
                        <button type="submit" class="submit-btn" id="save-btn" style="flex:2;">
                            <span>Sisteme Kaydet</span> <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                </form>
            `;

            document.getElementById('back-btn').addEventListener('click', () => SparePartsView.loadModels(state.brandId));
            
            // FORM GÖNDERME İŞLEMİ (FormData ve Resim Yükleme)
            document.getElementById('sparePartForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const categoryId = document.getElementById('category').value;
                const name = document.getElementById('part-name').value;
                const sku = document.getElementById('sku').value;
                const price = document.getElementById('price').value;
                const stock = document.getElementById('stock').value;
                const description = document.getElementById('description').value;
                const imageFile = document.getElementById('image').files[0];

                // Frontend Doğrulama
                if(Validator.isEmpty(categoryId)) return Notification.warning("Kategori seçimi zorunludur.");
                if(!Validator.isPositiveNumber(price)) return Notification.error("Fiyat geçerli bir sayı olmalıdır.");
                if(!Validator.isPositiveNumber(stock)) return Notification.error("Stok adedi eksi olamaz.");
                if(!imageFile) return Notification.warning("Lütfen parça görselini seçin.");

                // FormData Hazırlığı
                const formData = new FormData();
                formData.append('model_id', state.modelId); // Önceki adımdan gelen veri!
                formData.append('category_id', categoryId);
                formData.append('name', name);
                formData.append('sku', sku);
                formData.append('price', price);
                formData.append('stock_quantity', stock);
                formData.append('description', description);
                formData.append('image', imageFile); // Dosyayı ekliyoruz

                try {
                    const btn = document.getElementById('save-btn');
                    btn.disabled = true;
                    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor...`;

                    // YENİ EKLEDİĞİMİZ postFormData METODUNU ÇAĞIRIYORUZ
                    await ApiService.postFormData('/spare-parts', formData);
                    
                    await Notification.success("Parça başarıyla eklendi!");
                    state = { brandId: null, modelId: null, categoryId: null }; // Hafızayı sıfırla
                    SparePartsView.loadBrands(); // En başa dön
                } catch (error) {
                    Notification.error(error.message);
                }
            });

        } catch (error) { Notification.error("Kategoriler yüklenemedi."); }
    }
};

export default SparePartsView;