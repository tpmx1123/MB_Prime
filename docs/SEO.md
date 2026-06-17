# MB Prime Projects — SEO Implementation Guide

This document describes the search-engine optimization (SEO) work implemented on the MB Prime website (`https://mbprimeprojects.com`). It covers technical SEO, on-page metadata, structured data, URL architecture, content strategy, performance considerations, and ongoing maintenance.

---

## 1. Overview & Goals

The site is a **React single-page application (SPA)** built with Vite and React Router. SPAs require extra care so search engines and social platforms receive correct titles, descriptions, canonical URLs, and structured data on every route—not only on the initial HTML load.

**Primary SEO goals:**

- Rank for location-specific real estate queries (villas, plots, gated communities in Andhra Pradesh)
- Give each of the five project pages unique, keyword-rich metadata
- Help Google understand the business via Schema.org structured data
- Preserve link equity when migrating from old mixed-case project URLs
- Improve image discoverability with descriptive alt text
- Support rich results (FAQ snippets, breadcrumbs, organization knowledge panel signals)

---

## 2. Architecture

### 2.1 Central SEO component

**File:** `src/components/SEO.jsx`

A single global `<SEO />` component is mounted in `App.jsx` and runs on every route change. It is responsible for:

| Responsibility | Implementation |
|----------------|----------------|
| Page title | Unique per route via `SEO_CONFIG` and `PROJECT_SEO` |
| Meta description & keywords | Per-page config objects |
| Canonical URL | `link rel="canonical"` built from `VITE_SITE_URL` + normalized path |
| hreflang | `en-IN` and `x-default` alternates |
| Open Graph tags | `og:title`, `og:description`, `og:url`, `og:image`, `og:locale` |
| Twitter Card tags | `summary_large_image` with title, description, image |
| Robots directive | `index,follow` with large image/snippet/video preview hints |
| JSON-LD schema | Organization, WebSite, RealEstateAgent, WebPage + page-specific schemas |
| Favicon | Default site favicon or per-project favicon on project routes |
| GA4 page views | `gtag('config', 'G-KS790ZMQGS', { page_path })` on navigation |

**Helmet library:** `react-helmet-async` (with `HelmetProvider` in `src/main.jsx`) replaces the older `react-helmet` package so document `<title>` and meta tags update reliably during client-side navigation in React 19.

**SPA title fix:** `useLayoutEffect` also sets `document.title` and the favicon `<link>` directly in the DOM so the browser tab updates immediately, even before Helmet reconciliation.

### 2.2 Blog post SEO (separate from central SEO)

**File:** `src/components/BlogPost.jsx`

Individual blog articles use their own `<Helmet>` block because titles and descriptions are dynamic (loaded from the CMS/API). Each post includes:

- Dynamic `<title>`, meta description, canonical URL
- Open Graph `article` type tags
- Twitter Card tags
- `BlogPosting` JSON-LD schema
- `BreadcrumbList` JSON-LD (Home → Blogs → Article)

### 2.3 404 page

**File:** `src/pages/NotFound.jsx`

- Title: `Page Not Found | MB Prime Projects`
- `meta name="robots" content="noindex, follow"` so error pages are not indexed

---

## 3. On-Page Metadata

### 3.1 Site-wide defaults

**File:** `index.html` (fallback for first paint / crawlers before JS)

- Default `<title>` and meta description for the homepage
- `google-site-verification` meta tag for Google Search Console
- `lang="en"` on `<html>`
- Viewport meta for mobile-first indexing

Runtime values from `SEO.jsx` override these once the app loads.

### 3.2 Page-by-page SEO config

**File:** `src/components/SEO.jsx` → `SEO_CONFIG` and `PROJECT_SEO`

Every major route has a dedicated **title**, **description**, and **keywords** string tuned for search intent:

| Route | SEO focus |
|-------|-----------|
| `/` | Luxury villas & plots in Andhra Pradesh (brand + category) |
| `/projects` | Portfolio of all villa/plot projects |
| `/projects/mb-prime-villas` | Premium villas in **Srikakulam** |
| `/projects/mb-prime-enclave` | Open plots in **Vizianagaram** |
| `/projects/prime-jewel-city` | Residential plots in **Vijayawada** |
| `/projects/capital-west` | Villas & plots in **Vijayawada** |
| `/projects/ai-gen-serenity-villas` | Luxury villas in **Amaravati** |
| `/about-us` | Real estate developer credibility |
| `/founder` | Maganti Babu / leadership E-E-A-T |
| `/contact-us` | Enquiry and site visit intent |
| `/blogs` | Real estate investment content hub |
| `/privacy-policy`, `/terms-and-conditions` | Legal/compliance pages |

**Example project title pattern:**

> `Premium Villas & Plots in Srikakulam | MB Prime Villas & Plots Project`

Titles follow the pattern: **Primary keyword + location | Brand/project name**.

### 3.3 Open Graph & social sharing

- **Default OG image:** Cloudinary-hosted brand/project image (`DEFAULT_OG_IMAGE` in `SEO.jsx`)
- **Project pages:** Use each project's `image` from `src/data/projects.js` as `og:image` and `twitter:image`
- **OG locale:** `en_IN`
- **Site name:** `MB Prime`

This ensures link previews on WhatsApp, Facebook, LinkedIn, and Twitter show the correct headline, description, and image.

---

## 4. URL Structure & Redirects

### 4.1 Lowercase canonical slugs

All project URLs use **lowercase, hyphenated slugs** (SEO best practice—consistent, readable, no case sensitivity issues):

```
/projects/mb-prime-villas
/projects/mb-prime-enclave
/projects/prime-jewel-city
/projects/capital-west
/projects/ai-gen-serenity-villas
```

**Data source:** `src/data/projects.js`

### 4.2 Legacy URL redirects (301)

Old PascalCase URLs are permanently redirected to lowercase equivalents:

| Old URL | New canonical URL |
|---------|-------------------|
| `/projects/MB-Prime-Villas` | `/projects/mb-prime-villas` |
| `/projects/MB-Prime-Enclave` | `/projects/mb-prime-enclave` |
| `/projects/Prime-Jewel-City` | `/projects/prime-jewel-city` |
| `/projects/Capital-West` | `/projects/capital-west` |
| `/projects/AI-Gen-Serenity-Villas` | `/projects/ai-gen-serenity-villas` |

**Implemented in:**

- `src/App.jsx` — React `<Navigate replace />` routes
- `public/_redirects` — Netlify/hosting-level 301 rules
- `src/components/SEO.jsx` — `resolveSeoPath()` maps legacy paths to canonical paths for meta tags (so even if someone lands on an old URL briefly, canonical points to the new one)

### 4.3 Slug aliases

**File:** `src/data/projects.js` → `SLUG_ALIASES` and `getProjectBySlug()`

Allows old slug formats to resolve project data without breaking pages during transition.

### 4.4 About page normalization

`/about` canonicalizes to `/about-us` in `resolveSeoPath()`.

---

## 5. Structured Data (Schema.org / JSON-LD)

Structured data helps Google display rich results and understand entity relationships.

### 5.1 Global schemas (every indexed page)

Injected via `SEO.jsx` on all configured routes:

| Schema type | Purpose |
|-------------|---------|
| `Organization` | Company name, logo, email, phone, address, social profiles |
| `WebSite` | Site entity |
| `RealEstateAgent` | Local business / real estate agent signals |
| `WebPage` | Current page name, description, URL, language (`en-IN`), link to main entity |

On project pages, `WebPage.mainEntity` references the project `RealEstateListing` `@id`.

### 5.2 Page-specific schemas

| Page | Additional schema |
|------|-------------------|
| `/projects` | `BreadcrumbList`, `ItemList` (all 5 projects) |
| `/about-us` | `BreadcrumbList` |
| `/founder` | `BreadcrumbList`, `Person` (Maganti Babu) |
| `/contact-us` | `BreadcrumbList`, `ContactPage` |
| `/blogs` | `BreadcrumbList`, `CollectionPage` |
| `/privacy-policy`, `/terms-and-conditions` | `BreadcrumbList` |
| Each project page | `RealEstateListing` (unique per project) |

**Schema builders:** `src/utils/schema.js`

### 5.3 RealEstateListing (per project)

Each of the five project pages outputs a `RealEstateListing` JSON-LD block including:

- Project name, description, URL, image
- `PostalAddress` (locality, Andhra Pradesh, IN)
- `floorSize` in acres (when available)
- `category` (project type)
- `Offer` with `RealEstateAgent` seller details

This ties on-page SEO copy to a machine-readable property listing.

### 5.4 FAQPage schema

**Homepage:** `src/components/HomeFAQ.jsx` + `src/data/homeFaqs.js`  
**Each project page:** `src/components/ProjectFAQ.jsx` + `src/data/projectFaqs.js`

- 6 FAQs per project, 6 on homepage
- Visible accordion content **matches** JSON-LD exactly (required by Google for FAQ rich results)
- Injected via `FAQSchema.jsx` using `useJsonLd` hook (avoids duplicate/competing Helmet instances)

### 5.5 BlogPosting schema

Each blog article outputs `BlogPosting` with headline, description, image, dates, author, and publisher.

### 5.6 Breadcrumbs

- **SEO-level:** `buildBreadcrumbList()` in `schema.js` for main pages
- **UI-level:** `src/components/Breadcrumbs.jsx` on project headers with matching JSON-LD via `useJsonLd`

### 5.7 JSON-LD injection hook

**File:** `src/hooks/useJsonLd.js`

Injects `<script type="application/ld+json">` into `<head>` with cleanup on unmount. Used for FAQ and breadcrumb schemas that live inside page components rather than the central SEO component—this prevents Helmet conflicts that previously broke SPA title updates.

---

## 6. Sitemap & Robots

### 6.1 XML sitemap

**File:** `public/sitemap.xml`

Lists all important public URLs with `changefreq` and `priority`:

- Homepage (priority 1.0)
- Projects index and all 5 project pages (0.8–0.9)
- About, Founder, Contact, Blogs (0.7)
- Individual blog posts (0.6)
- Privacy Policy, Terms (lower priority)

Submitted to Google via Search Console. Referenced in `robots.txt`.

### 6.2 Robots.txt

**File:** `public/robots.txt`

```
User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin-login
Disallow: /admin-forgot-password
Disallow: /admin-reset-password

Sitemap: https://mbprimeprojects.com/sitemap.xml
```

Admin routes are blocked from indexing; all public marketing pages are allowed.

---

## 7. Image SEO

### 7.1 Centralized alt text helpers

**File:** `src/utils/imageAlt.js`

All meaningful images use descriptive, keyword-aware alt text via helper functions:

| Helper | Used for |
|--------|----------|
| `projectHeroAlt()` | Project hero images |
| `projectMasterPlanAlt()` | Master plan layouts |
| `projectGalleryAlt()` | Villa/plot gallery images |
| `projectAmenityAlt()` | Amenity photos |
| `projectCardAlt()` | Project cards on home & listing pages |
| `projectLogoAlt()` | Per-project logos in header |
| `projectBadgeAlt()` | VMRDA / RERA badges |
| `brandLogoAlt()` | MB Prime logo |
| `homeHeroAlt()` | Homepage hero |
| `blogImageAlt()` | Blog thumbnails and hero images |
| `founderAlt()` | Founder portrait |
| `locationMapAlt()` | Location map |
| `commitmentsImageAlt()`, `investmentImageAlt()`, `philosophyImageAlt()` | Homepage section images |
| `heroVideoLabel()` | Accessible label on project hero videos |

**Pattern:** `{Subject} in {City} – MB Prime Projects`

Decorative hover images (duplicate visuals on project cards) correctly use `alt=""` and `aria-hidden`.

### 7.2 Lazy loading

Images use `loading="lazy"` and `decoding="async"` where appropriate to support Core Web Vitals without hurting crawlability (Google executes JavaScript and reads `alt` attributes).

---

## 8. Crawlability & Internal Linking

### 8.1 Crawlable navigation

**File:** `src/components/CrawlableNav.jsx`

A screen-reader-only (`sr-only`) `<nav>` in the header contains `<Link>` elements to **every** public page (main nav, all projects, legal pages). Search bots that do not interact with JavaScript menus can still discover the full site structure from the HTML.

**Link source:** `src/config/siteNav.js` → `CRAWLABLE_LINKS`

### 8.2 Footer & header links

Footer and header repeat links to all projects and key pages, reinforcing internal link equity to high-value landing pages.

### 8.3 Project cross-linking

Each project page includes a "Related Projects" section linking to the other four developments.

---

## 9. Per-Project Favicons

**Directory:** `public/favicons/`

Each project route serves a unique favicon in the browser tab:

- `mb-prime-villas.ico`
- `mb-prime-enclave.ico`
- `prime-jewel-city.ico`
- `capital-west.ico`
- `ai-gen-serenity-villas.ico`

Configured in `SEO.jsx` → `PROJECT_FAVICONS` and applied via `useLayoutEffect` + Helmet.

---

## 10. Analytics & Tracking (SEO-adjacent)

These tools support measurement and remarketing; they do not directly affect rankings but are part of the marketing stack:

| Tool | ID / Location | Purpose |
|------|---------------|---------|
| Google Analytics 4 | `G-KS790ZMQGS` | Traffic, page paths, conversions |
| Google Ads | `AW-16982010540` | Conversion tracking |
| Meta Pixel | `1508555837586936` | Facebook/Instagram ads |
| Microsoft Clarity | `wpsvtqasaf` | Session recordings, heatmaps |
| ContentSquare | `index.html` | UX analytics |

GA4 receives SPA page-view updates on each route change from `SEO.jsx`.

---

## 11. Content SEO Features

### 11.1 Homepage FAQ section

Location- and intent-targeted questions about MB Prime's projects, cities, enquiries, brochures, and Tier-2 investment—designed for FAQ rich snippets.

### 11.2 Project FAQ sections

Each project page has 6 unique FAQs covering location, plot sizes, amenities, approvals, investment rationale, and how to book a visit. Copy is localized to that project's city and features.

### 11.3 Blog hub

`/blogs` targets informational queries (EMI calculators, appreciation, infrastructure). Individual posts have full metadata and `BlogPosting` schema.

### 11.4 Semantic HTML

- One `<h1>` per page (hero sections)
- Section headings (`<h2>`, `<h3>`) for amenities, location, FAQ, etc.
- `aria-label` on icon-only buttons and hero videos

---

## 12. Environment Configuration

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical base URL (default: `https://mbprimeprojects.com`) |
| `VITE_API_URL` | Backend API for blogs, forms, Instagram feed |

Set these in your deployment environment (Hostinger VPS, Netlify, etc.) so canonical URLs and API calls resolve correctly in production.

---

## 13. Hosting & Technical Notes

### 13.1 SPA routing

Nginx (or Netlify `_redirects`) must serve `index.html` for all non-file routes so deep links like `/projects/mb-prime-villas` work. See `deploy/hostinger-vps-nginx.example.conf`.

### 13.2 Static assets

`sitemap.xml` and `robots.txt` are served as real files (not rewritten to `index.html`).

### 13.3 Pre-render consideration

The site is client-rendered. Googlebot generally handles React SPAs well when:

- Metadata updates via Helmet on navigation ✓
- Content is in the DOM (not hidden behind auth) ✓
- Sitemap and internal links are present ✓

For faster indexing of critical pages, optional future enhancement: static pre-rendering (e.g. `vite-plugin-ssr`, Prerender.io, or SSR).

---

## 14. File Reference

| File | SEO role |
|------|----------|
| `src/components/SEO.jsx` | Central metadata, OG, Twitter, canonical, global JSON-LD |
| `src/utils/schema.js` | JSON-LD builders |
| `src/hooks/useJsonLd.js` | Component-level JSON-LD injection |
| `src/components/FAQSchema.jsx` | FAQPage schema |
| `src/components/HomeFAQ.jsx` | Homepage FAQ UI + schema |
| `src/components/ProjectFAQ.jsx` | Project FAQ UI + schema |
| `src/data/homeFaqs.js` | Homepage FAQ copy |
| `src/data/projectFaqs.js` | Per-project FAQ copy |
| `src/data/projects.js` | Slugs, images, project data for listings |
| `src/utils/imageAlt.js` | Image alt text helpers |
| `src/components/BlogPost.jsx` | Blog metadata + BlogPosting schema |
| `src/components/CrawlableNav.jsx` | Hidden crawlable links |
| `src/config/siteNav.js` | Shared nav URLs |
| `public/sitemap.xml` | URL discovery for crawlers |
| `public/robots.txt` | Crawl rules |
| `public/llms.txt` | Short LLM/AI index ([llms.txt](https://llmstxt.org)) |
| `public/llms-full.txt` | Extended AI guide (projects, FAQs, citations) |
| `public/_redirects` | Legacy 301 redirects |
| `index.html` | Default meta, verification, analytics |
| `public/favicons/*` | Per-project favicons |

---

## 15. Maintenance Checklist

When adding or changing content, follow these steps:

1. **New public page** — Add entry to `SEO_CONFIG` in `SEO.jsx`, `sitemap.xml`, and `siteNav.js` / `CRAWLABLE_LINKS`.
2. **New project** — Add slug to `projects.js`, `PROJECT_SEO`, `PROJECT_FAVICONS`, `projectFaqs.js`, route in `App.jsx`, sitemap entry, and footer project list.
3. **New blog post** — Publish via admin; add URL to `sitemap.xml` (or automate sitemap generation).
4. **URL change** — Add 301 redirect in `_redirects` and `LEGACY_PROJECT_REDIRECTS`; update sitemap and internal links.
5. **FAQ update** — Keep visible accordion text and JSON-LD in sync.
6. **Images** — Use `imageAlt.js` helpers; never leave meaningful images without alt text.
7. **Search Console** — Monitor coverage, FAQ rich results, Core Web Vitals, and mobile usability.
8. **OG images** — Verify previews after deploy (WhatsApp, Facebook Debugger, Twitter Card Validator).

---

## 16. Summary

The MB Prime website SEO strategy combines:

- **Technical SEO:** Canonical URLs, sitemap, robots, 301 redirects, lowercase URLs, SPA-safe metadata
- **On-page SEO:** Unique titles, descriptions, and keywords per page and project
- **Structured data:** Organization, RealEstateAgent, RealEstateListing, FAQPage, BlogPosting, BreadcrumbList
- **Content SEO:** Location-specific project pages, FAQs, blogs, founder/about E-E-A-T pages
- **Image SEO:** Centralized descriptive alt text across all components
- **Crawlability:** Hidden nav links, footer/header internal linking, related projects

All metadata is managed in code (`SEO.jsx`, `schema.js`, FAQ data files) so updates are version-controlled and deploy with the application.

---

*Last updated: June 2026 — MB Prime Projects website codebase*
