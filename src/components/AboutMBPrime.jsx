import React from 'react';
import { motion } from 'framer-motion';

const AboutMBPrime = ({ asPage = false } = {}) => {
  const content = (
    <motion.div
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-xl md:text-2xl font-sans font-bold text-yellow-500 mb-6">
        About MB Prime
      </h2>
      <p className="text-white font-sans font-light leading-relaxed mb-4">
      We develop residential and villa plot communities across Andhra Pradesh — and we do it with a discipline most developers skip.
      </p>
      <p className="text-white font-sans font-light leading-relaxed">
      "Every project starts with the same question: will this be worth it for the family that buys here — ten years from now? That question shapes everything: the land we choose, the infrastructure we build, and the timelines we commit to."
      "We grow deliberately. Not because we can't move faster — but because the right project, done right, is worth more than three projects done quickly.
      </p>
    </motion.div>
  );

  if (asPage) {
    return (
      <div id="about" className="min-h-screen relative pt-2 pb-16">
        {/* Background Image with Reduced Opacity */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/durbtkhbz/image/upload/v1770802746/0tr7eq_yrnqz0.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3
          }}
        />
        
        <div className="relative z-10  min-h-screen pt-24 pb-16">
          <div className="container py-16 md:py-20">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="py-16 md:py-20 relative">
      {/* Background Image with Reduced Opacity */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/durbtkhbz/image/upload/v1770802746/0tr7eq_yrnqz0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      />
      
      <div className="relative z-10 ">
        <div className="container">{content}</div>
      </div>
    </section>
  );
};

export default AboutMBPrime;
