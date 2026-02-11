import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/mb.png';

const Footer = () => {
    return (
        <footer id="contact" className="md:pt-10 pt-6 bg-primary border-t border-white/10">
            <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16 pb-6 md:pb-10">
                <div className="lg:col-span-2">
                    <Link to="/" className="cursor-pointer flex items-center gap-2 mb-4 md:mb-6">
                        <img src={logo} alt="MB Prime Logo" className="md:h-18 h-12 w-auto object-contain" />
                    </Link>
                    <p className="text-textMuted max-w-[350px] mb-4 md:mb-8 leading-relaxed">
                        Redefining luxury living through premium villa plots in urban hubs.
                        Grandeur, Peace, and Nature connected.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-textMuted hover:text-secondary transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-textMuted hover:text-secondary transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-textMuted hover:text-secondary transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-textMuted hover:text-secondary transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-secondary font-sans font-bold uppercase tracking-wider text-sm mb-4 md:mb-6">Quick Links</h4>
                    <ul className="space-y-3">
                        <li><Link to="/" className="text-sm text-white/80 hover:text-secondary transition-colors">Home</Link></li>
                        <li><Link to="/projects" className="text-sm text-white/80 hover:text-secondary transition-colors">Projects</Link></li>
                        <li><Link to="/about" className="text-sm text-white/80 hover:text-secondary transition-colors">About MB Prime</Link></li>
                        <li><Link to="/founder" className="text-sm text-white/80 hover:text-secondary transition-colors">Founder</Link></li>
                        <li><a href="/#investment" className="text-sm text-white/80 hover:text-secondary transition-colors">Investment Perspective</a></li>
                        <li><a href="/#contact" className="text-sm text-white/80 hover:text-secondary transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-secondary font-sans font-bold uppercase tracking-wider text-sm mb-4 md:mb-6">Contact Us</h4>
                    <ul className="space-y-4 md:space-y-6">
                        <li className="flex items-center gap-4 text-sm">
                            <MapPin size={18} className="shrink-0" />
                            <span>Srikakulam, Andhra Pradesh</span>
                        </li>
                        <li className="flex items-center gap-4 text-sm">
                            <Phone size={18} className="shrink-0" />
                            <span>+91 1234567890</span>
                        </li>
                        <li className="flex items-center gap-4 text-sm">
                            <Mail size={18} className="shrink-0" />
                            <span>info@mbprime.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-black/30 py-6 text-center border-t border-white/10">
                <div className="container mx-auto px-8">
                    <p className="text-xs text-textMuted">&copy; 2024 MB Prime Villa Real Estate. All Rights Reserved. | <a href="/seo" className="hover:text-secondary transition-colors">SEO optimized by MB Prime</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
