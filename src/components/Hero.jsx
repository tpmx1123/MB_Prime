import React, { useState, useEffect, useRef } from 'react';
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

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const subText =
    'Masterfully planned residential developments across Andhra Pradesh.';
  const cities = ['Andhra Pradesh'];
  const [typedSubText, setTypedSubText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingSpeed = 45;
    const timer = setInterval(() => {
      if (index < subText.length) {
        setTypedSubText(subText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  const renderSubText = () => {
    let result = [];
    let lastIndex = 0;
    const text = typedSubText;
    cities.forEach((city) => {
      const cityIndex = text.indexOf(city, lastIndex);
      if (cityIndex !== -1) {
        if (cityIndex > lastIndex) {
          result.push(
            <span key={`before-${city}`}>{text.substring(lastIndex, cityIndex)}</span>
          );
        }
        result.push(
          <span key={city} className="text-secondary font-semibold">
            {city}
          </span>
        );
        lastIndex = cityIndex + city.length;
      }
    });
    if (lastIndex < text.length) {
      result.push(<span key="remaining">{text.substring(lastIndex)}</span>);
    }
    return result.length > 0 ? result : <span>{text}</span>;
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
          <MotionP
            variants={itemVariants}
            className="text-sm md:text-base text-white/95 max-w-lg md:max-w-xl font-sans font-light tracking-wide leading-relaxed mb-5 md:mb-6  flex items-start"
          >
            <span className="block">
              {renderSubText()}
              {showCursor && (
                <MotionSpan
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="ml-1 inline-block"
                >
                  |
                </MotionSpan>
              )}
            </span>
          </MotionP>

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

          <MotionDiv
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-start"
          >
            <MotionA
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 md:px-8 md:py-4 rounded-sm bg-secondary text-primary font-sans font-bold text-xs md:text-sm uppercase tracking-[0.2em] w-full sm:w-auto transition-all duration-300"
              style={{ boxShadow: 'var(--shadow-gold)' }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={18} className="md:w-5 md:h-5" />
              <span className="whitespace-nowrap">Schedule a Private Visit</span>
              <ArrowRight size={14} className="opacity-90 hidden sm:block" />
            </MotionA>
            <MotionDiv
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 md:px-8 md:py-4 rounded-sm border-2 border-white/50 text-white font-sans font-bold text-xs md:text-sm uppercase tracking-[0.2em] hover:border-secondary hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">View Projects</span>
                <ArrowRight size={14} className="opacity-90 hidden sm:block" />
              </Link>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </motion.div>
    </section>
  );
};

export default Hero;
