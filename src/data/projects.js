// Shared project images for hover effect (user-provided Cloudinary URLs)
export const PROJECT_IMAGE_A = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770638196/EA-1-7-scaled.jpg_opvxht.webp';
export const PROJECT_IMAGE_B = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770802746/cf5d2f057cf4017_f4cvnw.jpg';

// Order: 1. Vijayawada, 2. MB Prime Enclave, 3. MB Prime Villas, 4. Capital West, 5. AI Gen Villas
export const projects = [
  {
    slug: 'vijayawada',
    name: 'Vijayawada Project',
    tagline: 'LIVE IN THE HEART OF VIJAYAWADA',
    subtitle: 'A premium residential community designed for modern living.',
    configurations: '3 Towers | G+15 Floors | 70% Open Area',
    acres: '5.2 acres',
    handover: 'December 2026',
    brochureLink: '#',
    location: 'Vijayawada',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    logo: null,
    masterPlan: null,
    locationMap: null,
    locationText: 'Strategically located in Vijayawada, offering excellent connectivity to key educational institutions, healthcare centers, and entertainment hubs.',
    overview: 'Projects under planning in Vijayawada. Early registrations open.',
    highlights: [
      'Structural: R.C.C framed structure',
      'Flooring: 800x800 Vitrified Tiles',
      'Doors: Teak Wood Frame',
      'Windows: UPVC with mosquito mesh',
      'Electrical: Copper wiring with modular switches',
      'Sanitary: Premium CP fittings',
    ],
    // Added locationDistances
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'Narayana School' },
      { time: '05', unit: 'Mins', label: 'Chaitanya School' },
      { time: '10', unit: 'Mins', label: 'RTC Bus Stand' },
      { time: '10', unit: 'Mins', label: 'DMart' },
      { time: '20', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport' },
      { time: '0', unit: 'Mins', label: 'Metro Convention Centre', isMetro: true },
    ],
  },
  {
    slug: 'enclave',
    name: 'MB Prime Enclave',
    tagline: 'THE PRIDE OF VIZIANAGARAM',
    subtitle: 'Live amidst nature and openness.',
    configurations: '5 Blocks | G+5 Floors | Modern Amenities',
    acres: '6.6699 acres',
    handover: 'March 2026',
    brochureLink: '#',
    location: 'Vizianagaram',
    type: 'Residential Development',
    status: 'Lister Development (30% GDV)',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    logo: null,
    masterPlan: null,
    locationMap: null,
    locationText: 'Located in the rapidly growing Vizianagaram area, MB Prime Enclave combines peaceful living with urban convenience.',
    overview: 'MB Prime Enclave represents a modern residential approach for Vizianagaram—balancing urban convenience with community-focused planning.',
    highlights: [
      'Structural: R.C.C framed structure',
      'Flooring: 800x800 Vitrified Tiles',
      'Doors: Teak Wood Frame',
      'Windows: UPVC with mosquito mesh',
      'Electrical: Copper wiring with modular switches',
      'Sanitary: Premium CP fittings',
    ],
    // Added locationDistances
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'Narayana School' },
      { time: '05', unit: 'Mins', label: 'Chaitanya School' },
      { time: '10', unit: 'Mins', label: 'RTC Bus Stand' },
      { time: '10', unit: 'Mins', label: 'DMart' },
      { time: '20', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport' },
      { time: '0', unit: 'Mins', label: 'Metro Convention Centre', isMetro: true },
    ],
  },
  {
    slug: 'villas',
    name: 'MB Prime Villas',
    tagline: 'LUXURY REDEFINED IN SRIKAKULAM',
    subtitle: 'Exclusive villa plots for a distinguished lifestyle.',
    configurations: '20+ High Level Amenities with Water Theme Park',
    acres: '70 acres',
    handover: 'Ready for Registration',
    brochureLink: '#',
    location: 'Srikakulam',
    type: 'Plotted Villa Development',
    status: 'Phase 1 Completed | Phase 2 Ongoing',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770526685/sklmlogo_c2trtg.png',
    masterPlan: 'https://res.cloudinary.com/dcrdkvt2q/image/upload/v1770968591/villas_plots_jpg.jpg_hovhc9.jpg',
    locationMap: 'https://maps.google.com/maps?q=18.3597862,83.9194874+(MB+PRIME+VILLAS+PLOTS)&t=&z=15&ie=UTF8&iwloc=&output=embed',
    layoutHighlights: [
      [
        ' Outdoor Function Area',
        ' Water Theme Park',
        ' Cricket Stadium',
        ' Convention Hall',
        ' Children Park',
        ' Running Track',
        ' Evening Park',
      ],
      [
        ' Jogging Park',
        ' Sports Area',
        ' Oxygen Park',
        ' Club House',
        ' Temple',
        ' Lawn',
      ]
    ],
    highlights: [
      'Gated community',
      'Underground drainage & utilities',
      'Wide internal roads',
      'Landscaped green spaces',
      "Children's play areas",
    ],
    amenities: [
      {
        title: 'Oxygen Park',
        desc: 'A Synthetic Running & Walking Tracks',
        icon: 'Footprints',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960985/seating_area_2_gdbexp.jpg'
      },
      {
        title: 'Cricket Ground',
        desc: 'With Lush Lawns & Landscaped Parks',
        icon: 'Trophy',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Three Pickleball Courts',
        desc: 'Built as International Standards',
        icon: 'Target',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960939/Screenshot_2026-02-13_110204_vcri4f.png'
      },
      {
        title: 'Volleyball Courts',
        desc: 'For Competitive & Casual Play',
        icon: 'Target',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960985/playgrounds_htjgx4.jpg'
      },
      {
        title: 'Basketball Court',
        desc: 'With Modern Infrastructure',
        icon: 'Target',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Tennis Courts',
        desc: 'With Professional-Grade Surfaces',
        icon: 'Target',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770961755/tennis_court_qwjj2f.png'
      },
      {
        title: 'Skating Zone',
        desc: 'For Recreational & Professional Use',
        icon: 'Zap',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770962837/skating_zone_dst9lu.jpg'
      },
      {
        title: 'Children\'s Play Areas',
        desc: 'With Safe & Engaging Amenities',
        icon: 'Smile',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960983/children_park_ynea9a.jpg'
      },
      {
        title: 'Seating Areas',
        desc: 'Set Amidst Scenic Landscapes',
        icon: 'Trees',
        image: 'https://res.cloudinary.com/dcrdkvt2q/image/upload/v1770963873/seating_-pin_ueabbr.jpg'
      },
      {
        title: 'Outdoor Function Arena',
        desc: 'With An Integrated Amphitheater',
        icon: 'Music',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960985/convention_hall_g1sucw.jpg'
      },
      {
        title: 'Exclusive Clubhouse',
        desc: 'Swimming Pool, Three Badminton Courts & Leisure Facilities',
        icon: 'Home',
        image: 'https://res.cloudinary.com/dcrdkvt2q/image/upload/v1770964115/clubhosuse-pin_ec2spg.jpg'
      },
      {
        title: 'Water Theme Park',
        desc: 'With A Swimming Pools',
        icon: 'Waves',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770960986/swimming_pool_2_fx5pes.jpg'
      },
      {
        title: 'Convention Hall',
        desc: 'For Corporate & Social Gatherings',
        icon: 'Users',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Meditation Park',
        desc: 'For Wellness & Tranquility',
        icon: 'Sunrise',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Water Fountains',
        desc: 'Enhancing The Aesthetic Appeal',
        icon: 'Droplets',
        image: 'https://res.cloudinary.com/dcrdkvt2q/image/upload/v1770964608/waterfountain2_ltvyjk.jpg'
      },
      // {
      //   title: 'Designed Landscaping',
      //   desc: 'With Manicured Lawns',
      //   icon: 'Leaf',
      //   image: 'https://images.unsplash.com/photo-1558905619-1af6999fa691?q=80&w=1000&auto=format&fit=crop'
      // },
      // {
      //   title: '100% Vasthu',
      //   desc: 'Designed for Harmony',
      //   icon: 'Compass',
      //   image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop'
      // }
    ],
    villaTypes: [
      {
        id: 'triplex',
        type: 'Triplex Villa',
        size: "36' x 50'",
        direction: '',
        area: '200 Sq. Yards',
        builtUp: '3650 Sq. Ft',
        description: 'A grand triplex villa designed for modern luxury living, offering spacious interiors, premium finishes, and three levels of unmatched comfort.',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770882555/plot1_ikla4a.png',
        color: 'bg-[#982B56]' // Deep Magenta/Red from image
      },
      {
        id: 'duplex-2100',
        type: 'Duplex Villa',
        size: "36' x 40'",
        direction: 'South',
        area: '160 Sq. Yards',
        builtUp: '2100 Sq. Ft',
        description: 'A beautifully planned duplex villa that blends comfort, style, and functionality, offering the perfect balance of privacy and modern family living.',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770882554/plot2_sn5bq0.png',
        color: 'bg-[#76A847]' // Green from image
      },
      {
        id: 'duplex-2050',
        type: 'Duplex Villa',
        size: "36' x 50'",
        direction: 'North',
        area: '200 Sq. Yards',
        builtUp: '2050 Sq. Ft',
        description: 'A stylish duplex villa featuring a spacious balcony, perfect for relaxing, entertaining, and enjoying open views with refreshing natural airflow.',
        image: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770882631/plot3_jzl1fn.png',
        color: 'bg-[#B5A445]' // Gold/Yellow from image
      }
    ],
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'GEMS Hospital' },
      { time: '05', unit: 'Mins', label: 'Gayatri Educational Society NH 16' },
      { time: '10', unit: 'Mins', label: 'Railway Station' },
      { time: '10', unit: 'Mins', label: 'RTC Complex' },
      { time: '10', unit: 'Mins', label: 'Palakonda Road' },
      { time: '60', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport' },
    ],
  },
  {
    slug: 'capital-west',
    name: 'Capital West',
    tagline: 'INVEST IN THE FUTURE',
    subtitle: 'Strategic location with high growth potential.',
    configurations: 'Mixed Use Development',
    acres: '10 acres',
    handover: '2027',
    brochureLink: '#',
    location: 'Andhra Pradesh',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    logo: null,
    masterPlan: null,
    locationMap: null,
    locationText: 'Capital West is positioned to be a landmark development in Andhra Pradesh, promising high returns and modern lifestyle amenities.',
    overview: 'Capital West is a planned residential development. Early registrations open.',
    highlights: [
      'Structural: R.C.C framed structure',
      'Flooring: 800x800 Vitrified Tiles',
      'Doors: Teak Wood Frame',
      'Windows: UPVC with mosquito mesh',
      'Electrical: Copper wiring with modular switches',
      'Sanitary: Premium CP fittings',
    ],
    // Added locationDistances
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'Narayana School' },
      { time: '05', unit: 'Mins', label: 'Chaitanya School' },
      { time: '10', unit: 'Mins', label: 'RTC Bus Stand' },
      { time: '10', unit: 'Mins', label: 'DMart' },
      { time: '20', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport' },
      { time: '0', unit: 'Mins', label: 'Metro Convention Centre', isMetro: true },
    ],
  },
  {
    slug: 'ai-gen-villas',
    name: 'AI Gen Villas',
    tagline: 'NEXT GENERATION LIVING',
    subtitle: 'Smart homes for a smarter future.',
    configurations: 'Smart Villas | Tech Integration',
    acres: '8 acres',
    handover: '2027',
    brochureLink: '#',
    location: 'Andhra Pradesh',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    logo: null,
    masterPlan: null,
    locationMap: null,
    locationText: 'AI Gen Villas brings futuristic living concepts to Andhra Pradesh, featuring smart home technologies and sustainable design.',
    overview: 'AI Gen Villas is a planned residential development. Early registrations open.',
    highlights: [
      'Structural: R.C.C framed structure',
      'Flooring: 800x800 Vitrified Tiles',
      'Doors: Teak Wood Frame',
      'Windows: UPVC with mosquito mesh',
      'Electrical: Copper wiring with modular switches',
      'Sanitary: Premium CP fittings',
    ],
    // Added locationDistances
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'Narayana School' },
      { time: '05', unit: 'Mins', label: 'Chaitanya School' },
      { time: '10', unit: 'Mins', label: 'RTC Bus Stand' },
      { time: '10', unit: 'Mins', label: 'DMart' },
      { time: '20', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport' },
      { time: '0', unit: 'Mins', label: 'Metro Convention Centre', isMetro: true },
    ],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);