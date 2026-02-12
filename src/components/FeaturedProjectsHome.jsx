import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { projects } from '../data/projects';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const CARD_MIN_HEIGHT = 420; // same size for all cards

const ProjectCard = ({ project }) => {
  const hoverSrc = project.imageHover ?? project.image;
  return (
    <div className="relative group flex flex-col h-full px-1" style={{ minHeight: CARD_MIN_HEIGHT }}>
      <Link to={`/projects/${project.slug}`} className="flex flex-col h-full overflow-hidden rounded-[2rem]">
        {/* Main Image Container – default + hover image crossfade */}
        <div className="relative flex-1 min-h-[200px] overflow-hidden rounded-t-[2rem]">
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover transition-[opacity_0.4s,transform_1s] group-hover:scale-110 group-hover:opacity-0"
          />
          <img
            src={hoverSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover transition-[opacity_0.4s,transform_1s] opacity-0 group-hover:opacity-100 group-hover:scale-110"
          />
          <div className="absolute inset-0 border border-black/5 rounded-t-[2rem] pointer-events-none" />
        </div>

        {/* Info Bar - fixed height so all cards same size */}
        <div className="bg-[#1A1A1A] text-white p-6 rounded-b-[2rem] transition-all duration-500 group-hover:bg-black shadow-xl shrink-0">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase text-center mb-3">
              {project.name}
            </h3>
            
            <div className="w-full h-px bg-white/10 mb-4" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase">
                {project.location}
              </p>
              <p className="text-[9px] font-medium uppercase tracking-widest text-white/40">
                Residential Development
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const FeaturedProjectsHome = () => {
  // Swiper configuration for 4 visible items
  const swiperOptions = {
    modules: [Autoplay, Pagination],
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 }, // Display 4 projects on desktop
    },
  };

  return (
    <section id="portfolio" className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4 md:px-15">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-[20px] block mb-4">
            MB Prime Project
          </span>
          <h2 className="text-2xl md:text-4xl font-sans font-bold text-primary tracking-tight uppercase leading-tight">
            Unmissable Stature,  Incomparable Living.
          </h2>
        </div>

        {/* Carousel Implementation */}
        <div className="projects-carousel pb-12">
          <Swiper {...swiperOptions}>
            {projects.map((project) => (
              <SwiperSlide key={project.slug}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Same height for all slides */}
      <style>{`
        .projects-carousel .swiper-pagination-bullet-active { background: #B8860B !important; }
        .projects-carousel .swiper-slide { height: auto; display: flex; min-height: ${CARD_MIN_HEIGHT}px; }
        .projects-carousel .swiper-slide > div { width: 100%; }
      `}</style>
    </section>
  );
};

export default FeaturedProjectsHome;