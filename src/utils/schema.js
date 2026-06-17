import { projects } from '../data/projects';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://mbprimeprojects.com').replace(/\/$/, '');

function formatLocality(location) {
  if (!location) return undefined;
  return location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
}

/**
 * Project-specific RealEstateListing JSON-LD – one per project URL.
 * @param {import('../data/projects').projects[number]} project
 * @param {{ description?: string }} meta
 */
export function buildProjectListingSchema(project, meta = {}) {
  if (!project) return null;

  const name = project.name.trim();
  const url = `${SITE_URL}/projects/${project.slug}`;
  const locality = formatLocality(project.location);

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${url}#listing`,
    name,
    description:
      meta.description ||
      project.overview ||
      project.subtitle ||
      project.locationText ||
      `${name} by MB Prime Projects in ${locality}, Andhra Pradesh.`,
    url,
    ...(project.image && { image: [project.image] }),
    address: {
      '@type': 'PostalAddress',
      ...(locality && { addressLocality: locality }),
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    ...(project.acres && {
      floorSize: {
        '@type': 'QuantitativeValue',
        value: parseFloat(project.acres) || project.acres,
        unitText: 'acres',
      },
    }),
    ...(project.type && { category: project.type }),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url,
      seller: {
        '@type': 'RealEstateAgent',
        name: 'MB Prime Projects',
        url: SITE_URL,
        telephone: '+91-9088456999',
        email: 'mbprimeprojects@gmail.com',
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'MB Prime Projects',
      url: SITE_URL,
    },
  };
}

export function getProjectSlugFromPath(pathname) {
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function buildFAQPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function buildBreadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildProjectsItemList() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MB Prime Projects',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name.trim(),
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  };
}

export function buildContactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MB Prime Projects',
    url: `${SITE_URL}/contact-us`,
    mainEntity: {
      '@type': 'Organization',
      name: 'MB Prime Projects',
      telephone: '+91-9088456999',
      email: 'mbprimeprojects@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'GEMS Hospital Road, Silagamsingivalasa',
        addressLocality: 'Srikakulam',
        addressRegion: 'Andhra Pradesh',
        postalCode: '532484',
        addressCountry: 'IN',
      },
    },
  };
}

export function buildFounderPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maganti Babu',
    jobTitle: 'CEO & Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'MB Prime Projects',
      url: SITE_URL,
    },
    url: `${SITE_URL}/founder`,
  };
}

export function buildBlogCollectionPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MB Prime Blogs',
    description: 'Real estate insights, investment guidance and project updates from MB Prime Projects.',
    url: `${SITE_URL}/blogs`,
  };
}

export { SITE_URL };
