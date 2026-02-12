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
        MB Prime is a real estate development company focused on creating well-planned
        residential and plotted communities across Andhra Pradesh.
      </p>
      <p className="text-white font-sans font-light leading-relaxed">
        Each project begins with a careful evaluation of land potential, infrastructure
        growth, and long-term livability. Rather than rapid expansion, MB Prime
        prioritizes disciplined development—projects that mature gracefully over time.
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
