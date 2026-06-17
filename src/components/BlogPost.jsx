import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion as Motion } from 'framer-motion';
import { Facebook, Twitter, MessageCircle, Linkedin, Link2 } from 'lucide-react';
import { BLOG_POSTS as FALLBACK_POSTS } from '../data/blogs';
import { getBlogBySlug, getBlogs } from '../services/api';
import BlogSidebar from './BlogSidebar';
import NotFound from '../pages/NotFound';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://mbprimeprojects.com').replace(/\/$/, '');
const getReadTime = (body) => {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};
const shareUrl = (slug) => typeof window !== 'undefined' ? `${window.location.origin}/blogs/${slug}` : '';
const shareTitle = (title) => encodeURIComponent(title);
const SocialShare = ({ post }) => {
  const url = shareUrl(post.slug);
  const title = shareTitle(post.title);
  const items = [
    { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: 'Facebook' },
    { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`, label: 'Twitter' },
    { Icon: MessageCircle, href: `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`, label: 'WhatsApp' },
    { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, label: 'LinkedIn' },
    { Icon: Link2, href: url, label: 'Copy link', copy: true },
  ];
  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
  };
  return (
    <div className="flex items-center gap-2">
      {items.map(({ Icon, href, label, copy }) => (
        <span key={label}>
          {copy ? (
            <button
              type="button"
              onClick={handleCopy}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              aria-label={label} >
              <Icon size={18} />
            </button>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              aria-label={label} >
              <Icon size={18} />
            </a>
          )}
        </span>
      ))}
    </div>
  );
};
const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPost(null);
    Promise.all([getBlogBySlug(slug), getBlogs()])
      .then(([single, list]) => {
        if (cancelled) return;
        setPost(single || FALLBACK_POSTS.find((p) => p.slug === slug) || null);
        setAllPosts(Array.isArray(list) && list.length > 0 ? list : FALLBACK_POSTS);
      })
      .catch(() => {
        if (!cancelled) {
          setPost(FALLBACK_POSTS.find((p) => p.slug === slug) || null);
          setAllPosts(FALLBACK_POSTS);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);
  const blogPageTitle = post ? `${post.title} | MB Prime Blogs` : '';

  useLayoutEffect(() => {
    if (blogPageTitle) document.title = blogPageTitle;
  }, [blogPageTitle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-24 flex items-center justify-center">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }
  if (!post) return <NotFound />;
  const readTime = getReadTime(typeof post.body === 'string' ? post.body : '');
  const relatedByCategory = allPosts.filter((p) => p.slug !== slug && (p.category || '') === (post.category || ''));
  let relatedPosts = relatedByCategory.slice(0, 4);
  if (relatedPosts.length < 4) {
    const rest = allPosts.filter((p) => p.slug !== slug && !relatedPosts.find((r) => (r.id || r.slug) === (p.id || p.slug))).slice(0, 4 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...rest];
  }
  const isHtmlBody = typeof post.body === 'string' && (post.body.trim().startsWith('<') || post.body.includes('</'));
  const heroImage = post.carouselImage || post.image || '';
  const postUrl = `${SITE_URL}/blogs/${post.slug}`;
  const description = post.excerpt || (typeof post.body === 'string' ? post.body.slice(0, 160) : '');
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: heroImage || undefined,
    datePublished: post.date || post.createdAt,
    author: { '@type': 'Organization', name: post.author || 'MB Prime Projects' },
    publisher: {
      '@type': 'Organization',
      name: 'MB Prime Projects',
      logo: { '@type': 'ImageObject', url: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1773492165/mb_smwjsa.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Helmet>
        <title>{post.title} | MB Prime Blogs</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        {heroImage && <meta name="twitter:image" content={heroImage} />}
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
              { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
            ],
          })}
        </script>
      </Helmet>
      {/* Full-width hero below header (reference style) */}
      <section className="relative w-full min-h-[45vh] sm:min-h-[50vh] md:min-h-[55vh] pt-16 bg-slate-200">
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt={post.title ? `${post.title} – MB Prime Projects blog` : 'Blog article image'}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : null}
          <div className="absolute inset-0 bg-slate-900/20" aria-hidden />
        </div>
      </section>
      {/* Two columns: left = content, right = sidebar (reference: breadcrumbs + title left, Our Projects right) */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl pt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left: Main content - breadcrumbs, title, meta, body */}
          <div className="flex-1 min-w-0 order-1">
            {/* Breadcrumbs: Category > Title (reference style) */}
            <nav className="text-sm text-slate-500 mb-3" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <span className="mx-2 text-slate-400">›</span>
              <Link to="/blogs" className="hover:text-secondary transition-colors">Blogs</Link>
              <span className="mx-2 text-slate-400">›</span>
              <span className="text-slate-600 line-clamp-1">{post.title}</span>
            </nav>
            <Motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }} >
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.25rem] font-sans font-bold text-slate-900 leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-slate-500 text-sm">{readTime} min read</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 text-sm">{post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '')}</span>
                <div className="flex-1" />
                <SocialShare post={post} />
              </div>
              <div className="prose prose-slate max-w-none">
                {isHtmlBody ? (
                  <div className="text-slate-700 leading-relaxed text-base blog-body" dangerouslySetInnerHTML={{ __html: post.body }} />
                ) : (
                  <p className="text-slate-700 leading-relaxed text-base">{post.body}</p>
                )}
              </div>
            </Motion.article>
          </div>
          {/* Right: Sidebar - Our Projects, Latest Articles, Related (reference style) */}
          <div className="lg:w-[280px] xl:w-[320px] shrink-0 order-2">
            <div className="lg:sticky lg:top-28">
              <BlogSidebar currentSlug={post.slug} relatedPosts={relatedPosts} posts={allPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;