# AutoSpareParts - Oto Yedek Parça Yönetim Sistemi

Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiş, oto yedek parça satışı yapan işletmeler için tasarlanmış web tabanlı bir CRUD (Oluşturma, Okuma, Güncelleme, Silme) uygulamasıdır. 

Sistem, RESTful API sağlayan bir Node.js backend ve kullanıcı etkileşimi için Vanilla Javascript ile geliştirilmiş bir Tek Sayfa Uygulaması (SPA) frontend arayüzünden oluşmaktadır.

## 📌 Mimari ve Tasarım Kararları

Projenin tasarımı ve veritabanı kurgusu, gerçek dünya iş süreçleri (business logic) göz önünde bulundurularak yapılmıştır:
* **Önceden Yüklenmiş Veriler (Seed Data):** `brands` (Markalar), `models` (Modeller) ve `category` (Kategoriler) gibi statik veriler, bir işletme sahibinin bunları tek tek girmesinin pratik olmaması sebebiyle doğrudan SQL scriptleri ile veritabanına eklenmiştir. Örneğin; sistemde "Renault Megane 4 1.3 TCe" gibi spesifik araç modelleri ve bunlara ait kategoriler varsayılan olarak tanımlıdır.
* **Dinamik Veriler:** Uygulama üzerinden asıl CRUD işlemleri, işletmenin günlük operasyonlarını yansıtan yedek parçalar ve `User` (Kullanıcı) varlıkları üzerinden yürütülmektedir.
* **Katmanlı Mimari:** İş mantığı (business logic) doğrudan route'lar içinde değil, controller ve service gibi ayrı katmanlarda izole edilerek modülerlik sağlanmıştır.

## 🚀 Teknolojiler

* **Frontend:** Vanilla JavaScript (SPA Mimarisi, sayfa yenilenmeden asenkron `fetch` işlemleri). *Not: Proje gereksinimleri doğrultusunda React, Vue veya Angular gibi frameworkler kullanılmamıştır*.
* **Backend:** Node.js, Express.js.
* **Veritabanı:** PostgreSQL (pgAdmin 4).
* **API Dokümantasyonu:** Swagger (OpenAPI 3.0).

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

### 1. Ön Koşullar
* Node.js (v18 veya üzeri)
* PostgreSQL yüklü ve çalışır durumda olmalıdır.

### 2. Veritabanı Kurulumu (Seed Data Dahil)
Sistemdeki statik verilerin (Markalar, Kategoriler, Modeller) ve test yedek parçalarının görüntülenebilmesi için hazırlanan SQL yedeğinin içeri aktarılması gerekmektedir:

1. PostgreSQL (pgAdmin vb. bir araç) üzerinde `autospareparts_db` adında boş bir veritabanı oluşturun.
2. Proje dizininde bulunan `database/autospareparts_backup.sql` dosyasını açın.
3. Bu dosyanın içindeki tüm SQL kodlarını kopyalayıp, oluşturduğunuz `autospareparts_db` veritabanında açacağınız bir **Query Tool (Sorgu Aracı)** penceresine yapıştırın ve çalıştırın.
   * *(Alternatif olarak pgAdmin üzerinden veritabanına sağ tıklayıp "Restore" diyerek bu dosyayı da seçebilirsiniz.)*
4. Bu işlem; gerekli tüm tabloları oluşturacak ve `brands`, `category`, `models` ile test verilerini içeren `sparepart` kayıtlarını sisteme otomatik olarak yükleyecektir.

3. Backend Kurulumu
Terminalden autoSpare klasörüne gidin:

Bash
cd autoSpare
Gerekli bağımlılıkları yükleyin:

Bash
npm install

Bunu yaptığınız takdirde autoSpare klasöründe bir node_modules klasörü oluşacaktır. Kontrol ediniz.

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
npm run dev
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