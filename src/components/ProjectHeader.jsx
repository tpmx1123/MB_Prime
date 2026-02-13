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
                    <div className="space-y-1">
                        <span className={`block w-4 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block w-4 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-4 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/60 z-[1001] backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Drawer Menu */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-primary z-[1002] flex flex-col p-8 shadow-2xl border-l border-white/10"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-6 left-6"
                                >
                                    {project.logo ? (
                                        <img
                                            src={project.logo}
                                            alt={`${project.name} Logo`}
                                            className="h-12 w-auto object-contain"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-lg">{project.name}</span>
                                    )}
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X size={24} strokeWidth={1.5} />
                                </motion.button>

                                <div className="mt-24 w-full flex flex-col gap-6">
                                    {navLinks.map((link, idx) => (
                                        <motion.button
                                            key={link.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            onClick={() => scrollToSection(link.id)}
                                            className="group flex items-center gap-4 w-full text-left py-2 border-b border-white/5"
                                        >
                                            <span className="text-white text-base md:text-lg font-sans font-bold uppercase tracking-widest group-hover:text-secondary group-hover:translate-x-2 transition-all duration-300">
                                                {link.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-auto pt-8 border-t border-white/10"
                                >
                                    <p className="text-white/40 text-xs text-center font-sans tracking-widest uppercase">
                                        MB Prime Properties
                                    </p>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default ProjectHeader;