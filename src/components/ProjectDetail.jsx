import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      {/* Full-bleed hero – 3D depth, separate-website feel */}
      <section
        className="relative min-h-[75vh] flex flex-col justify-end pb-16 md:pb-24 pt-24 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30" />
        </div>
        <div className="container relative z-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/90 font-sans font-bold text-sm mb-8 hover:text-secondary transition-colors"
          >
            <ArrowLeft size={18} />
            All Projects
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-secondary font-sans font-bold text-sm uppercase tracking-widest mb-2">
              {project.type}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight max-w-3xl">
              {project.name}
              {project.location && project.location !== 'Andhra Pradesh' && (
                <span className="text-secondary"> | {project.location}</span>
              )}
            </h1>
            <p className="text-white/90 font-sans font-light mt-4 text-lg md:text-xl max-w-xl">
              {project.status}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content block – clean, editorial */}
      <section className="py-16 md:py-24 bg-bg-light">
        <div className="container max-w-3xl">
          <motion.section
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-sans font-bold text-primary mb-4">Overview</h2>
            <p className="text-slate-600 font-sans font-light leading-relaxed text-lg">
              {project.overview}
            </p>
          </motion.section>

          {project.highlights && project.highlights.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-lg font-sans font-bold text-primary mb-6">
                Planning Highlights
              </h2>
              <ul className="space-y-3 font-sans font-light text-slate-700">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                      <Check size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          <motion.div
            className="mt-14 pt-10 border-t border-secondary/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/#contact"
              className="inline-block px-8 py-4 bg-secondary text-primary font-sans font-bold rounded-sm transition-all duration-300"
              style={{ boxShadow: 'var(--shadow-gold)' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Register interest
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
