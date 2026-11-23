# Randi Prabowo’s portfolio

A bilingual Next.js App Router portfolio with an embedded Sanity Studio. English and Indonesian share route segments so the language switch keeps the visitor on the same project. The design uses Space Grotesk, Inter, IBM Plex Mono, charcoal surfaces, and a lime accent. Fonts are served locally.

The sun and moon controls in the navigation switch between light and dark mode. The portfolio and Studio follow the device setting until a visitor chooses a theme. The browser remembers that choice across visits and languages.

## Run locally

Use Node.js 24 and npm. First copy `.env.example` to `.env.local` to connect to the portfolio’s existing public dataset. Then run these commands from the repository root.

```sh
npm ci
npm run dev -- --port 3333
```

Open [the portfolio](http://localhost:3333/en) or [Studio](http://localhost:3333/studio). This project permits credentialed Studio requests from `http://localhost:3333`. The root redirects to English. On Windows, `npm.cmd` also works when PowerShell blocks `npm.ps1`.

With both Sanity variables empty, the public site previews the supplied portfolio records in `content/seed.json`. Studio shows connection instructions. Setting just one variable produces a configuration error. With both set, the public pages use published Sanity records exclusively. An empty dataset shows empty states, and an unavailable dataset surfaces an error.

## Connect the CMS

1. Use the existing project and public dataset identified by `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.example`.
2. Copy that file to the Git-ignored `.env.local`. Its public identifiers and pinned API version are sufficient for the portfolio to read published content.
3. Use the local origin above for Studio. If you use a different host or port, add that exact origin in the project’s API settings with credentials enabled for Studio sign-in.
4. Restart Next.js and open `/studio`. Sign in with a Sanity account that has editing access to this project. Studio uses the member’s session. Public pages use anonymous read access.
5. Review the 43 résumé records in `content/review/preview.html`. After owner approval, sign in to the CLI with an editing account and run the import from the repository root.

```sh
npx sanity login
npm run cms:import-resume
```

The import targets `fpaz2q9j/production`. It checks the reviewed portrait and PDF against their content hashes, uploads both assets, and links the returned references on `siteSettings`. It publishes the 43 records in one document transaction. Rerunning updates the fields supplied in `content/review/resume.json` at the same document IDs, including any of those fields edited in Studio since the last run.

## Manage content

| Studio editor | What it controls |
| --- | --- |
| Profile & site settings | Name, role, introductions, public location and email, availability, work approach, portrait, CV PDF, CV language and label, homepage SEO |
| Projects | Localized summaries and rich-text contributions, context, outcomes, role, dates, category, stack, slug, cover, gallery, links and featured status |
| Experience | Employer, position, location, dates, current status, highlights and description |
| Skills | Skill name, category, optional proficiency and featured status |
| Education & credentials | Degree, bootcamp, course or certification, institution, dates and optional credential |
| Social links | Platform, bilingual accessible label, URL, visibility and display order |

Fill both languages for each localized field you use. For images, upload an owner-supplied asset, write meaningful alt text in both languages, and set the hotspot when a subject should stay in the crop. Upload a PDF through the CV field to enable downloads in the header, home and contact views. The public email opens a mail client.

Use **Publish** to release changes. Drafts remain private to authorized Studio members. Use the document actions to unpublish or delete an entry. Smaller display-order values appear first. Featured projects precede other projects. The public site revalidates on requests after a 60-second cache interval. The first request after expiry can receive the previous version while Next.js refreshes it.

BROD and EduAkses are the two featured résumé projects. Project dates, screenshots, repository and demo URLs, certification dates and credential URLs remain available for the owner to supply in Studio.

## Deploy with Vercel

Import the GitHub repository as a **Next.js** project, set the root to the repository root and choose Node.js 24. Use `main` as the production branch and enable Git preview deployments. The normal build command is `npm run build`. Webpack is selected explicitly for reliable builds on the Windows development host.

Set the two Sanity public variables and API version for the intended Vercel environments. Set `SITE_URL` to the canonical HTTPS production origin, especially for a custom domain. Without it, the site uses Vercel’s production deployment domain or, locally, `http://localhost:3000`. Redeploy after changing these variables. A deployment can use a Vercel subdomain. The application requires no paid form service, custom server, or private read token.

Review the preview in both languages, check a real project URL, upload and download the CV, then verify a publish/unpublish cycle using a test entry. Merge the reviewed changes to `main` for production. Check allowed CORS origins for any preview where Studio editing is needed. The sitemap lists both language versions and project detail routes. Studio is excluded from indexing.

The architecture supports Sanity Free and Vercel Hobby within their current terms and usage limits. [Sanity pricing](https://www.sanity.io/pricing) · [Vercel Hobby](https://vercel.com/docs/plans/hobby)

## Verification

```sh
npm run lint
npm run typecheck
npm run test:content
npm run build
npm start
```

With the production server running, use a second terminal for the browser checks:

```sh
npx playwright-core install chromium
npm run test:browser
```

`TEST_ORIGIN` overrides the local test origin. `BROWSER_CHANNEL=msedge` uses an installed Microsoft Edge instead of downloading Chromium. The suite checks locales, responsive widths from 320 to 1440px, WCAG rules with axe, keyboard focus, reduced motion, no-JavaScript rendering, internal routes, canonical links, hreflang, the sitemap and missing-project responses. It runs without a CMS account using the local preview data.

## Source map

- `app/[locale]/` contains the server-rendered public routes.
- `app/studio/`, `sanity.config.ts`, and `sanity/schema.ts` define the admin route, editor structure and validations.
- `lib/content.ts` reads published data and builds image URLs. `lib/links.ts` resolves optional links and downloads.
- `lib/locale.ts` and `lib/ui.ts` contain routes and interface translations. Portfolio records belong in Sanity.
- `components/` holds shared navigation, media, history, project and contact views. The home entrance uses Motion’s mini React bundle.
- `PRD.md` and `DESAIN.md` contain the original requirements and design direction.
