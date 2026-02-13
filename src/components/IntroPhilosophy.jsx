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
      className="py-4 md:py-10 lg:py-16 px-3 sm:px-4 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-0 sm:px-4 relative z-10">
        {/* Mobile: Stacked layout, Desktop: Side-by-side */}
        <div className="flex flex-col lg:flex-row-reverse items-stretch gap-4 sm:gap-6 lg:gap-20">
          
          {/* RIGHT: Image - Full width on mobile, half on desktop */}
          <Motion.div 
            className="w-full lg:w-1/2 relative order-2 lg:order-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Motion.div 
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl h-full min-h-[200px] sm:min-h-[280px] md:min-h-[400px] lg:h-[480px]"
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

          {/* LEFT: Content - Full width on mobile, half on desktop */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center">
            <Motion.header 
              className="mb-3 sm:mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-secondary font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1 sm:mb-4">
                Our Philosophy
              </span>
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-serif text-primary leading-tight mb-2 sm:mb-4 lg:mb-8">
                Exceptional <br />
                <span className="italic font-light text-primary/70">Living by Design</span>
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-secondary/40 rounded-full" />
            </Motion.header>

            <div className="space-y-3 sm:space-y-6 lg:space-y-8 max-w-none sm:max-w-xl lg:max-w-md ">
              <Motion.p
                className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl leading-snug sm:leading-relaxed font-sans font-light italic"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                "We build residential communities where thoughtful planning meets everyday life"
              </Motion.p>

              <Motion.p
                className="text-slate-500 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed font-sans font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                From villa plots in Srikakulam to residential communities in Vizianagaram - every project reflects one commitment: quality that lasts, value that compounds, and transparency you can count on.
              </Motion.p>

             
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroPhilosophy;