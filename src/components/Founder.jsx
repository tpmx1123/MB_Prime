import React from 'react';
import { motion } from 'framer-motion';

const FOUNDER_IMAGE =
  'https://res.cloudinary.com/durbtkhbz/image/upload/v1773491654/AI_Generated_Image_2026-02-14_iw1ffu.png';

const Founder = () => {
  return (
    <section className="min-h-[70vh] bg-black flex items-center py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          /* md:flex-row-reverse moves the image to the right on desktop */
          className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10 lg:gap-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Right Side: Image Container with Premium Styling */}
          <div className="relative shrink-0 w-full max-w-[300px] md:max-w-[400px] group">
            {/* Soft outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-secondary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-[#111] shadow-2xl">
              <img
                src={FOUNDER_IMAGE}
                alt="Maganti Ravi Babu, CEO & Founder"
                className="w-full aspect-[4/5] object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Left Side: Content Section */}
          <div className="flex-1 text-center md:text-left space-y-6 md:pr-10">
            <header className="space-y-2">
              <p className="text-secondary font-sans font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-3">
                Visionary Leadership
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight">
                Maganti Ravi Babu
              </h2>
              <p className="text-white/60 font-sans font-medium text-sm md:text-lg italic uppercase tracking-wider">
                CEO & Founder
              </p>
            </header>

            <div className="relative pt-4">
              {/* Decorative accent mark */}
              <div className="absolute top-0 left-0 w-12 h-0.5 bg-secondary md:block hidden" />
              
              <blockquote className="text-white/90 text-lg md:text-2xl leading-relaxed font-sans font-light">
                &ldquo;I founded MB Prime with a belief that real estate must be built responsibly. I
                review every plan, visit every site, and ensure that what we deliver is something I
                would choose for my own family.&rdquo;
              </blockquote>
            </div>

            <footer className="pt-6">
              <p className="text-white/90 text-xs md:text-sm font-sans uppercase tracking-[0.25em]">
                MB Prime Projects 
              </p>
            </footer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;