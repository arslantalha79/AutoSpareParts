import ApiService from '../services/api.js';
import Notification from '../utils/notification.js';

const PartsView = {
    currentPage: 1,
    itemsPerPage: 12,
    allParts: [],

    render: () => {
        return `
            <div style="max-width: 1400px; margin: 0 auto; width: 100%;">
                
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 30px;">
                    <div>
                        <h2 style="font-size: clamp(1.4rem, 4vw, 1.8rem); margin-bottom: 5px;">
                            <i class="fa-solid fa-layer-group text-accent"></i> Tüm Yedek Parçalar
                        </h2>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Sistemde kayıtlı tüm parçaları buradan yönetebilirsiniz.</p>
                    </div>
                    
                    <a href="#spare-parts" class="submit-btn" style="width: auto; padding: 10px 20px; font-size: 0.95rem; text-decoration: none; white-space: nowrap;">
                        <i class="fa-solid fa-plus"></i> Yeni Parça Ekle
                    </a>
                </div>

                <div id="parts-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                    <div style="grid-column: 1 / -1; text-align:center; padding: 50px;">
                        <i class="fa-solid fa-spinner fa-spin fa-2x"></i> Parçalar Çekiliyor...
                    </div>
                </div>

                <div id="pagination-container" style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 40px; flex-wrap: wrap;"></div>
            </div>
        `;
    },

    afterRender: async () => {
        try {
            PartsView.allParts = await ApiService.get('/spare-parts');
            PartsView.currentPage = 1;
            PartsView.renderPage();
        } catch (error) {
            Notification.error("Parçalar yüklenemedi.");
        }
    },

    renderPage: () => {
        const { allParts, currentPage, itemsPerPage } = PartsView;
        const grid = document.getElementById('parts-grid');
        const paginationContainer = document.getElementById('pagination-container');

        if (!grid) return;

        if (allParts.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--accent-color); padding: 40px; background: rgba(15,23,42,0.5); border-radius: 12px;">
                    Sistemde kayıtlı parça bulunamadı.
                </div>`;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        const totalPages = Math.ceil(allParts.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageParts = allParts.slice(startIndex, endIndex);

        let html = '';
        pageParts.forEach(part => {
            const imgSrc = part.image_url
                ? `http://localhost:3000${part.image_url}`
                : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png';

            html += `
                <div class="part-card"
                    style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.3s; cursor: pointer; display: flex; flex-direction: column;"
                    onclick="window.location.hash='#part-detail?id=${part.id}'"
                    onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='var(--accent-color)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--border-color)';">

                    <div style="height: 180px; background: rgba(255,255,255,0.02); display: flex; justify-content: center; align-items: center; padding: 20px; border-bottom: 1px solid var(--border-color);">
                        <img src="${imgSrc}"
                            style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));"
                            onerror="this.src='https://cdn-icons-png.flaticon.com/512/3202/3202926.png'">
                    </div>

                    <div style="padding: 20px; display: flex; flex-direction: column; flex: 1;">
                        <div style="font-size: 0.75rem; font-weight: 700; color: #3b82f6; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.5px;">
                            ${part.brand_name} ${part.model_name}
                        </div>
                        <h3 style="font-size: 1.1rem; color: white; margin-bottom: 10px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${part.name}
                        </h3>
                        
                        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-top: auto; gap: 10px;">
                            <span style="font-family: monospace; color: #94a3b8; font-size: 0.85rem;">${part.sku}</span>
                            <span style="font-size: clamp(1.1rem, 3vw, 1.25rem); font-weight: bold; color: #10b981;">
                                ${parseFloat(part.price).toLocaleString('tr-TR')} ₺
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;

        if (paginationContainer) {
            PartsView.renderPagination(paginationContainer, totalPages);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderPagination: (container, totalPages) => {
        const { currentPage } = PartsView;

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        const btnBase = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            padding: 0 12px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: rgba(15, 23, 42, 0.6);
            color: #94a3b8;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        `;

        const activeStyle = `
            background: var(--accent-color, #f97316);
            border-color: var(--accent-color, #f97316);
            color: white;
            font-weight: 700;
        `;

        const disabledStyle = `
            opacity: 0.4;
            cursor: not-allowed;
        `;

        const getPageNumbers = () => {
            const delta = 2;
            const range = [];
            const left = Math.max(2, currentPage - delta);
            const right = Math.min(totalPages - 1, currentPage + delta);

            range.push(1);
            if (left > 2) range.push('...');
            for (let i = left; i <= right; i++) range.push(i);
            if (right < totalPages - 1) range.push('...');
            if (totalPages > 1) range.push(totalPages);

            return range;
        };

        let html = '';

        html += `
            <button
                onclick="${currentPage > 1 ? 'PartsView.goToPage(' + (currentPage - 1) + ')' : ''}"
                style="${btnBase} ${currentPage === 1 ? disabledStyle : ''}"
                ${currentPage === 1 ? 'disabled' : ''}
                onmouseover="${currentPage > 1 ? "this.style.borderColor='var(--accent-color,#f97316)'; this.style.color='var(--accent-color,#f97316)';" : ''}"
                onmouseout="${currentPage > 1 ? "this.style.borderColor='var(--border-color)'; this.style.color='#94a3b8';" : ''}">
                <i class="fa-solid fa-chevron-left" style="font-size: 0.75rem;"></i>
            </button>
        `;

        const pageNumbers = getPageNumbers();
        pageNumbers.forEach(page => {
            if (page === '...') {
                html += `<span style="${btnBase} cursor: default; border: none; background: transparent;">…</span>`;
            } else {
                const isActive = page === currentPage;
                html += `
                    <button
                        onclick="PartsView.goToPage(${page})"
                        style="${btnBase} ${isActive ? activeStyle : ''}"
                        onmouseover="${!isActive ? "this.style.borderColor='var(--accent-color,#f97316)'; this.style.color='var(--accent-color,#f97316)';" : ''}"
                        onmouseout="${!isActive ? "this.style.borderColor='var(--border-color)'; this.style.color='#94a3b8';" : ''}">
                        ${page}
                    </button>
                `;
            }
        });

        html += `
            <button
                onclick="${currentPage < totalPages ? 'PartsView.goToPage(' + (currentPage + 1) + ')' : ''}"
                style="${btnBase} ${currentPage === totalPages ? disabledStyle : ''}"
                ${currentPage === totalPages ? 'disabled' : ''}
                onmouseover="${currentPage < totalPages ? "this.style.borderColor='var(--accent-color,#f97316)'; this.style.color='var(--accent-color,#f97316)';" : ''}"
                onmouseout="${currentPage < totalPages ? "this.style.borderColor='var(--border-color)'; this.style.color='#94a3b8';" : ''}">
                <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
            </button>
        `;

        // Mobilde sayfa bilgisi metnini ortalamak için text-align eklendi
        html += `
            <div style="color: #94a3b8; font-size: 0.85rem; width: 100%; text-align: center; margin-top: 10px;">
                ${currentPage} / ${totalPages} sayfa
                <span style="color: #64748b;">(${PartsView.allParts.length} parça)</span>
            </div>
        `;

        container.innerHTML = html;
    },

    goToPage: (page) => {
        const totalPages = Math.ceil(PartsView.allParts.length / PartsView.itemsPerPage);
        if (page < 1 || page > totalPages) return;
        PartsView.currentPage = page;
        PartsView.renderPage();
    }
};

window.PartsView = PartsView;
export default PartsView;