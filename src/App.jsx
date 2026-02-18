import React, { useEffect } from 'react'
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
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

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
  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname.split('/').length > 2;
  const isAdminRoute = location.pathname === '/admin-login' || location.pathname === '/admin';

  return (
    <>
      {!isProjectDetail && !isAdminRoute && <Header />}
    </>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  if (location.pathname === '/admin-login' || location.pathname === '/admin') return null;
  return <Footer />;
};

/**
 * Main App Entry Point
 */
const EnquiryPopupWrapper = () => {
  const location = useLocation();
  if (location.pathname === '/admin-login' || location.pathname === '/admin') return null;
  return <EnquiryPopup />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <EnquiryPopupWrapper />
      <div className="app min-h-screen selection:bg-secondary selection:text-primary">
        <SEO />
        <AppContent />
        <main>
          <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/MB-Prime-Villas" element={<MBPrimeVillas />} />
            <Route path="/projects/Prime-Jewel-City" element={<JewelCity />} />
            <Route path="/projects/MB-Prime-Enclave" element={<MBPrimeEnclave />} />
            <Route path="/projects/Capital-West" element={<CapitalWest />} />
            <Route path="/projects/ai-gen-serenity-villas" element={<AIGenVillas />} />
            <Route path="/about" element={<AboutMBPrime asPage />} />
            <Route path="/founder" element={<Founder />} />
          </Routes>
        </main>
        <FooterWrapper />
      </div>
    </Router>
  )
}

export default App