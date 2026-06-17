import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  buildBreadcrumbList,
  buildProjectsItemList,
  buildContactPage,
  buildFounderPerson,
  buildBlogCollectionPage,
  buildProjectListingSchema,
  getProjectSlugFromPath,
} from '../utils/schema';
import { getProjectBySlug } from '../data/projects';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://mbprimeprojects.com').replace(/\/$/, '');
const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/durbtkhbz/image/upload/v1773637027/WhatsApp_Image_2026-03-14_at_5.58.21_PM_2_s3pnqg.jpg';

const DEFAULT_FAVICON =
  'https://res.cloudinary.com/durbtkhbz/image/upload/v1773638223/mb_smwjsa_paldaw.png';

const PROJECT_FAVICONS = {
  'mb-prime-villas': '/favicons/mb-prime-villas.ico',
  'mb-prime-enclave': '/favicons/mb-prime-enclave.ico',
  'prime-jewel-city': '/favicons/prime-jewel-city.ico',
  'capital-west': '/favicons/capital-west.ico',
  'ai-gen-serenity-villas': '/favicons/ai-gen-serenity-villas.ico',
};

const PROJECT_SEO = {
  'mb-prime-villas': {
    title: 'Premium Villas & Plots in Srikakulam | MB Prime Villas & Plots Project',
    description:
      'Discover premium villas in Srikakulam with modern amenities, strategic location advantages and strong investment potential.',
    keywords:
      'premium villas Srikakulam, villas in Srikakulam, gated community villas, MB Prime Villas',
  },
  'mb-prime-enclave': {
    title: 'Premium Open Plots in Vizianagaram | MB Prime Enclave',
    description:
      'Explore premium open plots in Vizianagaram with excellent connectivity, quality infrastructure and long-term investment value.',
    keywords:
      'open plots Vizianagaram, plots in Vizianagaram, MB Prime Enclave, real estate Vizianagaram',
  },
  'prime-jewel-city': {
    title: 'Residential Plots in Vijayawada | Prime Jewel City',
    description:
      'Premium residential plots in Vijayawada offering strategic location advantages, modern infrastructure and future growth opportunities.',
    keywords:
      'residential plots Vijayawada, plots in Vijayawada, Prime Jewel City, real estate Vijayawada',
  },
  'capital-west': {
    title: 'Premium Villas & Plots in Vijayawada | Capital West',
    description:
      'Discover premium villas and plots in Vijayawada with excellent connectivity, modern infrastructure and investment potential.',
    keywords:
      'villas Vijayawada, plots Vijayawada, Capital West, premium real estate Vijayawada',
  },
  'ai-gen-serenity-villas': {
    title: 'Luxury Villas in Amaravati | AI Gen Serenity Villas',
    description:
      'Luxury villas in Amaravati featuring modern architecture, premium amenities and a future-ready lifestyle.',
    keywords:
      'luxury villas Amaravati, villas in Amaravati, AI Gen Serenity Villas, premium villas Andhra Pradesh',
  },
};

const LEGACY_PROJECT_PATHS = {
  '/projects/MB-Prime-Villas': 'mb-prime-villas',
  '/projects/MB-Prime-Enclave': 'mb-prime-enclave',
  '/projects/Prime-Jewel-City': 'prime-jewel-city',
  '/projects/Capital-West': 'capital-west',
  '/projects/AI-Gen-Serenity-Villas': 'ai-gen-serenity-villas',
};

const SEO_CONFIG = {
  '/': {
    title: 'Luxury Villas & Plots in Andhra Pradesh | MB Prime Projects',
    description:
      'Explore premium villas, villa plots, and gated communities across Andhra Pradesh. Discover investment opportunities with MB Prime Projects.',
    keywords:
      'premium villas Andhra Pradesh, villa plots Andhra Pradesh, gated communities, real estate investment Andhra Pradesh',
  },
  '/projects': {
    title: 'Villas & Plots Projects in Andhra Pradesh | Premium Real Estate',
    description:
      'Explore premium villa and plot projects in Srikakulam, Vizianagaram, Vijayawada and Amaravati with excellent investment potential.',
    keywords:
      'villa projects Andhra Pradesh, plots projects Andhra Pradesh, gated communities, real estate projects',
  },
  '/projects/mb-prime-villas': PROJECT_SEO['mb-prime-villas'],
  '/projects/mb-prime-enclave': PROJECT_SEO['mb-prime-enclave'],
  '/projects/prime-jewel-city': PROJECT_SEO['prime-jewel-city'],
  '/projects/capital-west': PROJECT_SEO['capital-west'],
  '/projects/ai-gen-serenity-villas': PROJECT_SEO['ai-gen-serenity-villas'],
  '/projects/MB-Prime-Villas': PROJECT_SEO['mb-prime-villas'],
  '/projects/MB-Prime-Enclave': PROJECT_SEO['mb-prime-enclave'],
  '/projects/Prime-Jewel-City': PROJECT_SEO['prime-jewel-city'],
  '/projects/Capital-West': PROJECT_SEO['capital-west'],
  '/projects/AI-Gen-Serenity-Villas': PROJECT_SEO['ai-gen-serenity-villas'],
  '/about': {
    title: 'Leading Real Estate Developer in Andhra Pradesh | About MB Prime',
    description:
      'Learn about MB Prime Projects, a trusted real estate developer delivering premium villas, plots and gated communities across Andhra Pradesh.',
    keywords:
      'real estate developer Andhra Pradesh, MB Prime Projects, trusted builder Andhra Pradesh',
  },
  '/about-us': {
    title: 'Leading Real Estate Developer in Andhra Pradesh | About MB Prime',
    description:
      'Learn about MB Prime Projects, a trusted real estate developer delivering premium villas, plots and gated communities across Andhra Pradesh.',
    keywords:
      'real estate developer Andhra Pradesh, MB Prime Projects, trusted builder Andhra Pradesh',
  },
  '/founder': {
    title: 'Maganti Babu | Founder & CEO of MB Prime Projects',
    description:
      'Meet Maganti Babu, Founder and CEO of MB Prime Projects, driving innovation and excellence in Andhra Pradesh real estate.',
    keywords:
      'Maganti Babu, MB Prime founder, real estate entrepreneur Andhra Pradesh',
  },
  '/contact-us': {
    title: 'Contact Us for Villas & Plots Enquiries | MB Prime Projects',
    description:
      'Contact MB Prime Projects for site visits, property enquiries and investment opportunities in premium villas and plots projects.',
    keywords:
      'contact MB Prime, villa enquiries, plots enquiries, property investment Andhra Pradesh',
  },
  '/blogs': {
    title: 'Real Estate Investment Blogs | Property Insights & Updates',
    description:
      'Read expert insights on real estate investment, property trends, villas, plots and market updates across Andhra Pradesh.',
    keywords:
      'real estate blogs, property investment blogs, Andhra Pradesh real estate news',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | MB Prime Projects',
    description:
      'Read the MB Prime Projects privacy policy covering how we collect, use and protect your personal information.',
    keywords: 'MB Prime privacy policy, data protection',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | MB Prime Projects',
    description:
      'Review the terms and conditions for using the MB Prime Projects website and services.',
    keywords: 'MB Prime terms and conditions, website terms',
  },
};

function resolveSeoPath(pathname) {
  let path = pathname !== '/' && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname;

  const legacySlug = LEGACY_PROJECT_PATHS[path];
  if (legacySlug) {
    return `/projects/${legacySlug}`;
  }

  const projectMatch = path.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    const legacyKey = `/projects/${slug}`;
    if (LEGACY_PROJECT_PATHS[legacyKey]) {
      return `/projects/${LEGACY_PROJECT_PATHS[legacyKey]}`;
    }
    if (PROJECT_SEO[slug]) return `/projects/${slug}`;
    const lowerSlug = slug.toLowerCase();
    if (PROJECT_SEO[lowerSlug]) return `/projects/${lowerSlug}`;
  }

  if (path === '/about') return '/about-us';
  return path;
}

function getFaviconForPath(canonicalPath) {
  const match = canonicalPath.match(/^\/projects\/([^/]+)$/);
  if (match && PROJECT_FAVICONS[match[1]]) return PROJECT_FAVICONS[match[1]];
  return DEFAULT_FAVICON;
}

export const LEGACY_PROJECT_REDIRECTS = Object.fromEntries(
  Object.entries(LEGACY_PROJECT_PATHS).map(([from, slug]) => [from, `/projects/${slug}`])
);

export { PROJECT_SEO, resolveSeoPath, SEO_CONFIG };

function resolvePageSeo(canonicalPath) {
  if (/^\/blogs\/[^/]+$/.test(canonicalPath)) return null;
  if (SEO_CONFIG[canonicalPath]) return SEO_CONFIG[canonicalPath];
  if (canonicalPath === '/') return SEO_CONFIG['/'];
  return null;
}

const SEO = () => {
  const { pathname } = useLocation();

  const canonicalPath = useMemo(() => resolveSeoPath(pathname), [pathname]);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const seo = useMemo(() => resolvePageSeo(canonicalPath), [canonicalPath]);
  const pageTitle = seo?.title ?? '';
  const pageFavicon = useMemo(() => getFaviconForPath(canonicalPath), [canonicalPath]);
  const projectSlug = useMemo(() => getProjectSlugFromPath(canonicalPath), [canonicalPath]);
  const project = useMemo(
    () => (projectSlug ? getProjectBySlug(projectSlug) : null),
    [projectSlug]
  );
  const ogImage = project?.image || DEFAULT_OG_IMAGE;

  useLayoutEffect(() => {
    if (!seo?.title) return;

    document.title = seo.title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = pageFavicon;
  }, [seo, pageFavicon, canonicalPath]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-KS790ZMQGS', { page_path: canonicalPath });
    }
  }, [canonicalPath]);

  const schemaData = useMemo(() => {
    if (!seo) return [];

    const listingId = project ? `${canonicalUrl}#listing` : null;

    const base = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MB Prime Projects',
        alternateName: 'MB Prime',
        url: SITE_URL,
        logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1773492165/mb_smwjsa.png',
        email: 'mbprimeprojects@gmail.com',
        telephone: '+91-9088456999',
        sameAs: [
          'https://www.instagram.com/mbprimeprojects/',
          'https://www.facebook.com/profile.php?id=61573569854625',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'GEMS Hospital Road, Silagamsingivalasa',
          addressLocality: 'Srikakulam',
          addressRegion: 'Andhra Pradesh',
          postalCode: '532484',
          addressCountry: 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MB Prime',
        url: SITE_URL,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'MB Prime Projects',
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        telephone: '+91-9088456999',
        email: 'mbprimeprojects@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Srikakulam',
          addressRegion: 'Andhra Pradesh',
          addressCountry: 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': canonicalUrl,
        name: pageTitle,
        description: seo.description,
        url: canonicalUrl,
        inLanguage: 'en-IN',
        isPartOf: {
          '@type': 'WebSite',
          url: SITE_URL,
          name: 'MB Prime',
        },
        ...(listingId && { mainEntity: { '@id': listingId } }),
      },
    ];

    const pageSpecific = [];

    switch (canonicalPath) {
      case '/projects':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Projects', url: '/projects' },
          ]),
          buildProjectsItemList()
        );
        break;
      case '/about':
      case '/about-us':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'About Us', url: '/about-us' },
          ])
        );
        break;
      case '/founder':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Founder', url: '/founder' },
          ]),
          buildFounderPerson()
        );
        break;
      case '/contact-us':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Contact Us', url: '/contact-us' },
          ]),
          buildContactPage()
        );
        break;
      case '/blogs':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Blogs', url: '/blogs' },
          ]),
          buildBlogCollectionPage()
        );
        break;
      case '/privacy-policy':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Privacy Policy', url: '/privacy-policy' },
          ])
        );
        break;
      case '/terms-and-conditions':
        pageSpecific.push(
          buildBreadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Terms & Conditions', url: '/terms-and-conditions' },
          ])
        );
        break;
      default:
        if (project) {
          const listing = buildProjectListingSchema(project, { description: seo.description });
          if (listing) pageSpecific.push(listing);
        }
        break;
    }

    return [...base, ...pageSpecific];
  }, [canonicalPath, canonicalUrl, pageTitle, seo, project]);

  if (!seo) return null;

  return (
    <Helmet key={canonicalPath}>
        <title>{pageTitle}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        <link rel="icon" href={pageFavicon} />
        <link rel="shortcut icon" href={pageFavicon} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MB Prime" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={ogImage} />

        {schemaData.map((schema, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  );
};

export default SEO;
