import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout & UI Components
import Header from './components/Header'
import Footer from './components/Footer'
import SEO from './components/SEO'
import EnquiryPopup from './components/EnquiryPopup'

// Page & Section Components
import Hero from './components/Hero'
import IntroPhilosophy from './components/IntroPhilosophy'
import FeaturedProjectsHome from './components/FeaturedProjectsHome'
import Commitments from './components/Commitments'
import InvestmentPerspective from './components/InvestmentPerspective'
import Projects from './components/Projects'
import Location from './components/Location'
import Founder from './components/Founder'
import AboutMBPrime from './components/AboutMBPrime'
import MBPrimeEnclave from './components/MBPrimeEnclave'
import JewelCity from './components/jewelcity'
import FounderSection from './components/FounderSection'
import MBPrimeVillas from './components/MBPrimeVillas'
import AIGenVillas from './components/AIGenVillas'
import CapitalWest from './components/CapitalWest'

/**
 * Handles smooth scrolling to hash anchors or top of page on route change
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToElement = () => {
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    scrollToElement();
    const timer = setTimeout(scrollToElement, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

/**
 * Home Page Layout
 */
const Home = () => (
  <>
    <Hero />
    <IntroPhilosophy />
    <FeaturedProjectsHome />
    <Commitments />
    <FounderSection />
    <InvestmentPerspective />
    <Location />
 
  </>
)

/**
 * Conditional Header Logic: Hides Header on Project Detail pages
 */
const AppContent = () => {
  const location = useLocation();
  // Checks if the current path is a specific project detail (e.g., /projects/villas)
  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname.split('/').length > 2;

  return (
    <>
      {!isProjectDetail && <Header />}
    </>
  );
};

/**
 * Main App Entry Point
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <EnquiryPopup />
      <div className="app min-h-screen selection:bg-secondary selection:text-primary">
        <SEO />
        {/* Conditional Header Rendering */}
        <AppContent />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/villas" element={<MBPrimeVillas />} />
            <Route path="/projects/vizag" element={<JewelCity />} />
            <Route path="/projects/enclave" element={<MBPrimeEnclave />} />
            <Route path="/projects/capital-west" element={<CapitalWest />} />
            <Route path="/projects/ai-gen-villas" element={<AIGenVillas />} />
            <Route path="/about" element={<AboutMBPrime asPage />} />
            <Route path="/founder" element={<Founder />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App