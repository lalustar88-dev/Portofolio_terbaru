# Website Portofolio — Lalu Mas Star Pilda

Website portofolio statis (HTML + CSS + JavaScript) yang siap di-deploy ke **GitHub Pages**.
Desain dan isi website **tidak diubah**; kode hanya dipisah per file dan beberapa bug diperbaiki.

---

## 1. Struktur folder

```
portofolio-lalu-mas-star-pilda/
├── index.html              ← halaman utama (HARUS huruf kecil semua)
├── .nojekyll               ← file kosong, agar GitHub Pages menyajikan file apa adanya
├── README.md               ← file ini
├── css/
│   └── style.css           ← CSS kustom (teks gradasi emas, offset scroll navbar)
├── js/
│   ├── tailwind.config.js  ← konfigurasi warna & font Tailwind
│   └── main.js             ← menu mobile, filter portofolio, form kontak, tahun footer
└── assets/
    └── favicon.svg         ← ikon kecil di tab browser
```

**Cara kerjanya:** browser membuka `index.html`, lalu `index.html` memanggil file lain
dengan alamat relatif (`css/style.css`, `js/main.js`, dst.). Karena alamatnya relatif
(tanpa `/` di depan), website tetap berjalan baik di `username.github.io` maupun
`username.github.io/nama-repo`.

---

## 2. Penyebab halaman 404 di GitHub Pages

GitHub Pages mencari file bernama **`index.html`** (huruf kecil semua) sebagai halaman utama.
File aslinya bernama **`Index.html`** (huruf I besar). Server GitHub Pages membedakan huruf
besar dan kecil, sehingga `Index.html` dianggap file yang berbeda → halaman utama tidak
ditemukan → **404**.

File kedua, `Website Portofolio Lalu Mas Star Pilda.html`, isinya sama persis dengan
`Index.html`, jadi tidak dipakai lagi.

Penyebab 404 lain yang juga perlu dicek:
- `index.html` tidak berada di **root** (folder paling luar) repositori, misalnya masih
  terbungkus di dalam folder hasil ekstrak zip.
- GitHub Pages belum diaktifkan, atau branch/folder sumbernya salah.
- Baru saja deploy — GitHub Pages butuh 1–5 menit sebelum website bisa diakses.

---

## 3. Cara deploy ke GitHub Pages

1. Ekstrak file zip ini.
2. Buka repositori di GitHub → **Add file → Upload files**.
3. Upload **isi** folder `portofolio-lalu-mas-star-pilda` (yaitu `index.html`, folder `css`,
   `js`, `assets`, dan file lainnya) — **bukan** foldernya sendiri. Setelah upload,
   `index.html` harus terlihat langsung di halaman depan repositori.
   - Jika di repositori masih ada `Index.html` lama, hapus dulu file itu.
   - File `.nojekyll` bisa tersembunyi di file explorer. Tidak masalah jika tidak ikut
     ter-upload; website tetap berjalan tanpanya.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
6. Pilih branch **main** dan folder **/ (root)**, lalu klik **Save**.
7. Tunggu 1–5 menit, lalu buka alamat yang muncul di halaman tersebut.

---

## 4. Daftar perbaikan

| No | Bagian | Masalah pada kode asli | Perbaikan |
|----|--------|------------------------|-----------|
| 1 | Nama file | `Index.html` (I besar) → GitHub Pages 404 | Diganti menjadi `index.html` |
| 2 | Warna Tailwind | `text-gold-200`, `text-gold-300`, `to-gold-900` dipakai di HTML, tetapi hanya shade 400–700 yang didefinisikan. Akibatnya warna tanggal di dua kartu dan gradasi kartu NTB Bermunajat tidak muncul | Shade 50–300 dan 800–900 ditambahkan di `js/tailwind.config.js` |
| 3 | Form kontak | Form tidak mengirim apa pun, tetapi menampilkan "Pesan Anda berhasil terkirim" dan mengosongkan isian. Calon klien mengira pesannya sampai, padahal tidak | Isi form disusun menjadi email dan aplikasi email pengunjung dibuka (`mailto:`). Teks konfirmasi disesuaikan, dan isian tidak dihapus agar tidak hilang |
| 4 | Form kontak | Input tidak punya atribut `name` dan `id`, label tidak terhubung ke input | Ditambahkan `id`, `name`, `for`, dan `autocomplete` |
| 5 | Form kontak | Kirim dua kali berdekatan → timer lama menyembunyikan pesan konfirmasi terlalu cepat | Timer lama dibatalkan (`clearTimeout`) sebelum membuat timer baru |
| 6 | Tombol filter | Tombol aktif masih membawa `hover:bg-slate-100`, sehingga saat di-hover latarnya jadi abu-abu terang dan teks emasnya hampir tak terbaca. Class `border` juga tidak konsisten, sehingga ukuran tombol bisa bergeser | Class "aktif" dan "tidak aktif" dipisah dan ditukar seluruhnya; semua tombol selalu punya border |
| 7 | Menu mobile | Jika menu dibuka lalu layar diperlebar ke ukuran desktop, ikon tetap "X". Tidak ada `aria-expanded` | Menu direset otomatis di ukuran desktop, bisa ditutup dengan Escape, `aria-expanded` diperbarui |
| 8 | Link eksternal | `target="_blank"` tanpa `rel="noopener noreferrer"` (celah keamanan kecil: halaman baru bisa mengakses halaman asal) | `rel="noopener noreferrer"` ditambahkan pada 4 link |
| 9 | Navbar | Navbar `fixed` setinggi 80px bisa menutupi bagian atas section saat menu diklik | `scroll-padding-top: 5rem` di `css/style.css` |
| 10 | Teks gradasi | Hanya `-webkit-background-clip` | Ditambah `background-clip: text` versi standar |
| 11 | Footer | Tahun "2026" ditulis manual | Diisi otomatis lewat JavaScript |
| 12 | `<head>` | Tidak ada meta description dan favicon (browser mencari `/favicon.ico` → 404 di console) | Ditambahkan meta description dan `assets/favicon.svg` |

---

## 5. Catatan isi (tidak diubah, sebaiknya dicek oleh pemilik)

- **Statistik "80+ UMKM Coordinated"** di bagian hero tidak sesuai dengan kartu Lentera
  Ramadhan Festival, yang menyebutkan *20 tenant dari total 80 peserta*. Pilih salah satu:
  ubah angka menjadi **20+**, atau ubah labelnya (misalnya "UMKM in Managed Events").
- **"Pendidikan Akhir"** lebih tepat ditulis **"Pendidikan"** atau **"Pendidikan Terakhir"**,
  apalagi statusnya masih berjalan (2023 – Sekarang).

---

## 6. Catatan teknis lanjutan (opsional)

- **Tailwind Play CDN** (`cdn.tailwindcss.com`) dibuat untuk prototipe. Website tetap
  berjalan, tetapi browser akan memberi peringatan di console dan halaman sedikit lebih
  lambat dimuat. Untuk versi yang lebih matang, Tailwind bisa di-build menjadi satu file CSS
  memakai Tailwind CLI. Ini tidak wajib untuk portofolio.
- **Form yang terkirim langsung** (tanpa membuka aplikasi email) membutuhkan layanan pihak
  ketiga karena GitHub Pages tidak punya server. Contoh: [Formspree](https://formspree.io).
  Caranya: buat form di Formspree, lalu di `index.html` ubah tag form menjadi
  `<form id="contact-form" action="https://formspree.io/f/KODE_ANDA" method="POST" ...>`
  dan hapus bagian **3. FORM KONTAK** di `js/main.js`.
