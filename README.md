# LinkqGlobal Consulting

A complete React + Vite + TypeScript consulting website with an Express API, PostgreSQL persistence, Prisma migrations, and optional SMTP notifications. The 21st.dev components and UI/UX Pro Max guidance informed a custom, restrained visual system. The website includes 20 prerendered public routes: all requested main, service, and legal pages plus five complete insight articles, and a designed 404 page.

## Local development

**Windows shortcut:** double-click `Start LinkQ.bat` in the project folder. It installs dependencies if needed, creates `.env` if missing, starts local PostgreSQL, applies migrations, starts the website/API, and opens the site in your browser. Keep its terminal open while using the site; press Ctrl+C to stop services started by that launcher. If the project is already running, the shortcut reuses it. Node.js 22.12 or newer must be installed first. The shortcut is for a local PostgreSQL configuration.

The shortcut opens a browser even when it reuses an already-running site. If Windows cannot open the default browser, the launcher displays the error and the site URL instead of failing silently.

Use Node.js 22.12+ or 24 and npm. From the project directory:

```powershell
npm ci
Copy-Item .env.example .env
npm run db:generate
npm run db:local
```

Keep the database terminal running. In a second terminal:

```powershell
npm run db:migrate
npm run dev
```

Open http://127.0.0.1:5173. The API listens on 127.0.0.1:3001 and Vite proxies `/api`. The local PostgreSQL server uses port 54329 and keeps data in the ignored `.local-db/` directory. Its credentials are for local development only. Stop it with Ctrl+C. If using an existing PostgreSQL server, set `DATABASE_URL` and omit `db:local`.

On package managers that block install scripts, review and allow the Prisma engine/client, esbuild, and embedded PostgreSQL platform-package build scripts before generating or running. Do not enable arbitrary unreviewed scripts.

## Validation

```powershell
npm run test:prepare
npm test
npm run build
```

`test:prepare` creates and migrates a separate `linkq_test` database on the bundled local PostgreSQL server. Backend integration tests insert and remove their own records only in this database. Set `TEST_DATABASE_URL` to use another dedicated database; its name must end in `_test`. The development database is not cleared. Frontend tests cover routes, navigation, FAQ keyboard controls, insight filtering, form validation, and service failures. Backend tests cover actual persistence, concurrent retries, normalization, consent, validation, rate limiting, malformed/oversized input, origin restrictions, and email/database failures.

The production build runs TypeScript checking, creates split frontend bundles, renders HTML and metadata for every public route, generates robots/sitemap files when a site URL is supplied, and compiles the Node server. A domain-free local build is deliberately marked `noindex`; this prevents development content from being indexed. Set the final domain before rebuilding for launch.

## Configuration

- `DATABASE_URL`: Prisma PostgreSQL URL; never prefix database secrets with `VITE_`.
- `PORT`: API port, default 3001. API binds to loopback.
- `ALLOWED_ORIGINS`: comma-separated exact browser origins. Required in production.
- `VITE_SITE_URL`: approved HTTPS site origin at build time; enables canonical URLs, share-image URLs, indexing, and `sitemap.xml`.
- `SITE_URL`: reserved runtime site origin for deployment consistency.
- `TRUST_PROXY`: 0 for direct local use; 1 behind the provided single Nginx proxy. Do not set a broader trust value without reviewing the network topology.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`, `ENQUIRY_TO`: optional internal notification settings. Port 587 with `SMTP_SECURE=false` requires STARTTLS; port 465 typically uses `true`.

No business address, telephone number, email address, social profile, customer logo, testimonial, accreditation, or achievement has been invented. Add approved business contact details when available.

## Enquiry behavior

`POST /api/enquiries` accepts JSON matching `shared/enquiry.ts` and requires an `Idempotency-Key` UUID v4 header. Form fields are validated on both sides. The database is authoritative: the response indicates success only after persistence. Retries with the same key and payload return success without another record; a changed payload with the same key returns 409. Database failures return a generic 503. Consent is required and timestamped in UTC. The database never receives the honeypot field or a plaintext IP address. No endpoint lists enquiries publicly.

The request limiter allows five submissions per 15-minute window and keeps only keyed network-address hashes in process memory. For multiple API processes, use a shared limiter store before scaling. An internal notification failure leaves the enquiry saved and marks `notification_status=failed`; it never tells the visitor that persistence failed. Notification retries are an operations responsibility: query failed/pending records using an authorized database tool and resend through the approved mail system. No automated marketing email is sent.

`GET /api/health` checks PostgreSQL connectivity and returns 503 when unavailable. Configure external health monitoring against this endpoint. Keep database access restricted to the API and authorized operators.

## Daily Insights publishing

The Daily Industry Insights workflow runs at 8:47 a.m. India time. It publishes up to three briefings from recent U.S. Federal Register notices relevant to manufacturing, logistics, AI, FMCG, or education technology. Briefings link to the original notices and include short attributed excerpts when available. Days without a qualifying source produce no posts. Licensed Wikimedia Commons photos found through Openverse are credited and saved as responsive WebP files. Existing topic images are used if an eligible photo cannot be downloaded.

- Preview source matches locally with `npm run insights:publish -- --dry-run`.
- Prepare posts and images locally with `npm run insights:publish`, then build the website to see them.
- GitHub Actions verifies the build before committing the new posts and images to `main`. Deploy that commit to EC2 using your deployment process. The publisher uses public sources and requires no API key.

## Linux VPS deployment

This repository targets the Node/Express + PostgreSQL + Nginx VPS architecture specified in the brief. It is not published to a static-only host: that would leave the enquiry system disconnected.

1. Provision a supported Node runtime, PostgreSQL, Nginx, and a dedicated unprivileged `linkq` service account. Place the checkout at `/srv/linkq`.
2. Create a PostgreSQL database and separate migration/runtime roles. Use SCRAM authentication, bind PostgreSQL to loopback or a private network, and use a strong unique password. Grant the migration role schema creation rights. The runtime role needs connection, schema usage, and select/insert/update on `enquiries`; do not grant superuser or database creation rights.
3. Install from the lockfile with `npm ci`, then run `npm run db:generate`. Set the migration-role `DATABASE_URL` and apply `npm run db:migrate`. Never use the bundled development credentials in production.
4. Set `VITE_SITE_URL` to the approved HTTPS origin and run `npm run build`. Confirm canonical URLs, `dist/sitemap.xml`, and the indexable robots file. All marketing content is present in the generated HTML without client JavaScript.
5. Store runtime configuration in `/etc/linkq/environment`, readable only by root and the service group. Use the runtime database role, production origins, and `TRUST_PROXY=1`. Configure SMTP if notifications are needed.
6. Adapt `deploy/linkq.service`, install it under `/etc/systemd/system`, and enable/start it with systemd. The Node app can also serve the built site directly for smoke testing with `NODE_ENV=production npm start`.
7. Replace the clearly marked domain and certificate paths in `deploy/nginx.conf`. Obtain a certificate using your approved ACME client (for example Certbot), enable automatic renewal, test renewal, check `nginx -t`, and reload Nginx. Allow only the required SSH/HTTP/HTTPS ports; do not expose the database or API port publicly.
8. Run health, direct deep-link, invalid form, valid enquiry, duplicate retry, and notification checks through HTTPS. Verify an enquiry in PostgreSQL using an authorized operator connection. Restrict/remove test records afterward according to the approved retention policy.

Back up PostgreSQL using encrypted, access-controlled `pg_dump --format=custom` backups and test restoration into a separate database. Agree backup cadence, retention, recovery objectives, and access responsibilities with the business. Monitor API health, disk space, notification failures, certificate renewal, and backup completion. Application logs contain event names only, without submitted fields. The sample proxy disables access logs; review provider error/security log retention separately.

## Content and design maintenance

- Public branding is **LinkqGlobal Consulting**, with the joined `LinkqGlobal` wordmark and lowercase `q` from the supplied reference. Current wordmark layers are `public/brand/linkqglobal-wordmark.svg` and `linkqglobal-wordmark-light.svg`; the light variant is used in the footer. The Global lettering is authored as separate `Gl` and `bal` paths, leaving the globe as the only `o`. The Windows helper `scripts/create-brand-assets.ps1` recreates these layers. The existing `Start LinkQ.bat` filename is retained so saved shortcuts continue to work; its displayed title uses the new name.
- The supplied globe-and-arrow emblem fills the `o` in the shared header/footer `Logo`. The `.brand-o` percentages align it with the reserved glyph position in the 780×245 SVG layers; keep the image inside `.brand-lockup` when resizing. The wordmark is 190px wide on desktop/footer and 160–170px at smaller header breakpoints through `--brand-wordmark-width`. The browser favicon uses the same `public/brand/globe-emblem.png` separately. Image preparation details are in `assets/brand/README.md`.
- Desktop navigation links stay centered in the header, with the wordmark on the left and consultation button on the right. Mobile navigation uses the dropdown layout. The Home link is omitted only on the homepage.
- The interface uses white and warm ivory surfaces, terracotta buttons and accents, and dark brown typography/footer. The architectural hero uses a warm dark overlay to keep building details visible. Shared palette tokens live at the top of `src/styles.css`; keep page surfaces and interaction states mapped to them. Clipped frames, scroll-linked depth, and the interactive expertise preview remain in place. The homepage connection gallery reserves a separate grid cell for each photograph. Body/footer reveals and the reading-progress line respect reduced-motion preferences.
- Concise service summaries, image explanations, and deliverables: `src/content/serviceStories.ts`. Detailed capability lists stay collapsed until opened. Consultation links carry the service into the form and prefill an editable subject.
- Motion-specific layout and reduced-motion styles: `src/motion.css`. Photo movement is restricted to the interior of each frame so captions and neighboring images remain separate.
- Scroll and depth components: `src/components/Motion.tsx`. No WebGL engine or additional animation dependency is required.
- Services and capabilities: `src/content/services.ts`.
- Each service has a dedicated `coverImage`/`coverAlt` for its detail page and social preview, separate from catalog photography. Keep the five covers unique and avoid reusing them in story chapters or other site sections. The download script creates cropped 640px/1200px cover derivatives and a 1920px desktop architecture image.
- Articles: `src/content/insights.ts`. Keep publication dates truthful when publishing or editing content.
- Shared visual tokens and responsive layouts: `src/styles.css`.
- Legal drafts: `src/pages/Legal.tsx`.
- Photography and component provenance: `THIRD_PARTY.md`.
- Asset refresh: `node scripts/download-assets.mjs` downloads local photo variants and copies the installed variable-font files. The existing assets are included; no refresh is needed to run or build.

## Launch status

The implementation is ready for review, not a claim of completed commercial approval. Before public launch, confirm the business legal identity, contact and privacy details, retention/deletion process, hosting and email providers, image-release suitability, final domain, and legal drafts. Real SMTP delivery and public VPS deployment require the corresponding approved infrastructure/configuration. No production infrastructure or external email recipient has been supplied or configured.
