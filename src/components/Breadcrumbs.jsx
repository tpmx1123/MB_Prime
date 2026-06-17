import React from 'react';
import { Link } from 'react-router-dom';
import { useJsonLd } from '../hooks/useJsonLd';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://mbprimeprojects.com').replace(/\/$/, '');

/**
 * @param {{ items: { label: string, link?: string }[] }} props
 * items: last item may omit link (current page)
 */
const Breadcrumbs = ({ items, className = '' }) => {
  const schema = items?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          ...(item.link ? { item: `${SITE_URL}${item.link}` } : {}),
        })),
      }
    : null;

  useJsonLd(
    items?.length ? `breadcrumb-${items.map((i) => i.label).join('-')}` : 'breadcrumb-empty',
    schema
  );

  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 && <span className="text-white/40" aria-hidden>/</span>}
                {item.link && !isLast ? (
                  <Link to={item.link} className="text-white/70 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-white/90 font-medium' : 'text-white/70'} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
  );
};

export default Breadcrumbs;
