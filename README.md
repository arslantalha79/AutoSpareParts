# AutoSpareParts - Oto Yedek Parça Yönetim Sistemi

[cite_start]Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiş, oto yedek parça satışı yapan işletmeler için tasarlanmış web tabanlı bir CRUD (Oluşturma, Okuma, Güncelleme, Silme) uygulamasıdır[cite: 4, 8]. 

[cite_start]Sistem, RESTful API sağlayan bir Node.js backend ve kullanıcı etkileşimi için Vanilla Javascript ile geliştirilmiş bir Tek Sayfa Uygulaması (SPA) frontend arayüzünden oluşmaktadır[cite: 8, 23].

## 📌 Mimari ve Tasarım Kararları

Projenin tasarımı ve veritabanı kurgusu, gerçek dünya iş süreçleri (business logic) göz önünde bulundurularak yapılmıştır:
* **Önceden Yüklenmiş Veriler (Seed Data):** `brands` (Markalar), `models` (Modeller) ve `category` (Kategoriler) gibi statik veriler, bir işletme sahibinin bunları tek tek girmesinin pratik olmaması sebebiyle doğrudan SQL scriptleri ile veritabanına eklenmiştir. Örneğin; sistemde "Renault Megane 4 1.3 TCe" gibi spesifik araç modelleri ve bunlara ait kategoriler varsayılan olarak tanımlıdır.
* [cite_start]**Dinamik Veriler:** Uygulama üzerinden asıl CRUD işlemleri, işletmenin günlük operasyonlarını yansıtan yedek parçalar ve `User` (Kullanıcı) varlıkları üzerinden yürütülmektedir[cite: 19].
* [cite_start]**Katmanlı Mimari:** İş mantığı (business logic) doğrudan route'lar içinde değil, controller ve service gibi ayrı katmanlarda izole edilerek modülerlik sağlanmıştır[cite: 30].

## 🚀 Teknolojiler

* [cite_start]**Frontend:** Vanilla JavaScript (SPA Mimarisi, sayfa yenilenmeden asenkron `fetch` işlemleri)[cite: 23, 24, 25]. [cite_start]*Not: Proje gereksinimleri doğrultusunda React, Vue veya Angular gibi frameworkler kullanılmamıştır*[cite: 26].
* [cite_start]**Backend:** Node.js, Express.js[cite: 13].
* **Veritabanı:** PostgreSQL (pgAdmin 4).
* [cite_start]**API Dokümantasyonu:** Swagger (OpenAPI 3.0).

## 📁 Proje Yapısı

```text
AUTOSPAREPARTS/
├── autoSpare/                  # Backend API (Node.js & Express)
│   ├── src/
│   │   ├── config/             # Veritabanı vb. konfigürasyonlar
│   │   ├── controllers/        # İş mantığı ve API yanıtları
│   │   ├── middlewares/        # JWT doğrulama, hata yakalama vb.
│   │   ├── models/             # Veritabanı modelleri
│   │   ├── repositories/       # Veri erişim katmanı
│   │   ├── routes/             # API uç noktalarının tanımları
│   │   ├── services/           # Servis katmanı
│   │   ├── utils/              # Yardımcı fonksiyonlar
│   │   └── server.js           # Uygulama başlangıç noktası
│   ├── uploads/                # Yüklenen parça ve marka görselleri
│   └── .env                    # Çevresel değişkenler
└── autoSpareUI/                # Frontend (Vanilla JS SPA)
    ├── assets/                 # Görseller vb. statik dosyalar
    ├── css/                    # Stil dosyaları
    ├── js/
    │   ├── services/           # API çağrılarını yapan servisler (fetch)
    │   ├── utils/              # UI yardımcı fonksiyonları
    │   └── views/              # Dinamik render edilen sayfa görünümleri
    ├── app.js                  # Frontend SPA yönlendirme (routing) mantığı
    └── index.html              # Ana HTML şablonu




⚙️ Kurulum ve Çalıştırma Adımları (Yeniden Üretim)
Projeyi yerel makinenizde test etmek ve yeniden üretmek için aşağıdaki adımları sırasıyla uygulayınız.  

1. Ön Koşullar
Node.js (v18 veya üzeri)

PostgreSQL yüklü ve çalışır durumda olmalıdır.

2. Veritabanı Kurulumu
PostgreSQL'de autospareparts_db adında yeni bir veritabanı oluşturun.

Proje ile birlikte teslim edilen başlangıç SQL dosyasını bu veritabanında çalıştırarak tabloları oluşturun ve statik verileri (marka, model vb.) yükleyin.

3. Backend Kurulumu
Terminalden autoSpare klasörüne gidin:

Bash

cd autoSpare
Gerekli bağımlılıkları yükleyin:

Bash

npm install
autoSpare klasörü içinde bir .env dosyası oluşturun ve veritabanı bilgilerinizi girin:

Kod snippet'i

PORT=3000
DB_USER=<veritabanı_kullanıcı_adı>
DB_PASSWORD=<veritabanı_şifreniz>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autospareparts_db
JWT_SECRET=<gizli_anahtarınız>
Sunucuyu başlatın:

Bash

npm start
Sunucu varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

4. Frontend Kurulumu
Frontend Vanilla JS ile yazıldığı için ekstra bir derleme adımına ihtiyaç duymaz.

autoSpareUI klasörünü açın.

index.html dosyasını VS Code üzerinden "Live Server" eklentisiyle veya doğrudan bir modern web tarayıcısında açarak arayüze erişebilirsiniz.

📖 API Dokümantasyonu (Swagger)
Sistemin sunduğu tüm endpoint'leri keşfetmek ve test etmek için Swagger arayüzü entegre edilmiştir. Backend sunucusu çalışırken aşağıdaki adresten interaktif dokümantasyona ulaşabilirsiniz:  

👉 URL: http://localhost:3000/api-docs


Temel API Uç Noktaları (JSON formatında istek/cevap):   

Auth: /api/auth/register, /api/auth/login

SpareParts (CRUD): * GET /api/spare-parts (Tüm parçaları listele)

POST /api/spare-parts (Yeni parça ekle)

PUT /api/spare-parts/{id} (Parça güncelle)

DELETE /api/spare-parts/{id} (Parça sil)

Salt Okunur (Seed) Varlıklar: /api/brands, /api/categories, /api/models

Geliştirici: Ömer Talha ARSLAN