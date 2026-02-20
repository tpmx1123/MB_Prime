import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import logo from '../assets/mb.png'
import StaggeredMenu from './StaggeredMenu';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname === '/blogs' || location.pathname.startsWith('/blogs/');

  const navItems = [
    { label: 'Home', link: '/' },
    {
      label: 'Our Projects',
      link: '/projects',
      children: [
        { label: 'Projects', link: '/projects' },
        { label: 'MB Prime Villas | Srikakulam', link: '/projects/MB-Prime-Villas' },
        { label: 'MB Prime Enclave | Vizianagaram', link: '/projects/MB-Prime-Enclave' },
        { label: 'Prime Jewel City | Vijayawada', link: '/projects/Prime-Jewel-City' },
        { label: 'Capital West | Vijayawada', link: '/projects/capital-west' },
        { label: 'AI Gen Serenity Villas | Amaravati', link: '/projects/ai-gen-serenity-villas' },
      ],
    },
    { label: 'About MB Prime', link: '/about' },
    { label: 'Founder', link: '/founder' },
    { label: 'Blogs', link: '/blogs' },
    { label: 'Contact', link: '/#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-[1000] py-6 bg-transparent">
      <div className="container flex justify-between items-center">
        {/* Left: logo */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="cursor-pointer flex items-center">
            <img src={logo} alt="MB Prime Logo" className="md:h-18 h-12 w-auto object-contain" loading="lazy" />
          </Link>
        </div>

        {/* Right: call only on blog / blog detail, then menu */}
        <div className="flex items-center gap-2 md:gap-3">
          {isBlogPage && (
            <a
              href="tel:+919088456999"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Call"
            >
              <Phone size={18} className="md:w-5 md:h-5" />
            </a>
          )}
          <StaggeredMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={navItems}
          displaySocials={false}
          displayItemNumbering
          colors={['#000000', '#0b0b0b']}
            accentColor="#c9a227"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
