import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.mbprime.com';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1773637027/WhatsApp_Image_2026-03-14_at_5.58.21_PM_2_s3pnqg.jpg';

const SEO_CONFIG = {
  '/': {
    title: 'MB Prime Projects | Premium Real Estate in Andhra Pradesh',
    description:
      'MB Prime develops premium villa plots and residential communities in Srikakulam, Vizianagaram, Vijayawada and Amaravati.',
    keywords:
      'MB Prime, real estate in Andhra Pradesh, villa plots Srikakulam, gated community Andhra Pradesh, property investment India',
  },
  '/projects': {
    title: 'Our Projects | MB Prime Real Estate Developments',
    description:
      'Explore MB Prime premium real estate projects: villa plots, gated communities and modern residential developments in Andhra Pradesh.',
    keywords:
      'MB Prime projects, real estate projects Andhra Pradesh, gated communities India, villa projects',
  },
  '/projects/MB-Prime-Villas': {
    title: 'MB Prime Villas | Premium Villa Plots in Srikakulam',
    description:
      'MB Prime Villas offers premium villa plots in Srikakulam with modern amenities, strategic connectivity and investment potential.',
    keywords:
      'MB Prime Villas, Srikakulam villa plots, premium villa plots Andhra Pradesh, real estate investment Srikakulam',
  },
  '/projects/MB-Prime-Enclave': {
    title: 'MB Prime Enclave | Residential Community in Vizianagaram',
    description:
      'Discover MB Prime Enclave in Vizianagaram, a thoughtfully planned residential community with quality infrastructure and amenities.',
    keywords:
      'MB Prime Enclave, Vizianagaram real estate, residential projects Andhra Pradesh, gated community Vizianagaram',
  },
  '/projects/Prime-Jewel-City': {
    title: 'Prime Jewel City | Premium Living in Vijayawada',
    description:
      'Prime Jewel City by MB Prime brings modern residential planning and premium lifestyle features to Vijayawada.',
    keywords:
      'Prime Jewel City, Vijayawada real estate, MB Prime Vijayawada project, premium residential project',
  },
  '/projects/Capital-West': {
    title: 'Capital West | Planned Development by MB Prime',
    description:
      'Capital West is an MB Prime planned real estate development focused on long-term growth and strategic location advantage.',
    keywords:
      'Capital West, Andhra Pradesh real estate investment, MB Prime projects',
  },
  '/projects/ai-gen-serenity-villas': {
    title: 'AI Gen Serenity Villas | MB Prime',
    description:
      'Explore AI Gen Serenity Villas, an MB Prime planned project designed for modern comfort and future-ready living.',
    keywords:
      'AI Gen Serenity Villas, MB Prime projects, villa projects Andhra Pradesh',
  },
  '/about': {
    title: 'About MB Prime | Trusted Real Estate Developer',
    description:
      'Learn about MB Prime, a trusted real estate developer committed to quality, transparency and long-term value in Andhra Pradesh.',
    keywords:
      'about MB Prime, real estate developer India, Andhra Pradesh builder',
  },
  '/about-us': {
    title: 'About MB Prime | Trusted Real Estate Developer',
    description:
      'Learn about MB Prime, a trusted real estate developer committed to quality, transparency and long-term value in Andhra Pradesh.',
    keywords:
      'about MB Prime, real estate developer India, Andhra Pradesh builder',
  },
  '/founder': {
    title: 'Founder | MB Prime',
    description:
      'Meet the founder behind MB Prime and the vision driving premium, customer-focused real estate developments.',
    keywords:
      'MB Prime founder, leadership real estate India',
  },
  '/contact-us': {
    title: 'Contact MB Prime | Real Estate Enquiries',
    description:
      'Contact MB Prime for property enquiries, site visits and investment opportunities in premium Andhra Pradesh projects.',
    keywords:
      'contact MB Prime, real estate enquiry Andhra Pradesh, villa plot contact',
  },
  '/blogs': {
    title: 'MB Prime Blogs | Real Estate Insights',
    description:
      'Read MB Prime blogs for insights on real estate trends, investment guidance and project updates in Andhra Pradesh.',
    keywords:
      'MB Prime blogs, real estate blog India, property investment tips',
  },
};

const setOrCreateMeta = (selector, attrs) => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
};

const SEO = () => {
  const { pathname } = useLocation();

  const seo = useMemo(() => {
    const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    return SEO_CONFIG[normalizedPath] || SEO_CONFIG['/'];
  }, [pathname]);

  useEffect(() => {
    const canonicalPath = pathname === '/about-us/' ? '/about-us' : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = seo.title;

    setOrCreateMeta('meta[name="description"]', { name: 'description', content: seo.description });
    setOrCreateMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords });
    setOrCreateMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' });

    setOrCreateMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setOrCreateMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    setOrCreateMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    setOrCreateMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setOrCreateMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_OG_IMAGE });

    setOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    setOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    setOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_OG_IMAGE });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-KS790ZMQGS', { page_path: canonicalPath });
    }
  }, [pathname, seo]);

  const schemaData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MB Prime',
        url: SITE_URL,
        logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1773492165/mb_smwjsa.png',
        sameAs: ['https://www.instagram.com/mbprimeprojects/', 'https://www.facebook.com/profile.php?id=61573569854625'],
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
        name: 'MB Prime',
        url: SITE_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vijayawada',
          addressRegion: 'Andhra Pradesh',
          addressCountry: 'IN',
        },
        telephone: '+91-9088456999',
      },
    ],
    []
  );

  return (
    <>
      {schemaData.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </>
  );
};

export default SEO;
