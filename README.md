# Randi Prabowo’s portfolio

A bilingual Next.js App Router portfolio with an embedded Sanity Studio. English and Indonesian share route segments so the language switch keeps the visitor on the same project. The design uses Space Grotesk, Inter, IBM Plex Mono, charcoal surfaces, and a lime accent. Fonts are served locally.

## Run locally

Use Node.js 24 and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

Open [the portfolio](http://localhost:3000/en) or [Studio](http://localhost:3000/studio). The root redirects to English. The URL stores the language choice. On Windows, `npm.cmd` also works when PowerShell blocks `npm.ps1`.

With both Sanity variables empty, the public site previews the supplied portfolio records in `content/seed.json`. Studio shows connection instructions. Setting just one variable produces a configuration error. With both set, the public pages use published Sanity records exclusively. An empty dataset shows empty states, and an unavailable dataset surfaces an error.

## Connect the CMS

1. Create a Sanity project and a public dataset in the owner’s account. Record the project ID and dataset name.
2. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. The API version is pinned in the example. Leave private credentials out of public variables.
3. In the project’s API settings, add the local origin (usually `http://localhost:3000`) as a CORS origin with credentials enabled for Studio sign-in. Add the actual deployed origin when available.
4. Restart Next.js and open `/studio`. Sign in with a Sanity account that has editing access to this project. Studio uses the member’s session. Public pages use anonymous read access.
5. To import the brief-derived records, sign in to the CLI with the same account, check the target project and dataset in `.env.local`, and run:

```sh
npx sanity login
npm run cms:seed
```

The explicit import creates missing records in one transaction. Existing document IDs retain their content. Run the seed during initial setup. Running it after intentionally deleting seed records can recreate them. No import occurs during build or page requests.

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

The seed follows the supplied brief. BROD and EduAkses have no verified image, repository or demo URL. The portrait, CV, email, social profiles, work dates, credentials and availability await the owner’s input. Solvera is an unpublished draft pending confirmation of the official employer name. Review both languages and dates before release.

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
