const BASE_URL = 'http://localhost:3000/api';

const ApiService = {
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            //http status --> 200 veya 201 değilse
            if (!response.ok) {
                // girdi doğrulama hataları
                if (result.errors && result.errors.length > 0) {
                    throw new Error(result.errors[0].msg); 
                }
                //service katmanından gelen hataları yakalıyoruz
                throw new Error(result.error || result.message || 'Sunucu ile iletişim kurulamadı.');
            }

            return result;
        } catch (error) {
            //hatayı frontend'e iletiyoruz.
            throw error; 
        }
    }
};

export default ApiService;