import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

const ProjectHeader = ({ project }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Default to main logo if project specific logo is missing
    // In real implementation, project.logo would be a URL
    // We can use a text fallback if no image is available for now

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const navLinks = [
        { id: 'plots', label: 'Plots' },
        { id: 'layout', label: 'Layout' },
        { id: 'location', label: 'Location' },
        { id: 'amenities', label: 'Amenities' },
        { id: 'other-projects', label: 'Other Projects' }
    ];

    return (
        <header className="absolute top-0 left-0 w-full z-[1000] py-4 md:py-6 bg-transparent">
            <div className="container flex justify-between items-center">
                {/* Left: Project Logo or Name */}
                <div className="flex items-center ">
                    <Link to="/projects" className="text-white/80 hover:text-white transition-colors mr-2">
                        <ArrowLeft size={22} />
                    </Link>
                    {project.logo ? (
                        <img
                            src={project.logo}
                            alt={`${project.name} Logo`}
                            className="h-12 md:h-18 w-auto object-contain"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold text-white font-sans tracking-wide">
                            {project.name}
                        </h2>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => scrollToSection('plots')}
                        className="text-white/90 font-sans font-medium text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                        Plots
                    </button>
                    <button
                        onClick={() => scrollToSection('layout')}
                        className="text-white/90 font-sans font-medium text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                        Layout
                    </button>
                    <button
                        onClick={() => scrollToSection('location')}
                        className="text-white/90 font-sans font-medium text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                        Location
                    </button>
                    <button
                        onClick={() => scrollToSection('amenities')}
                        className="text-white/90 font-sans font-medium text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                        Amenities
                    </button>
                    <button
                        onClick={() => scrollToSection('other-projects')}
                        className="text-white/90 font-sans font-medium text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                        Other Projects
                    </button>
                </nav>

                {/* Mobile Menu Button - Simple implementation for now */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="space-y-2">
                        <span className={`block w-8 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 bg-primary/95 z-[1001] flex flex-col items-center justify-center p-8"
                        >
                            <motion.button
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ delay: 0.1 }}
                                className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={32} strokeWidth={1.5} />
                            </motion.button>

                            <div className="w-full max-w-xs space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-12 border-b border-white/10 pb-6 text-center"
                                >
                                    <p className="text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Explore Project</p>
                                    <h3 className="text-white text-2xl font-serif font-bold italic">{project.name}</h3>
                                </motion.div>

                                <div className="flex flex-col gap-6">
                                    {navLinks.map((link, idx) => (
                                        <motion.button
                                            key={link.id}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                                            onClick={() => scrollToSection(link.id)}
                                            className="group flex items-center gap-6 w-full text-left"
                                        >
                                            <span className="text-secondary/40 font-serif italic text-lg group-hover:text-secondary transition-colors duration-300">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-white text-2xl md:text-3xl font-sans font-bold uppercase tracking-widest group-hover:text-secondary group-hover:translate-x-2 transition-all duration-300">
                                                {link.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default ProjectHeader;
