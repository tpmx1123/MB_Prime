import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectImage = ({ project, className, isHovered }) => {
  const defaultSrc = project.image;
  const hoverSrc = project.imageHover || project.image;
  return (
    <div className="absolute inset-0">
      <img
        src={defaultSrc}
        alt={project.name}
        className={`${className} ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={hoverSrc}
        alt=""
        className={`${className} ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden
      />
    </div>
  );
};

const Projects = () => {
  const [hoveredSlug, setHoveredSlug] = useState(null);

  return (
    <section id="projects" className="bg-bg-light pb-32 pt-24">
      <div className="container">
        <motion.span
          className="block text-[#6b9eb0] font-sans text-xs uppercase tracking-[0.25em] mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Portfolio
        </motion.span>
        <motion.h2
          className="text-3xl md:text-5xl font-serif text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="italic font-normal text-primary/70 text-2xl md:text-3xl">Current</span>
          <br />
          <span className="font-bold text-primary">Developments</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300 h-full"
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <div className="relative aspect-[4/3] min-h-[220px] overflow-hidden">
                  <ProjectImage
                    project={project}
                    isHovered={hoveredSlug === project.slug}
                    className="absolute inset-0 w-full h-full object-cover transition-[opacity_0.5s,transform_0.7s] group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6 font-sans">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {project.name}
                    {project.location && project.location !== 'Andhra Pradesh' && `, ${project.location}`}
                  </h3>
                  <p className="flex items-center gap-2 text-secondary text-sm font-medium mb-2">
                    <MapPin size={14} />
                    {project.location}
                  </p>
                  <p className="text-slate-600 text-sm font-light mb-3">{project.type}</p>
                  <p className="text-slate-500 text-xs font-medium border-t border-black/5 pt-3 flex items-center justify-between">
                    <span>{project.status}</span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      View Project
                      <ArrowUpRight size={14} />
                    </span>
                  </p>
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
