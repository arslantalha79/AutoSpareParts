import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

// Sayfa içindeki seçimleri tutmak için yerel hafıza (State)
let state = {
    selectedBrand: null,
    selectedModel: null
};

const BrandsView = {
    render: () => {
        return `
            <div style="max-width: 1400px; margin: 0 auto;">
                <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 1.8rem; margin-bottom: 5px;">
                        <i class="fa-solid fa-car-side text-accent"></i> Marka ve Model Gezgini
                    </h2>
                    <p style="color: var(--text-muted);" id="breadcrumb">Tüm Markalar</p>
                </div>

                <div id="brands-content-area">
                    <div style="text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Veriler Hazırlanıyor...</div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        await BrandsView.loadBrands();
    },

    // 1. ADIM: TÜM MARKALARI LİSTELE
    loadBrands: async () => {
        const container = document.getElementById('brands-content-area');
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = `<span style="color: var(--accent-color); font-weight: 600;">Tüm Markalar</span>`;
        
        try {
            const brands = await ApiService.get('/brands');
            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px;">`;
            
            brands.forEach(brand => {
                // Local'deki logoları çekiyoruz (Az önce ayarladığımız sistem)
                const logo = brand.logo_url || 'https://www.google.com/s2/favicons?sz=128&domain=renault.com';
                
                html += `
                    <div class="brand-explorer-card" data-id="${brand.id}" data-name="${brand.name}" 
                         style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: all 0.3s;">
                        <img src="${logo}" style="width: 64px; height: 64px; object-fit: contain; margin-bottom: 15px; background: white; padding: 5px; border-radius: 8px;">
                        <div style="font-weight: 600; color: white;">${brand.name}</div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;

            // Marka Kartlarına Tıklama Olayı
            document.querySelectorAll('.brand-explorer-card').forEach(card => {
                card.addEventListener('click', () => {
                    state.selectedBrand = { id: card.dataset.id, name: card.dataset.name };
                    BrandsView.loadModels(state.selectedBrand.id);
                });
            });

        } catch (error) { Notification.error("Markalar yüklenemedi."); }
    },

    // 2. ADIM: SEÇİLEN MARKANIN MODELLERİNİ GETİR
    loadModels: async (brandId) => {
        const container = document.getElementById('brands-content-area');
        const breadcrumb = document.getElementById('breadcrumb');
        
        breadcrumb.innerHTML = `
            <span style="cursor:pointer; color: #94a3b8;" id="back-to-brands">Tüm Markalar</span> 
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem; margin: 0 10px;"></i>
            <span style="color: var(--accent-color); font-weight: 600;">${state.selectedBrand.name} Modelleri</span>
        `;

        try {
            const models = await ApiService.get(`/models/brand/${brandId}`);
            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">`;
            
            models.forEach(model => {
                html += `
                    <div class="model-explorer-card" data-id="${model.id}" data-name="${model.name}" 
                         style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-size: 1.2rem; font-weight: 700; color: white; margin-bottom: 8px;">${model.name}</div>
                        <div style="color: #94a3b8; font-size: 0.9rem;">
                            <i class="fa-solid fa-calendar-days"></i> ${model.year_start} - ${model.year_end || 'Günümüz'}
                        </div>
                        <div style="color: var(--accent-color); font-size: 0.85rem; margin-top: 10px;">
                            <i class="fa-solid fa-microchip"></i> Motor: ${model.engine_type}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;

            document.getElementById('back-to-brands').addEventListener('click', BrandsView.loadBrands);
            
            document.querySelectorAll('.model-explorer-card').forEach(card => {
                card.addEventListener('click', () => {
                    state.selectedModel = { id: card.dataset.id, name: card.dataset.name };
                    BrandsView.loadPartsByModel(state.selectedModel.id);
                });
            });

        } catch (error) { Notification.error("Modeller yüklenemedi."); }
    },

    // 3. ADIM: SEÇİLEN MODELE AİT PARÇALARI LİSTELE
    loadPartsByModel: async (modelId) => {
        const container = document.getElementById('brands-content-area');
        const breadcrumb = document.getElementById('breadcrumb');

        breadcrumb.innerHTML = `
            <span style="cursor:pointer; color: #94a3b8;" id="back-to-brands">Tüm Markalar</span> 
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem; margin: 0 8px;"></i>
            <span style="cursor:pointer; color: #94a3b8;" id="back-to-models">${state.selectedBrand.name}</span>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem; margin: 0 8px;"></i>
            <span style="color: var(--accent-color); font-weight: 600;">${state.selectedModel.name} Parçaları</span>
        `;

        try {
            const allParts = await ApiService.get('/spare-parts');
            const filteredParts = allParts.filter(p => p.model_id == modelId);

            if(filteredParts.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: rgba(15,23,42,0.5); border-radius: 12px; border: 1px dashed #334155;">
                        <i class="fa-solid fa-magnifying-glass-chart fa-3x" style="color: #475569; margin-bottom: 15px;"></i>
                        <p style="color: #94a3b8;">Bu modele ait henüz bir yedek parça kaydı bulunmuyor.</p>
                        <button class="submit-btn" id="back-to-models-btn" style="width:auto; margin-top: 20px;">Geri Dön</button>
                    </div>
                `;
                document.getElementById('back-to-models-btn').addEventListener('click', () => BrandsView.loadModels(state.selectedBrand.id));
                return;
            }

            let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">`;
            filteredParts.forEach(part => {
                const imgSrc = part.image_url ? `http://localhost:3000${part.image_url}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';
                html += `
                    <div class="part-card" onclick="window.location.hash='#part-detail?id=${part.id}'" 
                         style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.2s;">
                        <div style="height: 140px; display: flex; justify-content: center; align-items: center; padding: 15px; background: rgba(255,255,255,0.02);">
                            <img src="${imgSrc}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 15px;">
                            <h4 style="color: white; font-size: 1rem; margin-bottom: 5px;">${part.name}</h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                <span style="font-size: 0.8rem; color: #94a3b8;">SKU: ${part.sku}</span>
                                <span style="color: #10b981; font-weight: 700;">${parseFloat(part.price).toLocaleString('tr-TR')} ₺</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;

            document.getElementById('back-to-brands').addEventListener('click', BrandsView.loadBrands);
            document.getElementById('back-to-models').addEventListener('click', () => BrandsView.loadModels(state.selectedBrand.id));

        } catch (error) { Notification.error("Parçalar yüklenemedi."); }
    }
};

export default BrandsView;