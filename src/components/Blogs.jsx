import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { BLOG_POSTS as FALLBACK_POSTS } from '../data/blogs';
import { getBlogs } from '../services/api';

// Placeholder when blog has no image/carouselImage or when image fails to load
const CAROUSEL_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><rect fill="#334155" width="1200" height="600"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="24">No image</text></svg>'
);

const matchQuery = (post, q) => {
  const lower = q.toLowerCase().trim();
  if (!lower) return true;
  const title = (post.title || '').toLowerCase();
  const category = (post.category || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const author = (post.author || '').toLowerCase();
  return title.includes(lower) || category.includes(lower) || excerpt.includes(lower) || author.includes(lower);
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hintsOpen, setHintsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getBlogs()
      .then((data) => { if (!cancelled) setPosts(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setPosts(FALLBACK_POSTS); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const carouselSlides = useMemo(() => posts.slice(0, 4), [posts]);
  const filteredPosts = useMemo(
    () => (searchQuery.trim() ? posts.filter((p) => matchQuery(p, searchQuery)) : posts),
    [posts, searchQuery]
  );
  const searchHints = useMemo(
    () => (searchQuery.trim() ? posts.filter((p) => matchQuery(p, searchQuery)).slice(0, 6) : []),
    [posts, searchQuery]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setHintsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (carouselSlides.length === 0) return;
    const t = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [carouselSlides.length]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const displayCarousel = carouselSlides.length > 0 ? carouselSlides : FALLBACK_POSTS.slice(0, 4);
  const displayFiltered = searchQuery.trim() ? filteredPosts : (posts.length > 0 ? posts : FALLBACK_POSTS);

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-24 flex items-center justify-center">
        <p className="text-slate-500">Loading blogs…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero carousel - full width, clickable to article */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <img
                src={
                  (displayCarousel[carouselIndex]?.carouselImage || displayCarousel[carouselIndex]?.image) || CAROUSEL_PLACEHOLDER
                }
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  if (e.target.src !== CAROUSEL_PLACEHOLDER) e.target.src = CAROUSEL_PLACEHOLDER;
                }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 container flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] px-4 md:px-6">
          <Link
            to={`/blogs/${displayCarousel[carouselIndex]?.slug ?? ''}`}
            className="block w-full max-w-4xl text-center group"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white leading-tight mb-6 group-hover:text-secondary transition-colors">
              {displayCarousel[carouselIndex]?.title ?? ''}
            </h2>
            <span className="inline-block text-white/90 font-semibold tracking-widest uppercase text-sm border border-white/40 px-6 py-2 rounded group-hover:border-secondary group-hover:text-secondary transition-colors">
              Read more
            </span>
          </Link>
        </div>

        {/* Carousel arrows */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCarouselIndex((i) => (i - 1 + displayCarousel.length) % displayCarousel.length); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCarouselIndex((i) => (i + 1) % displayCarousel.length); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {displayCarousel.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCarouselIndex(i); }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === carouselIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="pt-12 pb-16" role="region" aria-label="Blog list">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 md:mb-14"
            >
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-2">Insights</span>
              <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900">Blogs</h1>
              <div className="w-14 h-0.5 bg-secondary/40 mt-3 rounded-full" />
            </motion.div>

            {/* Search bar with hints - top of cards */}
            <div className="relative mb-8" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHintsOpen(true);
                  }}
                  onFocus={() => searchQuery.trim() && setHintsOpen(true)}
                  placeholder="Search articles by title, category, or keyword..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-secondary/30 focus:border-secondary text-slate-900 placeholder-slate-400 transition-colors"
                  aria-label="Search articles"
                  aria-autocomplete="list"
                  aria-expanded={hintsOpen && searchHints.length > 0}
                />
              </div>
              {hintsOpen && searchHints.length > 0 && (
                <ul
                  className="absolute left-0 right-0 top-full mt-1 py-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto"
                  role="listbox"
                >
                  {searchHints.map((post) => (
                    <li key={post.id} role="option">
                      <Link
                        to={`/blogs/${post.slug}`}
                        onClick={() => { setSearchQuery(''); setHintsOpen(false); }}
                        className="flex flex-col gap-0.5 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-slate-900 text-sm">{post.title}</span>
                        <span className="text-xs text-slate-500">{post.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery.trim() && searchHints.length === 0 && (
                <p className="absolute left-0 right-0 top-full mt-2 text-sm text-slate-500">No articles match your search.</p>
              )}
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayFiltered.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  className="group rounded-xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-shadow bg-white"
                >
                  <Link to={`/blogs/${post.slug}`} className="block">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-200">
                      <img
                        src={(post.image || post.carouselImage) || CAROUSEL_PLACEHOLDER}
                        alt={post.title || ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          if (e.target.src !== CAROUSEL_PLACEHOLDER) e.target.src = CAROUSEL_PLACEHOLDER;
                        }}
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-slate-500 text-xs mb-1">{post.date}</p>
                      <p className="text-secondary font-semibold text-xs mb-2">{post.category}</p>
                      <h3 className="font-sans font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default Blogs;
