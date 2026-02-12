import React from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';

const IntroPhilosophy = () => {
  const containerRef = React.useRef(null);
  
  // Track scroll progress for the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation: Image zooms out slightly as you scroll (1.2 to 1.0)
  // and moves along the Y-axis for depth
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="py-6 md:py-10 lg:py-16 px-3 sm:px-4 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-0 sm:px-4 relative z-10">
        {/* Same layout on all screens: content left, image right (row-reverse) – scaled on mobile */}
        <div className="flex flex-row-reverse items-stretch gap-3 sm:gap-6 lg:gap-20">
          
          {/* RIGHT: Image – same proportion on mobile */}
          <Motion.div 
            className="w-[45%] min-w-[45%] relative shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Motion.div 
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl h-full min-h-[180px] sm:min-h-[220px] md:min-h-[320px] lg:h-[480px]"
              initial={{ clipPath: "inset(15% 15% 15% 15% rounded 1rem)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% rounded 1rem)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <Motion.img
                style={{ scale, y: yParallax }}
                src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770887999/download_1_rzrkhx.jpg"
                alt="MB Prime Architectural Vision"
                className="w-full h-[120%] min-h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
            </Motion.div>
          </Motion.div>

          {/* LEFT: Philosophy content – compact on mobile */}
          <div className="w-[55%] min-w-0 flex flex-col justify-center">
            <Motion.header 
              className="mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-secondary font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif text-primary leading-[1.1] mb-4 sm:mb-6 md:mb-8">
                Exceptional <br />
                <span className="italic font-light text-primary/70">Living by Design</span>
              </h2>
              <div className="w-12 sm:w-24 h-0.5 sm:h-1 bg-secondary/40 rounded-full" />
            </Motion.header>

            <div className="space-y-3 sm:space-y-6 md:space-y-8 max-w-xl">
              <Motion.p
                className="text-slate-600 text-xs sm:text-base md:text-lg lg:text-xl leading-snug sm:leading-relaxed font-sans font-light italic border-l-2 border-secondary/20 pl-3 sm:pl-6"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                "MB Prime develops residential communities where thoughtful planning
                meets everyday life."
              </Motion.p>

              <Motion.p
                className="text-slate-500 text-[11px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed font-sans font-light"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                From villa plots in Srikakulam to emerging residential enclaves in Vizianagaram, 
                every project reflects a commitment to quality, clarity, and long-term value.
              </Motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroPhilosophy;