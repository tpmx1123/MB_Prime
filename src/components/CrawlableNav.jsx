import React from 'react';
import { Link } from 'react-router-dom';
import { CRAWLABLE_LINKS } from '../config/siteNav';

/**
 * Screen-reader / crawler navigation – links are always in the DOM
 * so search engines can discover all pages without opening the menu.
 */
const CrawlableNav = () => (
  <nav aria-label="Site navigation" className="sr-only">
    <ul>
      {CRAWLABLE_LINKS.map(({ label, link }) => (
        <li key={link}>
          <Link to={link}>{label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default CrawlableNav;
