import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, MapPin, Layout, ClipboardList, ChevronLeft, ChevronRight, Download, Plane,
  Footprints, Trophy, Target, Zap, Smile, Trees, Music, Home, Waves, Users, Sunrise, Droplets, Leaf, Compass,
  Info
} from 'lucide-react';
import { projects, getProjectBySlug } from '../data/projects';
import ProjectHeader from './ProjectHeader';

const iconMap = {
  Footprints, Trophy, Target, Zap, Smile, Trees, Music, Home, Waves, Users, Sunrise, Droplets, Leaf, Compass, Check
};

const MBPrimeVillas = () => {
  // Hardcode for Villas project
  const project = getProjectBySlug('villas');
  
  // Redirect if project not found
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, []);
  
  const allOtherProjects = projects.filter(p => p.slug !== 'villas');
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

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <ProjectHeader project={project} />

      {/* Full-bleed hero – 3D depth, separate-website feel */}
      {/* Full-bleed hero – Inspired by ASBL Spectra */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
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
                <div className="flex flex-col items-center justify-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary tracking-tight">
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
                    className="flex p-1 bg-slate-100 rounded-xl w-full md:w-fit overflow-x-auto border border-slate-200/50 shadow-sm no-scrollbar"
                  >
                    <div className="flex min-w-max md:min-w-0">
                      {project.villaTypes.map((type, index) => (
                        <button
                          key={type.id}
                          onClick={() => setActivePlotTab(index)}
                          className={`relative px-4 md:px-6 py-2.5 rounded-lg font-sans font-bold text-[10px] md:text-xs uppercase tracking-wide transition-colors duration-300 whitespace-nowrap ${activePlotTab === index
                            ? 'text-secondary'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                          {activePlotTab === index && (
                            <motion.div
                              layoutId="activePlotTabBackgroundHeader"
                              className="absolute inset-0 bg-white rounded-lg shadow-sm"
                              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                          )}
                          <span className="relative z-10">
                            {type.type} <span className="ml-1 opacity-60">({type.size})</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>



                {/* Content with Chevron Navigation */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.4
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-2 md:gap-8 "
                >
                  <button
                    onClick={() => setActivePlotTab(prev => (prev === 0 ? project.villaTypes.length - 1 : prev - 1))}
                    className="p-2 md:p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm z-10"
                    aria-label="Previous Villa Configuration"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center justify-items-center md:-ml-10">
                    <motion.div
                      key={project.villaTypes[activePlotTab].id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-fit overflow-hidden rounded-xl shadow-md group md:justify-self-end"
                    >
                      <img
                        src={project.villaTypes[activePlotTab].image}
                        alt={project.villaTypes[activePlotTab].type}
                        className="w-auto h-[250px] md:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute top-4 left-4 ${project.villaTypes[activePlotTab].color} text-white px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm`}>
                        {project.villaTypes[activePlotTab].type}
                      </div>
                    </motion.div>

                    <motion.div
                      key={`${project.villaTypes[activePlotTab].id}-details`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="md:justify-self-start max-w-md"
                    >
                      <h3 className="text-2xl font-sans font-bold text-primary mb-4">
                        {project.villaTypes[activePlotTab].type}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-6 text-sm font-sans text-slate-500">
                        <span className="bg-slate-50 px-3 py-1 rounded border border-slate-100">
                          Size: <strong className="text-slate-700">{project.villaTypes[activePlotTab].size}</strong>
                        </span>

                      </div>

                      <p className="text-slate-600 font-sans leading-relaxed mb-6">
                        {project.villaTypes[activePlotTab].description}
                      </p>

                      {/* Area Details Grid */}
                      <div className="grid grid-cols-2 gap-x-8 mt-10">
                        <div>
                          <p className="text-sm font-sans font-medium text-slate-700 mb-1">Plot Area</p>
                          <div className="h-0.5 w-10 bg-indigo-400 rounded-full mb-3"></div>
                          <p className="text-2xl font-sans font-bold text-primary">{project.villaTypes[activePlotTab].area}</p>
                        </div>
                        <div>
                          <p className="text-sm font-sans font-medium text-slate-700 mb-1">Built Up Area</p>
                          <div className="h-0.5 w-10 bg-indigo-400 rounded-full mb-3"></div>
                          <p className="text-2xl font-sans font-bold text-primary">{project.villaTypes[activePlotTab].builtUp}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <button
                    onClick={() => setActivePlotTab(prev => (prev === project.villaTypes.length - 1 ? 0 : prev + 1))}
                    className="p-2 md:p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm z-10"
                    aria-label="Next Villa Configuration"
                  >
                    <ChevronRight size={24} />
                  </button>
                </motion.div>
              </motion.section>
            )}
          </div>

          {/* Layout Section */}
          <div id="layout" className="scroll-mt-24 mb-20">
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
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                }}
                className="flex flex-col items-center justify-center mb-10 mt-32"
              >
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary tracking-tight">
                    Master Layout
                  </h2>
                  <motion.div
                    variants={{
                      hidden: { width: 0 },
                      visible: { width: '100%', transition: { delay: 0.3, duration: 0.8 } }
                    }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-secondary/60 to-transparent rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center py-8"
              >
                {/* Left Side: Highlights */}
                <div className="flex flex-col gap-6 md:pl-16">
                  {project.layoutHighlights?.[0]?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                      }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <span className="flex-shrink-0 w-2.5 h-2.5 bg-secondary rotate-45 transform group-hover:rotate-90 group-hover:scale-125 transition-all duration-500 shadow-sm" />
                      <span className="text-primary/70 group-hover:text-primary font-sans text-lg font-medium tracking-tight transition-colors duration-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}

                  {project.layoutHighlights?.[1] && (
                    <div className="space-y-6 pt-2">
                      {project.layoutHighlights[1].map((item, idx) => (
                        <motion.div
                          key={`col2-${idx}`}
                          variants={{
                            hidden: { opacity: 0, x: -30 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                          }}
                          className="flex items-center gap-4 group cursor-default"
                        >
                          <span className="flex-shrink-0 w-2.5 h-2.5 bg-secondary rotate-45 transform group-hover:rotate-90 group-hover:scale-125 transition-all duration-500 shadow-sm" />
                          <span className="text-primary/70 group-hover:text-primary font-sans text-lg font-medium tracking-tight transition-colors duration-300">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side: Image */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, rotateY: 10 },
                    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1 } }
                  }}
                  className="relative flex justify-center items-center perspective-1000"
                >
                  <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <img
                    src={project.masterPlan}
                    alt={`${project.name} Master Plan`}
                    className="w-full h-auto max-w-[500px] object-contain transition-transform duration-700 hover:scale-[1.05] drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </motion.section>
          </div>

          {/* Location Section */}
          <div id="location" className="scroll-mt-32 mb-20 px-4">
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
              <div className="flex flex-col items-center justify-center mb-6 mt-40">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                  }}
                  className="relative"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="text-secondary" size={32} />
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary tracking-tight">
                      Location Highlights
                    </h2>
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

              <div className="relative w-full pb-10">
                <div className="max-w-7xl mx-auto px-4 py-20 relative">
                  {/* Horizontal Timeline Line (Ash Line) - Hidden on mobile */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 'calc(100% - 60px)' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-[215px] left-[30px] h-[2px] border-b-2 border-dashed border-slate-400/40 hidden md:block"
                  />

                  {/* Vertical Timeline Line for Mobile */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '80%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-1/2 top-40 w-[2px] border-l-2 border-dashed border-slate-400/40 md:hidden -translate-x-1/2"
                  />

                  <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative z-10 w-full gap-20 md:gap-0">
                    {project.locationDistances?.map((loc, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="flex flex-col items-center group relative w-full md:flex-1 min-w-0"
                      >
                        {/* 1. Time Distance Label */}
                        <div className="h-20 flex flex-col justify-end mb-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl lg:text-6xl font-sans font-extrabold text-[#5B6BF9]/40 group-hover:text-[#5B6BF9] transition-all duration-700 cursor-default">
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

                        {/* 2. Map Pin and Vertical Connector (ABOVE the ash line) */}
                        <div className="relative h-24 w-full flex flex-col items-center">
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="z-20 mb-2"
                          >
                            <MapPin size={24} className="text-slate-700 group-hover:text-[#5B6BF9] transition-all duration-500" fill="currentColor" />
                          </motion.div>

                          {/* Vertical Line connecting to Ash Line */}
                          <div className="w-[2px] h-full bg-gradient-to-t from-[#5B6BF9] to-slate-200/50 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Intersection Point Dot (on the Ash Line) */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-[3px] border-white bg-[#5B6BF9] shadow-md z-30 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                        </div>

                        {/* 3. Location Label (BELOW the ash line) */}
                        <div className="mt-8 text-center px-1 w-full flex justify-center">
                          <p className="text-primary font-sans font-bold text-[11px] lg:text-sm tracking-tight leading-relaxed group-hover:text-[#5B6BF9] transition-colors duration-300 max-w-[120px] lg:max-w-none">
                            {loc.label}
                          </p>
                        </div>

                        {/* Airport Curve SVG (Starts from the dash line intersection) */}
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
                      20 PLUS
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-sans font-extrabold text-primary tracking-tight">
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
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-md"
                        >
                          {/* Background Image */}
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />

                          {/* Initial State Overlay (Subtle Gradient for Readability) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

                          {/* Static Title (Bottom Left - fades on hover) */}
                          <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                            <h4 className="text-base font-sans font-bold text-white tracking-tight drop-shadow-lg">
                              {item.title}
                            </h4>
                          </div>

                          {/* Hover Overlay Content (ASBL Style) */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-black/60 flex flex-col justify-between p-6 backdrop-blur-[1px]"
                          >
                            {/* Top Left: Text */}
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              whileHover={{ x: 0, opacity: 1 }}
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
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.15, duration: 0.3 }}
                              className="self-end"
                            >
                              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-white group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
                                <AmenityIcon size={24} strokeWidth={1.5} />
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
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
        </div >
      </section >

      {/* Other Projects Section */}
      < section id="other-projects" className="py-20 bg-white border-t border-slate-100 scroll-mt-24" >
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
      </section >
    </>
  );
};

export default MBPrimeVillas;
