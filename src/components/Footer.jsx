import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/mb.png';

const Footer = () => {
    const developments = [
        { label: 'MB Prime Villas | Srikakulam', link: '/projects/MB-Prime-Villas' },
        { label: 'MB Prime Enclave | Vizianagaram', link: '/projects/MB-Prime-Enclave' },
        { label: 'Prime Jewel City | Vijayawada', link: '/projects/Prime-Jewel-City' },
        { label: 'Capital West | Vijayawada', link: '/projects/capital-west' },
        { label: 'AI Gen Serenity Villas | Amaravati', link: '/projects/AI-Gen-Serenity-Villas' },
    ];

    return (
        <footer id="contact" className="md:pt-16 pt-12 bg-[#0A0A0A] border-t border-white/10 text-white">
            <div className="container mx-auto px-4">                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="cursor-pointer flex items-center mb-6">
                            <img src={logo} alt="MB Prime Logo" className="md:h-16 h-10 w-auto object-contain" loading="lazy" />
                        </Link>
                        <p className="text-white/50 max-w-[300px] mb-8 leading-relaxed text-xs md:text-sm italic">
                            "Exceptional Living by Design." Redefining luxury through thoughtful planning and premium developments.
                        </p>
                        <div className="flex gap-4 md:gap-5">
                            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all"><Facebook size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all"><Instagram size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all"><Twitter size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all"><Linkedin size={14} /></a>
                        </div>
                    </div>

                    {/* 2. QUICK LINKS */}
                    <div className="col-span-1">
                        <h4 className="text-secondary font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-6 md:mb-8">Navigation</h4>
                        <ul className="space-y-3 md:space-y-4">
                            <li><Link to="/" className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link to="/founder" className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">The Founder</Link></li>
                            <li><a href="/blogs" className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">Blogs</a></li>
                            <li><a href="/#contact" className="text-[11px] md:text-sm text-white/60 hover:text-white transition-colors">Contact Us</a></li>
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
                                    href="https://www.google.com/maps/search/?api=1&query=Vijayawada%2C+Andhra+Pradesh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-secondary transition-colors"
                                >
                                    Vijayawada, Andhra Pradesh.
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