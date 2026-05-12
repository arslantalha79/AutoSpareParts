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

const checkAuth = () => {
    return !!localStorage.getItem('token'); // Token varsa true, yoksa false döner
};

const updateNavbar = (currentRoute) => {
    const isAuth = checkAuth();
    document.getElementById('guest-nav').style.display = isAuth ? 'none' : 'flex';
    document.getElementById('user-nav').style.display = isAuth ? 'flex' : 'none';

    document.getElementById('sidebar').style.display = isAuth ? 'flex' : 'none';

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentRoute}`) {
            link.classList.add('active');
        }
    });
};

const router = async () => {
    //reactteki <App></App> tag mantığı
    const app = document.getElementById('app');
    let rawHash = window.location.hash.replace('#', '') || 'login';
    let route = rawHash.split('?')[0]; // "?id=5" kısmını atıp sadece sayfa adını alır

    // 1. GÜVENLİK DUVARI: Giriş yapmamış biri özel sayfaya girmeye çalışıy orsa
    if (privateRoutes.includes(route) && !checkAuth()) {
        Notification.warning("Bu sayfayı görüntülemek için giriş yapmalısınız.");
        window.location.hash = '#login';
        return;
    }

    // 2. GEREKSİZ EKRAN ENGELİ: Giriş yapmış biri Login/Register'a gitmeye çalışıyorsa
    if ((route === 'login' || route === 'register') && checkAuth()) {
        window.location.hash = '#dashboard';
        return;
    }

    // İlgili görünümü (View) bul, yoksa login'e at
    const View = routes[route] || routes['login'];
    // Navbar'ı kullanıcının durumuna göre güncelle
    updateNavbar(route);

    // Sayfayı Ekrana Bas
    app.innerHTML = await View.render();
    if (View.afterRender) {
        await View.afterRender();
    }
};

// Çıkış Yapma İşlemi
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Notification.success("Başarıyla çıkış yapıldı.");
    window.location.hash = '#login';
});

// Sayfa yüklendiğinde veya hash (URL) değiştiğinde router'ı çalıştır
window.addEventListener('hashchange', router);
window.addEventListener('load', router);