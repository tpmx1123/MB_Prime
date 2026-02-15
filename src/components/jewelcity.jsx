import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, MapPin, Layout, ClipboardList, ChevronLeft, ChevronRight, Download, Plane,
  Footprints, Trophy, Target, Zap, Smile, Trees, Music, Home, Waves, Users, Sunrise, Droplets, Leaf, Compass,
  Info, X, ZoomIn, ZoomOut, ArrowRight, ChevronDown, ChevronUp, Stethoscope, GraduationCap, Train, Bus
 } from 'lucide-react';
import { projects, getProjectBySlug } from '../data/projects';
import ProjectHeader from './ProjectHeader';
import { updateFavicon, updatePageTitle } from '../utils/favicon';
const iconMap = {
  Footprints, Trophy, Target, Zap, Smile, Trees, Music, Home, Waves, Users, Sunrise, Droplets, Leaf, Compass, Check,
  Hospital: Stethoscope, School: GraduationCap, Train, Bus, Plane, MapPin
};

const JewelCity = () => {
  const project = getProjectBySlug('vizag');

  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    updateFavicon(project?.favicon);
    updatePageTitle(project?.name);

    // Reset to default when component unmounts
    return () => {
      updateFavicon(); // Reset to default
      updatePageTitle(); // Reset to default
    };
  }, [project]);
  useEffect(() => {
    setStartIndex(0);
  }, ['vizag']);
  const allOtherProjects = projects.filter(p => p.slug !== 'vizag');
  const visibleProjects = allOtherProjects.slice(startIndex, startIndex + 4);

  const nextProjects = () => {
    if (startIndex + 4 < allOtherProjects.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  const prevProjects = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  const [activePlotTab, setActivePlotTab] = useState(0);
  const tabsRef = useRef([]);
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    if (tabsRef.current[activePlotTab] && tabsContainerRef.current) {
      const tab = tabsRef.current[activePlotTab];
      const container = tabsContainerRef.current;

      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;

      const scrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activePlotTab]);
  const [isLayoutZoomed, setIsLayoutZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (!isLayoutZoomed) setZoomLevel(1);
  }, [isLayoutZoomed]);
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => (prev === 1 ? 2 : 1));
  };

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <ProjectHeader project={project} />

      {/* Full-bleed hero – 3D depth, separate-website feel */}
      {/* Full-bleed hero – Inspired by ASBL Spectra */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
  {/* Video Background */}
  <video
    autoPlay
    muted
    playsInline
    className="w-full h-full object-cover"
  >
    <source 
      src="https://res.cloudinary.com/dgmrbxuvb/video/upload/v1771062732/mb_prime_villas_kgthud.mp4" 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>

  {/* Gradient Overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

</div>
        {/* Content Container */}
        <div className="relative z-10 container h-full flex flex-col justify-center px-6 md:px-12">



          <motion.div
            className="max-w-3xl ml-0 lg:ml-12 mt-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tagline */}
            <p className="text-white/80 text-xs md:text-sm font-sans font-bold tracking-[0.2em] mb-4 uppercase">
              {project.tagline || 'LIVE IN LUXURY'}
            </p>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight mb-4">
              {project.name}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 font-sans font-light mb-2">
              {project.subtitle || 'Experience the pinnacle of modern living.'}
            </p>

            {/* Configurations / Highlights Inline */}
            <p className="text-white/70 text-xs md:text-sm font-sans mb-10">
              {project.configurations || 'Luxury Configurations Available'}
            </p>

            {/* Stats Grid */}
            <div className="flex gap-12 mb-10 border-l-2 border-secondary pl-6">
              <div>
                <p className="text-white/60 text-xs font-sans uppercase tracking-wider mb-1">SPREAD ACROSS</p>
                <p className="text-white text-2xl md:text-3xl font-sans font-medium">
                  {project.acres || 'TBA'}
                </p>
              </div>

            </div>

            {/* Brochure Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-6 py-3 rounded-full font-sans font-bold flex items-center gap-2 hover:bg-secondary hover:text-primary transition-colors text-sm"
            >
              <Download size={18} />
              Brochure
            </motion.button>

          </motion.div>
        </div>
      </section>

     

      {/* Other Projects Section */}
      <section id="other-projects" className="py-20 bg-white border-t border-slate-100 scroll-mt-24">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-sans text-slate-400">Other <span className="font-bold text-primary">Projects</span></h2>

            {allOtherProjects.length > 4 && (
              <div className="flex gap-2">
                <button
                  onClick={prevProjects}
                  disabled={startIndex === 0}
                  className={`p-2 rounded-full border transition-colors ${startIndex === 0 ? 'border-slate-200 text-slate-300' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextProjects}
                  disabled={startIndex + 4 >= allOtherProjects.length}
                  className={`p-2 rounded-full border transition-colors ${startIndex + 4 >= allOtherProjects.length ? 'border-slate-200 text-slate-300' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProjects.map((other) => (
              <Link
                to={`/projects/${other.slug}`}
                key={other.slug}
                onClick={() => window.scrollTo(0, 0)}
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100"
              >
                <img
                  src={other.image}
                  alt={other.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:via-black/40" />

                <div className="absolute bottom-0 left-0 w-full p-5 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-lg font-bold font-sans mb-1">{other.name}</h3>
                  <p className="text-xs font-sans text-white/90 mb-1">{other.configurations}</p>
                  <p className="text-[10px] font-sans text-white/70 mb-2 uppercase tracking-wide">{other.location}</p>

                  <div className="pt-3 border-t border-white/20 mt-2 flex justify-between items-center text-[10px] font-sans text-white/60">
                    <span>{other.handover}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-secondary">
                      View <Check size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Master Layout Zoom Modal */}
      <AnimatePresence>
        {isLayoutZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLayoutZoomed(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center overflow-auto p-4"
            >
              <img
                src={project.masterPlan}
                alt={`${project.name} Master Plan Zoomed`}
                className="max-w-none transition-transform duration-300 ease-out origin-center"
                style={{
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
                  maxHeight: '85vh',
                  maxWidth: '90vw'
                }}
                onDoubleClick={handleDoubleClick}
              />
            </motion.div>

            {/* Controls */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLayoutZoomed(false);
              }}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors z-[120]"
            >
              <X size={24} />
            </motion.button>

            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-2 z-[120]">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleZoomIn}
                className="p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-md"
                title="Zoom In"
              >
                <ZoomIn size={24} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleZoomOut}
                className="p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-md"
                title="Zoom Out"
                disabled={zoomLevel <= 1}
                style={{ opacity: zoomLevel <= 1 ? 0.3 : 1, cursor: zoomLevel <= 1 ? 'not-allowed' : 'pointer' }}
              >
                <ZoomOut size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JewelCity;