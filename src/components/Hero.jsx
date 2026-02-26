import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import { useLazyVideo } from '../hooks/useLazyVideo';

const MotionDiv = motion.div;

const HERO_VIDEO_SRC = 'https://res.cloudinary.com/durbtkhbz/video/upload/q_auto,f_auto/v1770631455/Generate_Car_Driving_Video2_oxqsho.mp4';
const HERO_VIDEO_POSTER = 'https://res.cloudinary.com/durbtkhbz/video/upload/so_0,q_auto,f_auto,w_1200/v1770631455/Generate_Car_Driving_Video2_oxqsho.jpg';
const HERO_MOBILE_IMAGE = 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1772110851/hero_1_zatarb.jpg';

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
      <div className="relative z-20 w-full flex flex-col items-center pb-8 md:hidden">
        
        {/* Full-width image with a smooth sweeping bottom curve */}
        <div className="relative w-full h-[58vh] min-h-[400px] rounded-bl-[35%] overflow-hidden shadow-sm mb-10">
          <img
            src={HERO_MOBILE_IMAGE}
            alt="MB Prime Villas"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Subtle gradient so the top nav/status bar remains visible if you have a transparent header */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10" />
        </div>

        {/* Text and Button Wrapper */}
        <div className="px-6 flex flex-col items-center w-full">
          {/* Headline */}
          <h1 className="font-sans font-extrabold text-center mb-4 w-full">
            <span className="block text-4xl text-secondary leading-tight mb-1">Elevating Life,</span>
            <span className="block text-3xl text-primary leading-tight">One Home at a Time</span>
          </h1>

          {/* Description */}
          <p className="text-base text-gray-500 text-center max-w-[320px] mb-8 leading-relaxed font-medium">
            At <strong className="text-gray-800">MB PRIME PROJECTS</strong>, we combine expertise and innovation to create landmarks of elegance.
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={openEnquiry}
            className="w-full max-w-[340px] py-4 bg-secondary text-white hover:bg-secondary-light font-bold text-lg uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-[0.98]"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;