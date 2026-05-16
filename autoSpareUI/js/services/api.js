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

    // 2. Resim/Dosya yüklemeleri için FormData POST (SparePart kullanıyor)
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

    // 3. Veri çekmek için GET
    get: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    ...getAuthHeaders()
                }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Veri çekilemedi.');
            return result;
        } catch (error) { throw error; }
    },

    // 4. Kayıt silmek için DELETE
    delete: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeaders()
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || result.message || 'Silme işlemi başarısız.');
            }
            return result;
        } catch (error) { throw error; }
    }
};

export default ApiService;