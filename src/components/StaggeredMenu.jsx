import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Menu, ChevronDown } from 'lucide-react';
import logo from '../assets/mb.png';

const StaggeredMenu = ({ isOpen, setIsOpen, items, displayItemNumbering }) => {
  const [showProjects, setShowProjects] = useState(false);

  const menuVariants = {
    closed: { x: '100%', transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] } },
    opened: { x: 0, transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] } }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[1001] p-2.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 transition-colors flex items-center justify-center shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} className="text-white shrink-0" /> : <Menu size={24} className="text-white shrink-0" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[1999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 z-[2000] w-full md:w-[35vw] bg-[#0A0A0A] text-white p-6 md:p-10 flex flex-col shadow-2xl no-scrollbar"
          >
            <div className="flex justify-between items-center mb-5">
              <img src={logo} alt="MB Prime" className="h-10 md:h-12 w-auto" loading="lazy" />
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} className="text-secondary" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto no-scrollbar">
              <ul className="space-y-6">
                {items.map((item, index) => (
                  <li key={item.label} className="group">
                    <div className="flex items-center gap-4">
                      {/* Removed the numbering span here */}
                      
                      {item.children ? (
                        <div className="flex flex-col w-full">
                          <button 
                            onClick={() => setShowProjects(!showProjects)}
                            className="flex items-center justify-between w-full text-2xl md:text-3xl font-serif text-left group-hover:text-secondary transition-colors"
                          >
                            {item.label}
                            <motion.div animate={{ rotate: showProjects ? 180 : 0 }}>
                              <ChevronDown size={20} className="text-secondary/50" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {showProjects && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 ml-2 space-y-3 border-l border-secondary/20 pl-4"
                              >
                                {item.children.map((child) => (
                                  <motion.li key={child.label}>
                                    <Link 
                                      to={child.link} 
                                      onClick={() => setIsOpen(false)}
                                      className="text-base md:text-lg font-light text-white/60 hover:text-secondary transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link 
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="text-2xl md:text-3xl font-serif group-hover:text-secondary transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 pt-4">
              <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em] mb-1">Inquiries</p>
              <p className="text-white/40 text-xs">mbprimeprojects@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;