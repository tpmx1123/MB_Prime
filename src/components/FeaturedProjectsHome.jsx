import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectCard = ({ project, size = "small", delay = 0, customHeight }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Height logic to maintain the "Bento" aesthetic in the new grid
  const heightClass = customHeight ? customHeight : (size === "large" ? "h-[500px]" : "h-[240px]");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 w-full ${heightClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projects/${project.slug}`} className="block h-full w-full">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
              project.status.includes('Completed') 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' 
                : 'bg-amber-500/20 border-amber-500/50 text-amber-200'
            }`}>
              {project.status.split('|')[0]}
            </span>
          </div>

          <h3 className={`${size === "large" ? "text-3xl" : "text-xl"} font-bold text-white mb-1`}>
            {project.name}
          </h3>
          
          <div className="flex items-center gap-1 text-white/70 text-sm mb-4">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/80 text-sm font-light mb-4 line-clamp-2">
                  {project.type} — Thoughtful planning meets everyday life.
                </p>
                <div className="flex items-center text-white font-medium gap-2 text-sm uppercase tracking-widest">
                  Explore Project <ArrowUpRight size={16} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedProjectsHome = () => {
  const p = projects.reduce((acc, project) => {
    acc[project.slug] = project;
    return acc;
  }, {});

  if (!p['villas'] || !p['enclave'] || !p['vijayawada']) return null;

  return (
    <section id="portfolio" className="py-16 bg-[#F8FAFC] px-4">
      <div className="container mx-auto px-4">
        
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Header + Main Villa + Small Projects (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="max-w-xl">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm block mb-4">
                Our Portfolio
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
                <span className="italic font-light text-primary/60">Current</span> <br />
                <b>Developments</b>
              </h2>
            </div>

            {/* 1. Large Feature Card (Villas) */}
            <ProjectCard project={p['villas']} size="large" delay={0.1} />

            {/* Bottom Row of Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard project={p['capital-west']} delay={0.4} customHeight="h-[280px]" />
              <ProjectCard project={p['ai-gen-villas']} delay={0.5} customHeight="h-[280px]" />
            </div>
          </div>

          {/* RIGHT COLUMN: Starts beside the text (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-20">
            

            {/* 2. Enclave (Right Top) */}
            <ProjectCard project={p['enclave']} delay={0.2} customHeight="h-[360px]" />

            {/* 3. Vijayawada (Right Bottom) */}
            <ProjectCard project={p['vijayawada']} delay={0.3} customHeight="h-[360px]" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsHome;