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
      <h2 className="text-xl md:text-2xl font-sans font-bold text-primary mb-6">
        About MB Prime
      </h2>
      <p className="text-slate-600 font-sans font-light leading-relaxed mb-4">
        MB Prime is a real estate development company focused on creating well-planned
        residential and plotted communities across Andhra Pradesh.
      </p>
      <p className="text-slate-600 font-sans font-light leading-relaxed">
        Each project begins with a careful evaluation of land potential, infrastructure
        growth, and long-term livability. Rather than rapid expansion, MB Prime
        prioritizes disciplined development—projects that mature gracefully over time.
      </p>
    </motion.div>
  );

  if (asPage) {
    return (
      <div id="about" className="min-h-screen bg-bg-light pt-24 pb-16">
        <div className="container py-16 md:py-20">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="py-16 md:py-20 bg-bg-light">
      <div className="container">{content}</div>
    </section>
  );
};

export default AboutMBPrime;
