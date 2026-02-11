import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const IntroPhilosophy = () => {
  return (
    <section
      id="philosophy"
      className="py-16 md:py-18 px-4 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-1">
          
          {/* RIGHT SIDE: Immersive Video Narrative */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[4/5] lg:aspect-auto lg:h-[500px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-105"
              >
                <source src="https://res.cloudinary.com/durbtkhbz/video/upload/v1770469745/villavideo1_upwqmu.mp4" type="video/mp4" />
              </video>
              
              {/* Luxury Overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Video Play Indicator (Subtle) */}
              <div className="absolute bottom-10 left-10 flex items-center gap-4 text-white/90">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <Play size={16} fill="white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Vision in Motion</span>
              </div>
            </div>

            {/* Decorative Element: Blueprint Detail */}
            <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 pointer-events-none hidden xl:block">
               <img src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770709800/blueprint_detail.png" alt="" className="w-full h-full" />
            </div>
          </motion.div>

          {/* LEFT SIDE: The Philosophy Content */}
          <div className="w-full lg:w-1/2">
            <motion.header 
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-secondary font-sans font-bold text-xs uppercase tracking-[0.4em] mb-3">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-primary leading-[1.1] mb-8">
                Exceptional <br />
                <span className="italic font-light text-primary/70">Living by Design</span>
              </h2>
              <div className="w-24 h-1 bg-secondary/40 rounded-full" />
            </motion.header>

            <div className="space-y-8 max-w-xl">
              <motion.p
                className="text-slate-600 text-lg md:text-xl leading-relaxed font-sans font-light italic"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                "MB Prime develops residential communities where thoughtful planning
                meets everyday life."
              </motion.p>

              <motion.p
                className="text-slate-500 text-base md:text-lg leading-relaxed font-sans font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                From villa plots in Srikakulam to emerging residential enclaves in Vizianagaram, 
                every project reflects a commitment to quality, clarity, and long-term value.
              </motion.p>

              <motion.div
                className="  border-t border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-primary text-sm tracking-widest uppercase font-bold mb-4">Leadership</p>
                <div className="flex items-start gap-6">
                  <div className="w-1 bg-secondary h-12" />
                  <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
                    Led by MD & Founder <b className="text-primary font-bold">Mr. Maganti Ravi Babu</b>, 
                    we follow a hands-on approach—careful site selection, disciplined planning, 
                    and transparent execution.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroPhilosophy;