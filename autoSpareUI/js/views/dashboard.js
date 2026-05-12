import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

const DashboardView = {
    render: () => {
        return `
            <div class="dashboard-container" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h2><i class="fa-solid fa-chart-pie"></i> Sistem Özeti</h2>
                    <span id="welcome-message" style="color: #94a3b8;">Hoş geldin, Yükleniyor...</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #f97316; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Toplam Yedek Parça</h3>
                        <div id="stat-parts" style="font-size: 2.5rem; font-weight: bold; color: white;">...</div>
                    </div>
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #3b82f6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Kayıtlı Markalar</h3>
                        <div id="stat-brands" style="font-size: 2.5rem; font-weight: bold; color: white;">...</div>
                    </div>
                    <div class="stat-card" style="background: rgba(15, 23, 42, 0.6); padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="color: #94a3b8; font-size: 1rem; margin-bottom: 10px;">Araç Modelleri</h3>
                        <div id="stat-models" style="font-size: 2.5rem; font-weight: bold; color: white;">...</div>
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 20px; border: 1px solid #334155;">
                    <h3 style="margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #334155;">
                        <i class="fa-solid fa-clock-rotate-left"></i> Son Eklenen Parçalar
                    </h3>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; text-align: left; border-collapse: collapse;">
                            <thead>
                                <tr style="color: #94a3b8; border-bottom: 2px solid #334155;">
                                    <th style="padding: 12px; width: 60px;">Görsel</th>
                                    <th style="padding: 12px;">Parça Adı</th>
                                    <th style="padding: 12px;">Marka / Model</th>
                                    <th style="padding: 12px;">Stok Kodu</th>
                                    <th style="padding: 12px;">Fiyat</th>
                                </tr>
                            </thead>
                            <tbody id="recent-parts-body">
                                <tr><td colspan="5" style="text-align:center; padding: 20px;">Yükleniyor...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        // Kullanıcı adını LocalStorage'dan alıp ekrana basma
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            document.getElementById('welcome-message').innerText = `Hoş geldin, ${user.full_name}`;
        }

        try {
            // API'den verileri paralel olarak (aynı anda) çekiyoruz (Performans için Promise.all kullanıyoruz)
            const [parts, brands, models] = await Promise.all([
                ApiService.get('/spare-parts'),
                ApiService.get('/brands'),
                ApiService.get('/models')
            ]);

            // İstatistikleri Güncelle
            document.getElementById('stat-parts').innerText = parts.length;
            document.getElementById('stat-brands').innerText = brands.length;
            document.getElementById('stat-models').innerText = models.length;

            // Tabloyu Doldur (Sadece son 5 parçayı gösterelim)
            const tableBody = document.getElementById('recent-parts-body');
            
            if (parts.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #f97316;">Henüz sisteme parça eklenmemiş.</td></tr>`;
                return;
            }

            let tableHtml = '';
            // En yeni 5 parçayı al (API'den zaten tarihe göre azalan sırayla geliyordu)
            const recentParts = parts.slice(0, 5); 

            recentParts.forEach(part => {
                // Eğer kendi resmimizi indirdiysek localhost'tan, yoksa varsayılan ikon
                const imgSrc = part.image_url ? `http://localhost:3000${part.image_url}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';
                
                tableHtml += `
                    <tr style="border-bottom: 1px solid #334155; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                        <td style="padding: 12px;">
                            <img src="${imgSrc}" style="width: 40px; height: 40px; border-radius: 5px; object-fit: cover;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png'">
                        </td>
                        <td style="padding: 12px; font-weight: 500; color: white;">${part.name}</td>
                        <td style="padding: 12px; color: #cbd5e1;">${part.brand_name} / ${part.model_name}</td>
                        <td style="padding: 12px; font-family: monospace; color: #94a3b8;">${part.sku}</td>
                        <td style="padding: 12px; color: #10b981; font-weight: bold;">${parseFloat(part.price).toLocaleString('tr-TR')} ₺</td>
                    </tr>
                `;
            });
            
            tableBody.innerHTML = tableHtml;

        } catch (error) {
            Notification.error("Dashboard verileri yüklenirken bir hata oluştu.");
            console.error(error);
        }
    }
};

export default DashboardView;