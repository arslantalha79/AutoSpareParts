import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

const PartsView = {
    render: () => {
        return `
            <div style="max-width: 1400px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h2 style="font-size: 1.8rem; margin-bottom: 5px;"><i class="fa-solid fa-layer-group text-accent"></i> Tüm Yedek Parçalar</h2>
                        <p style="color: var(--text-muted);">Sistemde kayıtlı tüm parçaları buradan yönetebilirsiniz.</p>
                    </div>
                    <a href="#spare-parts" class="submit-btn" style="width: auto; padding: 10px 20px; font-size: 0.95rem; text-decoration: none;">
                        <i class="fa-solid fa-plus"></i> Yeni Parça Ekle
                    </a>
                </div>
                
                <div id="parts-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
                    <div style="grid-column: 1 / -1; text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Parçalar Çekiliyor...</div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        try {
            const parts = await ApiService.get('/spare-parts');
            const grid = document.getElementById('parts-grid');
            
            if(parts.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--accent-color); padding: 40px; background: rgba(15,23,42,0.5); border-radius: 12px;">Sistemde kayıtlı parça bulunamadı.</div>`;
                return;
            }

            let html = '';
            parts.forEach(part => {
                const imgSrc = part.image_url ? `http://localhost:3000${part.image_url}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';
                
                // Parça Kartı (Card)
                html += `
                    <div class="part-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.3s; cursor: pointer;" onclick="window.location.hash='#part-detail?id=${part.id}'" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='var(--accent-color)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--border-color)';">
                        
                        <div style="height: 180px; background: rgba(255,255,255,0.02); display: flex; justify-content: center; align-items: center; padding: 20px; border-bottom: 1px solid var(--border-color);">
                            <img src="${imgSrc}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png'">
                        </div>
                        
                        <div style="padding: 20px;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: #3b82f6; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.5px;">${part.brand_name} ${part.model_name}</div>
                            <h3 style="font-size: 1.1rem; color: white; margin-bottom: 10px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${part.name}</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                                <span style="font-family: monospace; color: #94a3b8; font-size: 0.85rem;">${part.sku}</span>
                                <span style="font-size: 1.25rem; font-weight: bold; color: #10b981;">${parseFloat(part.price).toLocaleString('tr-TR')} ₺</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = html;

        } catch (error) {
            Notification.error("Parçalar yüklenemedi.");
        }
    }
};

export default PartsView;