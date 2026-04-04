# 🎨 AI Creative Studio (Prompt Generator)

**AI Creative Studio** adalah sebuah aplikasi web *client-side* tingkat mahir (Advanced) yang dirancang untuk menghasilkan prompt berkualitas tinggi dan diagram otomatis dengan memanfaatkan kekuatan Google Gemini AI (`gemini-2.0-flash`). Aplikasi ini dibangun murni menggunakan HTML5, CSS3, dan Vanilla JavaScript tanpa framework tambahan, menjadikannya ringan, cepat, dan sangat mudah digunakan.

Awalnya diciptakan sebagai "Affiliate Prompt Generator", proyek ini berevolusi menjadi sebuah platform Studio Visual "All-in-One" dengan 6 modul utama yang sangat berguna bagi konten kreator, UI/UX designer, programmer, arsitek interior, dan tim branding.

![AI Creative Studio Preview](https://img.shields.io/badge/Powered_by-Gemini_AI-818cf8?style=for-the-badge&logo=google) ![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🌟 Fitur Utama (6 Modul Kreatif)

1. 🛍️ **Produk Afiliasi (Image & Video)**
   Modul ini merancang 5 variasi pose (foto/video) untuk konten produk afiliasi. Prompt secara dinamis disesuaikan dengan jenis barang (misal: Baju fokus di detail kain/potongan badan, Sepatu di angle kaki, Skincare pada tekstur dan kulit muka). Terdapat opsi memasukkan konteks visual, warna merek, hingga referensi wajah kustom.

2. 👻 **Faceless Video Creator**
   Bagi Anda yang fokus membangun channel YouTube/TikTok tanpa wajah (storytelling, cerita misteri, fakta psikologi), modul ini menciptakan 5 variasi prompt latar (background images & b-roll video clips) yang mendukung *mood* dan atmosfer narasi Anda secara sangat sinematik.

3. 💻 **UI/UX & Web Mockup**
   Solusi instan untuk desainer UI/UX. Cukup ketik jenis aplikasi dan fitur yang diinginkan, AI akan mencetak 5 variasi ide Dribbble-style UI mockup yang siap digunakan pada Midjourney atau DALL-E, lengkap dengan warna UI modern (Glassmorphism, Neumorphism, dll).

4. 📊 **Diagram Generator (Mermaid.js Integraton)**
   *Software engineering automation!* Masukkan deskripsi sistem atau tempelkan skema sintaks **SQL CREATE TABLE**, pilih jenis diagram (Sequence, Activity, Use Case, Class, State, ER Diagram), dan AI akan menuliskan *Mermaid Code* yang langsung **dirender otomatis secara visual** di browser Anda. Tersedia tombol *Copy Code* dan *Download SVG*.

5. 🎨 **Logo & Brand Identity**
   Bantu temukan inspirasi desain logo bisnis. Menghasilkan prompt *flat vector design* tanpa teks (textless), *clean lines*, yang sangat sempurna untuk prompt Midjourney dalam meracik identitas brand.

6. 🏠 **Interior & Architecture**
   Modul visualisasi untuk desain interior 3D atau rendering arsitektur. Membantu menghasilkan prompt berkelas "Unreal Engine 5" atau "Octane Render" untuk berbagai ruangan dengan opsi gaya tata riang dan *ambient lighting* spesifik.

---

## 💎 Keunggulan Sistem

- **Multi-Module Dashboard & Wizard Engine:** Navigasi responsif antar modul melalui panel Step-by-Step (Wizard) yang mudah dipahami.
- **Client-Side Architecture:** Semua logika berjalan di sisi *client* browser pengguna. Tidak membutuhkan instalasi server Node.js atau *database backend*.
- **Premium Glassmorphism Design:** Antarmuka gelap estetik yang mempesona (*Dark Glassmorphism*) memanfaatkan *CSS Variables* modern.
- **Local History State:** API key dan riwayat kreasi/prompt tersimpan aman di `localStorage` peramban internet pengguna.
- **Clipboard Integration:** *Copy to clipboard* otomatis untuk semua hasil prompt. 

---

## 🚀 Cara Menjalankan

Karena murni terdiri dari HTML/CSS/JS Statis (Vanilla), Anda dapat menjalankan aplikasi ini tanpa persiapan instalasi server yang rumit:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Tomi-012/Prompt-Generator.git
   ```
2. Buka folder `Prompt Generator`.
3. Buka file `index.html` di web browser modern favorit Anda (Google Chrome, Firefox, Edge, Safari).
   *(Bisa juga dijalankan menggunakan Live Server Extension di VS Code atau semacamnya agar lebih lancar).*
4. Dapatkan [Google Gemini API Key](https://aistudio.google.com/apikey) Anda.
5. Masukkan ke dalam kolom *Gemini API Key* yang ada di bagian atas dashboard, lalu Anda siap berkreasi!

---

## 🛠️ Stack Teknologi

- **Antarmuka Utama:** HTML5 & CSS3
- **Konfigurasi UI/UX:** Flexbox, CSS Grid, Glassmorphism Backdrop Effects (murni CSS tanpa framework tambahan seperti Bootstrap/Tailwind).
- **Logika & State Management:** Vanilla JavaScript (ES6+).
- **AI Processing:** [Google Generative Language API](https://ai.google.dev/) (`gemini-2.0-flash`).
- **Render Visual:** [Mermaid.js](https://mermaid.js.org/) (via CDN) untuk fitur Diagram *rendering*.

---

## 👨‍💻 Kontribusi dan Lisensi

Dikembangkan sebagai *Decision/Prompt Support Tool* untuk mempermudah kreator konten lintas bidang. Repositori ini bersifat terbuka dan siapapun dapat memberikan `Pull Request` untuk menambah modul-modul lainnya di masa mendatang! 

**Created by Mas Tomi.**
