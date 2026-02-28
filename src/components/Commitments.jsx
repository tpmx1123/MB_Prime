import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, MapPin, FileCheck, UserCheck } from 'lucide-react';

const commitments = [
  { icon: Award, title: 'Unmatched Excellence', desc: 'Standards that go beyond industry norms.' },
  { icon: MapPin, title: 'Growth-Driven Vision', desc: 'Locations chosen for where Andhra Pradesh is headed.' },
  { icon: FileCheck, title: 'Complete Transparency', desc: 'Clear timelines. Honest communication.' },
  { icon: UserCheck, title: 'Founder-Led Oversight', desc: 'Every project personally reviewed.' },
];

const Commitments = () => {
  return (
    <section id="commitments" className="py-12 bg-white overflow-hidden">
      {/* Wrapper to handle edge-to-edge image on desktop */}
      <div className="flex flex-col md:flex-row items-stretch">
        
        {/* MOBILE ONLY: Title placed above the image */}
        <div className="px-6 md:hidden mb-8 text-center">
          <Motion.span className="inline-block text-secondary font-sans font-bold text-xs uppercase tracking-[0.3em] mb-2">
            Our Commitments
          </Motion.span>
          <Motion.h2 className="text-3xl font-serif text-primary leading-tight mb-4">
            What Sets <span className="italic font-light">MB Prime Apart</span>
          </Motion.h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        {/* LEFT: Image – Touching the left edge */}
        <Motion.div 
          className="w-full md:w-[45%] shrink-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[350px] sm:h-[450px] md:h-full w-full">
            <img 
              src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770810715/wechoose_oofro5_n3ctx0.png" 
              alt="MB Prime Luxury Development" 
              className="w-full h-full object-cover md:rounded-r-3xl "
              loading="lazy"
            />    
          </div>
        </Motion.div>

        {/* RIGHT: Content Section */}
        <div className="w-full md:w-[55%] px-6 sm:px-12 md:pl-16 md:pr-14 flex flex-col justify-center mt-10 md:mt-0">
          
          {/* DESKTOP ONLY: Title placed next to image */}
          <header className="hidden md:block mb-12 text-left">
            <Motion.span className="inline-block text-secondary font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4">
              Our Commitments
            </Motion.span>
            <Motion.h2 className="text-5xl lg:text-6xl font-serif text-primary leading-tight mb-6">
              What Sets <br /> 
              <span className="italic font-light">MB Prime Apart</span>
            </Motion.h2>
            <div className="w-20 h-1 bg-secondary rounded-full" />
          </header>

          {/* Commitments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-2">
            {commitments.map((item, i) => (
              <Motion.div
                key={item.title}
                className="group flex flex-col items-start text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-secondary/10 transition-colors">
                    <item.icon size={28} className="text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-primary text-lg md:text-lg group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-2 border-l-2 border-transparent group-hover:border-secondary transition-all">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Commitments;