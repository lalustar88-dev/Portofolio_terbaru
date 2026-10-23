/* ==========================================================================
   KONFIGURASI TAILWIND (Play CDN)
   --------------------------------------------------------------------------
   File ini WAJIB dimuat tepat SETELAH script https://cdn.tailwindcss.com,
   karena variabel global `tailwind` baru tersedia setelah CDN itu dimuat.
   Tailwind CDN kemudian membaca `tailwind.config` ini untuk membuat
   class-class kustom seperti `bg-onyx`, `text-gold-500`, `font-serif`, dll.
   ========================================================================== */

tailwind.config = {
    theme: {
        extend: {
            colors: {
                gold: {
                    /*
                     * PERBAIKAN: kode asli hanya mendefinisikan shade 400–700,
                     * padahal HTML memakai `text-gold-200` (kartu NTB Bermunajat),
                     * `text-gold-300` (kartu Event & Wedding), dan `to-gold-900`
                     * (gradasi kartu NTB Bermunajat). Shade yang tidak terdaftar
                     * tidak dibuat oleh Tailwind, sehingga warnanya hilang diam-diam.
                     * Shade 50–300 dan 800–900 di bawah melengkapi skala yang sama.
                     */
                    50: '#FDF9EC',
                    100: '#FBF0CC',
                    200: '#F8E3A3',
                    300: '#F5D576',
                    400: '#F3C649', // asli
                    500: '#D4AF37', // asli
                    600: '#B89228', // asli
                    700: '#94721C', // asli
                    800: '#6E5414',
                    900: '#4A380D',
                },
                onyx: '#0F172A',
                softbg: '#FAFAFA',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
        },
    },
};
