import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NOT_FOUND_TITLE = 'Page Not Found | MB Prime Projects';

const NotFound = () => {
  useLayoutEffect(() => {
    document.title = NOT_FOUND_TITLE;
  }, []);

  return (
  <>
    <Helmet>
      <title>{NOT_FOUND_TITLE}</title>
      <meta name="description" content="The page you are looking for could not be found on MB Prime Projects." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <div className="min-h-screen bg-white text-primary flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <p className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-slate-600 max-w-md mb-8">
        The page you requested does not exist or may have been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary hover:text-primary transition-colors">
          Back to Home
        </Link>
        <Link to="/projects" className="px-6 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">
          View Projects
        </Link>
        <Link to="/contact-us" className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-full hover:border-primary transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  </>
  );
};

export default NotFound;
