import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-sans font-bold text-white mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Begin Your Journey with MB Prime
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-secondary text-primary font-sans font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-opacity"
          >
            <Calendar size={18} />
            Schedule a Private Site Visit
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm border-2 border-white/50 text-white font-sans font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            <Phone size={18} />
            Speak with Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
