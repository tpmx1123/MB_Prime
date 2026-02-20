import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { projects } from '../data/projects';
import { BLOG_POSTS as FALLBACK_POSTS } from '../data/blogs';

const BlogSidebar = ({ currentSlug = null, relatedPosts = [], posts = [] }) => {
  const articleList = posts.length > 0 ? posts : FALLBACK_POSTS;
  const latestArticles = articleList.slice(0, 5);
  const displayRelated = relatedPosts.length > 0 ? relatedPosts : articleList.filter((p) => p.slug !== currentSlug).slice(0, 4);

  return (
    <aside className="space-y-8 lg:space-y-10">
      {/* Our Projects */}
      <div>
        <h3 className="text-slate-900 font-bold text-base mb-4">Our Projects</h3>
        <ul className="space-y-3">
          {projects.slice(0, 6).map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <span className="text-slate-700 text-sm font-medium group-hover:text-secondary transition-colors line-clamp-2">
                  {project.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 font-bold text-base">Latest Articles</h3>
          <Link
            to="/blogs"
            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="View more articles"
          >
            <ChevronUp size={16} className="rotate-[-90deg]" />
          </Link>
        </div>
        <ul className="space-y-3">
          {latestArticles.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blogs/${post.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <span className="text-slate-700 text-sm font-medium group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/blogs" className="text-slate-600 text-sm font-medium hover:text-secondary mt-2 inline-block">
          View More
        </Link>
      </div>

      {/* Related to this Article (only when currentSlug is set) */}
      {currentSlug && displayRelated.length > 0 && (
        <div>
          <h3 className="text-slate-900 font-bold text-base mb-4">Related to this Article</h3>
          <ul className="space-y-3">
            {displayRelated.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-slate-700 text-sm font-medium group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;
