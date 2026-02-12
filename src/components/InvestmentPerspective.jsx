import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const InvestmentSection = () => {
  const points = [
    "Infrastructure expansion",
    "Tier-2 city growth",
    "Affordable entry with appreciation potential",
    "Long-term residential demand"
  ];

  return (
    <section id="investment" className="py-4 md:py-6 bg-[#f9f9f9]">
      <div className="container mx-auto px-3 md:px-6 max-w-5xl">
        {/* Always two columns: image left, content right – same as desktop, scaled for mobile */}
        <div className="flex flex-row items-stretch gap-0 rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-100">
          
          {/* LEFT: Image – ~45% width, rounded left corners only */}
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-[45%] min-w-[45%] min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] relative rounded-l-2xl overflow-hidden"
          >
            <img 
              src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770888238/Gemini_Generated_Image_6x85006x85006x85_r8fepz.png" 
              alt="Andhra Pradesh Infrastructure Growth" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-700" />
          </Motion.div>

          {/* RIGHT: Content – ~55% width, rounded right corners, compact on mobile */}
          <Motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-[55%] min-w-0 flex flex-col justify-center bg-white p-3 sm:p-6 md:p-8 rounded-r-2xl"
          >
            <div className="min-w-0">
              <div className="mb-3 sm:mb-6 md:mb-8">
                <span className="text-secondary font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] block mb-1 sm:mb-2">
                  Investment
                </span>
                <h2 className="text-base sm:text-2xl md:text-3xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
                  Why Andhra Pradesh
                </h2>
                <div className="w-10 sm:w-14 h-0.5 bg-secondary/40 mt-2 sm:mt-4 rounded-full" />
              </div>

              <div className="space-y-2 sm:space-y-4 md:space-y-5">
                {points.map((point, index) => (
                  <Motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2 sm:gap-4 group"
                  >
                    <div className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 border border-secondary/40 flex items-center justify-center mt-0.5 group-hover:bg-secondary/20 transition-colors duration-300">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-secondary" />
                    </div>
                    <p className="text-slate-600 text-[11px] sm:text-sm md:text-base font-light leading-snug sm:leading-relaxed tracking-tight group-hover:text-slate-900 transition-colors duration-300 min-w-0">
                      {point}
                    </p>
                  </Motion.div>
                ))}
              </div>

              <div className="mt-4 sm:mt-8 md:mt-10 flex justify-end">
                <span className="text-secondary font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-50">
                  MB Prime
                </span>
              </div>
            </div>
          </Motion.div>

        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;