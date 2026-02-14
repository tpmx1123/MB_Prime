import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Calendar, Phone, Quote as QuoteIcon } from 'lucide-react';

const FounderSection = () => {
  return (
    <section id="founder" className="bg-white text-primary overflow-hidden">
      {/* 1. FOUNDER NARRATIVE AREA – text left, portrait right; shifted right on desktop */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 lg:pl-26 xl:pl-34 py-6 md:py-10">
        <div className="flex flex-row items-center gap-4 md:gap-10">
          
          {/* LEFT: Quote & founder text */}
          <div className="w-7/12 lg:w-7/12 relative text-left">
            <QuoteIcon className="absolute -left-6 -top-6 md:-left-25 md:-top-10 w-8 h-8 md:w-24 md:h-24 text-slate-100 rotate-180" />
            
            <Motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="mb-4 md:mb-8">
                <h2 className="text-sm md:text-5xl font-serif font-light leading-tight tracking-tight text-primary">
                  "A home is more than a structure; it is the <span className="font-bold italic text-secondary">foundation of your legacy."</span>
                </h2>
                <div className="w-10 md:w-20 h-0.5 md:h-1 bg-secondary/30 mt-2 md:mt-8 rounded-full" />
              </div>

              <div>
                <h3 className="text-xs md:text-xl font-bold text-primary">Mr. Maganti Ravi Babu</h3>
                <p className="text-[8px] md:text-xs text-slate-500 font-medium tracking-wider">Founder and CEO, MB Prime Projects</p>
              </div>
            </Motion.div>
          </div>

          {/* RIGHT: Portrait */}
          <Motion.div 
            className="w-5/12 lg:w-5/12 relative shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group max-w-sm ml-auto lg:ml-0">
              <div className="absolute -inset-2 md:-inset-4 bg-slate-100/50 rounded-[1.5rem] md:rounded-[3rem] blur-xl md:blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="absolute -inset-[1px] md:-inset-[2px] bg-secondary/20 rounded-[1.1rem] md:rounded-[2.2rem]"></div>
              
             <div className="relative z-10 rounded-[1rem] md:rounded-[2rem] overflow-hidden border-[4px] md:border-[8px] border-white bg-white shadow-lg md:shadow-xl">
  <img 
    src="https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771054701/mbprime_ravibabu_adjxfk.png" 
    alt="Mr. Maganti Ravi Babu" 
    className="w-full h-[150px] md:h-[350px] object-cover object-top transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
  />
</div>

              <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 w-10 h-10 md:w-24 md:h-24 border-t border-r md:border-t-2 md:border-r-2 border-secondary/20 rounded-tr-[1.5rem] md:rounded-tr-[3rem] -z-0"></div>
            </div>
          </Motion.div>
        </div>
      </div>

      {/* 2. BEGIN YOUR JOURNEY CTA AREA */}
      <div className="bg-slate-50 border-t border-slate-100 py-6 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-4xl font-sans font-bold text-primary mb-8 md:mb-12 tracking-tight">
              Begin Your Journey with MB Prime
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8">
              <button className=" sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-secondary hover:bg-primary hover:text-white text-black font-bold py-2.5 px-4 sm:py-3 sm:px-6 md:py-4 md:px-10 rounded-full transition-all duration-300 shadow-lg text-[9px] sm:text-[10px] md:text-xs">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <span className="uppercase tracking-widest">Request a Private Tour</span>
              </button>

              <button className="sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-transparent border border-primary/10 hover:border-primary text-primary font-bold py-2.5 px-4 sm:py-3 sm:px-6 md:py-4 md:px-10 rounded-full transition-all duration-300 text-[9px] sm:text-[10px] md:text-xs">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:animate-bounce" />
                <span className="uppercase tracking-widest">Speak with our team</span>
              </button>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
