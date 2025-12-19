# Weather App

A secure and responsive weather application built with HTML, CSS, and JavaScript, using Netlify Serverless Functions to protect API keys.
HTML, CSS ve JavaScript kullanılarak yapılmış, API anahtarlarını korumak için Netlify Serverless Functions kullanan güvenli ve responsive bir hava durumu uygulaması.

---

### 🖥️ Live Demo / Canlı Önizleme
🔗 [View Site / Siteyi Görüntüle](https://baris-weather-app.netlify.app)

---

### 🔐 Security Feature / Güvenlik Özelliği
This project features a secure backend bridge via Netlify Serverless Functions to keep API credentials private.
Bu proje, API anahtarını ön yüzden (frontend) gizlemek için bir vekil sunucu (Netlify Functions) kullanır.

* **Problem:** Storing API keys in JavaScript files is insecure. / API anahtarlarını JS dosyalarında saklamak güvensizdir.
* **Solution:** The key is stored in Netlify's environment variables and accessed via a serverless function. / Anahtar, Netlify ortam değişkenlerinde saklanır ve bir serverless fonksiyon aracılığıyla erişilir.

---

### 💻 Technologies Used / Kullanılan Teknolojiler
* **HTML5 & CSS3** – UI and Responsive Design / Arayüz ve Responsive Tasarım
* **JavaScript (ES6+)** – Fetch API and Data Handling / Fetch API ve Veri Yönetimi
* **Netlify Functions** – Serverless backend for API security / API güvenliği için serverless arka uç
* **WeatherAPI.com** – Weather data provider / Hava durumu veri sağlayıcısı

---

## 📱 Responsive Design / Responsive Tasarım

### 🖥️ Desktop View / Masaüstü Görünümü
![Desktop](screenshots/laptop.png)

### 📱 Mobile View / Mobil Görünüm
![Mobile](screenshots/mobile.png)

### 📲 Tablet View / Tablet Görünümü
![Tablet](screenshots/tablet.png)

---

### 📁 Project Structure / Proje Yapısı
```text
weather-app/
├── netlify/
│   └── functions/
│       └── api-proxy.js   # Serverless function for API calls
├── index.html             # Main HTML file
├── script.js              # Frontend logic
├── style.css              # Styling
├── .env                   # Local environment variables (Hidden)
├── .gitignore             # Git ignore file
├── LICENSE                # MIT License file
└── README.md              # Documentation

```
### 📝 License / Lisans
This project is licensed under the terms of the MIT License. Bu proje MIT Lisansı altında lisanslanmıştır.

### ✍️ Developer / Geliştirici
[@bariskarakocdev](https://github.com/bariskarakocdev)
