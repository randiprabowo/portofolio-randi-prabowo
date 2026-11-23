# PRD --- Randi Prabowo \| Developer Portfolio

> **Dokumen:** Product Requirements Document\
> **Versi:** 1.0\
> **Status:** Ready for implementation\
> **Pemilik produk:** Randi Prabowo\
> **Tujuan:** Menjadi brief utama Codex untuk membangun portfolio
> personal yang profesional, cepat, mudah dikelola melalui CMS,
> bilingual, dan memiliki motion design yang terarah.

------------------------------------------------------------------------

## 1. Product vision

Membangun website portfolio personal untuk Randi Prabowo yang
menampilkan identitas profesional, pengalaman kerja, kemampuan teknis,
sertifikasi, dan proyek secara meyakinkan kepada recruiter, hiring
manager, maupun calon klien.

Website harus terasa seperti produk digital yang dirancang dengan
sengaja --- bukan hasil template generik atau halaman yang dipenuhi efek
visual tanpa tujuan.

**Prinsip utama:** 1. **Content first:** recruiter dapat memahami
profil, spesialisasi, pengalaman, dan proyek dalam waktu singkat. 2.
**Distinctive, not generic:** visual memiliki karakter editorial dan
detail khas, bukan layout AI-portfolio yang seragam. 3. **Motion with
purpose:** animasi memperjelas hierarki, transisi, dan interaksi; bukan
dekorasi berlebihan. 4. **CMS-driven:** konten utama dapat diperbarui
tanpa mengubah source code. 5. **Bilingual by design:** seluruh konten
yang terlihat oleh pengunjung tersedia dalam Bahasa Indonesia dan
English. 6. **Fast and accessible:** performa, keyboard navigation,
contrast, dan reduced motion tidak boleh dikorbankan demi estetika.

## 2. Target audience

-   Recruiter dan HR yang mencari Web Developer, Frontend Developer,
    Backend Developer, atau Junior Full Stack Developer.
-   Engineering lead atau developer yang ingin meninjau kualitas proyek
    dan cara berpikir teknis.
-   Calon klien freelance yang ingin melihat layanan, hasil pekerjaan,
    dan cara menghubungi Randi.

## 3. Positioning dan pesan utama

**Nama:** Randi Prabowo\
**Professional positioning:** Web Developer --- MERN Stack, React.js,
Next.js, RESTful APIs, Python, PostgreSQL.

**Ringkasan profil awal (dapat diedit melalui CMS):**

> Passionate Web Developer specializing in the MERN Stack, React.js, and
> Next.js, with experience in building responsive web applications,
> developing RESTful APIs, and managing databases using Python and
> PostgreSQL. Experienced in cross-functional team collaboration through
> real-world projects, including BROD Professional Social Network and
> EduAkses Online Learning Platform. Completed a 6-month Full Stack
> Development Bootcamp at Dicoding, with a strong interest in building
> scalable and user-focused software solutions.

Jangan mengarang angka pencapaian, klien, testimoni, sertifikasi, maupun
teknologi yang belum dikonfirmasi. Konten profil, tanggal, dan tautan
harus dapat diverifikasi sebelum dipublikasikan.

## 4. Goals dan success criteria

### Goals

-   Menampilkan profil profesional dengan cepat dan jelas.
-   Menjadikan proyek sebagai bukti kemampuan, bukan sekadar daftar
    teknologi.
-   Memungkinkan Randi mengelola konten melalui CMS.
-   Mendukung Bahasa Indonesia dan English secara konsisten.
-   Menyediakan akses langsung ke CV, GitHub, LinkedIn, email, dan kanal
    sosial lain yang dipilih.
-   Berjalan dengan biaya platform **US\$0** selama masih dalam batas
    paket gratis yang berlaku.

### Acceptance criteria

-   Pengunjung dapat mengganti bahasa ID/EN dan pilihan bahasa berlaku
    di seluruh halaman.
-   Seluruh konten utama berasal dari CMS, bukan hardcoded di komponen
    halaman.
-   Admin dapat membuat, mengubah, menghapus, mengurutkan, mem-publish,
    dan meng-unpublish proyek.
-   Proyek dapat memiliki beberapa gambar, deskripsi, tech stack,
    kategori, dan tautan live demo.
-   GitHub bersifat opsional. Jika kosong, tombol GitHub tidak
    ditampilkan.
-   Live demo/website bersifat opsional. Jika kosong, tombol live demo
    tidak ditampilkan.
-   Admin dapat mengunggah/mengganti foto profil dan file CV.
-   CV dapat diunduh dari halaman utama dan halaman kontak.
-   Layout responsif pada mobile, tablet, laptop, dan layar lebar.
-   Semua interaksi utama dapat digunakan dengan keyboard.
-   Preferensi `prefers-reduced-motion` dihormati.
-   Tidak ada error kritis pada build, console, broken image, atau
    tautan internal.

## 5. Scope fitur

### P0 --- wajib untuk rilis pertama

#### 5.1 Home / Hero

-   Nama, role/title, short introduction, foto profil atau portrait.
-   Status ketersediaan kerja (opsional, dapat diatur dari CMS).
-   CTA: **View Projects**, **Download CV**, dan **Contact Me**.
-   Social links dengan ikon dan accessible label.
-   Animasi entrance yang singkat dan tidak menghalangi konten.
-   Tampilkan lokasi secara umum: Bandar Lampung, Indonesia (dapat
    diedit).

#### 5.2 About

-   Professional summary dalam ID dan EN.
-   Foto profil.
-   Fokus/area keahlian.
-   Informasi pendidikan dan bootcamp.
-   Nilai kerja atau pendekatan profesional (konten dapat diedit).

#### 5.3 Experience

-   Daftar pengalaman kerja berbentuk timeline atau editorial list.
-   Field: jabatan, perusahaan, lokasi, tanggal mulai, tanggal selesai,
    `isCurrent`, deskripsi, highlights, urutan.
-   Konten ID dan EN.
-   Pengalaman awal berdasarkan CV:
    -   School Resource Officer & Web Developer --- SDIT Fitrah Insani
        Langkapura.
    -   Backend Developer --- Solvera Teknologi / Solvera Global
        Teknologi (nama resmi perlu dikonfirmasi).
    -   Digital Marketing & Web Developer --- Sentra Masjid.
-   Jangan menampilkan tanggal yang belum diverifikasi. Admin harus
    dapat memperbaikinya di CMS.

#### 5.4 Projects

-   Project listing dengan filter kategori (opsional jika jumlah proyek
    masih sedikit).
-   Project detail page dinamis.
-   Field minimal:
    -   Nama proyek.
    -   Slug.
    -   Short description dan full description (ID/EN).
    -   Cover image dan gallery.
    -   Role / kontribusi.
    -   Tech stack.
    -   Project type/category.
    -   Project date atau duration (opsional).
    -   Live URL (opsional).
    -   GitHub URL (opsional).
    -   Featured flag.
    -   Published/draft status.
    -   Sort order.
-   Tombol hanya ditampilkan jika URL tersedia.
-   Image gallery memiliki alt text dalam dua bahasa.
-   Project detail menjelaskan konteks, kontribusi pribadi, solusi, dan
    hasil yang benar-benar dapat dibuktikan.

**Seed projects dari CV:** 1. **BROD --- Professional Social Network** -
Role: Backend Developer (Team Member). - Kontribusi awal: backend
services dan RESTful APIs dengan Python; integrasi PostgreSQL; modul
Contact Intelligence, Professional Feeds, Messaging, dan Smart
Networking; kolaborasi Agile, debugging, dan API integration. - Tech
stack yang sudah disebut: Python, PostgreSQL, REST API. Framework dan
library hanya ditambahkan setelah dikonfirmasi. 2. **EduAkses --- Online
Learning Platform** - Role: Full Stack Developer (Team Member). -
Kontribusi awal: MVP bersama tim 4 orang, responsive frontend dengan
React, user management, learning modules, dan REST API integration. -
Tech stack awal: React. Tambahkan teknologi lain hanya jika sesuai
implementasi aktual. 3. Proyek lain dapat ditambahkan melalui CMS tanpa
perubahan kode.

#### 5.5 Skills

-   Kelompok skill: Frontend, Backend, Database, Tools, Collaboration,
    Design.
-   Skill dapat memiliki nama, kategori, level opsional, urutan, dan
    featured flag.
-   Hindari progress bar persentase yang tidak terukur. Gunakan daftar
    atau kelompok teknologi.

#### 5.6 Education & Certifications

-   Pendidikan: Universitas Teknokrat Indonesia --- Bachelor of
    Information Systems.
-   Bootcamp: Full Stack Developer Bootcamp --- Dicoding Indonesia;
    React JS Bootcamp --- WPU Course; Front End Developer Bootcamp ---
    Harisenin.com.
-   Sertifikasi/kursus dapat ditambah melalui CMS dengan nama,
    penyelenggara, tanggal, credential URL opsional, dan deskripsi.
-   Jangan mengklaim sertifikat yang belum tersedia/terverifikasi.

#### 5.7 Contact & Social links

-   Email, LinkedIn, GitHub, portfolio/social URL lain.
-   Link dapat diaktif/nonaktifkan dan diurutkan dari CMS.
-   Contact CTA menggunakan `mailto:` untuk email.
-   Jangan membuat form kontak yang membutuhkan backend/API berbayar
    pada MVP.
-   Tampilkan informasi yang memang ingin dipublikasikan; hindari alamat
    rumah atau data pribadi yang tidak relevan.

#### 5.8 CV download

-   Admin mengunggah PDF CV versi terbaru melalui CMS.
-   Label file dan bahasa CV dapat ditentukan.
-   Tombol download memakai asset URL yang dikelola CMS.
-   Jika file belum tersedia, tombol tidak ditampilkan dan tidak boleh
    mengarah ke file dummy.

#### 5.9 CMS

-   CMS berbasis Sanity Free plan.
-   Studio dapat diakses melalui route `/studio` dan/atau hosted Sanity
    Studio.
-   Admin dapat mengelola singleton profile/site settings dan dokumen
    berulang seperti projects, experiences, skills, education,
    certifications, social links.
-   Draft/published workflow.
-   Validasi field wajib dan URL.
-   Preview konten bila implementasi memungkinkan.
-   Gambar dan CV dikelola sebagai Sanity assets.
-   Semua konten publik boleh dibaca dari public dataset; jangan
    menyimpan rahasia, credential, atau data pribadi sensitif di dokumen
    publik.

#### 5.10 Internationalization

-   Bahasa: `id` dan `en`.
-   Default: `en` untuk first visit, atau deteksi browser dengan
    fallback `en`; pilihan terakhir disimpan di URL/cookie/local storage
    sesuai pendekatan yang dipilih.
-   URL yang disarankan: `/en/...` dan `/id/...` agar dapat diindeks dan
    dibagikan.
-   Semua teks UI dan konten CMS memiliki versi ID/EN.
-   Jangan mencampur dua bahasa dalam satu tampilan kecuali nama
    teknologi/proper noun.

### P1 --- setelah MVP stabil

-   Blog / Notes untuk artikel teknis.
-   Search proyek.
-   Project category filter.
-   Open Graph image per halaman/proyek.
-   Sitemap, RSS untuk blog, dan structured data.
-   Analytics privacy-conscious jika diperlukan.
-   Visual preview dari CMS.
-   Loading skeleton yang sederhana.

### Out of scope

-   Login/register untuk pengunjung.
-   Komentar, like, dan sistem user.
-   AI chatbot, AI-generated copy, AI recommendation, atau fitur AI
    lain.
-   Backend custom hanya untuk portfolio.
-   Dashboard analytics buatan sendiri.
-   E-commerce.
-   Animasi WebGL/3D berat sebagai fitur utama.

## 6. Information architecture

``` text
/en
  /about
  /experience
  /projects
    /[slug]
  /contact

/id
  /tentang
  /pengalaman
  /proyek
    /[slug]
  /kontak

/studio
```

Jika routing bilingual dengan slug terpisah menambah kompleksitas,
gunakan route konsisten `/[locale]/projects/[slug]` dan
`/[locale]/about`, lalu terjemahkan label navigasi. Pilih satu pola dan
terapkan konsisten.

Navigasi utama: - Home - About - Experience - Projects - Contact -
Language switcher - Download CV (CTA)

## 7. Rekomendasi teknologi

  Area              Pilihan
  ----------------- -----------------------------------------
  Framework         Next.js App Router
  Language          TypeScript
  Styling           Tailwind CSS
  Motion            Motion for React (`motion`)
  CMS               Sanity Studio + Sanity Content Lake
  CMS integration   `next-sanity`
  Content query     GROQ
  Image             Sanity Image URL Builder + `next/image`
  Icons             Lucide React
  Validation        Zod untuk data/env bila dibutuhkan
  Hosting           Vercel Hobby
  Source control    GitHub

**Mengapa Sanity:** menyediakan hosted content database, hosted Studio,
asset pipeline, dan locale/content modeling pada paket Free. Sanity Free
saat riset mencantumkan batas 10.000 dokumen, 100 GB asset, 1 juta API
CDN request/bulan, dan 100 GB bandwidth/bulan. Periksa ulang batas
sebelum rilis.

**Mengapa Vercel:** integrasi Next.js dan GitHub, preview deployment,
HTTPS, dan paket Hobby gratis untuk personal non-commercial use.
Portfolio personal untuk pencarian kerja sesuai tujuan paket tersebut
selama tetap mengikuti fair-use dan ketentuan Vercel.

**Catatan biaya:** platform dapat dimulai dengan biaya hosting/CMS
US\$0. Domain custom biasanya dibeli terpisah; gunakan subdomain
`*.vercel.app` jika ingin tetap tanpa biaya. Biaya internet, domain,
atau layanan eksternal tidak termasuk.

## 8. Content model CMS

### Site Settings (singleton)

-   `name`
-   `roleTitle` (localized)
-   `tagline` (localized)
-   `location` (localized)
-   `profileImage`
-   `profileImageAlt` (localized)
-   `resumeFile` (asset PDF)
-   `resumeLabel` (localized)
-   `email`
-   `availabilityStatus` (localized/optional)
-   `heroIntro` (localized)
-   `aboutSummary` (localized)
-   `seoTitle` (localized)
-   `seoDescription` (localized)
-   `socialLinks[]`

### Project

-   `title`
-   `slug`
-   `summary` (localized)
-   `description` (localized rich text)
-   `role` (localized)
-   `coverImage`
-   `coverAlt` (localized)
-   `gallery[]` (image + localized alt)
-   `techStack[]`
-   `category`
-   `liveUrl` (optional)
-   `githubUrl` (optional)
-   `startDate` / `endDate` (optional)
-   `featured`
-   `published`
-   `sortOrder`

### Experience

-   `position` (localized)
-   `company`
-   `location` (localized)
-   `startDate`
-   `endDate`
-   `isCurrent`
-   `description` (localized)
-   `highlights[]` (localized)
-   `sortOrder`

### Skill

-   `name`
-   `category`
-   `level` (optional; omit if not objectively meaningful)
-   `featured`
-   `sortOrder`

### Education / Certification

-   `title` (localized)
-   `institution`
-   `type`
-   `startDate` / `endDate`
-   `credentialUrl` (optional)
-   `description` (localized)
-   `sortOrder`

### Social Link

-   `platform`
-   `url`
-   `label` (localized)
-   `enabled`
-   `sortOrder`

## 9. Visual and interaction requirements

-   Art direction: premium editorial / modern developer journal.
-   Strong typography, controlled whitespace, clear grid, restrained
    color palette.
-   Prefer custom layout details, asymmetry, typographic hierarchy,
    subtle borders, and real project imagery.
-   Motion should communicate entrance, hierarchy, and navigation.
-   Avoid constant floating elements, excessive glow, fake terminal
    windows, random gradients, oversized blobs, and meaningless
    counters.
-   Avoid fake testimonials, fake client logos, fake metrics, fake
    availability, fake project screenshots, and invented project
    details.
-   Use actual screenshots/images supplied by the owner. If unavailable,
    use clean typographic placeholders that are clearly placeholders.
-   No autoplay sound or background video.
-   No cursor-following effects that impair usability.

## 10. Non-functional requirements

### Performance

-   Target Lighthouse: Performance 90+, Accessibility 95+, Best
    Practices 95+, SEO 95+ on representative production pages; targets,
    not guarantees.
-   Use Server Components by default.
-   Keep Client Components limited to interactive elements.
-   Lazy-load below-the-fold imagery and avoid oversized image assets.
-   Avoid loading large animation libraries or effects on every route
    unnecessarily.
-   Use appropriate caching/revalidation for CMS content.

### Accessibility

-   Semantic landmarks and heading hierarchy.
-   Keyboard accessible navigation and controls.
-   Visible focus states.
-   Sufficient contrast.
-   Alt text for meaningful images.
-   Reduced-motion fallback.
-   No essential information available only through animation or hover.

### SEO

-   Per-locale metadata, canonical, Open Graph, sitemap, robots.
-   Descriptive page titles and meta descriptions from CMS where
    appropriate.
-   Project detail pages have unique metadata.
-   Proper `hreflang` alternates for ID/EN.
-   Structured data only when accurate.

### Security

-   Sanity write token must never be exposed to browser/client bundles.
-   Use read-only public content access for public pages.
-   Store secrets in Vercel environment variables.
-   Protect Studio with Sanity authentication and authorized project
    membership.
-   Validate external URLs and use safe link attributes.
-   Do not put personal secrets or private documents in public dataset.

## 11. CMS publishing workflow

1.  Admin signs in to Sanity Studio.
2.  Admin edits profile, project, experience, skills, education, social
    links, or CV asset.
3.  Admin checks both ID and EN content.
4.  Admin previews if preview mode is configured.
5.  Admin publishes.
6.  Website reflects the published content after the configured
    revalidation interval or webhook-triggered revalidation.
7.  Admin verifies the public page and download links.

## 12. Deployment requirements

-   Repository hosted on GitHub.
-   Vercel project connected to the repository.
-   Production branch: `main`.
-   Pull requests create preview deployments.
-   Production deploy occurs after merge to `main`.
-   Configure environment variables:
    -   `NEXT_PUBLIC_SANITY_PROJECT_ID`
    -   `NEXT_PUBLIC_SANITY_DATASET`
    -   `NEXT_PUBLIC_SANITY_API_VERSION`
    -   `SANITY_API_READ_TOKEN` only if a server-side private read is
        genuinely needed; prefer public read-only dataset without token.
    -   Any preview/draft secret must remain server-only.
-   Configure Sanity CORS for production and local development origins.
-   Configure Sanity webhook/revalidation secret only if webhook-based
    revalidation is implemented.
-   Never commit `.env.local`.

## 13. Definition of Done

-   [ ] Next.js application builds successfully.
-   [ ] Sanity schemas and Studio are working.
-   [ ] Profile, projects, experience, skills, education, social links,
    and CV are CMS-managed.
-   [ ] ID/EN switch works on every route.
-   [ ] Project details render from CMS.
-   [ ] GitHub and live demo buttons are independently optional.
-   [ ] Profile image and CV can be replaced from CMS.
-   [ ] Responsive layout is verified at common mobile/tablet/desktop
    widths.
-   [ ] Motion respects reduced-motion preference.
-   [ ] Keyboard and screen-reader basics are verified.
-   [ ] No fabricated content or placeholder links remain.
-   [ ] Production deployment works on Vercel Hobby.
-   [ ] README documents setup, environment variables, CMS usage, and
    deployment.

## 14. Implementation phases for Codex

**Phase 0 --- Inspect and plan** - Inspect repository before editing. -
Identify existing stack, scripts, and conventions. - Do not delete or
replace working code without a reason. - Produce a short implementation
plan and file map.

**Phase 1 --- Foundation** - Initialize/verify Next.js App Router +
TypeScript + Tailwind. - Add design tokens, fonts, layout, locale
routing, navigation, footer. - Ensure build works.

**Phase 2 --- CMS** - Configure Sanity project and schemas. - Add
`studio` route. - Add typed queries and data mapping. - Create seed
content based only on verified CV details.

**Phase 3 --- Public pages** - Build Home, About, Experience, Projects
listing, Project detail, Contact. - Add optional link behavior and CV
download.

**Phase 4 --- Visual polish and motion** - Add purposeful motion,
responsive details, hover/focus states. - Test reduced motion and mobile
performance. - Do not add effects that reduce clarity or speed.

**Phase 5 --- Quality and deployment** - Run lint, typecheck, build,
accessibility checks, and link checks. - Deploy preview, verify content,
then production.

## 15. Instructions to Codex

-   Treat `PRD.md` and `DESAIN.md` as the product and visual source of
    truth.
-   Do not invent portfolio facts. If information is missing, create an
    optional CMS field or mark it as content requiring owner input.
-   Do not generate generic AI copy, fake metrics, fake testimonials,
    fake logos, or fabricated screenshots.
-   Do not add AI features.
-   Do not use placeholder links that look real.
-   Prefer simple, maintainable architecture over unnecessary
    abstraction.
-   Use TypeScript types and schema validation.
-   Explain any paid service requirement before introducing it.
-   Keep the app deployable on free tiers.
-   After each phase, report changed files, commands run, test/build
    status, and remaining decisions.
