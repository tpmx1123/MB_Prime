import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const BlurText = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const controls = useAnimation();
  const units = animateBy === 'words' ? text.split(/\s+/) : text.split('');
  const isFromTop = direction === 'top';
  const yOffset = isFromTop ? 12 : -12;

  useEffect(() => {
    const run = async () => {
      await controls.start('visible');
      onAnimationComplete?.();
    };
    const t = setTimeout(run, delay);
    return () => clearTimeout(t);
  }, [controls, delay, onAnimationComplete]);

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.02,
          },
        },
      }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          className={animateBy === 'words' ? 'inline-block mr-[0.25em]' : 'inline-block'}
          variants={{
            hidden: {
              filter: 'blur(10px)',
              opacity: 0,
              y: yOffset,
            },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: 'easeOut' },
            },
          }}
        >
          {unit}
          {animateBy === 'words' && i < units.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
