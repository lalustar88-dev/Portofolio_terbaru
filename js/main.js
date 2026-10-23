/* ==========================================================================
   SCRIPT UTAMA WEBSITE PORTOFOLIO
   --------------------------------------------------------------------------
   Isi file ini:
     1. Menu mobile (tombol hamburger)
     2. Filter kartu portofolio
     3. Form kontak
     4. Tahun otomatis di footer

   Script dimuat di bagian paling bawah <body>, jadi semua elemen HTML
   sudah ada saat kode ini dijalankan.

   Seluruh kode dibungkus fungsi yang langsung dijalankan (IIFE) supaya
   variabel di dalamnya tidak "bocor" ke global dan bertabrakan dengan
   script lain (misalnya script Tailwind CDN).
   ========================================================================== */

(function () {
    'use strict';

    /* ======================================================================
       1. MENU MOBILE
       ----------------------------------------------------------------------
       Logika dasarnya sama dengan kode asli: klik hamburger -> menu muncul,
       ikon berubah menjadi "X"; klik lagi -> menu tertutup.

       PERBAIKAN:
       - Semua perubahan (menu, ikon, aria-expanded) dipusatkan di satu
         fungsi `setMenuOpen()`, sehingga keadaannya tidak bisa saling
         bertentangan. Kode asli mengulang logika yang sama di dua tempat.
       - `aria-expanded` diperbarui agar pembaca layar (screen reader)
         tahu apakah menu sedang terbuka.
       - Menu juga tertutup saat tombol Escape ditekan, dan saat layar
         diperlebar ke ukuran desktop. Pada kode asli, jika menu dibuka
         lalu jendela diperlebar, ikon tetap "X" walaupun menunya sudah
         disembunyikan oleh class `md:hidden`.
       ====================================================================== */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function setMenuOpen(isOpen) {
        if (!menuBtn || !mobileMenu || !menuIcon) return;

        // classList.toggle(nama, kondisi): tambahkan class jika kondisi true,
        // hapus jika false. Menu disembunyikan ketika TIDAK terbuka.
        mobileMenu.classList.toggle('hidden', !isOpen);
        menuIcon.classList.toggle('fa-bars', !isOpen);
        menuIcon.classList.toggle('fa-xmark', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    }

    function isMenuOpen() {
        return mobileMenu ? !mobileMenu.classList.contains('hidden') : false;
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            setMenuOpen(!isMenuOpen());
        });

        // Menu ditutup setelah salah satu link di dalamnya diklik.
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuOpen(false);
            });
        });

        // Tutup menu dengan tombol Escape, lalu kembalikan fokus ke tombol.
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isMenuOpen()) {
                setMenuOpen(false);
                menuBtn.focus();
            }
        });

        // Breakpoint `md` Tailwind = 768px. Saat layar mencapai lebar itu,
        // menu mobile tidak dipakai lagi, jadi keadaannya direset.
        const desktopQuery = window.matchMedia('(min-width: 768px)');
        const handleBreakpoint = function (event) {
            if (event.matches) setMenuOpen(false);
        };
        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener('change', handleBreakpoint);
        } else if (desktopQuery.addListener) {
            // Cadangan untuk Safari versi lama.
            desktopQuery.addListener(handleBreakpoint);
        }
    }

    /* ======================================================================
       2. FILTER KARTU PORTOFOLIO
       ----------------------------------------------------------------------
       Setiap tombol filter punya atribut `data-filter` ("all", "wedding",
       atau "umkm"), dan setiap kartu punya `data-category`. Kartu
       ditampilkan jika filternya "all" ATAU kategorinya sama.

       PERBAIKAN:
       - Tombol aktif sebelumnya tetap membawa class `hover:bg-slate-100`.
         Akibatnya, saat kursor diarahkan ke tombol aktif (latar gelap,
         teks emas), latarnya berubah menjadi abu-abu terang dan teks emas
         hampir tidak terbaca. Sekarang class untuk keadaan "aktif" dan
         "tidak aktif" dipisah dengan jelas dan ditukar seluruhnya.
       - Kode asli tidak menambah/menghapus class `border` dengan konsisten,
         sehingga ukuran tombol bisa bergeser 1–2px saat filter diganti.
         Sekarang semua tombol selalu punya border (lihat index.html).
       - Kartu disembunyikan dengan class Tailwind `hidden` (bukan
         mengubah `style.display` langsung), sehingga tampilan tetap
         dikendalikan dari class, sama seperti bagian lain website.
       - `aria-pressed` memberi tahu screen reader tombol mana yang aktif.
       ====================================================================== */
    const ACTIVE_CLASSES = ['active', 'bg-onyx', 'text-gold-400', 'border-onyx', 'shadow-md'];
    const INACTIVE_CLASSES = ['bg-white', 'text-slate-600', 'border-slate-200', 'hover:bg-slate-100'];

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function setActiveFilterButton(activeBtn) {
        filterBtns.forEach(function (btn) {
            const isActive = btn === activeBtn;
            btn.classList.remove.apply(btn.classList, isActive ? INACTIVE_CLASSES : ACTIVE_CLASSES);
            btn.classList.add.apply(btn.classList, isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function filterCards(filter) {
        projectCards.forEach(function (card) {
            const isMatch = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !isMatch);
        });
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setActiveFilterButton(btn);
            filterCards(btn.dataset.filter);
        });
    });

    /* ======================================================================
       3. FORM KONTAK
       ----------------------------------------------------------------------
       MASALAH PADA KODE ASLI:
       Form hanya mencegah pengiriman (`preventDefault`), lalu menampilkan
       tulisan "Pesan Anda berhasil terkirim" dan mengosongkan form.
       Padahal pesan itu TIDAK dikirim ke mana pun. Calon klien akan
       mengira pesannya sudah sampai, padahal tidak pernah diterima.

       PERBAIKAN:
       GitHub Pages hanya bisa menyajikan file statis (tidak punya server
       untuk mengirim email). Jadi, isi form disusun menjadi email yang
       sudah terisi, lalu aplikasi email pengunjung dibuka lewat `mailto:`.
       Pengunjung cukup menekan "Kirim" di aplikasi emailnya.
       Isi form TIDAK dikosongkan, supaya jika aplikasi email tidak terbuka,
       pengunjung tidak kehilangan pesan yang sudah diketik.

       Jika nanti ingin pesan terkirim langsung tanpa membuka aplikasi
       email, gunakan layanan form seperti Formspree (lihat README.md).
       ====================================================================== */
    const RECIPIENT_EMAIL = 'lalustar88@gmail.com';
    const MESSAGE_DURATION_MS = 8000;

    const form = document.getElementById('contact-form');
    const responseBox = document.getElementById('form-response');
    let hideResponseTimer = null;

    function showResponse() {
        if (!responseBox) return;
        responseBox.classList.remove('hidden');

        // PERBAIKAN: batalkan timer lama sebelum membuat yang baru.
        // Pada kode asli, jika form dikirim dua kali berdekatan, timer
        // dari kiriman pertama menyembunyikan pesan kiriman kedua terlalu cepat.
        clearTimeout(hideResponseTimer);
        hideResponseTimer = setTimeout(function () {
            responseBox.classList.add('hidden');
        }, MESSAGE_DURATION_MS);
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // FormData membaca nilai setiap input berdasarkan atribut `name`.
            // (Di kode asli input tidak punya `name`, jadi nilainya tidak bisa dibaca.)
            const data = new FormData(form);
            const name = String(data.get('name') || '').trim();
            const email = String(data.get('email') || '').trim();
            const subject = String(data.get('subject') || '').trim();
            const message = String(data.get('message') || '').trim();

            const mailSubject = '[Portofolio] ' + subject + ' - ' + name;
            const mailBody =
                'Halo Lalu Mas Star Pilda,\n\n' +
                message + '\n\n' +
                '---\n' +
                'Nama: ' + name + '\n' +
                'Email: ' + email;

            // encodeURIComponent mengubah spasi, baris baru, dan simbol
            // menjadi format yang aman untuk dipakai di dalam tautan.
            const mailtoUrl =
                'mailto:' + RECIPIENT_EMAIL +
                '?subject=' + encodeURIComponent(mailSubject) +
                '&body=' + encodeURIComponent(mailBody);

            window.location.href = mailtoUrl;
            showResponse();
        });
    }

    /* ======================================================================
       4. TAHUN OTOMATIS DI FOOTER
       ----------------------------------------------------------------------
       Tahun hak cipta sebelumnya ditulis manual "2026". Sekarang diisi
       otomatis sesuai tahun saat ini, jadi tidak perlu diedit setiap tahun.
       Angka 2026 tetap ada di HTML sebagai cadangan jika JavaScript mati.
       ====================================================================== */
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
})();
