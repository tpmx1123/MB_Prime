import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const points = [
  'Infrastructure expansion',
  'Tier-2 city growth',
  'Affordable entry with appreciation potential',
  'Long-term residential demand',
];

const InvestmentPerspective = () => {
  return (
    <section id="investment" className="py-20 md:py-28 bg-bg-light relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container relative z-10">
        <motion.span
          className="inline-block text-secondary font-sans font-bold text-xs uppercase tracking-[0.3em] mb-3 text-center w-full"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Investment
        </motion.span>
        <motion.h2
          className="text-center text-2xl md:text-4xl font-sans font-bold text-primary mb-10 md:mb-12 section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Andhra Pradesh
        </motion.h2>
        <motion.ul
          className="max-w-lg mx-auto space-y-4 font-sans font-light text-slate-700 text-base md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {points.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-center gap-4 py-2"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.05 }}
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                <Check size={14} />
              </span>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default InvestmentPerspective;
