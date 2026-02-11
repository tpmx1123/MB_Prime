import React from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, FileCheck, UserCheck } from 'lucide-react';

const commitments = [
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'Standards that go beyond industry norms.',
  },
  {
    icon: MapPin,
    title: 'Strategic Vision',
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
    <section id="commitments" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 xl:gap-24 items-center">
          
          {/* LEFT SIDE: Immersive Image - Hidden on small mobile or scaled down */}
          <motion.div 
            className="w-full lg:w-1/2 relative lg:-ml-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden ">
              <img 
                src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770810715/wechoose_oofro5_n3ctx0.png" 
                alt="MB Prime Luxury Development" 
                className="w-full h-auto object-cover min-h-[350px] md:min-h-[500px] lg:min-h-[650px] hover:scale-105 transition-transform duration-1000"
              />    
            </div>
          </motion.div>

          {/* RIGHT SIDE: Content & Cards */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <header className="mb-10 md:mb-16 text-center lg:text-left">
              <motion.span
                className="inline-block text-secondary font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Commitments
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-serif text-primary leading-tight mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                What Sets <br className="hidden md:block" /> 
                <span className="italic font-light">MB Prime Apart</span>
              </motion.h2>
              <div className="w-16 md:w-20 h-1 bg-secondary rounded-full mx-auto lg:mx-0" />
            </header>

            {/* Commitments Grid - Stacked on mobile, 2 columns on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
              {commitments.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group flex flex-col items-center lg:items-start text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mb-3 md:mb-4 text-secondary/40 group-hover:text-secondary transition-colors duration-300">
                    <item.icon size={28} md:size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-primary text-lg md:text-xl mb-1 md:mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 max-w-[280px] lg:max-w-none">
                    {item.desc}
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-secondary/30 transition-all duration-500 hidden lg:block" />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12 md:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Optional CTA placeholder */}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Commitments;