import LoginView from './views/login.js';
import RegisterView from './views/register.js';

//url-arayüz eşleştirmesi
const routes = {
    'login': LoginView,
    'register': RegisterView
};

// Uygulamanın kalbi olan div'i yakalıyoruz. React'teki <App></App> tag mantığı
const appDiv = document.getElementById('app');

// Yönlendirme (Routing(Url)) fonksiyonu
const navigateTo = (route) => {
    // Eğer girilen rota listede yoksa varsayılan olarak login sayfasını seç
    const ViewComponent = routes[route] || routes['login'];
    
    // Seçilen sayfanın HTML'ini app div'inin içine bas
    appDiv.innerHTML = ViewComponent.render();
    
    // HTML basıldıktan sonra, o sayfanın buton özelliklerini aktif et
    if (ViewComponent.afterRender) {
        ViewComponent.afterRender();
    }
};

// Menüdeki linklere tıklanma olayını dinliyoruz
document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Tarayıcının varsayılan sayfa değiştirme huyunu iptal et!
        const routeName = e.target.getAttribute('data-route'); 
        navigateTo(routeName); 
    });
});

// Sayfa ilk yüklendiğinde otomatik olarak login ekranını aç
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('login');
});