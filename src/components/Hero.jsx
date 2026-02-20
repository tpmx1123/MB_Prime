import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import { useLazyVideo } from '../hooks/useLazyVideo';

const MotionDiv = motion.div;

const HERO_VIDEO_SRC = 'https://res.cloudinary.com/durbtkhbz/video/upload/q_auto,f_auto/v1770631455/Generate_Car_Driving_Video2_oxqsho.mp4';
const HERO_VIDEO_POSTER = 'https://res.cloudinary.com/durbtkhbz/video/upload/so_0,q_auto,f_auto,w_1200/v1770631455/Generate_Car_Driving_Video2_oxqsho.jpg';

const Hero = () => {
  const ref = useRef(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { shouldLoad: shouldLoadVideo } = useLazyVideo({ containerRef: ref, delayMs: 400 });

  useEffect(() => {
    // 5-second timer to clear the video and hide the text
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
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center md:items-end overflow-hidden pt-16 md:pt-0 pb-12 md:pb-16"
      style={{ perspective: '1200px' }}
    >
      {/* Background Video Layer – lazy loaded to improve initial load */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y }}>
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
        
        {/* Responsive Overlay: On mobile, we might want it slightly clearer or darker initially */}
        <motion.div 
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHighlighted ? 0.15 : 0.49 }} 
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:from-black/60" />
      </motion.div>

      <div className="absolute inset-0 bg-grain opacity-[0.06] md:opacity-[0.04] pointer-events-none z-[1]" />

      {/* Text Container: Specialized Mobile Layout */}
      <motion.div
        className="container relative z-20 w-full px-6 md:px-12"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isHighlighted ? 0 : 1,
          y: isHighlighted ? 20 : 0, // Slight slide down effect on hide
          pointerEvents: isHighlighted ? 'none' : 'auto' 
        }}
        transition={{ duration: 1.2, ease: "circOut" }}
      >
        <MotionDiv
          /* Mobile: Center-aligned, higher up (mt-0) 
             Laptop: Left-aligned (md:text-left), lower down (md:mt-40) 
          */
          className="max-w-[820px] mx-auto md:mx-0 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-sans font-bold leading-tight md:leading-[1.15] tracking-tight mb-4 md:mb-8">
            {/* Mobile: Smaller text (text-3xl), Laptop: Larger text (md:text-4xl+) */}
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-2 drop-shadow-lg">
              <BlurText
                text="Elevating Life,"
                delay={600} // Faster delay for mobile engagement
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
    </section>
  );
};

export default Hero;