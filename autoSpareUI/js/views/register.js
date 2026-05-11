import Validator from '../utils/validator.js';
import Notification from '../utils/notification.js';
import ApiService from '../services/api.js';

const RegisterView = {
    render: () => {
        return `
            <div class="auth-card">
                <h2>Hesap Oluştur</h2>
                <p class="subtitle">AutoSpareParts portalına katılmak için bilgilerinizi girin</p>
                
                <form id="registerForm">
                    <div class="input-group">
                        <input type="text" id="reg-fullname" placeholder="Adınız soyadınız" required>
                        <i class="fa-solid fa-user-gear"></i>
                    </div>

                    <div class="input-group">
                        <input type="email" id="reg-email" placeholder="E-posta adresiniz" required>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    
                    <div class="input-group">
                        <input type="password" id="reg-password" placeholder="Şifreniz" required>
                        <i class="fa-solid fa-key"></i>
                    </div>
                    
                    <button type="submit" class="submit-btn" id="reg-btn">
                        <span>Kayıt Ol</span> <i class="fa-solid fa-arrow-right-long"></i>
                    </button>
                </form>
            </div>
        `;
    },

    afterRender: () => {
        const form = document.getElementById('registerForm');
        const btn = document.getElementById('reg-btn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('reg-fullname').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            //girdi doğrulama
            if (Validator.isEmpty(fullName)) {
                return Notification.warning('Lütfen ad soyad giriniz.');
            }
            if (!Validator.isValidEmail(email)) {
                return Notification.error('Geçersiz e-posta formatı!');
            }
            if (!Validator.isValidPassword(password)) {
                return Notification.error('Şifreniz en az 8 karakter olmalıdır.');
            }

            try {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> İşleniyor...`;

                //fetch fonksiyonu
                const response = await ApiService.post('/auth/register', {
                    fullName,
                    email,
                    password
                });

                await Notification.success('Kayıt Başarılı! Giriş yapabilirsiniz.');

                // Başarılıysa formu temizle
                form.reset();

            } catch (error) {
                Notification.error(error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<span>Kayıt Ol</span> <i class="fa-solid fa-arrow-right-long"></i>`;
            }
        });
    }
};

export default RegisterView;