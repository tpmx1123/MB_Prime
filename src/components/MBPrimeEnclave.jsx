import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, MapPin, Download, Plane, School, Bus, ShoppingCart, Train,
  Info, ChevronLeft, ChevronRight
} from 'lucide-react';
import { projects, getProjectBySlug } from '../data/projects';
import ProjectHeader from './ProjectHeader';

const MBPrimeEnclave = () => {
  const project = getProjectBySlug('enclave');
  
  if (!project) return <Navigate to="/projects" replace />;

  const locationData = [
    { name: "Narayana School", time: "5 Mins", icon: <School size={20} /> },
    { name: "Chaitanya School", time: "5 Mins", icon: <School size={20} /> },
    { name: "RTC Bus Stand", time: "10 Mins", icon: <Bus size={20} /> },
    { name: "Bhogapuram Airport", time: "20 Mins", icon: <Plane size={20} /> },
    { name: "D-Mart", time: "10 Mins", icon: <ShoppingCart size={20} /> },
    { name: "Metro Convention", time: "Very Close", icon: <Train size={24} className="text-primary" />, isMetro: true },
  ];

  return (
    <div className="bg-white">
      <ProjectHeader project={project} />

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container h-full flex flex-col justify-center px-6 md:px-12">
          <motion.div
            className="max-w-3xl ml-0 lg:ml-12 mt-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/80 text-xs md:text-sm font-sans font-bold tracking-[0.2em] mb-4 uppercase">
              {project.tagline || 'LIVE IN LUXURY'}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight mb-4">
              {project.name}
            </h1>
            <div className="flex gap-12 mb-10 border-l-2 border-yellow-500 pl-6">
              <div>
                <p className="text-white/60 text-xs font-sans uppercase tracking-wider mb-1">SPREAD ACROSS</p>
                <p className="text-white text-2xl md:text-3xl font-sans font-medium">{project.acres || 'TBA'}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-full font-sans font-bold flex items-center gap-2 hover:bg-yellow-500 transition-colors text-sm"
            >
              <Download size={18} /> Brochure
            </motion.button>
          </motion.div>
        </div>
      </section>
    
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
      {/* Location Highlights Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-12">
            <MapPin className="text-yellow-600" />
            <h2 className="text-3xl font-bold text-slate-800">Location Highlights</h2>
          </div>

          <div className="relative max-w-6xl mx-auto py-10">
            {/* The Curved Line (SVG) */}
            <svg className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 hidden md:block" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path 
                d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,60 1200,60" 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                strokeDasharray="6,6"
              />
            </svg>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
              {locationData.map((loc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center relative z-10 w-40"
                >
                  <div className="mb-4 bg-white shadow-md border border-slate-100 rounded-lg px-3 py-1">
                    <span className="text-blue-900 font-bold text-lg">{loc.time.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase block leading-none text-slate-400">Mins From</span>
                  </div>

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 shadow-lg ${loc.isMetro ? 'bg-yellow-500 text-white' : 'bg-white text-slate-600'}`}>
                    {loc.icon}
                  </div>

                  <p className="text-sm font-semibold text-slate-700 leading-tight">
                    {loc.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Google Maps</h2>
                <p className="text-slate-500 text-sm">Explore the neighborhood and nearby landmarks.</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
              >
                View on Google Maps <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 h-[450px] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2721.0105296377997!2d83.399245!3d18.088931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDA1JzIwLjIiTiA4M8KwMjMnNTcuMyJF!5e1!3m2!1sen!2sin!4v1770977453980!5m2!1sen!2sin"  
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Project Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MBPrimeEnclave;