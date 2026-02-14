import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mb.png'
import StaggeredMenu from './StaggeredMenu';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', link: '/' },
    {
      label: 'Our Projects',
      link: '/projects',
      children: [
        { label: 'Projects', link: '/projects' },
        { label: 'MB Prime Villas | Srikakulam', link: '/projects/villas' },
        { label: 'MB Prime Enclave | Vizianagaram', link: '/projects/enclave' },
        { label: 'Jewel City | Vizag', link: '/projects/jewelcity' },
        { label: 'Capital West | Vijayawada', link: '/projects/capital-west' },
        { label: 'AI Gen Villas | Guntur', link: '/projects/ai-gen-villas' },
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
