import { buildFAQPage } from '../utils/schema';
import { useJsonLd } from '../hooks/useJsonLd';

/**
 * FAQPage JSON-LD – question/answer text must match visible FAQ content on the page.
 * @param {{ question: string, answer: string }[]} faqs
 */
const FAQSchema = ({ faqs, schemaId = 'faq-page-schema' }) => {
  if (!faqs?.length) return null;

  useJsonLd(schemaId, buildFAQPage(faqs));

  return null;
};

export default FAQSchema;
