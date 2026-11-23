# DESAIN --- Randi Prabowo Developer Portfolio

> **Dokumen:** Visual & Interaction Design Specification\
> **Versi:** 1.0\
> **Arah desain:** Premium Editorial / Technical Journal\
> **Pasangan dokumen:** `PRD.md`

------------------------------------------------------------------------

## 1. Design intent

Portfolio harus terlihat seperti karya seorang developer yang memahami
produk, detail antarmuka, dan kualitas implementasi. Bukan landing page
template yang hanya mengganti nama dan warna.

**Kata kunci:** editorial, precise, confident, calm, tactile, technical,
human.

Pengunjung harus merasakan: - Identitas personal yang kuat. - Kualitas
kerja yang rapi. - Informasi yang mudah dipindai. - Proyek yang menjadi
pusat bukti kemampuan. - Interaksi yang responsif dan menyenangkan,
tetapi tidak mengganggu.

### Anti-AI-slop rules

Jangan gunakan pola visual berikut secara otomatis: - Hero dengan
gradient ungu/biru besar dan glow di belakang avatar. - Banyak
glassmorphism card yang tidak punya alasan. - Grid kartu identik untuk
semua bagian. - Fake terminal/code editor hanya sebagai dekorasi. -
Typing animation yang lambat untuk menampilkan job title. - Counter
seperti "50+ projects" tanpa data terverifikasi. - Logo perusahaan/klien
yang tidak pernah bekerja sama. - Testimonial palsu. - Blob, orb,
particle, atau floating icon yang tidak mendukung pesan. - Semua elemen
bergerak saat scroll. - Custom cursor yang menggantikan cursor normal. -
Scroll hijacking atau smooth-scroll yang mengganggu aksesibilitas. -
Emoji sebagai pengganti ikon UI profesional.

**Aturan:** setiap elemen visual harus membantu identitas, navigasi,
pemahaman, atau feedback interaksi.

## 2. Art direction

### Pilihan visual utama

**Editorial dark-first dengan light mode opsional.**

-   Background utama: charcoal/near-black, bukan hitam pekat.
-   Surface: sedikit lebih terang dari background.
-   Text: off-white untuk primary, muted gray untuk secondary.
-   Accent: satu warna khas yang digunakan hemat, misalnya electric lime
    atau warm amber. Pilih satu accent utama, bukan campuran banyak
    warna.
-   Border: hairline border dengan kontras rendah.
-   Project imagery: gambar asli dengan crop konsisten dan frame
    sederhana.

Light mode dapat ditambahkan jika waktu memungkinkan, tetapi dark-first
harus selesai dan konsisten lebih dahulu.

### Design tokens awal

Gunakan CSS variables agar tema dapat disesuaikan tanpa mengubah
komponen.

``` css
:root {
  color-scheme: dark;
  --color-bg: #101110;
  --color-surface: #171917;
  --color-surface-raised: #1e211e;
  --color-text: #f1f2ec;
  --color-muted: #a3a79f;
  --color-subtle: #747a71;
  --color-border: rgba(241, 242, 236, 0.14);
  --color-accent: #c7f36b;
  --color-accent-contrast: #151811;

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --container: 1160px;
  --gutter: clamp(20px, 5vw, 72px);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
}
```

Tokens adalah starting point, bukan aturan kaku. Validasi kontras dan
konsistensi sebelum final.

## 3. Typography

Gunakan maksimal dua keluarga font utama ditambah mono untuk metadata
kecil.

-   **Display:** Space Grotesk --- heading, nama, angka section.
-   **Body:** Inter --- paragraf, navigasi, deskripsi.
-   **Mono:** IBM Plex Mono --- label kecil, tahun, kategori, metadata
    proyek.

Hierarchy: - H1 besar, tegas, maksimal 2--3 baris di desktop. - H2 jelas
dan editorial. - Body nyaman dibaca, line-height sekitar 1.55--1.75. -
Metadata kecil tetapi tetap terbaca. - Hindari seluruh teks menggunakan
uppercase. - Jangan menggunakan font terlalu tipis untuk paragraf.

Responsive typography menggunakan `clamp()`.

## 4. Layout system

-   Max content width: sekitar 1160px.
-   Desktop memakai 12-column grid.
-   Mobile memakai satu kolom dengan gutter 20--24px.
-   Spacing mengikuti skala 4/8px.
-   Gunakan whitespace sebagai elemen desain.
-   Hindari setiap section dibungkus card.
-   Gunakan garis pemisah, nomor section, dan alignment untuk membangun
    ritme halaman.
-   Konten utama tidak boleh terlalu lebar untuk dibaca.

## 5. Page-by-page design

### 5.1 Global navigation

Desktop: - Logo/wordmark `RP.` atau `Randi Prabowo` di kiri. - Navigasi
ringkas di kanan. - Language toggle `EN / ID`. - CTA Download CV berupa
link/button sederhana. - Header sticky dengan background
solid/semi-opaque setelah scroll, tanpa blur berlebihan.

Mobile: - Wordmark di kiri. - Language switcher dan menu button di
kanan. - Menu mobile berupa panel yang mudah ditutup dengan Escape dan
memilih link. - Fokus keyboard harus tetap terkelola.

### 5.2 Hero

**Komposisi desktop:** - Layout asimetris dua kolom. - Kolom utama:
eyebrow kecil (lokasi/role), nama besar, headline profesional, intro
ringkas, CTA. - Kolom kedua: foto profil asli dengan crop editorial atau
portrait frame; dapat diberi metadata kecil seperti
`Based in Indonesia`. - Tambahkan detail visual khas seperti nomor
index, garis, atau label kecil --- bukan dekorasi acak.

**Konten:** - Nama: Randi Prabowo. - Role: Web Developer / Full Stack &
Backend Development. - Ringkasan sesuai CMS. - CTA utama: View
Projects. - CTA sekunder: Download CV. - Link sosial ringkas: GitHub,
LinkedIn, Email.

**Mobile:** - Nama dan pesan utama muncul lebih dulu. - Foto dapat
berada di bawah intro atau di samping jika masih nyaman. - CTA tidak
boleh terlalu rapat.

### 5.3 About

-   Heading editorial: "A little about how I build."
-   Ringkasan profesional.
-   Area fokus dalam daftar pendek, bukan progress bar.
-   Foto tambahan opsional.
-   Pendidikan/bootcamp ditampilkan sebagai metadata ringkas.

### 5.4 Experience

-   Timeline minimal atau daftar kronologis.
-   Setiap item menggunakan tahun/periode sebagai kolom metadata.
-   Jabatan dan organisasi sebagai fokus.
-   Deskripsi maksimal beberapa baris; detail tambahan dapat dibuka bila
    diperlukan.
-   Hindari logo perusahaan jika tidak tersedia atau tidak diizinkan.
-   Current role hanya diberi label jika CMS menandainya.

### 5.5 Projects listing

Ini bagian paling penting setelah hero.

-   Featured project pertama mendapat ruang lebih besar.
-   Project lain menggunakan grid editorial yang tidak harus seragam.
-   Gunakan cover image asli; rasio gambar konsisten per layout.
-   Setiap project menampilkan nama, ringkasan, role, dan 2--4 tech
    labels.
-   Hover: image scale sangat kecil, panah/link bergeser beberapa pixel,
    border/accent berubah.
-   Klik membuka detail project.
-   Filter kategori hanya muncul bila jumlah project sudah cukup untuk
    berguna.

### 5.6 Project detail

Urutan konten: 1. Breadcrumb / back to projects. 2. Judul proyek dan
summary. 3. Cover image lebar. 4. Metadata: role, category, period (jika
tersedia). 5. Context / problem. 6. Contribution / what I built. 7. Tech
stack. 8. Gallery. 9. Links: Live project dan GitHub --- masing-masing
hanya muncul jika tersedia. 10. Next project.

Jangan menampilkan section kosong. Jika tidak ada live URL atau GitHub,
jangan buat tombol disabled atau link palsu.

### 5.7 Skills

-   Kelompokkan berdasarkan Frontend, Backend, Database, Tools, dan
    Other.
-   Gunakan typographic list atau compact tags.
-   Jangan menggunakan persentase skill atau progress bar yang
    dibuat-buat.
-   Tampilkan teknologi yang memang tercantum di CMS.

### 5.8 Education & certifications

-   Editorial list dengan nama, institusi, periode, dan credential link
    bila tersedia.
-   Sertifikasi tidak perlu memakai badge warna-warni.
-   Pisahkan bootcamp, pendidikan formal, dan kursus bila kontennya
    cukup.

### 5.9 Contact

-   Headline langsung dan personal.
-   Email menjadi CTA utama.
-   Social links ditampilkan sebagai daftar yang jelas.
-   Tidak perlu form kontak pada MVP.
-   Tampilkan lokasi umum bila pemilik menyetujuinya.

### 5.10 Footer

-   Wordmark.
-   Navigasi singkat.
-   Social links.
-   Copyright year dinamis.
-   Kalimat penutup sederhana; tidak perlu slogan generik.

## 6. Motion design system

Gunakan **Motion for React (`motion`)**. Motion adalah alat untuk
mengatur animasi, bukan alasan untuk membuat semua elemen bergerak.

### Motion principles

1.  Short: sebagian besar transisi 160--500ms.
2.  Natural: gunakan easing yang lembut.
3.  Consistent: pola gerak sama untuk elemen dengan fungsi sama.
4.  Interruptible: interaksi tidak boleh terasa lambat.
5.  Accessible: hormati reduced motion.
6.  Progressive: konten tetap terbaca walau JavaScript/motion tidak
    berjalan.

### Motion tokens

``` ts
export const motionTokens = {
  fast: 0.18,
  normal: 0.32,
  slow: 0.5,
  easeOut: [0.22, 1, 0.36, 1],
  easeInOut: [0.65, 0, 0.35, 1],
};
```

### Motion inventory

  -----------------------------------------------------------------------
  Area                    Interaction             Guidance
  ----------------------- ----------------------- -----------------------
  Page content            Fade + slight vertical  300--450ms, sekali saat
                          reveal                  masuk viewport

  Hero heading            Stagger by line         400--600ms, jangan
                                                  menahan teks terlalu
                                                  lama

  Hero portrait           Subtle opacity/scale    400--500ms

  Navigation              Underline/opacity       160--220ms

  Project image           Tiny scale on hover     scale sekitar
                                                  1.02--1.035

  Project link            Arrow translate         160--220ms

  Section reveal          Opacity + 12--18px y    300--450ms

  Mobile menu             Opacity + short         180--260ms
                          translate               

  Language change         Quick content fade      120--180ms, tanpa
                                                  full-screen transition

  Page transition         Optional subtle fade    Jangan menutupi konten
                                                  atau memperlambat
                                                  navigasi
  -----------------------------------------------------------------------

### Reduced motion

-   Jika `prefers-reduced-motion: reduce`, hilangkan parallax, stagger,
    looping animation, dan large transforms.
-   Gunakan perubahan opacity sederhana atau tampilkan konten langsung.
-   Jangan mengunci scroll.
-   Jangan membuat animasi sebagai satu-satunya cara mengungkapkan
    konten.

### Forbidden motion

-   Infinite floating cards.
-   Infinite marquee yang bergerak cepat.
-   Cursor follower.
-   Scroll-jacking.
-   Parallax pada semua section.
-   Animasi angka palsu.
-   Loading intro panjang yang menahan pengguna sebelum melihat konten.
-   Background particles yang mengganggu teks.
-   Animasi yang menyebabkan layout shift.

## 7. Interaction details

-   Semua tombol memiliki hover, active, focus-visible, dan disabled
    state yang jelas.
-   Link eksternal dibuka dengan kebijakan yang aman.
-   Gambar project dapat dibuka ke detail project; gallery memiliki
    kontrol yang jelas.
-   Language switcher mempertahankan halaman/slug yang relevan jika
    tersedia.
-   Menu mobile mendukung Escape dan fokus keyboard.
-   Download CV menggunakan file aktual dari CMS.
-   Social icons memiliki accessible label, bukan ikon tanpa nama.
-   Jangan membuat area klik kecil; target sentuh sekitar 44px.

## 8. Responsive behavior

### Mobile: 320--767px

-   Satu kolom.
-   H1 menggunakan ukuran responsif.
-   Navigasi ringkas.
-   Project cards tersusun vertikal.
-   Hindari horizontal overflow.
-   Motion dikurangi untuk menghemat performa.

### Tablet: 768--1023px

-   Grid dua kolom jika konten mendukung.
-   Hero dapat tetap dua kolom pada landscape, satu kolom pada portrait.
-   Spacing lebih rapat dari desktop.

### Desktop: 1024px+

-   Maksimalkan editorial grid.
-   Featured project dapat memakai layout asimetris.
-   Sticky navigation.
-   Hover interaction hanya enhancement; fungsi tetap tersedia tanpa
    hover.

## 9. Image direction

Prioritas aset: 1. Foto profil asli dengan pencahayaan baik dan
background sederhana. 2. Screenshot aplikasi/proyek yang benar-benar
dibuat. 3. Diagram arsitektur atau potongan UI asli bila relevan. 4.
Foto dokumentasi kerja hanya jika layak dan memiliki izin.

Image rules: - Jangan membuat screenshot produk fiktif. - Jangan memakai
stock photo sebagai bukti proyek. - Gunakan alt text yang menjelaskan
fungsi gambar. - Optimalkan ukuran dan format gambar. - Tetapkan focal
point/crop melalui CMS bila diperlukan. - Gunakan placeholder editorial
sederhana jika gambar belum tersedia.

## 10. Component inventory

-   `SiteHeader`
-   `MobileNavigation`
-   `LanguageSwitcher`
-   `DownloadCVButton`
-   `HeroSection`
-   `SectionHeading`
-   `SocialLinks`
-   `AboutSection`
-   `ExperienceList`
-   `ExperienceItem`
-   `FeaturedProject`
-   `ProjectGrid`
-   `ProjectCard`
-   `ProjectGallery`
-   `ProjectMetadata`
-   `TechStackList`
-   `SkillsGroups`
-   `EducationList`
-   `ContactSection`
-   `SiteFooter`
-   `Reveal` (reusable motion wrapper, gunakan seperlunya)

Komponen harus reusable berdasarkan pola yang benar-benar berulang.
Jangan membuat abstraksi hanya untuk mengurangi jumlah baris kode.

## 11. Content tone

Gaya bahasa: - Jelas, percaya diri, spesifik, tidak berlebihan. -
Hindari jargon pemasaran. - Jelaskan kontribusi pribadi dengan kata
kerja konkret. - Jangan menyebut "world-class", "revolutionary",
"cutting-edge", atau "passionate" berulang kali. - Jangan mengklaim
expert pada teknologi yang hanya pernah dicoba. - Gunakan Bahasa
Indonesia natural dan English profesional yang setara makna.

Contoh project copy yang baik: - "Developed backend services and RESTful
APIs using Python." - "Integrated PostgreSQL to support application data
and user management." - "Built responsive learning interfaces using
React."

Hindari: - "Revolutionized the digital ecosystem with next-generation
innovation." - "Built a world-class, industry-leading platform." - Klaim
angka atau impact yang tidak memiliki bukti.

## 12. Quality checklist

### Visual

-   [ ] Hierarki konten jelas dalam 5 detik pertama.
-   [ ] Tidak terlihat seperti template generik.
-   [ ] Spacing dan alignment konsisten.
-   [ ] Accent color digunakan hemat.
-   [ ] Foto dan screenshot berasal dari pemilik.
-   [ ] Tidak ada dekorasi yang tidak punya fungsi.

### Motion

-   [ ] Animasi cepat dan tidak menghalangi konten.
-   [ ] Reduced motion berfungsi.
-   [ ] Tidak ada scroll hijacking.
-   [ ] Tidak ada layout shift.
-   [ ] Semua hover effect punya alternatif keyboard.

### Responsive

-   [ ] Tidak ada horizontal overflow pada 320px.
-   [ ] Menu mobile mudah digunakan.
-   [ ] Project detail nyaman dibaca.
-   [ ] Gambar tidak terpotong secara tidak sengaja.

### Content

-   [ ] Semua teks tersedia dalam ID dan EN.
-   [ ] Tidak ada copy generik/fiktif.
-   [ ] Tidak ada link palsu.
-   [ ] Project role dan teknologi sesuai pekerjaan aktual.
-   [ ] CV yang diunduh adalah versi terbaru.

------------------------------------------------------------------------

## 13. Handoff instruction untuk Codex

Sebelum implementasi: 1. Baca `PRD.md` dan dokumen ini sampai selesai.
2. Audit repository dan jangan menimpa pekerjaan yang sudah ada tanpa
alasan. 3. Buat implementation plan dan daftar komponen. 4.
Implementasikan satu fase pada satu waktu. 5. Gunakan konten nyata dari
CMS; jangan isi halaman dengan lorem ipsum pada hasil akhir. 6. Jika
aset belum diberikan, buat placeholder yang jelas dan mudah diganti
melalui CMS. 7. Setelah setiap fase, jalankan lint, typecheck, dan
build. 8. Laporkan keputusan desain yang membutuhkan persetujuan
pemilik. 9. Jangan menambahkan fitur AI. 10. Prioritaskan kualitas
detail, aksesibilitas, dan performa dibanding jumlah animasi.
