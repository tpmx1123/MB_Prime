import React, {  useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import { Calendar, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionA = motion.a;

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

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
      className="relative min-h-screen w-full flex items-end overflow-hidden pt-16 md:pt-0 pb-6 md:pb-16"
      style={{ perspective: '1200px' }}
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover scale-110"
        >
          <source
            src="https://res.cloudinary.com/durbtkhbz/video/upload/v1770631455/Generate_Car_Driving_Video2_oxqsho.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      </motion.div>
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none z-[1]" />
      <motion.div
        className="container relative z-10 w-full"
        style={{ opacity }}
      >
        <MotionDiv
          className="max-w-[820px] mx-auto md:mx-0 text-center md:text-left mt-36 md:mt-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-sans font-bold leading-[1.15] tracking-tight mb-6 md:mb-8">
            <span className="block text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-secondary mb-1 md:mb-2 drop-shadow-[0_2px_24px_rgba(201,162,39,0.25)]">
              <BlurText
                text="Elevating Life,"
                delay={900}
                animateBy="words"
                direction="top"
                className="inline-block"
              />
            </span>
            <span className="block text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              <BlurText
                text="One Home at a Time"
                delay={1100}
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
