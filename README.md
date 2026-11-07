# Sham website · isolated static preview

An extracted, safe, database-free preview of the uploaded Sham Portal 1.1.0 and Sham MediaOS 2.3.2 documentation. **This is not the WordPress or production PHP implementation.** No real auth, TOTP, accounts, payments, licensing, e-mail, admin changes, or APIs are present.

## Local use

```sh
python3 -m http.server 8000 --directory site
```

Open http://localhost:8000/. The generated site consists of directory-index HTML files and uses root-relative assets and navigation. For local deep routes use a server that supports directory indexes. `site/health/index.html` is the health endpoint. A normal static file server returns 404 for nonexistent routes.

## GitHub

```sh
git init
git add .
git commit -m "Static Sham preview baseline"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

Create the empty GitHub repository yourself before pushing, then replace the example URL. Never upload the source production ZIP, installer, signing keys, `.env`, customer data or database exports.

## Render (recommended)

Create a Static Site from this GitHub repository, branch `main`. Render Blueprint `render.yaml` configures `runtime: static`, publish directory `./site`, and a no-op build command. No env vars or database. Check `/`, `/mediaos/`, `/mediaos/docs/`, `/store/`, `/admin/`, and `/health/`.

## Railway

Connect this repository on Railway. The `railway.json` config chooses a Dockerfile Nginx static server; it listens on injected `${PORT}`, defaulting to 8080, and has `/health/` health check. A public domain must be enabled from Railway's networking settings. This incurs container service costs; prefer Render or Netlify for free/static CDN preview when possible. Do not change the root directory (repository root is expected).

## Netlify

Connect the GitHub repository. The checked-in `netlify.toml` defines publish `site` and no-op build. Directory-index routes are static files; `_redirects` provides a custom 404.

## Vercel

Import this GitHub repository; use the Other framework, output directory `site`, no application build. `vercel.json` declares static output and response headers.

## Scope, design and safety

- Original company/portal stylesheet `site.css` and original admin stylesheet `admin.css` are copied byte-for-byte. Supplementary `preview.css` and `preview.js` are isolated.
- Original 11 HTML documentation volumes and all their images are included; screenshots are re-encoded as WebP, not deleted. Fonts use system fallbacks; no font binaries are distributed. HTML references are updated.
- Pricing and product language are sourced from the uploaded 1.1.0 seed files and are **not represented as current offers**. Sample records are marked synthetic.
- Admin role chooser only changes visibility; it is not security. The site contains no confidential data or backend.
- Full production PHP application is deliberately **not** included. It remains in its unmodified owner-supplied source archive.
- MediaOS PDF books are **not included** because the supplied documentation archive only contained HTML content; the filenames listed in the document library are descriptive.

See the separate handover ZIP for the complete audit, file decisions, route map, test results, asset manifest and WordPress reintegration plan.
