import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/mb.png';
import { MAIN_NAV_LINKS, PROJECT_NAV_LINKS, FOOTER_LEGAL_LINKS } from '../config/siteNav';
import { brandLogoAlt } from '../utils/imageAlt';
import InstagramFeed from './InstagramFeed';

const Footer = () => {
    const developments = PROJECT_NAV_LINKS;

    return (
        <footer className="md:pt-16 pt-12 bg-[#0A0A0A] border-t border-white/10 text-white">
            <div className="container mx-auto px-4">                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="cursor-pointer flex items-center mb-6">
                            <img src={logo} alt={brandLogoAlt()} className="md:h-16 h-10 w-auto object-contain" loading="lazy" />
                        </Link>
                        <p className="text-white/50 max-w-[300px] mb-8 leading-relaxed text-xs md:text-sm italic">
                            "Exceptional Living by Design." Redefining luxury through thoughtful planning and premium developments.
                        </p>
                        <InstagramFeed />
                    </div>

                    {/* 2. QUICK LINKS */}
                    <div className="col-span-1">
                        <h4 className="text-secondary font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-6 md:mb-8">Navigation</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {MAIN_NAV_LINKS.map((item) => (
                                <li key={item.link}>
                                    <Link to={item.link} className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">
                                        {item.label === 'Founder' ? 'The Founder' : item.label}
                                    </Link>
                                </li>
                            ))}
                            {FOOTER_LEGAL_LINKS.map((item) => (
                                <li key={item.link}>
                                    <Link to={item.link} className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. PROJECTS */}
                    <div className="col-span-1">
                        <h4 className="text-secondary font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-6 md:mb-8"> Our Projects</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {developments.map((project) => (
                                <li key={project.label}>
                                    <Link to={project.link} className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors block">
                                        {project.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. CONTACT INFO - Full width on small mobile for better spacing */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <h4 className="text-secondary font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-6 md:mb-8">Inquiries</h4>
                        <ul className="space-y-4 md:space-y-6">
                            <li className="flex items-start gap-3 md:gap-4 text-[11px] md:text-sm text-white/60">
                                <MapPin size={16} className="shrink-0 text-secondary/60 mt-0.5" />
                                <a
                                    href="https://www.google.com/maps?ll=18.359786,83.919487&z=17&t=h&hl=en&gl=IN&mapclient=embed&cid=10202326742356573612"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-secondary transition-colors"
                                >
                                    GEMS HOSPITAL ROAD, Srikakulam, Silagamsingivalasa, Andhra Pradesh 532484
                                </a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-[11px] md:text-sm text-white/60">
                                <Phone size={16} className="shrink-0 text-secondary/60" />
                                <a href="tel:+919088456999" className="hover:text-secondary transition-colors">
                                    +91 9088456 999
                                </a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-[11px] md:text-sm text-white/60">
                                <Mail size={16} className="shrink-0 text-secondary/60" />
                                <a href="mailto:mbprimeprojects@gmail.com" className="hover:text-secondary transition-colors">
                                    mbprimeprojects@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT BAR */}
            <div className="bg-black py-6 md:py-8 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white leading-relaxed">
                        &copy; {new Date().getFullYear()} MB Prime Projects. All Rights Reserved. <br className="md:hidden" />
                        <span className="hidden md:inline"> | </span> 
                        <span className="text-white/60"> We Create Landmarks</span>
                    </p>
                </div>
            </div>  
        </footer>
    );
};

export default Footer;