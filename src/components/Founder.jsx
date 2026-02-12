import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Founder = () => {
  return (
    <section className="min-h-screen bg-black-800 pt-34 pb-10">
      <div className="container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-white mb-2">
            Maganti Ravi Babu
          </h1>
          <p className="text-yellow-500 font-sans font-semibold text-sm uppercase tracking-wider mb-10">
            CEO & Founder
          </p>
          <blockquote className="text-white text-lg md:text-xl leading-relaxed font-sans font-light">
            &ldquo;I founded MB Prime with a belief that real estate must be built responsibly. I
            review every plan, visit every site, and ensure that what we deliver is something I
            would choose for my own family.&rdquo;
          </blockquote>
          <p className="mt-8 text-slate-500 text-sm font-sans">CEO & Founder, MB Prime Projects</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
