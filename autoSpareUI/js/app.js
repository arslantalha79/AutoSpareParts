import LoginView from './views/login.js';
import RegisterView from './views/register.js';
import SparePartsView from './views/spare-parts.js';
import DashboardView from './views/dashboard.js';
import PartDetailView from './views/part-detail.js';
import Notification from './utils/notification.js';
import PartsView from './views/parts.js';
import BrandsView from './views/brands.js';

const routes = {
    'login': LoginView,
    'register': RegisterView,
    'spare-parts': SparePartsView,
    'dashboard': DashboardView,
    'part-detail': PartDetailView,
    'parts': PartsView,
    'brands': BrandsView 
};

// Sisteme giriş gerektiren özel sayfalar
const privateRoutes = ['spare-parts', 'dashboard', 'part-detail', 'parts', 'brands'];

// Şu an hangi route render edildi — tekrar render önleme için
let currentRoute = null;

const checkAuth = () => {
    return !!localStorage.getItem('token');
};

const updateNavbar = (route) => {
    const isAuth = checkAuth();
    document.getElementById('guest-nav').style.display = isAuth ? 'none' : 'flex';
    document.getElementById('user-nav').style.display = isAuth ? 'flex' : 'none';
    document.getElementById('sidebar').style.display = isAuth ? 'flex' : 'none';

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${route}`) {
            link.classList.add('active');
        }
    });
};

const router = async () => {
    const app = document.getElementById('app');
    const rawHash = window.location.hash.replace('#', '') || 'login';
    const route = rawHash.split('?')[0];

    // 1. GÜVENLİK DUVARI
    if (privateRoutes.includes(route) && !checkAuth()) {
        Notification.warning("Bu sayfayı görüntülemek için giriş yapmalısınız.");
        window.location.hash = '#login';
        return;
    }

    // 2. GİRİŞ YAPMIŞ KULLANICI LOGIN/REGISTER'A GİTMESİN
    if ((route === 'login' || route === 'register') && checkAuth()) {
        window.location.hash = '#dashboard';
        return;
    }

    // 3. AYNI ROUTE TEKRAR GELİYORSA RENDER ETME
    // (SweetAlert kapanışı gibi sahte hashchange'leri engeller)
    const fullHash = rawHash; // query string dahil tam hash
    if (currentRoute === fullHash) {
        return;
    }
    currentRoute = fullHash;

    const View = routes[route] || routes['login'];
    updateNavbar(route);

    app.innerHTML = await View.render();
    if (View.afterRender) {
        await View.afterRender();
    }
};

// Çıkış Yapma
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentRoute = null; // Logout'ta guard'ı sıfırla
    Notification.success("Başarıyla çıkış yapıldı.");
    window.location.hash = '#login';
});

window.addEventListener('hashchange', router);
window.addEventListener('load', router);