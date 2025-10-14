# Pro-Gect: Entegre Proje Yönetimi ve Otomasyon Platformu

Pro-Gect, modern yazılım projelerinin ihtiyaç duyduğu tüm araçları tek bir çatı altında toplayan, entegre bir proje yönetimi ve iş akışı otomasyon platformudur. Bu platform, görev yönetiminden sistem mimarisi görselleştirmesine, bütçe takibinden güçlü otomasyon araçlarına kadar geniş bir yelpazede özellikler sunar.

## ✨ Temel Özellikler

- **Merkezi Proje Panosu (Dashboard):** Projelerinizin genel durumunu, görev ilerlemesini, bütçeyi ve daha fazlasını tek bir ekranda görün.
- **Detaylı Görev Yönetimi:** Görevler, alt görevler, etiketler, atamalar ve yorumlar ile proje planınızı detaylandırın.
- **Görsel Sistem Mimarisi:** **React Flow** entegrasyonu ile projelerinizin teknik mimarisini sürükle-bırak arayüzüyle çizin ve yönetin.
- **Güçlü İş Akışı Otomasyonu:** Sektör standardı iki güçlü otomasyon aracını ( **n8n** ve **Node-RED** ) doğrudan arayüz içinden kullanın.
- **API Odaklı Mimari:** Proje verilerinize n8n, Node-RED veya diğer harici servisler üzerinden güvenli bir şekilde erişim ve manipülasyon imkanı sunan bir REST API.
- **Kişiselleştirilebilir Arayüz:** Açık ve koyu tema seçenekleri.

## 🛠️ Mimarisi ve Kullandığı Teknolojiler

Pro-Gect, birbirinden ayrı ama birbiriyle konuşan servislerden oluşan modern bir mimariye sahiptir.

1.  **Frontend (Arayüz):**
    - **Framework:** React (Vite ile)
    - **Dil:** TypeScript
    - **Stil:** Tailwind CSS
    - **Mimari Görselleştirme:** @xyflow/react (React Flow)

2.  **Backend - Otomasyon (n8n):**
    - **Platform:** n8n.io
    - **Çalışma Ortamı:** Node.js
    - **Açıklama:** Özellikle API'ler ve web servisleri arasında karmaşık iş akışları oluşturmak için kullanılır.

3.  **Backend - Otomasyon (Node-RED):**
    - **Platform:** Node-RED
    - **Çalışma Ortamı:** Node.js
    - **Açıklama:** Olay güdümlü ve genel amaçlı otomasyonlar için esnek bir platform sunar.

4.  **Backend - API Sunucusu:**
    - **Framework:** Express.js
    - **Dil:** TypeScript
    - **Veritabanı Erişimi:** Firebase Admin SDK
    - **Açıklama:** Frontend, n8n ve Node-RED arasında güvenli bir veri köprüsü görevi görür.

5.  **Veritabanı ve Kimlik Doğrulama:**
    - **Servis:** Google Firebase
    - **Veritabanı:** Firestore
    - **Kimlik Doğrulama:** Firebase Authentication (Google ile Giriş, Email/Şifre)

## 🚀 Projeyi Çalıştırma

Projenin tüm servislerini (Frontend, n8n, Node-RED, API Sunucusu) tek bir komutla başlatabilirsiniz.

**Gereksinimler:**
- Node.js (v18 veya üstü)
- npm

**Kurulum:**

1.  Proje ana dizininde bağımlılıkları kurun:
    ```bash
    npm install
    ```
2.  Her bir backend servisinin bağımlılıklarını kurun:
    ```bash
    cd backend && npm install
    cd ../backend-nodered && npm install
    cd ../api-server && npm install
    ```

**Çalıştırma:**

Proje ana dizinindeyken aşağıdaki komutu çalıştırın:

```bash
npm run start:all
```

Bu komut, `concurrently` aracılığıyla aşağıdaki sunucuları başlatacaktır:
- **Frontend (Vite):** `http://localhost:5173`
- **n8n Sunucusu:** `http://localhost:5678`
- **Node-RED Sunucusu:** `http://localhost:1880`
- **API Sunucusu:** `http://localhost:3001`

Uygulamaya erişmek için tarayıcınızda **`http://localhost:5173`** adresini açın.

### İlk Kurulum Notları

- **Node-RED Girişi:** "Automations" sayfasındaki Node-RED sekmesi ilk başta `401 Unauthorized` hatası verebilir. Giriş yapmak için yeni bir tarayıcı sekmesinde `http://localhost:1880` adresini açın ve aşağıdaki bilgilerle giriş yapın. Bu işlemden sonra uygulama içindeki arayüz de çalışacaktır.
  - **Kullanıcı Adı:** `admin`
  - **Şifre:** `pro-gect-nodered-password`

- **Firebase Kurulumu:** API sunucusunun çalışması için `api-server` klasörü içine `serviceAccountKey.json` dosyanızı eklemeniz gerekmektedir. Detaylar için Firebase dokümantasyonunu inceleyin.
- **Gemini API Kurulumu:** AI özelliklerinin çalışması için ana dizinde bir `.env` dosyası oluşturup `VITE_GEMINI_API_KEY=YOUR_API_KEY` şeklinde anahtarınızı eklemeniz gerekmektedir.
