const BASE_URL = 'http://localhost:3000/api';

const ApiService = {
    // 1. JSON verileri için klasik POST (Login/Register kullanıyor)
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                if (result.errors && result.errors.length > 0) throw new Error(result.errors[0].msg);
                throw new Error(result.error || result.message || 'Sunucu ile iletişim kurulamadı.');
            }
            return result;
        } catch (error) { throw error; }
    },

    // 2. YENİ: Resim/Dosya yüklemeleri için FormData POST (SparePart kullanacak)
    postFormData: async (endpoint, formData) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                // DİKKAT: Content-Type yok! Tarayıcı FormData olduğunu anlayıp kendi ayarlayacak.
                body: formData
            });
            const result = await response.json();
            if (!response.ok) {
                if (result.errors && result.errors.length > 0) throw new Error(result.errors[0].msg);
                throw new Error(result.error || result.message || 'Sunucu hatası.');
            }
            return result;
        } catch (error) { throw error; }
    },

    // 3. YENİ: Veri çekmek için GET (Marka, Model, Kategori listelemek için)
    get: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Veri çekilemedi.');
            return result;
        } catch (error) { throw error; }
    }
};

export default ApiService;