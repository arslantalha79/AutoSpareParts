import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';
import Validator from '../utils/validator.js';

let state = {
    brandId: null,
    modelId: null,
    categoryId: null
};

const SparePartsView = {
    render: () => {
        return `
            <div style="max-width: 1400px; margin: 0 auto; width: 100%;">
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h2 style="font-size: clamp(1.4rem, 4vw, 1.8rem); margin-bottom: 5px;">
                            <i class="fa-solid fa-gears text-accent"></i> Yeni Parça Ekleme Merkezi
                        </h2>
                        <p style="color: var(--text-muted); font-size: 0.95rem;" id="step-title">Adım 1: Marka Seçin</p>
                    </div>
                </div>

                <div id="wizard-container" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 15px; padding: clamp(20px, 4vw, 40px); min-height: 400px;">
                    <div style="text-align:center; padding: 50px;">
                        <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--accent-color);"></i>
                    </div>
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
        document.getElementById('step-title').innerText = "Adım 1: Marka Seçin (Lütfen listenin içinden parça eklemek istediğiniz markayı tıklayın)";
        
        try {
            const brands = await ApiService.get('/brands');
            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px;">`;
            
            brands.forEach(brand => {
                html += `
                    <div class="brand-card" data-id="${brand.id}" style="background: rgba(15, 23, 42, 0.4); border: 1px solid #334155; padding: 25px; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s;">
                        <img src="${brand.logo_url}" alt="${brand.name}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png';" style="width: 70px; height: 70px; object-fit: contain; margin-bottom: 15px; background: white; padding: 5px; border-radius: 10px;">
                        <div style="font-size: 1rem; font-weight: 600; color: white;">${brand.name}</div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;

            document.querySelectorAll('.brand-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    state.brandId = e.currentTarget.getAttribute('data-id');
                    SparePartsView.loadModels(state.brandId);
                });
            });

        } catch (error) { await Notification.error("Markalar yüklenemedi."); }
    },

    // --- ADIM 2: MODELLERİ YÜKLE ---
    loadModels: async (brandId) => {
        const container = document.getElementById('wizard-container');
        document.getElementById('step-title').innerText = "Adım 2: Model Seçin (Parçanın ait olduğu araç modelini belirleyin)";
        container.innerHTML = `<div style="text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Modeller Listeleniyor...</div>`;
        
        try {
            const models = await ApiService.get(`/models/brand/${brandId}`);
            
            if(models.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding: 40px;">
                        <p style="color:#f97316; font-size: 1.2rem; margin-bottom: 20px;">Bu markaya ait henüz bir model tanımlanmamış.</p>
                        <button class="submit-btn" id="back-btn" style="max-width: 200px; margin: 0 auto;">Markalara Geri Dön</button>
                    </div>`;
                document.getElementById('back-btn').addEventListener('click', SparePartsView.loadBrands);
                return;
            }

            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">`;
            models.forEach(model => {
                html += `
                    <div class="model-card" data-id="${model.id}" style="background: rgba(30, 41, 59, 0.5); padding: 25px; border: 1px solid #334155; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-weight: 700; font-size: 1.3rem; color: #f97316; margin-bottom: 10px;">${model.name}</div>
                        <div style="font-size: 0.95rem; color: #94a3b8; display: flex; gap: 15px; flex-wrap: wrap;">
                            <span><i class="fa-solid fa-calendar"></i> ${model.year_start} - ${model.year_end || 'Günümüz'}</span>
                            <span><i class="fa-solid fa-engine"></i> ${model.engine_type}</span>
                        </div>
                    </div>
                `;
            });
            html += `</div><div style="margin-top: 30px; border-top: 1px solid #334155; padding-top: 20px;">
                        <button class="submit-btn" id="back-btn" style="max-width: 150px; background: transparent; border: 1px solid #f97316;">Geri Dön</button>
                     </div>`;
            
            container.innerHTML = html;
            document.getElementById('back-btn').addEventListener('click', SparePartsView.loadBrands);
            
            document.querySelectorAll('.model-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    state.modelId = e.currentTarget.getAttribute('data-id');
                    SparePartsView.loadForm();
                });
            });
        } catch (error) { await Notification.error("Modeller yüklenemedi."); }
    },

    // --- ADIM 3: FORM ---
    loadForm: async () => {
        const container = document.getElementById('wizard-container');
        document.getElementById('step-title').innerText = "Adım 3: Detaylı Parça Bilgileri";
        
        try {
            const categories = await ApiService.get('/categories');
            const subCategories = categories.filter(c => c.parent_id !== null);

            let catOptions = `<option value="">Kategori Seçiniz...</option>`;
            subCategories.forEach(c => {
                catOptions += `<option value="${c.id}">${c.name}</option>`;
            });

            container.innerHTML = `
                <form id="sparePartForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div class="input-group" style="margin:0;">
                            <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Parça Kategorisi</label>
                            <select id="category" required style="width: 100%; padding: 15px; background-color: rgba(15, 23, 42, 0.5); border: 1px solid #334155; border-radius: 10px; color: white; outline: none;">
                                ${catOptions}
                            </select>
                        </div>

                        <div class="input-group" style="margin:0;">
                             <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Parça Adı</label>
                            <i class="fa-solid fa-wrench fa-group"></i>
                            <input type="text" id="part-name" placeholder="Bosch Ön Fren Balatası" required style="box-sizing: border-box;">
                        </div>

                        <div class="input-group" style="margin:0;">
                             <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Stok Kodu (SKU)</label>
                            <i class="fa-solid fa-barcode fa-group"></i>
                            <input type="text" id="sku" placeholder="BSCH-FRN-001" required style="box-sizing: border-box;">
                        </div>
                        
                        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                            <div class="input-group" style="flex: 1; min-width: 130px; margin:0;">
                                <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Fiyat (₺)</label>
                                <i class="fa-solid fa-turkish-lira-sign  fa-group"></i>
                                <input type="number" id="price" step="0.01" placeholder="1250.00" required style="box-sizing: border-box;">
                            </div>
                            <div class="input-group" style="flex: 1; min-width: 130px; margin:0;">
                                <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Mevcut Stok</label>
                                <i class="fa-solid fa-boxes-stacked  fa-group"></i>
                                <input type="number" id="stock" placeholder="25" required style="box-sizing: border-box;">
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div class="input-group" style="margin:0;">
                            <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Parça Görseli</label>
                            <i class="fa-solid fa-file-image  fa-group"></i>
                            <input type="file" id="image" accept="image/*" style="padding-left: 55px; max-width: 100%; box-sizing: border-box;" required>
                        </div>

                        <div class="input-group" style="margin:0; flex: 1; display: flex; flex-direction: column;">
                            <label style="display:block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem;">Teknik Açıklama</label>
                            <textarea id="description" placeholder="Malzeme kalitesi, uyumluluk notları vb." style="width: 100%; flex: 1; padding: 15px; background-color: rgba(15, 23, 42, 0.5); border: 1px solid #334155; border-radius: 10px; color: white; outline: none; resize: none; min-height: 120px; box-sizing: border-box;"></textarea>
                        </div>

                        <div style="display:flex; flex-wrap: wrap; gap: 15px; margin-top: 10px;">
                            <button type="button" class="submit-btn" id="back-btn" style="flex: 1; min-width: 120px; background: transparent; border: 1px solid #f97316;">Geri Dön</button>
                            <button type="submit" class="submit-btn" id="save-btn" style="flex: 2; min-width: 180px;">
                                <span>Kaydet ve Yayınla</span> <i class="fa-solid fa-cloud-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </form>
            `;

            document.getElementById('back-btn').addEventListener('click', () => SparePartsView.loadModels(state.brandId));
            
            // FORM GÖNDERME İŞLEMİ
            document.getElementById('sparePartForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append('model_id', state.modelId);
                formData.append('category_id', document.getElementById('category').value);
                formData.append('name', document.getElementById('part-name').value);
                formData.append('sku', document.getElementById('sku').value);
                formData.append('price', document.getElementById('price').value);
                formData.append('stock_quantity', document.getElementById('stock').value);
                formData.append('description', document.getElementById('description').value);
                formData.append('image', document.getElementById('image').files[0]);

                const btn = document.getElementById('save-btn');
                
                try {
                    btn.disabled = true;
                    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...`;

                    await ApiService.postFormData('/spare-parts', formData);
                    
                    // ✅ Başarı: Önce modal bekle, SONRA yönlendir
                    await Notification.success('Yedek parça başarıyla sisteme kaydedildi ve kataloğa eklendi.');
                    state = { brandId: null, modelId: null, categoryId: null };
                    window.location.hash = '#parts';

                } catch (error) {
                    console.error("HATA:", error);
                    btn.disabled = false;
                    btn.innerHTML = `<span>Kaydet ve Yayınla</span> <i class="fa-solid fa-cloud-arrow-up"></i>`;
                    
                    await Notification.error(error.message || "Parça kaydedilirken beklenmedik bir hata oluştu.");
                }
            });
        } catch (error) { 
            await Notification.error("Form yüklenemedi."); 
        }
    }
};

export default SparePartsView;