import FAQSchema from './FAQSchema';
import { getProjectFaqs } from '../data/projectFaqs';

/** @deprecated Use ProjectFAQ component – kept for existing imports */
export function ProjectFAQSchema({ faqs, schemaId }) {
  return <FAQSchema faqs={faqs} schemaId={schemaId} />;
}

export function projectFaqsFromData(project) {
  if (!project) return [];
  return getProjectFaqs(project.slug);
}

export { SITE_URL } from '../utils/schema';
