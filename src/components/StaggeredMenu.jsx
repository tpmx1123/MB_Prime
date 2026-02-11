import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaggeredMenu = ({
  isOpen,
  setIsOpen,
  position = 'right',
  items = [],
  displaySocials = false,
  displayItemNumbering = true,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#ffffff',
  changeMenuColorOnOpen = true,
  colors = ['#000000', '#000000'],
  logoUrl,
  accentColor = '#FFD700',
}) => {
  const handleToggle = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: position === 'right' ? '100%' : '-100%',
    },
    open: {
      x: 0,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* MENU BUTTON */}
      <button
        onClick={handleToggle}
        className="relative z-[1001]"
      >
        {isOpen ? (
          <X size={26} color="#fff" />
        ) : (
          <Menu size={26} color="#fff" />
        )}
      </button>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[999]"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* MENU PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 right-0 h-full w-80 z-[1000] p-8"
            style={{
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* LOGO */}
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-14 mb-10" />
            )}

            {/* MENU ITEMS */}
            <ul className="space-y-4">
              {items.map((item, index) => (
                <motion.li key={item.label + index} variants={itemVariants} className="space-y-1">
                  {item.children ? (
                    <>
                      <Link
                        to={item.link || '#'}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 text-white/90 text-sm font-bold uppercase tracking-wider hover:text-white"
                      >
                        {displayItemNumbering && (
                          <span className="text-lg font-bold" style={{ color: accentColor }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        )}
                        {item.label}
                      </Link>
                      <ul className="pl-8 space-y-2 border-l-2 border-white/20 ml-2">
                        {item.children.map((sub) => (
                          <motion.li key={sub.label} variants={itemVariants}>
                            {sub.link?.startsWith('/') && !sub.link.includes('#') ? (
                              <Link
                                to={sub.link}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 text-white/80 text-base hover:text-white hover:pl-1 transition-all"
                              >
                                <span className="text-secondary/80">–</span>
                                {sub.label}
                              </Link>
                            ) : (
                              <a
                                href={sub.link}
                                download={Boolean(sub.download)}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 text-white/80 text-base hover:text-white hover:pl-1 transition-all"
                              >
                                <span className="text-secondary/80">–</span>
                                {sub.label}
                              </a>
                            )}
                          </motion.li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      {item.link?.startsWith('/') && !item.link.includes('#') ? (
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 text-white text-lg hover:text-white/90"
                        >
                          {displayItemNumbering && (
                            <span className="text-xl font-bold" style={{ color: accentColor }}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          )}
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.link}
                          download={Boolean(item.download)}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 text-white text-lg hover:text-white/90"
                        >
                          {displayItemNumbering && (
                            <span className="text-xl font-bold" style={{ color: accentColor }}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          )}
                          {item.label}
                        </a>
                      )}
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;