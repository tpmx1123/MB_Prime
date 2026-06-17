# MB Prime Projects — SEO Reference Guide

> **Purpose of this document:** A detailed, reusable blueprint for how SEO is implemented on the MB Prime website (`https://mbprimeprojects.com`). Use it as a reference when building or auditing SEO on this site or when applying the same structure to other real-estate / multi-project websites.

---

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Multi-page architecture (important)](#2-multi-page-architecture-important)
3. [Complete page inventory](#3-complete-page-inventory)
4. [SEO stack overview](#4-seo-stack-overview)
5. [Central SEO system](#5-central-seo-system)
6. [Per-project SEO pattern](#6-per-project-seo-pattern)
7. [On-page metadata rules](#7-on-page-metadata-rules)
8. [URL structure & redirects](#8-url-structure--redirects)
9. [Structured data (JSON-LD)](#9-structured-data-json-ld)
10. [FAQ & rich results](#10-faq--rich-results)
11. [Image SEO](#11-image-seo)
12. [Crawlability & internal linking](#12-crawlability--internal-linking)
13. [Sitemap, robots & LLM files](#13-sitemap-robots--llm-files)
14. [Blog & dynamic content SEO](#14-blog--dynamic-content-seo)
15. [Analytics & verification](#15-analytics--verification)
16. [Hosting requirements](#16-hosting-requirements)
17. [Replication blueprint (new project / new site)](#17-replication-blueprint-new-project--new-site)
18. [File reference](#18-file-reference)
19. [Maintenance checklist](#19-maintenance-checklist)

---

## 1. Executive summary

MB Prime is a **multi-page marketing website** for a real-estate developer with **five distinct project landing pages**, plus company pages, blogs, and legal pages.

SEO is implemented in **code** (not hard-coded only in `index.html`) so every route gets:

- Unique `<title>`, meta description, keywords
- Canonical URL and hreflang
- Open Graph + Twitter Card tags
- Schema.org JSON-LD structured data
- Correct favicon (per project where applicable)
- GA4 page-view tracking on navigation

The site uses **React + Vite + React Router** (a Single Page Application technically), but from an SEO and user perspective it behaves as a **multi-URL website** — each project, blog post, and section has its own addressable URL listed in the sitemap.

**Primary ranking targets:**

- Location + property-type keywords (e.g. “villas in Srikakulam”, “plots in Vizianagaram”)
- Brand + project names (MB Prime Villas, Prime Jewel City, etc.)
- Real-estate investment intent in Andhra Pradesh Tier-2 cities

---

## 2. Multi-page architecture (important)

### 2.1 SPA vs multi-page — what we actually have

| Term | What it means for MB Prime |
|------|---------------------------|
| **SPA (Single Page Application)** | One `index.html` loads; JavaScript swaps page content when the URL changes. Faster navigation, no full reload. |
| **Multi-page website (SEO sense)** | Many unique URLs, each with its own title, description, content, and schema. **This is what we have.** |
| **Traditional MPA** | Separate `.html` files per route (e.g. `villas.html`). We do **not** use this — but SEO outcome is equivalent when metadata is correct. |

**Common misconception:** “SPA = one page for everything.”  
**Reality:** MB Prime has **15+ public URLs**. Five projects each have a dedicated route, component, SEO config, FAQ set, and sitemap entry.

### 2.2 How routing maps to pages

**File:** `src/App.jsx`

```
/                           → Home.jsx (marketing homepage — scroll sections)
/projects                   → Projects.jsx (all projects grid)
/projects/mb-prime-villas   → MBPrimeVillas.jsx
/projects/mb-prime-enclave  → MBPrimeEnclave.jsx
/projects/prime-jewel-city  → jewelcity.jsx
/projects/capital-west      → CapitalWest.jsx
/projects/ai-gen-serenity-villas → AIGenVillas.jsx
/about-us                   → AboutMBPrime.jsx
/founder                    → Founder.jsx
/contact-us                 → ContactUs.jsx
/blogs                      → Blogs.jsx
/blogs/:slug                → BlogPost.jsx (dynamic)
/privacy-policy             → PrivacyPolicy.jsx
/terms-and-conditions       → TermsAndConditions.jsx
```

Each route is **lazy-loaded** (separate JS chunk) so project pages load independently.

### 2.3 Homepage vs project pages

| Page type | URL | Content model |
|-----------|-----|---------------|
| **Homepage** | `/` | One long scrolling page: Hero, Philosophy, Featured Projects, Commitments, Founder, Investment, FAQ, Location. Acts as the brand hub. |
| **Project page** | `/projects/{slug}` | Standalone landing page per development: hero video/image, amenities, gallery, master plan, location, FAQ, related projects. |
| **Listing** | `/projects` | Index of all five projects with cards linking to each URL. |

**SEO implication:** Google indexes `/` and `/projects/mb-prime-villas` as **separate pages**. They do not compete as duplicates if each has unique title, description, and `RealEstateListing` schema.

### 2.4 Why SPA is acceptable for SEO here

Googlebot executes JavaScript and indexes client-rendered content when:

1. ✅ Each route updates `<title>` and meta via `react-helmet-async` + `useLayoutEffect`
2. ✅ Canonical URLs point to the correct path
3. ✅ `sitemap.xml` lists all URLs
4. ✅ Internal links use real `<a href="/projects/...">` paths (`CrawlableNav`, footer, project cards)
5. ✅ JSON-LD is injected per page

**Optional future upgrade:** Static pre-rendering or SSR (Next.js) if Search Console shows slow indexing — not required for launch if coverage is healthy.

---

## 3. Complete page inventory

| URL | Component | Indexed | Unique SEO | Schema extras |
|-----|-----------|---------|------------|---------------|
| `/` | `Home.jsx` | Yes | `SEO_CONFIG['/']` | Org, WebSite, Agent, WebPage |
| `/projects` | `Projects.jsx` | Yes | `SEO_CONFIG['/projects']` | BreadcrumbList, ItemList |
| `/projects/mb-prime-villas` | `MBPrimeVillas.jsx` | Yes | `PROJECT_SEO` | RealEstateListing, FAQPage |
| `/projects/mb-prime-enclave` | `MBPrimeEnclave.jsx` | Yes | `PROJECT_SEO` | RealEstateListing, FAQPage |
| `/projects/prime-jewel-city` | `jewelcity.jsx` | Yes | `PROJECT_SEO` | RealEstateListing, FAQPage |
| `/projects/capital-west` | `CapitalWest.jsx` | Yes | `PROJECT_SEO` | RealEstateListing, FAQPage |
| `/projects/ai-gen-serenity-villas` | `AIGenVillas.jsx` | Yes | `PROJECT_SEO` | RealEstateListing, FAQPage |
| `/about-us` | `AboutMBPrime.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList |
| `/founder` | `Founder.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList, Person |
| `/contact-us` | `ContactUs.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList, ContactPage |
| `/blogs` | `Blogs.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList, CollectionPage |
| `/blogs/{slug}` | `BlogPost.jsx` | Yes | Dynamic per post | BlogPosting, BreadcrumbList |
| `/privacy-policy` | `PrivacyPolicy.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList |
| `/terms-and-conditions` | `TermsAndConditions.jsx` | Yes | `SEO_CONFIG` | BreadcrumbList |
| `/admin*` | Admin components | **No** | — | Blocked in robots.txt |
| `404` | `NotFound.jsx` | **No** | `noindex, follow` | — |

---

## 4. SEO stack overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User / Crawler                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS request
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Hosting (Nginx / .htaccess)                                    │
│  • Static: sitemap.xml, robots.txt, llms.txt, favicons          │
│  • SPA fallback: all other paths → index.html                   │
│  • 301 redirects: legacy project URLs (_redirects)              │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  index.html (first paint defaults + GSC verification + pixels)  │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  React App (App.jsx)                                            │
│  ├── <SEO />          → title, meta, OG, canonical, JSON-LD     │
│  ├── <Routes />       → page components per URL                 │
│  └── <Footer />       → internal links, Instagram               │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Data layer                                                     │
│  • projects.js        → slugs, images, locations                │
│  • projectFaqs.js     → per-project FAQ copy                      │
│  • homeFaqs.js        → homepage FAQ copy                       │
│  • imageAlt.js        → alt text helpers                        │
│  • schema.js          → JSON-LD builders                        │
└─────────────────────────────────────────────────────────────────┘
```

**Environment variables:**

| Variable | Role |
|----------|------|
| `VITE_SITE_URL` | Base for canonical URLs, schema `@id`, sitemap domain (default: `https://mbprimeprojects.com`) |
| `VITE_API_URL` | Blogs API, forms (not core SEO, but blog posts depend on it) |

---

## 5. Central SEO system

### 5.1 Main component

**File:** `src/components/SEO.jsx`  
**Mounted in:** `src/App.jsx` (runs on every route change)

**Responsibilities:**

| Output | Details |
|--------|---------|
| `<title>` | From `SEO_CONFIG` or `PROJECT_SEO` |
| `<meta name="description">` | 150–160 char target per page |
| `<meta name="keywords">` | Comma-separated; secondary signal |
| `<meta name="robots">` | `index,follow,max-image-preview:large,...` |
| `<link rel="canonical">` | `SITE_URL` + normalized path |
| `<link rel="alternate" hreflang>` | `en-IN` + `x-default` |
| Open Graph | `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`, `og:site_name` |
| Twitter Card | `summary_large_image` + title, description, image |
| Favicon | Default or per-project from `PROJECT_FAVICONS` |
| JSON-LD | Array of schema objects per page type |
| GA4 | `gtag('config', 'G-KS790ZMQGS', { page_path })` |

### 5.2 Helmet + useLayoutEffect (SPA fix)

**Problem:** In React 19 SPAs, `document.title` sometimes failed to update on client-side navigation with older `react-helmet`.

**Solution:**

1. `react-helmet-async` with `HelmetProvider` in `src/main.jsx`
2. `useLayoutEffect` in `SEO.jsx` sets `document.title` and favicon `<link>` synchronously before paint
3. Component-level schemas (FAQ, breadcrumbs) use `useJsonLd` hook **instead of** a second Helmet instance — avoids title conflicts

### 5.3 Path resolution (`resolveSeoPath`)

Before generating canonical URL or looking up SEO config:

1. Strip trailing slashes (except `/`)
2. Map legacy PascalCase project paths → lowercase slugs
3. Normalize `/about` → `/about-us`
4. Lowercase unknown project slug variants if they match `PROJECT_SEO`

This ensures **one canonical URL** per page even if users hit old links.

### 5.4 Config structure

```javascript
// Pattern in SEO.jsx
const PROJECT_SEO = {
  'mb-prime-villas': {
    title: '...',
    description: '...',
    keywords: '...',
  },
};

const SEO_CONFIG = {
  '/': { title, description, keywords },
  '/projects/mb-prime-villas': PROJECT_SEO['mb-prime-villas'],
  // ...
};
```

Blog routes (`/blogs/:slug`) return `null` from `resolvePageSeo` — handled by `BlogPost.jsx` instead.

---

## 6. Per-project SEO pattern

Each of the five projects follows the **same SEO template**. Replicate this for every new development.

### 6.1 URL slug rules

- Lowercase only
- Words separated by hyphens
- Format: `/projects/{brand-or-project-name}`
- Examples: `mb-prime-villas`, `prime-jewel-city`

### 6.2 Title formula

```
{Primary keyword} in {City} | {Project Name}
```

**Examples:**

- `Premium Villas & Plots in Srikakulam | MB Prime Villas & Plots Project`
- `Luxury Villas in Amaravati | AI Gen Serenity Villas`

**Rules:**

- City name in title for local SEO
- Brand/project name after the pipe
- Keep under ~60 characters where possible

### 6.3 Description formula

```
{Value proposition} in {City} with {2–3 differentiators: amenities, connectivity, investment}.
```

**Example:**

> Discover premium villas in Srikakulam with modern amenities, strategic location advantages and strong investment potential.

### 6.4 Keywords formula

```
{property type} {city}, {synonym} {city}, {project name}, {category keyword}
```

### 6.5 OG image

Project pages use `project.image` from `src/data/projects.js` as `og:image` and `twitter:image` — the hero/card image for that development.

### 6.6 Per-project favicon

**Directory:** `public/favicons/{slug}.ico`  
**Mapping:** `PROJECT_FAVICONS` in `SEO.jsx`

Gives each project tab a distinct icon — useful for UX and brand recognition (minor SEO signal).

### 6.7 Per-project page components

Each project route renders:

| Section | SEO value |
|---------|-----------|
| Hero (video/image + H1) | Primary keyword in H1 and hero alt/video label |
| Overview / amenities | Long-tail keywords, entity mentions |
| Gallery / master plan | Image alt text via `imageAlt.js` |
| Location / map | Local SEO, `locationMapAlt` on maps |
| FAQ accordion | FAQPage schema + long-tail Q&A |
| Related projects | Internal links to other `/projects/*` URLs |

### 6.8 RealEstateListing schema

**Builder:** `buildProjectListingSchema()` in `src/utils/schema.js`

Each project page outputs one listing with:

- `@id`: `{canonicalUrl}#listing`
- `name`, `description`, `url`, `image`
- `address` (locality, Andhra Pradesh, IN)
- `floorSize` in acres (when `project.acres` exists)
- `category` (project type)
- `offers` → seller as `RealEstateAgent`

Linked from `WebPage.mainEntity` on the same page.

---

## 7. On-page metadata rules

### 7.1 index.html (bootstrap defaults)

**File:** `index.html`

Serves as fallback before React hydrates:

- Default homepage `<title>` and description
- `google-site-verification` for Search Console
- `lang="en"` on `<html>`
- Viewport for mobile-first indexing
- Analytics pixels (GA4, Ads, Meta, Clarity)

Runtime values from `SEO.jsx` override these on navigation.

### 7.2 Robots directives

| Page type | Directive |
|-----------|-----------|
| Marketing pages | `index, follow` + rich preview hints |
| 404 | `noindex, follow` |
| Admin | Disallowed in `robots.txt` (no meta needed) |

### 7.3 Heading hierarchy

- **One `<h1>` per page** — project name or page topic in hero
- **`<h2>`** for major sections (Amenities, Location, FAQ)
- **`<h3>`** for subsections
- Do not skip levels for styling convenience

### 7.4 Social sharing

When a link is shared on WhatsApp/Facebook/LinkedIn:

- `og:title` = page title
- `og:description` = meta description
- `og:image` = project image or default brand image
- `og:url` = canonical URL

Test after deploy: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), Twitter Card Validator.

---

## 8. URL structure & redirects

### 8.1 Canonical project URLs

```
https://mbprimeprojects.com/projects/mb-prime-villas
https://mbprimeprojects.com/projects/mb-prime-enclave
https://mbprimeprojects.com/projects/prime-jewel-city
https://mbprimeprojects.com/projects/capital-west
https://mbprimeprojects.com/projects/ai-gen-serenity-villas
```

### 8.2 Legacy 301 redirects

| Old (PascalCase) | New (canonical) |
|------------------|-----------------|
| `/projects/MB-Prime-Villas` | `/projects/mb-prime-villas` |
| `/projects/MB-Prime-Enclave` | `/projects/mb-prime-enclave` |
| `/projects/Prime-Jewel-City` | `/projects/prime-jewel-city` |
| `/projects/Capital-West` | `/projects/capital-west` |
| `/projects/AI-Gen-Serenity-Villas` | `/projects/ai-gen-serenity-villas` |

**Implemented in three places (belt and suspenders):**

1. `public/_redirects` — hosting-level 301 (Netlify-compatible)
2. `src/App.jsx` — `<Navigate to={...} replace />` for client-side
3. `SEO.jsx` — `resolveSeoPath()` + `LEGACY_PROJECT_REDIRECTS` export for canonical tags

### 8.3 Slug aliases in data layer

**File:** `src/data/projects.js` → `SLUG_ALIASES`, `getProjectBySlug()`

Resolves old slug strings to project records so components don't break during migration.

---

## 9. Structured data (JSON-LD)

All structured data uses **Schema.org** vocabulary in `<script type="application/ld+json">` blocks.

### 9.1 Global schemas (most pages)

| Type | Purpose |
|------|---------|
| `Organization` | Legal entity: name, logo, email, phone, address, `sameAs` social URLs |
| `WebSite` | Site-level entity |
| `RealEstateAgent` | Local business / agent classification |
| `WebPage` | Current page: name, description, URL, `inLanguage: en-IN` |

### 9.2 Page-specific schemas

| Route | Additional types |
|-------|-------------------|
| `/projects` | `BreadcrumbList`, `ItemList` (all 5 projects with URLs) |
| `/about-us` | `BreadcrumbList` |
| `/founder` | `BreadcrumbList`, `Person` (Maganti Babu, CEO) |
| `/contact-us` | `BreadcrumbList`, `ContactPage` |
| `/blogs` | `BreadcrumbList`, `CollectionPage` |
| `/blogs/{slug}` | `BlogPosting`, `BreadcrumbList` (in BlogPost.jsx) |
| `/projects/{slug}` | `RealEstateListing` |
| Legal pages | `BreadcrumbList` |

### 9.3 FAQPage schema

See [Section 10](#10-faq--rich-results).

### 9.4 Injection methods

| Method | Used for |
|--------|----------|
| `SEO.jsx` → Helmet → `<script>` in map | Global + page-specific schemas in central component |
| `useJsonLd(id, data)` hook | FAQ schemas, UI breadcrumbs — avoids Helmet conflicts |
| `BlogPost.jsx` Helmet | BlogPosting + breadcrumbs |

**File:** `src/hooks/useJsonLd.js` — creates/removes script tags by unique `id`.

### 9.5 Validation

Test URLs in [Google Rich Results Test](https://search.google.com/test/rich-results) after changes.

---

## 10. FAQ & rich results

### 10.1 Why FAQs matter

FAQ sections target **long-tail queries** (“Where is MB Prime Villas located?”, “How to book site visit?”) and can produce **FAQ rich snippets** in Google when schema matches visible content.

### 10.2 Homepage FAQs

- **UI:** `src/components/HomeFAQ.jsx`
- **Copy:** `src/data/homeFaqs.js` (6 questions)
- **Schema:** `FAQSchema.jsx` → `buildFAQPage()` in `schema.js`

### 10.3 Project FAQs

- **UI:** `src/components/ProjectFAQ.jsx` on each project page
- **Copy:** `src/data/projectFaqs.js` — keyed by slug, 6 FAQs per project
- **Schema:** Unique `schemaId={`faq-${project.slug}`}` per project to avoid duplicate script IDs

### 10.4 Critical rule

> **Visible accordion text must match JSON-LD exactly.**

Google penalizes or ignores FAQ schema when the answers on the page differ from structured data. Edit `homeFaqs.js` / `projectFaqs.js` only — the UI reads from these files.

### 10.5 FAQ content themes (per project)

1. Location & connectivity  
2. Project scale / status  
3. Amenities  
4. Plot sizes / configurations  
5. Investment rationale  
6. How to enquire / brochure / site visit  

---

## 11. Image SEO

### 11.1 Centralized helpers

**File:** `src/utils/imageAlt.js`

| Function | Usage |
|----------|-------|
| `projectHeroAlt(project)` | Project hero stills |
| `projectMasterPlanAlt(project, zoomed?)` | Master plan images |
| `projectGalleryAlt(project, label)` | Gallery thumbnails |
| `projectAmenityAlt(project, title)` | Amenity photos |
| `projectCardAlt(project)` | Project cards on home/listing |
| `projectLogoAlt(project)` | Project header logos |
| `projectBadgeAlt(label)` | VMRDA, RERA badges |
| `brandLogoAlt()` | MB Prime logo |
| `homeHeroAlt()` | Homepage hero |
| `blogImageAlt(title)` | Blog images |
| `founderAlt()` | Founder portrait |
| `locationMapAlt()` | Location map |
| `commitmentsImageAlt()`, `investmentImageAlt()`, `philosophyImageAlt()` | Homepage sections |
| `heroVideoLabel(project)` | `aria-label` on hero videos |

### 11.2 Alt text pattern

```
{Subject} in {City} – MB Prime Projects
```

Include **project name**, **city**, and **brand** for image search and accessibility.

### 11.3 Decorative images

Hover-state duplicate images on project cards use `alt=""` and `aria-hidden="true"` — correct pattern (no redundant alt).

### 11.4 Performance

- `loading="lazy"` on below-fold images
- `decoding="async"` where supported
- Hero images may use `fetchPriority="high"` on listing page first card

---

## 12. Crawlability & internal linking

### 12.1 Crawlable navigation (hidden)

**File:** `src/components/CrawlableNav.jsx`  
**Included in:** `Header.jsx`

Screen-reader-only (`sr-only`) `<nav>` with `<Link>` to every public URL from `CRAWLABLE_LINKS` in `siteNav.js`. Ensures crawlers discover all pages without opening the mobile menu.

### 12.2 Visible internal links

| Location | Links to |
|----------|----------|
| Header | Main nav pages |
| Footer | Main nav + all 5 projects + legal |
| Homepage `FeaturedProjectsHome` | All project URLs |
| `/projects` grid | All project URLs |
| Each project page | “Related Projects” → other 4 projects |
| Blog sidebar | Projects + recent posts |
| HomeFAQ | Link to contact / projects where relevant |

### 12.3 Internal linking strategy

- **Homepage** → distributes authority to `/projects` and featured projects  
- **Project pages** → cross-link to sibling projects (topical cluster)  
- **Blogs** → link to relevant projects and contact  
- **Footer** → sitewide project links on every page  

---

## 13. Sitemap, robots & LLM files

### 13.1 XML sitemap

**File:** `public/sitemap.xml`  
**URL:** `https://mbprimeprojects.com/sitemap.xml`

Lists every public URL with:

- `<loc>` — full HTTPS URL  
- `<changefreq>` — hint (daily/weekly/monthly)  
- `<priority>` — relative importance (homepage 1.0, projects 0.8–0.9)  

**Submit in:** Google Search Console → Sitemaps.

**When adding pages:** Add a new `<url>` block manually (or automate at build time).

### 13.2 robots.txt

**File:** `public/robots.txt`

```
User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin-login
Disallow: /admin-forgot-password
Disallow: /admin-reset-password

Sitemap: https://mbprimeprojects.com/sitemap.xml

# AI / LLM systems
# Short index: https://mbprimeprojects.com/llms.txt
# Extended guide: https://mbprimeprojects.com/llms-full.txt
```

**Hosting:** Must be served as a static file — not rewritten to `index.html`. Configured in `deploy/hostinger-vps-nginx.example.conf`.

### 13.3 LLM files (AI discoverability)

Following the [llms.txt convention](https://llmstxt.org), we publish machine-readable site guides for AI assistants, ChatGPT browsing, Perplexity, and future AI crawlers.

#### `public/llms.txt` (short index)

**URL:** `https://mbprimeprojects.com/llms.txt`

**Purpose:** Quick reference — company summary, canonical page list, contact, pointer to full guide.

**Format:**

```markdown
# Site Name

> One-line description

Brief paragraph about the business.

## Key pages

- [Page name](https://full-url/): What this page is for

## Contact & location

- Phone, email, address, social

## Optional

- [Extended guide](https://domain/llms-full.txt)
- [Sitemap](https://domain/sitemap.xml)
```

**When to update:** New public page, new project, contact change, Instagram URL change.

#### `public/llms-full.txt` (extended guide)

**URL:** `https://mbprimeprojects.com/llms-full.txt`

**Purpose:** Authoritative deep reference for AI systems — detailed project breakdowns, FAQ summaries, site structure table, citation rules.

**Includes:**

1. Company background (founder, markets, property types)  
2. Each project: URL, location, scale, highlights, status  
3. Homepage FAQ text (condensed)  
4. Site structure table (`/` vs `/projects/{slug}`)  
5. **Citation guidance** — rules for AI when answering about MB Prime:
   - Use canonical lowercase URLs  
   - Don't merge distinct projects  
   - Don't invent pricing — direct to enquiry  
   - Flagship project callout (MB Prime Villas, 70 acres)  
6. Admin routes marked as **do not cite**  
7. Technical notes (SPA, schema types, sitemap link)  

**Why two files?**

| File | Audience | Size |
|------|----------|------|
| `llms.txt` | Quick AI lookup, link discovery | ~35 lines |
| `llms-full.txt` | Detailed answers, replication context | ~130 lines |

#### Replicating LLM files on another site

1. Copy structure from `public/llms.txt` and `public/llms-full.txt`  
2. Replace brand name, domain, projects, contact  
3. Add comment lines in `robots.txt` pointing to both files  
4. Ensure nginx/Apache serves `.txt` files statically  
5. Add `llms.txt` / `llms-full.txt` to sitemap optional section or link from `llms.txt` Optional block  
6. Keep in sync when projects/pages change (same checklist as sitemap)  

---

## 14. Blog & dynamic content SEO

### 14.1 Blog listing (`/blogs`)

Handled by central `SEO.jsx` — static title/description in `SEO_CONFIG`.

### 14.2 Blog posts (`/blogs/:slug`)

**File:** `src/components/BlogPost.jsx`

Because titles come from the API/CMS, each post manages its own Helmet:

| Tag | Source |
|-----|--------|
| Title | `{post.title} \| MB Prime Blogs` |
| Description | `post.excerpt` or first 160 chars of body |
| Canonical | `{SITE_URL}/blogs/{slug}` |
| OG type | `article` |
| OG image | `post.carouselImage` or `post.image` |
| Schema | `BlogPosting` + `BreadcrumbList` |

`useLayoutEffect` sets `document.title` for SPA consistency.

### 14.3 Sitemap entries for blogs

Each published post should have a `<url>` in `sitemap.xml`. Currently manual — add when publishing new posts.

---

## 15. Analytics & verification

| Tool | ID | SEO-related use |
|------|-----|-----------------|
| Google Search Console | `google-site-verification` in index.html | Index coverage, queries, rich results |
| Google Analytics 4 | `G-KS790ZMQGS` | Landing pages, organic traffic by path |
| Google Ads | `AW-16982010540` | Conversion tracking |
| Meta Pixel | `1508555837586936` | Remarketing |
| Microsoft Clarity | `wpsvtqasaf` | UX / engagement (indirect SEO) |

GA4 page paths use **canonical paths** from `SEO.jsx` (`page_path: canonicalPath`), so reports match SEO URLs not legacy variants.

---

## 16. Hosting requirements

### 16.1 SPA fallback

All non-file routes must return `index.html` so `/projects/mb-prime-villas` works on direct load or refresh.

**Apache:** `public/.htaccess`  
**Nginx:** `deploy/hostinger-vps-nginx.example.conf`

### 16.2 Static files (never rewrite to SPA)

These must return real file content:

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/favicons/*`
- `/assets/*` (hashed JS/CSS)

### 16.3 HTTPS

Canonical URLs assume `https://`. Enforce SSL redirect at server level.

---

## 17. Replication blueprint (new project / new site)

Use this checklist when adding a **sixth project** to MB Prime or cloning this SEO structure to **another developer website**.

### Phase 1 — Data & routing

- [ ] Add project to `src/data/projects.js` with `slug`, `name`, `location`, `image`, `overview`, etc.
- [ ] Create project page component `src/components/{ProjectName}.jsx`
- [ ] Add route in `App.jsx`: `/projects/{slug}`
- [ ] Add to `PROJECT_NAV_LINKS` and `CRAWLABLE_LINKS` in `siteNav.js`
- [ ] Add footer link in `Footer.jsx`

### Phase 2 — SEO metadata

- [ ] Add entry to `PROJECT_SEO` in `SEO.jsx` (title, description, keywords)
- [ ] Add to `SEO_CONFIG` at `/projects/{slug}`
- [ ] Add favicon `public/favicons/{slug}.ico` + `PROJECT_FAVICONS` entry
- [ ] Verify `resolveSeoPath` handles the slug (lowercase)

### Phase 3 — Structured data & content

- [ ] Add 6 FAQs to `projectFaqs.js` (match UI text exactly)
- [ ] Include `<ProjectFAQ project={project} />` on page
- [ ] `RealEstateListing` auto-generates via `SEO.jsx` when `getProjectBySlug` resolves
- [ ] Use `imageAlt.js` helpers on all images

### Phase 4 — Discovery files

- [ ] Add `<url>` to `public/sitemap.xml`
- [ ] Add project block to `public/llms-full.txt`
- [ ] Add line to `public/llms.txt` Key pages section
- [ ] Update homepage FAQ if it lists all projects by name

### Phase 5 — QA before launch

- [ ] Visit `/projects/{slug}` — correct title in browser tab
- [ ] View source / DevTools — canonical, OG tags, JSON-LD present
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — RealEstateListing + FAQPage valid
- [ ] Share link on WhatsApp — correct preview image and title
- [ ] Search Console URL inspection — “URL is on Google” or request indexing
- [ ] Confirm direct URL refresh works (SPA hosting config)

### Title / description templates (copy-paste)

```
Title:    {Property type} in {City} | {Project Name}
Description: {Discover/Explore} {property type} in {City} with {benefit 1}, {benefit 2} and {benefit 3}.
Keywords: {property type} {city}, {synonym} {city}, {project name}, {developer name}
```

---

## 18. File reference

| File | Role |
|------|------|
| `src/components/SEO.jsx` | Central metadata, OG, Twitter, canonical, global JSON-LD, GA4 |
| `src/utils/schema.js` | JSON-LD builders (listing, FAQ, breadcrumb, person, etc.) |
| `src/hooks/useJsonLd.js` | Component-level JSON-LD without Helmet conflicts |
| `src/components/FAQSchema.jsx` | FAQPage schema wrapper |
| `src/components/HomeFAQ.jsx` | Homepage FAQ UI |
| `src/components/ProjectFAQ.jsx` | Project FAQ UI |
| `src/data/homeFaqs.js` | Homepage FAQ copy |
| `src/data/projectFaqs.js` | Per-project FAQ copy (6 each) |
| `src/data/projects.js` | Slugs, images, locations, `getProjectBySlug` |
| `src/utils/imageAlt.js` | Image alt text helpers |
| `src/components/BlogPost.jsx` | Dynamic blog SEO |
| `src/components/CrawlableNav.jsx` | Hidden crawler navigation |
| `src/config/siteNav.js` | Shared URLs for header, footer, crawl nav |
| `src/App.jsx` | Routes, legacy redirects, `<SEO />` mount |
| `src/main.jsx` | `HelmetProvider` |
| `src/pages/NotFound.jsx` | 404 with `noindex` |
| `index.html` | Bootstrap meta, GSC verification, analytics |
| `public/sitemap.xml` | URL discovery |
| `public/robots.txt` | Crawl rules + LLM file pointers |
| `public/llms.txt` | Short AI/LLM index |
| `public/llms-full.txt` | Extended AI guide + citation rules |
| `public/_redirects` | Legacy 301 redirects |
| `public/favicons/*` | Per-project favicons |
| `public/.htaccess` | Apache SPA fallback |
| `deploy/hostinger-vps-nginx.example.conf` | Nginx static + SPA rules |
| `docs/SEO.md` | This reference document |

---

## 19. Maintenance checklist

### Weekly / after content changes

- [ ] New blog post → sitemap entry + verify BlogPosting schema
- [ ] FAQ edit → update data file only; confirm UI matches
- [ ] New image → use `imageAlt.js` helper

### After adding a project

- [ ] Complete [Replication blueprint](#17-replication-blueprint-new-project--new-site) Phase 1–5

### Monthly

- [ ] Search Console: coverage errors, FAQ rich results, Core Web Vitals
- [ ] Check organic landing pages in GA4 match `/projects/*` URLs
- [ ] Re-test OG previews if hero images changed

### When domain or brand changes

- [ ] Update `VITE_SITE_URL`
- [ ] Update `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`
- [ ] Update `SEO.jsx` Organization `sameAs` and contact fields
- [ ] Set up 301 redirects from old domain

---

## Summary

| Layer | What we do |
|-------|------------|
| **Architecture** | Multi-URL React SPA — 5 project pages + company + blogs, each indexable |
| **Technical SEO** | Canonicals, sitemap, robots, 301s, lowercase slugs, SPA-safe titles |
| **On-page SEO** | Unique title/description/keywords per URL; H1 hierarchy; local keywords |
| **Structured data** | Organization, Agent, RealEstateListing, FAQPage, BlogPosting, Breadcrumbs |
| **Content SEO** | Per-project FAQs, homepage FAQ, blogs, founder/about E-E-A-T |
| **Image SEO** | Centralized alt helpers with city + project + brand |
| **Crawlability** | Hidden nav, footer/header links, related projects, sitemap |
| **AI discoverability** | `llms.txt` + `llms-full.txt` with citation guidance |
| **Replicability** | Config-driven `SEO.jsx` + data files — copy blueprint for new projects/sites |

All SEO metadata lives in version-controlled code so changes deploy with the app and can be reused as a **reference template** for future MB Prime developments or other real-estate websites.

---

*Last updated: June 2026 — MB Prime Projects (`mbprimeprojects.com`)*
