import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getProjectFaqs } from '../data/projectFaqs';
import FAQSchema from './FAQSchema';

const ProjectFAQ = ({ project }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = getProjectFaqs(project?.slug);

  if (!faqs.length) return null;

  const projectName = project?.name?.trim() || 'this project';

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#faf9f6] border-t border-slate-100 scroll-mt-24">
      <FAQSchema faqs={faqs} schemaId={`faq-${project.slug}`} />

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <Motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[#801C4E] font-sans font-bold text-xs uppercase tracking-[0.3em] mb-3">
            Got Questions?
          </span>
          <h2 className="text-2xl md:text-4xl font-sans font-bold text-primary leading-tight mb-4">
            {projectName} — Frequently Asked{' '}
            <span className="italic font-light text-primary/70">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-[#801C4E]/50 mx-auto rounded-full" />
        </Motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  id={`project-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`project-faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left hover:bg-slate-50/80 transition-colors"
                >
                  <h3 className="text-sm md:text-base font-sans font-bold text-primary leading-snug pr-2">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#801C4E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`project-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`project-faq-question-${index}`}
                  className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-5 md:pb-6 max-h-[500px]' : 'max-h-0'}`}
                >
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans font-light border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </Motion.div>
            );
          })}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8 font-sans">
          Still have questions about {projectName}?{' '}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { formType: 'enquiry' } }))
            }
            className="text-[#801C4E] font-semibold hover:underline"
          >
            Enquire now
          </button>
        </p>
      </div>
    </section>
  );
};

export default ProjectFAQ;
