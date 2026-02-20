import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectImage = ({ project, isHovered }) => {
  return (
    <div className="absolute inset-0">
      <img
        src={project.image}
        alt={project.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
        loading="lazy"
      />
      <img
        src={project.imageHover || project.image}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-110'}`}
        loading="lazy"
      />
    </div>
  );
};

const Projects = () => {
  const [hoveredSlug, setHoveredSlug] = useState(null);

  return (
    <section id="projects" className="bg-[#0A0A0A] pb-32 pt-24 text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-16">
        <div className="mb-16">
         
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            <span className="italic font-light text-white/50 text-2xl md:text-4xl block mb-2">Our Projects</span>
            <span className="font-bold text-white">Unmissable Stature, Incomparable Living.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block bg-white/[0.03] backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-secondary/40 transition-all duration-500 h-full"
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProjectImage project={project} isHovered={hoveredSlug === project.slug} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                <div className="p-6 md:p-8 bg-white">
                  <h3 className="text-xl md:text-2xl font-centaur text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-primary/40 text-xs font-semibold uppercase tracking-widest mb-4">
                    <MapPin size={14} className="text-primary" />
                    {project.location}
                  </div>
                  <div className="flex items-center justify-between border-t border-primary/10 pt-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{project.status}</span>
                    <span className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      View Project <ArrowUpRight size={16} className="text-secondary" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;