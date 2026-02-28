import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import { useLazyVideo } from '../hooks/useLazyVideo';

const MotionDiv = motion.div;

const HERO_VIDEO_SRC = 'https://res.cloudinary.com/durbtkhbz/video/upload/q_auto,f_auto/v1770631455/Generate_Car_Driving_Video2_oxqsho.mp4';
const HERO_VIDEO_POSTER = 'https://res.cloudinary.com/durbtkhbz/video/upload/so_0,q_auto,f_auto,w_1200/v1770631455/Generate_Car_Driving_Video2_oxqsho.jpg';
const HERO_MOBILE_IMAGE = 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771392312/Original03_mgkcxm.png';

const Hero = () => {
  const ref = useRef(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { shouldLoad: shouldLoadVideo } = useLazyVideo({ containerRef: ref, delayMs: 400 });

  useEffect(() => {
    // 8-second timer to clear the video and hide the text
    const timer = setTimeout(() => {
      setIsHighlighted(true);
    }, 8000); 

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { formType: 'enquiry' } }));
  };

  return (
    <section
      ref={ref}
      // Removed pt-16 on mobile so the image hits the very top edge of the screen
      className="relative min-h-screen w-full flex items-center md:items-end overflow-hidden md:pt-0 pb-12 md:pb-16"
      style={{ perspective: '1200px' }}
    >
      {/* Desktop: Background Video Layer – lazy loaded */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden hidden md:block" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload={shouldLoadVideo ? 'metadata' : 'none'}
          poster={HERO_VIDEO_POSTER}
          className="absolute inset-0 w-full h-[120%] object-cover scale-110"
        >
          {shouldLoadVideo && (
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          )}
        </video>
        
        <motion.div 
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHighlighted ? 0.15 : 0.49 }} 
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:from-black/60" />
      </motion.div>

      {/* Mobile: Light background (no video) */}
      <div className="absolute inset-0 bg-white z-0 md:hidden" />

      <div className="absolute inset-0 bg-grain opacity-[0.06] md:opacity-[0.04] pointer-events-none z-[1]" />

      {/* Desktop: Text Container (unchanged) */}
      <motion.div
        className="container relative z-20 w-full px-6 md:px-12 hidden md:block"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isHighlighted ? 0 : 1,
          y: isHighlighted ? 20 : 0,
          pointerEvents: isHighlighted ? 'none' : 'auto' 
        }}
        transition={{ duration: 1.2, ease: "circOut" }}
      >
        <MotionDiv
          className="max-w-[820px] mx-auto md:mx-0 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-sans font-bold leading-tight md:leading-[1.15] tracking-tight mb-4 md:mb-8">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-2 drop-shadow-lg">
              <BlurText
                text="Elevating Life,"
                delay={600}
                animateBy="words"
                direction="top"
                className="inline-block"
              />
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-2xl">
              <BlurText
                text="One Home at a Time"
                delay={800}
                animateBy="words"
                direction="top"
                className="inline-block"
              />
            </span>
          </h1>
        </MotionDiv>
      </motion.div>

      {/* Mobile: Hero layout – Edge-to-edge curved image, headline, description, CTA */}
      {/* Full-Screen Mobile Hero with Bottom Text Overlay */}
<div className="relative h-screen w-full md:hidden overflow-hidden bg-black">
  
  {/* Full-Screen Background Image */}
  <img
    src={HERO_MOBILE_IMAGE}
    alt="MB Prime Villas"
    className="absolute inset-0 w-full h-[80vh] object-cover object-center"
    loading="eager"
  />

  {/* Opacity Overlay (Gradient) - Darker at the bottom for text legibility */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

  {/* Text and Button Wrapper - Positioned at the bottom */}
  <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-12 flex flex-col items-start">
    
    
    <div className="mb-6">
       <h1 className="font-sans  text-left  tracking-tight">
        <span className="block text-4xl text-[#D4AF37] leading-tight">Elevating Life,</span>
        <span className="block text-2xl text-white leading-tight">One Home at a Time</span>
      </h1>
    </div>

    <div className="mb-6">
      <p className="text-white text-sm font-sans font-light">
        MB Prime Villas is a premium residential project located in the heart of Vijayawada. It is a project that is designed to provide a luxurious and comfortable living experience to the residents.
      </p>
    </div>

    {/* CTA Button */}
    <button
      onClick={openEnquiry}
      className="w-full py-4 bg-[#D4AF37] text-white font-bold rounded-4xl uppercase tracking-[0.2em] text-sm shadow-lg active:scale-95 transition-transform"
    >
      Enquire Now
    </button>
  </div>

  
</div>
    </section>
  );
};

export default Hero;