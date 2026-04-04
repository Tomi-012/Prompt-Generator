# 🎨 AI Creative Studio (Prompt Generator)

**AI Creative Studio** adalah sebuah aplikasi web *client-side* tingkat mahir (Advanced) yang dirancang untuk menghasilkan prompt berkualitas tinggi dan diagram otomatis dengan memanfaatkan ekosistem **Multi-Provider AI**. Aplikasi ini dibangun murni menggunakan HTML5, CSS3, dan Vanilla JavaScript tanpa framework tambahan, menjadikannya ringan, cepat, sangat mudah digunakan, namun sangat kuat (powerful).

Awalnya diciptakan sebagai "Affiliate Prompt Generator", proyek ini berevolusi secara masif menjadi sebuah platform Studio Visual "All-in-One" dengan 6 modul utama yang sangat berguna bagi konten kreator, UI/UX designer, programmer, arsitek interior, dan tim branding.

![AI Creative Studio Preview](https://img.shields.io/badge/Powered_by-Mas_Tomi-818cf8?style=for-the-badge&logo=google) ![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🌟 Fitur Utama (6 Modul Kreatif)

Semua modul dilengkapi **Global Output Language Selection** sehingga pengguna bebas memilih bahasa output JSON/Narasi yang diinginkan, sembari menjaga sintaks perintah *image generation* tetap menggunakan bahasa Inggris bawaan sistem!

1. 🛍️ **Produk Afiliasi (Image & Video)**
   Merancang 5 variasi pose (foto/video) untuk konten produk. Dinamis disesuaikan dengan barang (Baju, Sepatu, Skincare, dll). **Mendukung unggah Referensi Wajah (Face Image Upload)**.
   
2. 👻 **Faceless Video Creator**
   Menciptakan 5 variasi latar sinematik untuk channel tanpa wajah (storytelling, fakta unik). **Mendukung unggah Referensi Visual** sebagai basis gaya dan *mood* scene.

3. 💻 **UI/UX & Web Mockup**
   Solusi instan Dribbble-style UI mockup. Menghasilkan ide UI aplikasi berdasarkan fitur dan warna merek, mendukung gaya visual kekinian (Glassmorphism, Neumorphism, Dashboard).

4. 📊 **Diagram Generator (Mermaid.js)**
   *Software engineering automation!* Buat skema sistem atau tempel **SQL CREATE TABLE**, pilih jenis diagram (Sequence, ERD, Class, dll), dan AI akan menuliskan *Mermaid Code* yang langsung **dirender otomatis secara visual**! Tersedia Unduh SVG.

5. 🎨 **Logo & Brand Identity**
   Menghasilkan *flat vector design prompt* berkonsep *textless* untuk logo berkelas dari berbagai industri dengan *clean lines*. Referensikan merk dunia jika perlu!

6. 🏠 **Interior & Architecture**
   Modul visualisasi "Unreal Engine 5" atau "Octane Render" untuk interior. **Mendukung unggah Referensi Desain Eksterior/Interior** sebagai patokan awal untuk inspirasi warna, perabotan, dan pencahayaan.

---

## 💎 Keunggulan Sistem

- **Multi-Provider AI Integration:** Mendukung hingga 6 penyedia kecerdasan buatan utama secara mulus di satu alat:
  - **Google Gemini** (`gemini-2.0-flash`)
  - **Alibaba Cloud** (`qwen-plus`)
  - **GLM Z.AI** (Endpoint Coding Plan `/coding/paas/v4`)
  - **OpenRouter** (`Llama 3.3 70b`)
  - **Groq** (`Llama 3.3 70b Versatile`)
  - **SambaNova** (`Meta-Llama-3.3-70B-Instruct`)
- **Strict API & Logic:** Menggunakan format API standar terbuka (OpenAI-Compatible requests) pada *provider non-native*, dengan tidak adanya *fallback logic* yang korup (memaksa keakuratan *response* tanpa template palsu).
- **History Management:** Riwayat tak berbatas secara lokal per-item riwayat yang dapat dihapus individual maupun disapu bersih (*clear all*).
- **Client-Side Architecture:** Berjalan di peramban murni (*Browser-side*). Seluruh API Key diproses dan disimpan aman secara lokal (Local Storage) tanpa ada transit peladen.
- **Premium Dark Glassmorphism:** Antarmuka hitam elegan menggunakan CSS murni (SVG icons, tanpa format emoji biasa), modern dan memanjakan mata.

---

## 🚀 Cara Menjalankan

Karena murni terdiri dari HTML/CSS/JS Statis (Vanilla), Anda dapat menjalankan aplikasi ini dalam hitungan detik tanpa server Node.js:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Tomi-012/Prompt-Generator.git
   ```
2. Buka folder `Prompt Generator`.
3. Buka file `index.html` di web browser modern favorit Anda.
4. **Setup API Key:**
   - Di Navigation Bar atas, pilih Provider AI yang Anda kehendaki.
   - Masukkan *API Key* Anda yang sah dari konsol *developer* penyedia tersebut.
   - Klik **Simpan** (ikon disket). Terdapat fitur "Mata" untuk mengecek ulang *key*.
5. Anda siap berkreasi! Ganti modul maupun provider AI sesuka hati kala proses berjalan.

---

## 👨‍💻 Kontribusi dan Lisensi

Dikembangkan sebagai *Decision/Prompt Support Tool* untuk mempermudah kreator konten lintas bidang. Repositori ini bersifat terbuka dan siapapun dapat memberikan `Pull Request` untuk menambah modul-modul lainnya di masa mendatang! 

**Created by Mas Tomi. © 2026 Prompt Generator.**
