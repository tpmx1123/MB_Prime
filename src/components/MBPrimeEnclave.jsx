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
import { useLazyVideo } from '../hooks/useLazyVideo';
const iconMap = {
  Footprints, Trophy, Target, Zap, Smile, Trees, Music, Home, Waves, Users, Sunrise, Droplets, Leaf, Compass, Check,
  Hospital: Stethoscope, School: GraduationCap, Train, Bus, Plane, MapPin
};

const MBPrimeEnclave = () => {
  const project = getProjectBySlug('MB-Prime-Enclave');
  const { ref: heroVideoRef, shouldLoad: shouldLoadHeroVideo } = useLazyVideo({ rootMargin: '100px' });
  const [showBadge, setShowBadge] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowBadge(false);
      }, 8000); // Hide after 20 seconds
      return () => clearTimeout(timer);
    }, []);
  // 1. STATE DECLARATIONS (Must come first)
  const [startIndex, setStartIndex] = useState(0);
  const [activePlotTab, setActivePlotTab] = useState(0);
  const [isLayoutZoomed, setIsLayoutZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  
  // New States for Amazon-style Gallery
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isImgZoomed, setIsImgZoomed] = useState(false);

  // 2. DEPENDENT CONSTANTS (Safely access state here)
  const currentVilla = project?.villaTypes?.[activePlotTab];
  const villaImages = currentVilla ? [
    currentVilla.image,
    currentVilla.image1,
    currentVilla.image2,
    currentVilla.image3
  ].filter(Boolean) : [];
  const villaImageTags = currentVilla
    ? [currentVilla.tag, currentVilla.tag1, currentVilla.tag2, currentVilla.tag3].filter(Boolean)
    : [];

  const allOtherProjects = projects.filter(p => p.slug !== 'MB-Prime-Enclave');
  const visibleProjects = allOtherProjects.slice(startIndex, startIndex + 4);

  // 3. REFS
  const tabsRef = useRef([]);
  const tabsContainerRef = useRef(null);

  // 4. EFFECTS
  useEffect(() => {
    updateFavicon(project?.favicon);
    updatePageTitle(project?.name);

    return () => {
      updateFavicon(); 
      updatePageTitle(); 
    };
  }, [project]);

  useEffect(() => {
    setStartIndex(0);
  }, ['MB-Prime-Enclave']);

  // Reset thumbnail selection when switching villa tabs
  useEffect(() => {
    setSelectedImgIndex(0);
  }, [activePlotTab]);

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

  useEffect(() => {
    if (!isLayoutZoomed && !isImgZoomed) setZoomLevel(1);
  }, [isLayoutZoomed, isImgZoomed]);

  // 5. HANDLERS
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
     <section ref={heroVideoRef} className="relative h-screen w-full overflow-hidden">
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
               {/* Video Background – lazy loaded */}
               <video
                 autoPlay
                 loop
                 muted
                 playsInline
                 preload={shouldLoadHeroVideo ? 'auto' : 'none'}
                 className="w-full h-full object-cover"
               >
                 {shouldLoadHeroVideo && (
                   <source
                     src="https://res.cloudinary.com/dgmrbxuvb/video/upload/v1771064084/mb_prime_enclave_o69n0k.mp4"
                     type="video/mp4"
                   />
                 )}
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
                 {project.heroImageTag && (
                   <p className="text-[#8B4512] text-xs md:text-sm font-serif font-semibold tracking-wider mb-3 bg-white/90 backdrop-blur-sm inline-block px-3 py-1.5 rounded">
                     {project.heroImageTag}
                   </p>
                 )}
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
     
                 {/* Brochure Button – opens EnquiryPopup; after form submit downloads brochure if brochureLink is set */}
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     const brochure = project?.brochureLink && project.brochureLink !== '#' ? project.brochureLink : null;
                     window.dispatchEvent(new CustomEvent('open-enquiry-popup', {
                       detail: {
                         brochure: brochure || null,
                         autoDownloadAfterSubmit: Boolean(brochure),
                         downloadFileName: brochure ? `${(project?.name || 'MB_Prime').replace(/\s+/g, '_')}_Brochure.pdf` : 'Brochure.pdf',
                         formType: brochure ? 'brochure' : 'enquiry',
                       },
                     }));
                   }}
                   className="bg-white text-primary px-6 py-3 rounded-full font-sans font-bold flex items-center gap-2 hover:bg-secondary hover:text-primary transition-colors text-sm"
                 >
                   <Download size={18} />
                   Brochure
                 </motion.button>
               </motion.div>
             </div>
     
             {/* VMRDA-RERA Approved Badge */}
             <AnimatePresence>
               {showBadge && (
                 <motion.div
                   initial={{ x: 100, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ x: 100, opacity: 0, transition: { duration: 0.8 } }}
                   transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                   className="absolute bottom-10 right-6 md:right-10 z-20 flex items-center justify-center w-22 h-22 md:w-27 md:h-27 bg-white/95 backdrop-blur-md rounded-full shadow-lg border-2 border-secondary"
                 >
                   <div className="flex flex-col items-center justify-center p-1 ml-2">
                     <div className="flex items-center justify-center ">
                       <img src="https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771238479/Vmrda_logo_eddawf.png" alt="VMRDA" className="w-8 h-8 md:w-9 md:h-9 object-contain" loading="lazy" />
                       <img src="https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771238635/rerawithout_bg_irz1u4.png" alt="RERA" className="w-10 h-10 md:w-15 md:h-15 object-contain" loading="lazy" />
                     </div>
                     <p className="text-[7px] md:text-[9px] font-sans font-bold text-secondary uppercase tracking-wider">
                       APPROVED
                     </p>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </section>

      {/* Content block – clean, editorial */}
      <section className="py-16 md:py-24 bg-bg-light">
        <div className="container  mx-auto">




          {/* Plots Section */}
          
<div id="plots" className="scroll-mt-32 mb-20">
  {project.villaTypes && (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header & Tabs */}
      <div className="flex flex-col items-center justify-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-sans font-bold text-primary tracking-tight">
            Villa Configurations
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-secondary/60 to-transparent rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          ref={tabsContainerRef}
          className="flex p-1 bg-slate-100 rounded-xl w-full md:w-fit overflow-x-auto border border-slate-200/50 shadow-sm no-scrollbar scroll-smooth md:-mt-0 -mt-5"
        >
          <div className="flex min-w-max md:min-w-0">
            {project.villaTypes.map((type, index) => (
              <button
                key={type.id}
                ref={el => tabsRef.current[index] = el}
                onClick={() => setActivePlotTab(index)}
                className={`relative px-3 md:px-8 py-2.5 rounded-lg font-sans font-bold text-[10px] md:text-xs uppercase tracking-wide transition-colors duration-300 whitespace-nowrap ${activePlotTab === index ? 'text-secondary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {activePlotTab === index && (
                  <motion.div
                    layoutId="activePlotTabBackgroundHeader"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  {type.type} {type.direction && <span className="ml-1 opacity-60 text-[10px]">({type.direction})</span>}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gallery and Content Container */}
      <div className="flex items-center justify-center gap-2 md:gap-8 md:-mt-0 -mt-7">
        <button
          onClick={() => setActivePlotTab(prev => (prev === 0 ? project.villaTypes.length - 1 : prev - 1))}
          className="p-2 md:p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center w-full max-w-6xl">
          
          {/* Left: Amazon-style Gallery */}
          <div className="flex flex-col gap-6 w-full items-center">
            <motion.div
              key={`${currentVilla.id}-${selectedImgIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-[350px] aspect-[3/3] overflow-hidden rounded-2xl shadow-xl group cursor-zoom-in"
              onClick={() => setIsImgZoomed(true)}
            >
              <img
                src={villaImages[selectedImgIndex]}
                alt={currentVilla.type}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {villaImageTags[selectedImgIndex] && (
                <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
                  <span className="text-[10px] md:text-xs font-serif font-semibold text-[#8B4512] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded shadow-sm">
                    {villaImageTags[selectedImgIndex]}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-2 rounded-full shadow-lg">
                  <ZoomIn size={20} className="text-primary" />
                </div>
              </div>
            </motion.div>

            {/* Thumbnails Row */}
            <div className="flex gap-3 justify-center flex-wrap">
              {villaImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`flex flex-col items-center gap-1 w-16 md:w-20 rounded-xl overflow-hidden border-2 transition-all shadow-sm 
                    ${selectedImgIndex === idx ? 'border-secondary scale-105 ring-2 ring-secondary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-14 md:h-16 object-cover" alt={villaImageTags[idx] || 'thumbnail'} loading="lazy" />
                  {villaImageTags[idx] && (
                    <span className="text-[8px] md:text-[9px] font-sans font-medium text-primary px-1 text-center leading-tight line-clamp-2">
                      {villaImageTags[idx]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Vertically Centered Details */}
          <motion.div
            key={`${currentVilla.id}-details`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center text-center md:text-left w-full h-full"
          >
            <h3 className="md:text-3xl text-2xl font-sans font-bold text-primary md:mb-6 mb-2">
              {currentVilla.type}
            </h3>
            
            <div className="flex flex-wrap gap-4 mb-8 text-sm font-sans text-slate-500 justify-center md:justify-start">
              <span className="bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
                Size: <strong className="text-slate-800">{currentVilla.size}</strong>
              </span>
              {currentVilla.direction && (
                <span className="bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
                  Direction: <strong className="text-slate-800">{currentVilla.direction}</strong>
                </span>
              )}
            </div>

            <p className="text-slate-600 font-sans leading-relaxed mb-8 md:text-lg text-sm">
              {currentVilla.description}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
              <div>
                <p className="md:text-sm text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Plot Area</p>
                <div className="h-0.5 w-8 bg-indigo-400 rounded-full mb-3 mx-auto md:mx-0"></div>
                <p className="md:text-2xl text-lg font-sans font-bold text-primary">{currentVilla.area}</p>
              </div>
              <div>
                <p className="md:text-sm text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Built Up Area</p>
                <div className="h-0.5 w-8 bg-indigo-400 rounded-full mb-3 mx-auto md:mx-0"></div>
                <p className="md:text-2xl text-lg font-sans font-bold text-primary">{currentVilla.builtUp}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => setActivePlotTab(prev => (prev === project.villaTypes.length - 1 ? 0 : prev + 1))}
          className="p-2 md:p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.section>
  )}

  {/* Villa Image Zoom Modal */}
  <AnimatePresence>
    {isImgZoomed && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsImgZoomed(false)}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative max-w-6xl w-full flex flex-col items-center"
          onClick={e => e.stopPropagation()}
        >
          <img 
            src={villaImages[selectedImgIndex]} 
            alt={villaImageTags[selectedImgIndex] || 'Villa Detail'} 
            className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
            loading="lazy"
          />
          {villaImageTags[selectedImgIndex] && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-sm font-serif font-semibold text-[#8B4512] uppercase tracking-wider bg-white/95 backdrop-blur-sm px-4 py-2 rounded shadow-lg">
                {villaImageTags[selectedImgIndex]}
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsImgZoomed(false)}
            className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
          >
            <X size={32} />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

          {/* Layout Section */}
          <div id="layout" className="scroll-mt-24 mb-20 bg-secondary/10 rounded-3xl">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    staggerChildren: 0.2,
                    ease: "easeOut"
                  }
                }
              }}
            >


              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="max-w-6xl mx-auto grid md:grid-cols-2 items-center py-20 px-6 md:px-12 "
              >
                {/* Left Side: Highlights */}
                <div className="flex flex-col gap-4 md:pl-16 md:-mt-0 -mt-8 md:mb-0 mb-4">
                  <div className="relative inline-block px-6 py-2 md:px-10 md:py-3 bg-secondary rounded-r-full backdrop-blur-sm mb-6 -ml-1 self-start ">
                    <h2 className="text-xl md:text-3xl font-sans font-bold text-primary tracking-tight">
                      Master Layout
                    </h2>
                    <motion.div
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: '100%', transition: { delay: 0.3, duration: 0.8 } }
                      }}
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-secondary to-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 md:gap-x-8 gap-y-3 md:gap-y-4 w-full">
                    {project.layoutHighlights?.flat().map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                        }}
                        className="flex items-start gap-2 md:gap-3 group cursor-default"
                      >
                        <div className="mt-1.5 md:mt-2 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-secondary shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-primary/80 group-hover:text-primary font-sans text-[11px] md:text-base font-medium tracking-tight transition-colors duration-300 leading-relaxed">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Image */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, rotateY: 10 },
                    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1 } }
                  }}
                  className="relative flex justify-center items-center perspective-1000"
                >
                  <div
                    className="cursor-pointer group/image"
                    onClick={() => setIsLayoutZoomed(true)}
                  >
                    <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative">
                      <img
                        src={project.masterPlan}
                        alt={`${project.name} Master Plan`}
                        className="w-full h-auto max-w-[430px] object-contain transition-transform duration-700 hover:scale-[1.02] drop-shadow-2xl rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                        <span className="bg-white/90 text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
                          Click to Zoom
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>
          </div>

          {/* Location Section */}
          <div id="location" className="scroll-mt-28 mb-20 px-4">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.15, duration: 0.8 }
                }
              }}
            >
              <div className="flex flex-col items-center justify-center mb-6 mt-18 md:mt-10">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                  }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 justify-between w-full mb-6 mt-10">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-secondary shrink-0" size={32} />
                      <h2 className="text-2xl md:text-3xl font-sans font-bold text-primary tracking-tight">
                        Location Highlights
                      </h2>
                    </div>
                  </div>
                  <motion.div
                    variants={{
                      hidden: { width: 0 },
                      visible: { width: '100%', transition: { delay: 0.3, duration: 0.8 } }
                    }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-secondary/60 to-transparent rounded-full"
                  />
                </motion.div>
              </div>

              {/* <div className="relative w-full pb-10 md:-mt-0 -mt-10">
                <div className="max-w-7xl mx-auto px-4 py-20 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 'calc(100% - 60px)' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-[215px] left-[30px] h-[2px] border-b-2 border-dashed border-slate-400/40 hidden md:block"
                  />

                  <div className="hidden" />

                  <div className="flex flex-row md:flex-row overflow-x-auto md:overflow-visible justify-start md:justify-between items-start relative z-10 w-full gap-4 md:gap-0 px-4 md:px-0 scroll-smooth snap-x snap-mandatory no-scrollbar pb-4">
                    {project.locationDistances?.map((loc, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="flex flex-col items-center group relative min-w-[100px] md:min-w-0 md:flex-1 snap-center"
                      >
                        <div className="h-14 md:h-20 flex flex-col justify-end mb-2 md:mb-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl md:text-4xl lg:text-6xl font-sans font-extrabold text-[#5B6BF9]/40 group-hover:text-[#5B6BF9] transition-all duration-700 cursor-default">
                              {loc.time}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] lg:text-xs uppercase tracking-widest font-black text-slate-600">
                                {loc.unit}
                              </span>
                              <span className="text-[8px] lg:text-[10px] uppercase font-bold text-slate-500 -mt-1">
                                from
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative h-12 md:h-24 w-full flex flex-col items-center">
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="z-20 mb-2"
                          >
                            <MapPin size={24} className="text-slate-700 group-hover:text-[#5B6BF9] transition-all duration-500 w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                          </motion.div>

                          <div className="w-[2px] h-full bg-gradient-to-t from-[#5B6BF9] to-slate-200/50 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-[3px] border-white bg-[#5B6BF9] shadow-md z-30 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                        </div>

                        <div className="mt-4 md:mt-8 text-center px-1 w-full flex justify-center">
                          <p className="text-primary font-sans font-bold text-[9px] md:text-[11px] lg:text-sm tracking-tight leading-relaxed group-hover:text-[#5B6BF9] transition-colors duration-300 max-w-[100px] lg:max-w-none">
                            {loc.label}
                          </p>
                        </div>

                        {loc.type === 'airport' && (
                          <div className="absolute top-[215px] left-[50%] w-[120px] h-[1px] pointer-events-none overflow-visible">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" fill="none">
                              <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                                d="M0 0C30 0 70 -20 90 -80"
                                stroke="#5B6BF9"
                                strokeWidth="2.5"
                                strokeDasharray="5 5"
                                strokeLinecap="round"
                              />
                              <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.2, duration: 0.5 }}
                                className="origin-center"
                                style={{ transform: 'translate(90px, -80px) rotate(-45deg)' }}
                              >
                                <Plane
                                  size={24}
                                  className="text-[#5B6BF9] drop-shadow-[0_0_15px_rgba(91,107,249,0.3)]"
                                />
                              </motion.g>
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div> */}


              <div className="relative w-full pb-10">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
                  {/* DESKTOP: Horizontal Timeline Line (Ash Line) */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 'calc(100% - 60px)' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-[215px] left-[30px] h-[2px] border-b-2 border-dashed border-slate-300 hidden md:block"
                  />

                  {/* MOBILE: Vertical Timeline Line (Positioned at the gutter between time and text) */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-[85px] top-0 w-[2px] border-l-2 border-dashed border-slate-300 md:hidden z-0"
                  />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-start relative z-10 w-full gap-12 md:gap-0">
                    {project.locationDistances?.map((loc, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="flex flex-row md:flex-col items-center md:items-center group relative w-full md:flex-1 min-w-0"
                      >
                        {/* 1. Time Indicator (Fixed width on mobile to align with the gutter) */}
                        <div className="w-[70px] md:w-full flex flex-col items-end md:items-center pr-4 md:pr-0 md:mb-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#5B6BF9]/40 group-hover:text-[#5B6BF9] transition-all duration-700 cursor-default">
                              {loc.time}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest font-black text-slate-400">
                                {loc.unit}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Map Pin (Centered on the dashed line) */}
                        <div className="relative z-10 flex items-center justify-center w-8 md:w-full md:h-24">
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-full p-2 md:p-3 border-2 border-slate-100 shadow-sm group-hover:border-[#5B6BF9] transition-all duration-500"
                          >
                            {(() => {
                              const IconComponent = iconMap[loc.icon] || MapPin;
                              return <IconComponent size={20} className="text-slate-700 group-hover:text-[#5B6BF9] md:w-6 md:h-6" strokeWidth={1.5} />;
                            })()}
                          </motion.div>

                          {/* Desktop-only vertical stem connecting to horizontal line */}
                          <div className="hidden md:block absolute bottom-0 w-[2px] h-12 bg-gradient-to-t from-[#5B6BF9] to-slate-200/50 opacity-60 group-hover:opacity-100 transition-opacity" />

                          {/* Desktop-only intersection dot */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-[3px] border-white bg-[#5B6BF9] shadow-md z-30 transform scale-0 group-hover:scale-100 transition-transform duration-300 hidden md:block" />
                        </div>

                        {/* 3. Location Label (Right-aligned on mobile) */}
                        <div className="flex-1 pl-4 md:pl-0 md:mt-8 md:text-center">
                          <p className="text-primary font-sans font-bold text-sm lg:text-base tracking-tight leading-snug group-hover:text-[#5B6BF9] transition-colors duration-300">
                            {loc.label}
                          </p>
                        </div>

                        {/* Airport Curve SVG (Desktop Only) */}
                        {loc.type === 'airport' && (
                          <div className="absolute top-[215px] left-[50%] w-[120px] h-[1px] pointer-events-none overflow-visible hidden md:block">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" fill="none">
                              <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                                d="M0 0C30 0 70 -20 90 -80"
                                stroke="#5B6BF9"
                                strokeWidth="2.5"
                                strokeDasharray="5 5"
                                strokeLinecap="round"
                              />
                              <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.2, duration: 0.5 }}
                                style={{ transform: 'translate(90px, -80px) rotate(-45deg)' }}
                              >
                                <Plane size={24} className="text-[#5B6BF9]" />
                              </motion.g>
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-7xl mx-auto px-4  mb-16"
              >
                <div className="relative w-full h-[300px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                  <iframe
                    src={project.locationMap || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60588.16335198!2d83.8617!3d18.3039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c143bd94f8677%3A0x95971a815545c850!2sSrikakulam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1707740000000!5m2!1sen!2sin"}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                    className="grayscale-[0.3] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none border-2 border-white/20 rounded-3xl" />
                </div>
              </motion.div>


            </motion.section>
          </div>

          {/* Amenities / Specifications Section */}
          <div id="amenities" className="scroll-mt-38 mb-20">
            {project.amenities ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
              >
                <div className="flex flex-col items-center justify-center mb-16 mt-30">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative text-center"
                  >

                    <h2 className="text-xl md:text-2xl font-sans font-bold text-secondary tracking-[0.2em] uppercase mb-2">
                      20<span className="md:text-3xl text-xl">+</span>
                    </h2>
                    <h3 className="text-2xl md:text-5xl font-sans font-extrabold text-primary tracking-tight">
                      High Level Amenities
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute -bottom-4 left-0 h-1.5 bg-gradient-to-r from-secondary/60 via-secondary to-transparent rounded-full"
                    />
                  </motion.div>
                </div>

                <div className="max-w-5xl mx-auto px-4">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {project.amenities.map((item, idx) => {
                      const AmenityIcon = iconMap[item.icon] || Info;
                      return (
                        <motion.div
                          key={idx}
                          initial="hidden"
                          whileInView="visible"
                          whileHover="hover"
                          viewport={{ once: true }}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.05 } }
                          }}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-md ${!showAllAmenities && idx >= 8 ? 'hidden md:block' : ''}`}
                        >
                          {/* Background Image */}
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            variants={{
                              hover: { scale: 1.08 }
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />

                          {/* Initial State Overlay (Subtle Gradient for Readability) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

                          {/* Static Title (Bottom Left - fades on hover) */}
                          <div className="absolute md:bottom-4 bottom-2 left-2 md:left-4 group-hover:opacity-0 transition-opacity duration-300">
                            <h4 className="md:text-base text-[10px] font-sans font-bold text-white tracking-tight drop-shadow-lg">
                              {item.title}
                            </h4>
                          </div>

                          {/* Hover Overlay Content (ASBL Style) */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            variants={{
                              hover: { opacity: 1 }
                            }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-black/60 flex flex-col justify-between p-6 backdrop-blur-[1px]"
                          >
                            {/* Top Left: Text */}
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              variants={{
                                hover: { x: 0, opacity: 1 }
                              }}
                              transition={{ delay: 0.05, duration: 0.3 }}
                              className="text-left"
                            >
                              <h4 className="text-xl font-sans font-extrabold text-white mb-2 tracking-tight">
                                {item.title}
                              </h4>
                              <p className="text-xs font-sans font-medium text-white/90 leading-relaxed max-w-[180px]">
                                {item.desc}
                              </p>
                            </motion.div>

                            {/* Bottom Right: Icon */}
                            {/* <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              variants={{
                                hover: { scale: 1, opacity: 1 }
                              }}
                              transition={{ delay: 0.15, duration: 0.3 }}
                              className="self-end"
                            >
                              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-white group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
                                <AmenityIcon size={24} strokeWidth={1.5} />
                              </div>
                            </motion.div> */}
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                  {project.amenities.length > 10 && (
                    <div className="flex justify-center mt-8 md:hidden">
                      <button
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        className="flex items-center gap-2 px-6 py-2 bg-white border border-secondary text-secondary font-sans font-bold rounded-full shadow-sm hover:bg-secondary hover:text-white transition-all duration-300 text-sm"
                      >
                        {showAllAmenities ? 'View Less' : 'View More'}
                        {showAllAmenities ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  )}
                </div>
              </motion.section>
            ) : project.highlights && project.highlights.length > 0 ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                  <ClipboardList className="text-secondary" size={24} />
                  <h2 className="text-2xl font-sans font-bold text-primary">
                    Specifications & Highlights
                  </h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-4 font-sans font-light text-slate-700">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-white p-4 rounded-md shadow-sm border border-slate-50">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mt-0.5">
                        <Check size={14} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.section>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                  <ClipboardList className="text-secondary" size={24} />
                  <h2 className="text-2xl font-sans font-bold text-primary">
                    Specifications
                  </h2>
                </div>
                <p className="text-slate-500 font-sans italic">Detailed specifications to be announced.</p>
              </motion.section>
            )}
          </div >


          <motion.div
            className="mt-14 mx-auto max-w-5xl bg-[#6366f1] rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-16 shadow-2xl  overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 gap-10" />

            <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight z-10 text-center md:text-left ">
              Are you interested in this Property?
            </h3>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { formType: 'enquiry' } }))}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white text-[#6366f1] font-sans font-bold rounded-full transition-all duration-300 hover:bg-slate-50 hover:scale-105 shadow-lg z-10"
            >
              Connect with Us <ArrowRight size={20} />
            </button>
          </motion.div>
        </div >
      </section >

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
                  loading="lazy"
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
                loading="lazy"
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

export default MBPrimeEnclave;