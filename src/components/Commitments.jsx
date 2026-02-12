import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, MapPin, FileCheck, UserCheck } from 'lucide-react';

const commitments = [
  {
    icon: Award,
    title: 'Unmatched Excellence',
    desc: 'Standards that go beyond industry norms.',
  },
  {
    icon: MapPin,
    title: 'Growth-Driven Vision',
    desc: 'Locations chosen for where Andhra Pradesh is headed.',
  },
  {
    icon: FileCheck,
    title: 'Complete Transparency',
    desc: 'Clear timelines. Honest communication.',
  },
  {
    icon: UserCheck,
    title: 'Founder-Led Oversight',
    desc: 'Every project personally reviewed.',
  },
];

const Commitments = () => {
  return (
    <section id="commitments" className="py-6 md:py-8 lg:py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Same layout on all screens: image left, content right – scaled down on mobile */}
        <div className="flex flex-row gap-3 sm:gap-6 md:gap-8 xl:gap-8 items-stretch">
          
          {/* LEFT: Image – same proportion on mobile */}
          <Motion.div 
            className="w-[45%] min-w-[45%] relative shrink-0 "
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full min-h-[200px] sm:min-h-[280px] md:min-h-[350px] lg:min-h-[500px]">
              <img 
                src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770810715/wechoose_oofro5_n3ctx0.png" 
                alt="MB Prime Luxury Development" 
                className="w-full h-full min-h-[200px] object-cover hover:scale-105 transition-transform duration-1000"
              />    
            </div>
          </Motion.div>

          {/* RIGHT: Content – compact on mobile, same structure */}
          <div className="w-[55%] min-w-0 flex flex-col">
            <header className="mb-4 sm:mb-8 md:mb-16 text-left shrink-0">
              <Motion.span
                className="inline-block text-secondary font-sans font-bold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] mb-1 sm:mb-3 md:mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Commitments
              </Motion.span>
              <Motion.h2
                className="text-base sm:text-2xl md:text-5xl lg:text-6xl font-serif text-primary leading-tight mb-2 sm:mb-4 md:mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                What Sets <br className="hidden sm:block" /> 
                <span className="italic font-light">MB Prime Apart</span>
              </Motion.h2>
              <div className="w-10 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-secondary rounded-full" />
            </header>

            {/* Grid: 2 columns on all screens – same as desktop */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-3 md:gap-x-6 md:gap-y-4 lg:gap-y-1 min-w-0">
              {commitments.map((item, i) => (
                <Motion.div
                  key={item.title}
                  className="group flex flex-col items-start text-left"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-1 sm:mb-2 md:mb-3">
                    <span className="text-secondary/80 group-hover:text-secondary transition-colors duration-300 shrink-0">
                      <item.icon size={16} className="sm:w-5 sm:h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                    </span>
                    <h3 className="font-bold text-primary text-[11px] sm:text-base md:text-xl group-hover:translate-x-1 transition-transform duration-300 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed mb-2 sm:mb-3 md:mb-4 min-w-0">
                    {item.desc}
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-secondary/30 transition-all duration-500 hidden lg:block" />
                </Motion.div>
              ))}
            </div>

            <Motion.div 
              className="mt-6 sm:mt-12 md:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Optional CTA placeholder */}
            </Motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Commitments;