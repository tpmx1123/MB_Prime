import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import IntroPhilosophy from './components/IntroPhilosophy'
import FeaturedProjectsHome from './components/FeaturedProjectsHome'
import Commitments from './components/Commitments'
import InvestmentPerspective from './components/InvestmentPerspective'
import Projects from './components/Projects'
import Location from './components/Location'
import Footer from './components/Footer'
import SEO from './components/SEO'
import EnquiryPopup from './components/EnquiryPopup'
import Founder from './components/Founder'
import AboutMBPrime from './components/AboutMBPrime'
import ProjectDetail from './components/ProjectDetail'
import FounderSection from './components/FounderSection'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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

    // Immediate attempt
    scrollToElement();

    // Delayed attempt for route transitions
    const timer = setTimeout(scrollToElement, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <EnquiryPopup />
      <div className="app">
        <SEO />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
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
