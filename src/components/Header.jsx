import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mb.png'
import StaggeredMenu from './StaggeredMenu';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', link: '/' },
    {
      label: 'Projects',
      link: '/projects',
      children: [
        { label: 'MB Prime Villas | Srikakulam', link: '/projects/villas' },
        { label: 'MB Prime Enclave | Vizianagaram', link: '/projects/enclave' },
        { label: 'Vijayawada Project | Vijayawada', link: '/projects/vijayawada' },
        { label: 'Capital West', link: '/projects/capital-west' },
        { label: 'AI Gen Villas', link: '/projects/ai-gen-villas' },
      ],
    },
    { label: 'About MB Prime', link: '/about' },
    { label: 'Founder', link: '/founder' },
    { label: 'Investment Perspective', link: '/#investment' },
    { label: 'Contact', link: '/#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-[1000] py-6 bg-transparent">
      <div className="container flex justify-between items-center">
        {/* Left: logos only */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="cursor-pointer flex items-center">
            <img src={logo} alt="MB Prime Logo" className="md:h-18 h-12 w-auto object-contain" />
          </Link>
          <div className="h-8 md:h-12 w-[1px] bg-white/20" />
          <Link to="/projects" className="cursor-pointer flex items-center">
            <img
              src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770526685/sklmlogo_c2trtg.png"
              alt="Srikakulam Project Logo"
              className="md:h-18 h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right: menu icon only (animated stagger menu) */}
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
    </header>
  );
};

export default Header;
