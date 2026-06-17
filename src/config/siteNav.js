/** Shared navigation links for header, footer, and crawlable SEO nav */
export const MAIN_NAV_LINKS = [
  { label: 'Home', link: '/' },
  { label: 'Projects', link: '/projects' },
  { label: 'About Us', link: '/about-us' },
  { label: 'Founder', link: '/founder' },
  { label: 'Blogs', link: '/blogs' },
  { label: 'Contact Us', link: '/contact-us' },
];

export const PROJECT_NAV_LINKS = [
  { label: 'MB Prime Villas | Srikakulam', link: '/projects/mb-prime-villas' },
  { label: 'MB Prime Enclave | Vizianagaram', link: '/projects/mb-prime-enclave' },
  { label: 'Prime Jewel City | Vijayawada', link: '/projects/prime-jewel-city' },
  { label: 'Capital West | Vijayawada', link: '/projects/capital-west' },
  { label: 'AI Gen Serenity Villas | Amaravati', link: '/projects/ai-gen-serenity-villas' },
];

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', link: '/privacy-policy' },
  { label: 'Terms & Conditions', link: '/terms-and-conditions' },
];

/** All crawlable internal URLs for sr-only navigation */
export const CRAWLABLE_LINKS = [
  ...MAIN_NAV_LINKS,
  ...PROJECT_NAV_LINKS,
  ...FOOTER_LEGAL_LINKS,
];

export const projectPath = (slug) => `/projects/${slug}`;
