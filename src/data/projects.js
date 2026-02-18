// Shared project images for hover effect (user-provided Cloudinary URLs)
export const PROJECT_IMAGE_A = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770638196/EA-1-7-scaled.jpg_opvxht.webp';
export const PROJECT_IMAGE_B = 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770802746/cf5d2f057cf4017_f4cvnw.jpg';
import villaBrochure from '../assets/MB Prime Brochure_P.pdf';
import enclaveBrochure from '../assets/EnclaveBrochure.pdf';
// Order: 1. Vijayawada, 2. MB Prime Enclave, 3. MB Prime Villas, 4. Capital West, 5. AI Gen Villas
export const projects = [
  {
    slug: 'Prime-Jewel-City',
    name: 'Prime Jewel City ',
    tagline: 'LIVE IN THE HEART OF VIJAYAWADA',
    heroImageTag: null,
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
    favicon: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063124/sklmlogo_c2trtg_wk10v3_cztpx0.ico', // MB Prime Villas favicon
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
    slug: 'MB-Prime-Enclave',
    name: 'MB Prime Enclave ',
    tagline: 'THE PRIDE OF VIZIANAGARAM',
    heroImageTag: null,
    subtitle: 'Live amidst nature and openness.',
    configurations: '5 Blocks | G+5 Floors | Modern Amenities',
    acres: '6.6699 acres',
    handover: 'March 2026',
    brochureLink: enclaveBrochure,
    location: 'Vizianagaram',
    type: 'Residential Development',
    status: 'Lister Development (30% GDV)',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    logo: null,
    locationMap: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3792.6244768817246!2d83.399245!3d18.088931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDA1JzIwLjIiTiA4M8KwMjMnNTcuMyJF!5e0!3m2!1sen!2sin!4v1771135120420!5m2!1sen!2sin',
    favicon: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063124/sklmlogo_c2trtg_wk10v3_cztpx0.ico', // MB Prime Villas favicon
    masterPlan: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771068556/Gemini_Generated_Image_wx0r97wx0r97wx0r_g1tdty.png',
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
      { time: '02', unit: 'Mins', label: 'Metro Convention Centre', icon: 'Train' },
      { time: '05', unit: 'Mins', label: 'Narayana School', icon: 'School' },
      { time: '05', unit: 'Mins', label: 'Chaitanya School', icon: 'School' },
      { time: '10', unit: 'Mins', label: 'RTC Bus Stand', icon: 'Bus' },
      { time: '10', unit: 'Mins', label: 'DMart', icon: 'ShoppingBag' },
      { time: '20', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport', icon: 'Plane' },

    ],
    layoutHighlights: [
      [
        ' Children Park',
        ' Play Area',
        ' Seating Zone',
        ' Green Buffer Zone',
        ' Landscaped Garden',
      ],
      [
        ' Wide Internal Roads',
        ' Gated Community Layout',
        ' Planned Plotting',
        ' Perimeter Fencing',
        ' Tree-Lined Avenues',
      ]
    ],
    amenities: [

      {
        title: 'Children\'s Park & Seating',
        desc: 'Special parks for children with comfortable rest benches.',
        icon: 'Smile',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771224658/children_s_park_enclave_vhsdhu.jpg'
      },
      {
        title: 'Jogging Tracks',
        desc: 'Dedicated tracks for morning and evening walks.',
        icon: 'Footprints',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771225829/jogging_pmr9bs.jpg'
      },
      {
        title: 'Cricket Ground',
        desc: 'Dedicated cricket play area for sports enthusiasts.',
        icon: 'Trophy',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227055/cricket_l6vr3n.jpg'
      },
      {
        title: 'Amphitheater',
        desc: 'Open-air amphitheater for community events and gatherings.',
        icon: 'Music',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227055/amphitheater_algnsc.jpg'
      },

      {
        title: 'Underground Infrastructure',
        desc: 'Modern underground drainage and electric cabling system.',
        icon: 'Zap',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227055/drain_dukiqm.jpg'
      },
      {
        title: 'Wide Roads & Lighting',
        desc: '40ft main roads with central dividers and street lights.',
        icon: 'MapPin',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227056/road_lightling_tzel97.jpg'
      },
      {
        title: 'Clean Drinking Water',
        desc: 'Reliable supply of clean drinking water.',
        icon: 'Droplets',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227055/clean_water_bybu1t.jpg'
      },
      {
        title: 'Lush Greenery',
        desc: 'Green plants and landscaping on all four sides.',
        icon: 'Trees',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771227056/greenery_pijtcg.jpg'
      },
      {
        title: '24/7 Security',
        desc: '24/7 gate security with security guards & solar fencing.',
        icon: 'Check',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771237189/security_ledwwh.jpg'
      },

    ],
  },
  {
    slug: 'MB-Prime-Villas',
    name: 'MB Prime Villas',
    tagline: 'LUXURY REDEFINED IN SRIKAKULAM',
    heroImageTag: null,
    subtitle: 'Exclusive villa plots for a distinguished lifestyle.',
    configurations: '20+ High Level Amenities with Water Theme Park',
    acres: '70 acres',
    handover: 'Ready for Registration',
    // projects.js
    brochureLink: villaBrochure,
    location: 'Srikakulam',
    type: 'Plotted Villa Development',
    status: 'Phase 1 Completed | Phase 2 Ongoing',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1770526685/sklmlogo_c2trtg.png',
    favicon: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063124/sklmlogo_c2trtg_wk10v3_cztpx0.ico',
    masterPlan: 'https://res.cloudinary.com/dcrdkvt2q/image/upload/v1770968591/villas_plots_jpg.jpg_hovhc9.jpg',
    locationMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2716.7785112791116!2d83.91691247334634!3d18.359791274069345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c6b1319544a1d%3A0x8d95f21e30a1bdac!2sMB%20PRIME%20VILLAS%20PLOTS!5e1!3m2!1sen!2sin!4v1771046346979!5m2!1sen!2sin',
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
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771232397/volley_ball_xp1fss.jpg'
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
      {
        title: 'Designed Landscaping',
        desc: 'With Manicured Lawns',
        icon: 'Leaf',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771235363/lawn_s3ny1k.jpg'
      },
      {
        title: '100% Vasthu',
        desc: 'Designed for Harmony',
        icon: 'Compass',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771235552/kalasam_uhhsib.jpg'
      },
      {
        title: 'Underground Drainage & Electricity',
        desc: 'Advanced underground sewage & modern cabling.',
        icon: 'Zap',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771236752/drain_y4nc6r.jpg'
      }
    ],
    villaTypes: [
      {
        id: 'triplex',
        type: 'Triplex Villa',
        size: "36' x 50'",
        direction: 'North',
        area: '200 Sq. Yards',
        builtUp: '3650 Sq. Ft',
        description: 'A grand triplex villa designed for modern luxury living, offering spacious interiors, premium finishes, and three levels of unmatched comfort.',
        tag: 'Triplex Villa - North Face',
        tag1:'North Face - GF',
        tag2:'North Face - FF',
        tag3:'North Face - SF',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771392310/Original02_nzerw3.png',
        image1: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312600/TRIPLEX_NORTH_FACE_50_X_36_GF_squxzr.jpg',
        image2: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312601/TRIPLEX_NORTH_FACE_50_X_36_FF_hcvvla.jpg',
        image3: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312601/TRIPLEX_NORTH_FACE_50_X_36_SF_sajuim.jpg',
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
        tag: 'Duplex Villa - South Face',
        tag1:'South Face - GF',
        tag2:'South Face - FF',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771392309/Original01_snapvp.png',
        image1: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312600/DUPLEX_SOUTH_FACE_40_x36_GF_idxvwq.jpg',
        image2: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312600/DUPLEX_SOUTH_FACE_40_x36_FF_srobau.jpg',
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
        tag: 'Duplex Villa - North Face',
        tag1:'North Face - GF',
        tag2:'North Face - FF',
        image: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771392312/Original03_mgkcxm.png',
        image1: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312600/DUPLEX_NORTH_FACE_50_x36_GF_jdkulu.jpg',
        image2: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771312600/DUPLEX_NORTH_FACE_50_x36_FF_s91kz9.jpg',
        color: 'bg-[#B5A445]' // Gold/Yellow from image
      }
    ],
    locationDistances: [
      { time: '05', unit: 'Mins', label: 'GEMS Hospital', icon: 'Hospital' },
      { time: '05', unit: 'Mins', label: 'Gayatri Educational Society NH 16', icon: 'School' },
      { time: '10', unit: 'Mins', label: 'Railway Station', icon: 'Train' },
      { time: '10', unit: 'Mins', label: 'RTC Complex', icon: 'Bus' },
      { time: '10', unit: 'Mins', label: 'Palakonda Road', icon: 'MapPin' },
      { time: '45', unit: 'Mins', label: 'Bhogapuram International Airport', type: 'airport', icon: 'Plane' },
    ],
  },
  {
    slug: 'capital-west',
    name: 'Capital West',
    tagline: 'INVEST IN THE FUTURE',
    heroImageTag: null,
    subtitle: 'Strategic location with high growth potential.',
    configurations: 'Mixed Use Development',
    acres: '10 acres',
    handover: '2027',
    brochureLink: '#',
    location: 'vijayawada',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_A,
    imageHover: PROJECT_IMAGE_B,
    logo: null,
    masterPlan: null,
    locationMap: null,
    favicon: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063124/sklmlogo_c2trtg_wk10v3_cztpx0.ico', // MB Prime Villas favicon
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
    slug: 'ai-gen-serenity-villas',
    name: 'AI Gen Serenity villas',
    tagline: 'NEXT GENERATION LIVING',
    heroImageTag: null,
    subtitle: 'Smart homes for a smarter future.',
    configurations: 'Smart Villas | Tech Integration',
    acres: '8 acres',
    handover: '2027',
    brochureLink: '#',
    location: 'Amaravati',
    type: 'Residential Development',
    status: 'Under Planning',
    image: PROJECT_IMAGE_B,
    imageHover: PROJECT_IMAGE_A,
    logo: null,
    masterPlan: null,
    locationMap: null,
    favicon: 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063124/sklmlogo_c2trtg_wk10v3_cztpx0.ico', // MB Prime Villas favicon
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