import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

const DashboardView = {
    render: () => {
        return `
            <div class="dashboard-container" style="max-width: 1400px; margin: 0 auto; width: 100%;">
                
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 30px;">
                    <h2 style="font-size: clamp(1.4rem, 4vw, 1.8rem); margin: 0;">
                        <i class="fa-solid fa-chart-pie"></i> Sistem Özeti
                    </h2>
                    <span id="welcome-message" style="color: #94a3b8; font-size: 0.95rem;">Hoş geldin, Yükleniyor...</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;">
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #f97316; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Toplam Yedek Parça</h3>
                        <div id="stat-parts" style="font-size: clamp(2rem, 5vw, 2.5rem); font-weight: bold; color: white;">...</div>
                    </div>
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #3b82f6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Kayıtlı Markalar</h3>
                        <div id="stat-brands" style="font-size: clamp(2rem, 5vw, 2.5rem); font-weight: bold; color: white;">...</div>
                    </div>
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Araç Modelleri</h3>
                        <div id="stat-models" style="font-size: clamp(2rem, 5vw, 2.5rem); font-weight: bold; color: white;">...</div>
                    </div>
                </div>

                <div id="stock-alerts-area" style="margin-bottom: 40px; display: none;">
                    <h3 style="color: #ef4444; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-size: 1.2rem;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Kritik Stok Uyarıları
                    </h3>
                    <div id="low-stock-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 15px;">
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 20px; border: 1px solid #334155;">
                    <h3 style="margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #334155; font-size: 1.2rem;">
                        <i class="fa-solid fa-clock-rotate-left"></i> Son Eklenen Parçalar
                    </h3>
                    
                    <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 10px;">
                        <table style="width: 100%; min-width: 750px; text-align: left; border-collapse: collapse;">
                            <thead>
                                <tr style="color: #94a3b8; border-bottom: 2px solid #334155;">
                                    <th style="padding: 12px; width: 60px;">Görsel</th>
                                    <th style="padding: 12px;">Parça Adı</th>
                                    <th style="padding: 12px;">Marka / Model</th>
                                    <th style="padding: 12px;">Stok Kodu</th>
                                    <th style="padding: 12px;">Fiyat</th>
                                    <th style="padding: 12px; text-align: right;">Detay</th>
                                </tr>
                            </thead>
                            <tbody id="recent-parts-body">
                                <tr><td colspan="6" style="text-align:center; padding: 20px;">Yükleniyor...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            document.getElementById('welcome-message').innerText = `Hoş geldin, ${user.full_name}`;
        }

        try {
            const [parts, brands, models] = await Promise.all([
                ApiService.get('/spare-parts'),
                ApiService.get('/brands'),
                ApiService.get('/models')
            ]);

            document.getElementById('stat-parts').innerText = parts.length;
            document.getElementById('stat-brands').innerText = brands.length;
            document.getElementById('stat-models').innerText = models.length;

            const lowStockParts = parts.filter(p => p.stock_quantity < 5);
            const alertsArea = document.getElementById('stock-alerts-area');
            const lowStockList = document.getElementById('low-stock-list');

            if (lowStockParts.length > 0) {
                alertsArea.style.display = 'block';
                let alertHtml = '';
                lowStockParts.forEach(p => {
                    alertHtml += `
                        <div onclick="window.location.hash='#part-detail?id=${p.id}'" 
                             style="cursor:pointer; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 15px; border-radius: 10px; display: flex; align-items: center; gap: 15px; transition: 0.2s;"
                             onmouseover="this.style.background='rgba(239, 68, 68, 0.2)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'">
                            <div style="background: #ef4444; color: white; min-width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                                ${p.stock_quantity}
                            </div>
                            <div style="overflow: hidden;">
                                <div style="font-weight: 600; font-size: 0.95rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                                <div style="font-size: 0.8rem; color: #fca5a5;">Stok tükenmek üzere!</div>
                            </div>
                        </div>
                    `;
                });
                lowStockList.innerHTML = alertHtml;
            }

            const tableBody = document.getElementById('recent-parts-body');
            if (parts.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px; color: #f97316;">Henüz sisteme parça eklenmemiş.</td></tr>`;
                return;
            }

            let tableHtml = '';
            const recentParts = parts.slice(0, 5); 

            recentParts.forEach(part => {
                const imgSrc = part.image_url ? `http://localhost:3000${part.image_url}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';
                
                tableHtml += `
                    <tr style="cursor: pointer; border-bottom: 1px solid #334155; transition: all 0.2s;" 
                        onmouseover="this.style.background='rgba(255,255,255,0.05)';" 
                        onmouseout="this.style.background='transparent';"
                        onclick="window.location.hash='#part-detail?id=${part.id}'">
                        
                        <td style="padding: 12px;">
                            <img src="${imgSrc}" style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png'">
                        </td>
                        <td style="padding: 12px; font-weight: 500; color: white; white-space: nowrap;">${part.name}</td>
                        <td style="padding: 12px; color: #cbd5e1; white-space: nowrap;">${part.brand_name} / ${part.model_name}</td>
                        <td style="padding: 12px; font-family: monospace; color: #94a3b8;">${part.sku}</td>
                        <td style="padding: 12px; color: #10b981; font-weight: bold; white-space: nowrap;">${parseFloat(part.price).toLocaleString('tr-TR')} ₺</td>
                        <td style="padding: 12px; text-align: right; color: var(--accent-color);">
                            <i class="fa-solid fa-chevron-right"></i>
                        </td>
                    </tr>
                `;
            });
            tableBody.innerHTML = tableHtml;

        } catch (error) {
            Notification.error("Dashboard verileri yüklenirken bir hata oluştu.");
        }
    }
};

export default DashboardView;