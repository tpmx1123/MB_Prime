// Shared project images for hover effect (user-provided Cloudinary URLs)
export const PROJECT_IMAGE_A = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770638196/EA-1-7-scaled.jpg_opvxht.webp';
export const PROJECT_IMAGE_B = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770802746/cf5d2f057cf4017_f4cvnw.jpg';

// Order: 1. Vijayawada, 2. MB Prime Enclave, 3. MB Prime Villas, 4. Capital West, 5. AI Gen Villas
export const projects = [
  {
    slug: 'vijayawada',
    name: 'Vijayawada Project',
    location: 'Vijayawada',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    overview: 'Projects under planning in Vijayawada. Early registrations open.',
    highlights: [],
  },
  {
    slug: 'enclave',
    name: 'MB Prime Enclave',
    location: 'Vizianagaram',
    type: 'Residential Development',
    status: 'Lister Development (30% GDV)',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    overview: 'MB Prime Enclave represents a modern residential approach for Vizianagaram—balancing urban convenience with community-focused planning.',
    highlights: [],
  },
  {
    slug: 'villas',
    name: 'MB Prime Villas',
    location: 'Srikakulam',
    type: 'Plotted Villa Development',
    status: 'Phase 1 Completed | Phase 2 Ongoing',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    overview: 'MB Prime Villas is a thoughtfully planned plotted development designed for families seeking long-term residential value in Srikakulam. The project emphasizes structured layouts, internal connectivity, and essential infrastructure.',
    highlights: [
      'Gated community',
      'Underground drainage & utilities',
      'Wide internal roads',
      'Landscaped green spaces',
      "Children's play areas",
    ],
  },
  {
    slug: 'capital-west',
    name: 'Capital West',
    location: 'Andhra Pradesh',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    overview: 'Capital West is a planned residential development. Early registrations open.',
    highlights: [],
  },
  {
    slug: 'ai-gen-villas',
    name: 'AI Gen Villas',
    location: 'Andhra Pradesh',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    overview: 'AI Gen Villas is a planned residential development. Early registrations open.',
    highlights: [],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
