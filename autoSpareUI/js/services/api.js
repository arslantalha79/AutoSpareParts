const BASE_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const ApiService = {
    // 1. JSON verileri için klasik POST (Login/Register kullanıyor)
    post: async (endpoint, data, method = 'POST') => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
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
                headers: {
                    ...getAuthHeaders()
                },
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
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    ...getAuthHeaders() // YENİ: Get işlemlerine de token eklendi
                }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Veri çekilemedi.');
            return result;
        } catch (error) { throw error; }
    }
};

export default ApiService;