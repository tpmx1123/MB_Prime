import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout & UI (always loaded for shell)
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import EnquiryPopup from './components/EnquiryPopup';

// Lazy-loaded pages – only the active route chunk is loaded
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./components/Projects'));
const MBPrimeVillas = lazy(() => import('./components/MBPrimeVillas'));
const JewelCity = lazy(() => import('./components/jewelcity'));
const MBPrimeEnclave = lazy(() => import('./components/MBPrimeEnclave'));
const CapitalWest = lazy(() => import('./components/CapitalWest'));
const AIGenVillas = lazy(() => import('./components/AIGenVillas'));
const AboutMBPrime = lazy(() => import('./components/AboutMBPrime'));
const Founder = lazy(() => import('./components/Founder'));
const Blogs = lazy(() => import('./components/Blogs'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminForgotPassword = lazy(() => import('./components/admin/AdminForgotPassword'));
const AdminResetPassword = lazy(() => import('./components/admin/AdminResetPassword'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminBlogs = lazy(() => import('./components/admin/AdminBlogs'));
const AdminBlogEdit = lazy(() => import('./components/admin/AdminBlogEdit'));

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
};

/**
 * Full-screen fallback while a lazy-loaded page chunk is loading.
 * No header or footer – takes entire viewport.
 */
const FullScreenLoader = () => (
  <div className="fixed inset-0 z-[9999] min-h-screen w-full flex items-center justify-center bg-slate-100">
    <style>{`
      @keyframes page-loader-fade {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes page-loader-bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
      }
      @keyframes page-loader-spin {
        to { transform: rotate(360deg); }
      }
      .page-loader-outer {
        animation: page-loader-spin 1.2s linear infinite;
      }
      .page-loader-inner {
        animation: page-loader-spin 0.8s linear infinite reverse;
      }
      .page-loader-dot {
        animation: page-loader-bounce 1.4s ease-in-out infinite both;
      }
      .page-loader-dot:nth-child(1) { animation-delay: 0s; }
      .page-loader-dot:nth-child(2) { animation-delay: 0.16s; }
      .page-loader-dot:nth-child(3) { animation-delay: 0.32s; }
    `}</style>
    <div
      className="flex flex-col items-center gap-6"
      style={{ animation: 'page-loader-fade 0.4s ease-out' }}
    >
      {/* Dual ring spinner */}
      <div className="relative w-14 h-14">
        <div
          className="page-loader-outer absolute inset-0 rounded-full border-2 border-transparent border-t-primary/80"
          style={{ borderRightColor: 'transparent' }}
        />
        <div
          className="page-loader-inner absolute inset-2 rounded-full border-2 border-transparent border-b-secondary/80"
          style={{ borderLeftColor: 'transparent' }}
        />
      </div>
      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        <span className="page-loader-dot w-2 h-2 rounded-full bg-primary" />
        <span className="page-loader-dot w-2 h-2 rounded-full bg-primary" />
        <span className="page-loader-dot w-2 h-2 rounded-full bg-primary" />
      </div>
      <p className="text-slate-500 text-sm font-medium tracking-wide">Loading…</p>
    </div>
  </div>
);

/**
 * Conditional Header Logic: Hides Header on Project Detail pages
 */
const AppContent = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname.split('/').length > 2;
  const isAdminRoute = location.pathname === '/admin-login' || location.pathname === '/admin' ||
    location.pathname.startsWith('/admin/') ||
    location.pathname === '/admin-forgot-password' || location.pathname === '/admin-reset-password';

  return (
    <>
      {!isProjectDetail && !isAdminRoute && <Header />}
    </>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  if (location.pathname === '/admin-login' || location.pathname === '/admin' ||
    location.pathname.startsWith('/admin/') ||
    location.pathname === '/admin-forgot-password' || location.pathname === '/admin-reset-password') return null;
  return <Footer />;
};

const EnquiryPopupWrapper = () => {
  const location = useLocation();
  if (location.pathname === '/admin-login' || location.pathname === '/admin' ||
    location.pathname.startsWith('/admin/') ||
    location.pathname === '/admin-forgot-password' || location.pathname === '/admin-reset-password') return null;
  return <EnquiryPopup />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <EnquiryPopupWrapper />
      <Suspense fallback={<FullScreenLoader />}>
        <div className="app min-h-screen selection:bg-secondary selection:text-primary">
          <SEO />
          <AppContent />
          <main>
            <Routes>
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
              <Route path="/admin-reset-password" element={<AdminResetPassword />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/blogs/new" element={<AdminBlogEdit />} />
              <Route path="/admin/blogs/edit/:id" element={<AdminBlogEdit />} />
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/MB-Prime-Villas" element={<MBPrimeVillas />} />
              <Route path="/projects/Prime-Jewel-City" element={<JewelCity />} />
              <Route path="/projects/MB-Prime-Enclave" element={<MBPrimeEnclave />} />
              <Route path="/projects/Capital-West" element={<CapitalWest />} />
              <Route path="/projects/ai-gen-serenity-villas" element={<AIGenVillas />} />
              <Route path="/about" element={<AboutMBPrime asPage />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <FooterWrapper />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
