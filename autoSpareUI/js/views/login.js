import Validator from '../utils/validator.js';
import Notification from '../utils/notification.js'; // İsim değişti
import ApiService from '../services/api.js';

const LoginView = {
    render: () => {
        return `
            <div class="auth-card">
                <h2>Yönetim Paneli</h2>
                <p class="subtitle">Sisteme erişmek için kimlik bilgilerinizi doğrulayın</p>
                
                <form id="loginForm">
                    <div class="input-group">
                        <input type="email" id="email" placeholder="E-posta adresiniz" required>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    
                    <div class="input-group">
                        <input type="password" id="password" placeholder="Şifreniz" required>
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    
                    <button type="submit" class="submit-btn" id="login-btn">
                        <span>Giriş Yap</span> <i class="fa-solid fa-gauge-high"></i>
                    </button>
                </form>
            </div>
        `;
    },

    afterRender: () => {
        const form = document.getElementById('loginForm');
        const btn = document.getElementById('login-btn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // --- FRONTEND DOĞRULAMA ---
            if (!Validator.isValidEmail(email)) {
                return Notification.error('Geçersiz e-posta formatı!');
            }
            if (Validator.isEmpty(password)) {
                return Notification.warning('Şifre alanı boş bırakılamaz.');
            }

            try {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Doğrulanıyor...`;

                //fetch fonksiyonumuz
                const response = await ApiService.post('/auth/login', { email, password });

                // Başarılı Modal
                await Notification.success('Giriş Başarılı! Yönlendiriliyorsunuz...');

                // Backend'den gelen Token'ı kaydet
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));

                // İleride Dashboard'a yönlendirme buraya gelecek
                console.log("Token Kaydedildi.");

            } catch (error) {
                // Backend hatasını Error Modal ile göster
                Notification.error(error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<span>Giriş Yap</span> <i class="fa-solid fa-gauge-high"></i>`;
            }
        });
    }
};

export default LoginView;