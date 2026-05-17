import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

const PartDetailView = {
    render: () => {
        return `
            <div style="max-width: 1000px; margin: 0 auto; width: 100%;">
                <a href="#parts" class="nav-link-btn" style="display: inline-flex; margin-bottom: 20px; background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-color); width: fit-content;">
                    <i class="fa-solid fa-arrow-left"></i> Parçalara Dön
                </a>
                
                <div id="detail-content">
                    <div style="text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Veriler Çekiliyor...</div>
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const partId = params.get('id');

        if (!partId) {
            Notification.error("Parça ID bulunamadı.");
            window.location.hash = '#dashboard';
            return;
        }

        try {
            const parts = await ApiService.get('/spare-parts');
            const part = parts.find(p => p.id == partId);

            if (!part) {
                Notification.error("Parça veritabanında bulunamadı.");
                window.location.hash = '#dashboard';
                return;
            }

            const imgSrc = part.image_url ? `http://localhost:3000${part.image_url}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';
            const isStockOut = part.stock_quantity <= 0;
            const stockColor = isStockOut ? '#ef4444' : '#10b981';
            const stockText = isStockOut ? 'Stok Tükendi' : `${part.stock_quantity} Adet Stokta`;
            const stockIcon = isStockOut ? 'fa-xmark' : 'fa-check';

            // MOBİL UYUM: padding ve gap değerleri clamp ile esnekleştirildi
            document.getElementById('detail-content').innerHTML = `
                <div style="display: flex; flex-wrap: wrap; gap: clamp(20px, 4vw, 40px); background: rgba(15, 23, 42, 0.7); padding: clamp(20px, 5vw, 40px); border-radius: 20px; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    
                    <div style="flex: 1; min-width: 250px; display: flex; justify-content: center; align-items: center; background: rgba(255,255,255,0.02); padding: clamp(15px, 4vw, 30px); border-radius: 16px; border: 1px dashed var(--border-color);">
                        <img src="${imgSrc}" style="max-width: 100%; max-height: 350px; object-fit: contain; filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.5)); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>

                    <div style="flex: 1.2; min-width: 250px; display: flex; flex-direction: column; gap: 20px;">
                        
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <span style="background: rgba(249, 115, 22, 0.15); color: var(--accent-color); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(249, 115, 22, 0.3);">
                                <i class="fa-solid fa-car-side"></i> ${part.brand_name} ${part.model_name}
                            </span>
                            <span style="background: rgba(59, 130, 246, 0.15); color: #3b82f6; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.3);">
                                <i class="fa-solid fa-layer-group"></i> ${part.category_name}
                            </span>
                        </div>
                        
                        <div>
                            <h1 style="font-size: clamp(1.6rem, 5vw, 2.2rem); color: white; margin: 0; line-height: 1.2;">${part.name}</h1>
                            <div style="font-family: monospace; color: var(--text-muted); font-size: 1rem; margin-top: 8px;">
                                <i class="fa-solid fa-barcode"></i> SKU: ${part.sku}
                            </div>
                        </div>
                        
                        <div style="background: var(--primary-color); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <div style="font-size: clamp(2rem, 6vw, 2.5rem); font-weight: 700; color: white;">
                                ${parseFloat(part.price).toLocaleString('tr-TR')} <span style="font-size: clamp(1.2rem, 4vw, 1.5rem); color: var(--accent-color);">₺</span>
                            </div>
                            <div style="background: ${stockColor}15; color: ${stockColor}; padding: 10px 18px; border-radius: 10px; border: 1px solid ${stockColor}40; font-weight: 600; font-size: 1rem; text-align: center;">
                                <i class="fa-solid ${stockIcon}"></i> ${stockText}
                            </div>
                        </div>

                        <div style="margin-top: 10px;">
                            <h3 style="color: white; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-info" style="color: var(--accent-color);"></i> Ürün Açıklaması
                            </h3>
                            <p style="color: #cbd5e1; line-height: 1.7; font-size: 0.95rem; background: rgba(255,255,255,0.02); padding: 15px; border-radius: 10px;">
                                ${part.description || 'Bu yedek parça için detaylı bir açıklama girilmemiştir.'}
                            </p>
                        </div>

                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                            <button id="btn-edit" class="submit-btn" style="flex: 1 1 calc(50% - 10px); min-width: 130px; background: transparent; border: 1px solid #3b82f6; color: #3b82f6; padding: 10px;">
                                <i class="fa-solid fa-pen-to-square"></i> Düzenle
                            </button>
                            <button id="btn-replenish" class="submit-btn" style="flex: 1 1 calc(50% - 10px); min-width: 130px; background: transparent; border: 1px solid #10b981; color: #10b981; padding: 10px;">
                                <i class="fa-solid fa-plus"></i> Stok Yenile
                            </button>
                            <button id="btn-decrease" class="submit-btn" style="flex: 1 1 calc(50% - 10px); min-width: 130px; background: transparent; border: 1px solid #f59e0b; color: #f59e0b; padding: 10px;">
                                <i class="fa-solid fa-minus"></i> Stok Düş
                            </button>
                            <button id="btn-delete" class="submit-btn" style="flex: 1 1 calc(50% - 10px); min-width: 130px; background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 10px;">
                                <i class="fa-solid fa-trash"></i> Sil
                            </button>
                        </div>

                    </div>
                </div>
            `;

            // --- 1. DÜZENLE (UPDATE) ---
            document.getElementById('btn-edit').addEventListener('click', async () => {
                const { value: formValues } = await window.Swal.fire({
                    title: 'Parça Bilgilerini Güncelle',
                    html: `
                        <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
                            <label style="color: var(--text-muted); font-size: 0.85rem;">Parça Adı</label>
                            <input id="swal-name" class="swal2-input" style="margin:0; width:100%; box-sizing: border-box;" value="${part.name}">
                            
                            <label style="color: var(--text-muted); font-size: 0.85rem; margin-top:10px;">SKU (Stok Kodu)</label>
                            <input id="swal-sku" class="swal2-input" style="margin:0; width:100%; box-sizing: border-box;" value="${part.sku}">
                            
                            <label style="color: var(--text-muted); font-size: 0.85rem; margin-top:10px;">Fiyat (₺)</label>
                            <input id="swal-price" type="number" step="0.01" class="swal2-input" style="margin:0; width:100%; box-sizing: border-box;" value="${part.price}">
                            
                            <label style="color: var(--text-muted); font-size: 0.85rem; margin-top:10px;">Açıklama</label>
                            <textarea id="swal-desc" class="swal2-textarea" style="margin:0; width:100%; height:80px; box-sizing: border-box;">${part.description || ''}</textarea>
                        </div>
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Kaydet',
                    cancelButtonText: 'İptal',
                    background: 'var(--secondary-bg)',
                    color: 'white',
                    preConfirm: () => {
                        return {
                            name: document.getElementById('swal-name').value,
                            sku: document.getElementById('swal-sku').value,
                            price: parseFloat(document.getElementById('swal-price').value),
                            description: document.getElementById('swal-desc').value
                        };
                    }
                });

                if (formValues) {
                    try {
                        await ApiService.post(`/spare-parts/${partId}`, formValues, 'PUT');
                        await Notification.success('Parça bilgileri başarıyla güncellendi!');
                        window.location.reload();
                    } catch (error) {
                        Notification.error(error.message);
                    }
                }
            });

            // --- 2. STOK YENİLEME ---
            document.getElementById('btn-replenish').addEventListener('click', async () => {
                const { value: amount } = await window.Swal.fire({
                    title: 'Stok Girişi Yap',
                    input: 'number',
                    inputLabel: 'Eklenecek stok miktarını giriniz:',
                    inputValue: 5,
                    showCancelButton: true,
                    confirmButtonText: 'Stoğa Ekle',
                    cancelButtonText: 'İptal',
                    background: 'var(--secondary-bg)',
                    color: 'white'
                });

                if (amount && parseInt(amount) > 0) {
                    try {
                        await ApiService.post(`/spare-parts/${partId}/replenish-stock`, { amount: parseInt(amount) }, 'PATCH');
                        await Notification.success('Stok başarıyla eklendi!');
                        window.location.reload();
                    } catch (error) {
                        Notification.error(error.message);
                    }
                }
            });

            // --- 3. STOK DÜŞME ---
            document.getElementById('btn-decrease').addEventListener('click', async () => {
                const { value: amount } = await window.Swal.fire({
                    title: 'Stok Çıkışı Yap',
                    input: 'number',
                    inputLabel: 'Düşülecek stok miktarını giriniz:',
                    inputValue: 1,
                    showCancelButton: true,
                    confirmButtonText: 'Stoktan Düş',
                    cancelButtonText: 'İptal',
                    background: 'var(--secondary-bg)',
                    color: 'white'
                });

                if (amount && parseInt(amount) > 0) {
                    try {
                        await ApiService.post(`/spare-parts/${partId}/decrease-stock`, { amount: parseInt(amount) }, 'PATCH');
                        await Notification.success('Stok başarıyla düşüldü!');
                        window.location.reload();
                    } catch (error) {
                        Notification.error(error.message);
                    }
                }
            });

            // --- 4. SİL (DELETE) ---
            document.getElementById('btn-delete').addEventListener('click', async () => {
                const { isConfirmed } = await window.Swal.fire({
                    title: 'Parçayı Sil',
                    html: `
                        <div style="text-align: center;">
                            <div style="font-size: 3.5rem; margin-bottom: 15px;">🗑️</div>
                            <p style="color: #cbd5e1; font-size: 1rem; line-height: 1.6; margin: 0;">
                                <strong style="color: white;">${part.name}</strong> adlı parçayı silmek istediğinizden emin misiniz?
                            </p>
                            <p style="color: #ef4444; font-size: 0.85rem; margin-top: 12px; background: rgba(239,68,68,0.1); padding: 10px; border-radius: 8px; border: 1px solid rgba(239,68,68,0.25);">
                                <i class="fa-solid fa-triangle-exclamation"></i> Bu işlem geri alınamaz!
                            </p>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: '<i class="fa-solid fa-trash"></i> Evet, Sil',
                    cancelButtonText: 'Vazgeç',
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: 'transparent',
                    background: 'var(--secondary-bg)',
                    color: 'white',
                    customClass: {
                        cancelButton: 'swal-cancel-custom'
                    }
                });

                if (isConfirmed) {
                    try {
                        await ApiService.delete(`/spare-parts/${partId}`);
                        await Notification.success(`"${part.name}" başarıyla silindi.`);
                        window.location.hash = '#parts';
                    } catch (error) {
                        Notification.error(error.message || 'Parça silinirken bir hata oluştu.');
                    }
                }
            });

        } catch (error) {
            Notification.error("Veriler alınırken bir sorun oluştu.");
        }
    }
};

export default PartDetailView;