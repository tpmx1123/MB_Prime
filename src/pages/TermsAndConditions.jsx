import React from 'react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using www.mbprimeprojects.com ("Website"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please discontinue use immediately. MB Prime Projects reserves the right to update these Terms at any time; continued use constitutes acceptance of any revisions.',
    ],
  },
  {
    title: '2. About MB Prime Projects',
    content: [
      'MB Prime Projects is a real estate and construction company dedicated to creating landmark residential and commercial developments in Andhra Pradesh. Our Website provides information about our projects and services for general informational purposes only.',
    ],
  },
  {
    title: '3. Permitted Use of Website',
    content: ['You agree to use this Website only for lawful purposes. You must not:'],
    bullets: [
      'Violate any applicable local, national, or international laws or regulations',
      'Transmit unsolicited or unauthorized advertising or promotional material',
      'Attempt to gain unauthorized access to our servers or systems',
      'Engage in data scraping, crawling, or automated content extraction',
      'Upload or transmit viruses, malware, or any harmful code',
      'Impersonate MB Prime Projects or any other person or entity',
    ],
  },
  {
    title: '4. Intellectual Property',
    content: [
      'All content on this Website - including text, images, logos, project renders, floor plans, brochures, and videos - is the exclusive property of MB Prime Projects or its licensors, protected under applicable intellectual property laws. You may not reproduce, distribute, modify, or use any content for commercial purposes without our prior written consent.',
    ],
  },
  {
    title: '5. Property Information & Accuracy',
    content: [
      'All project details, floor plans, pricing, specifications, images, and timelines on this Website are indicative and subject to change without notice. They do not constitute a legal offer or binding agreement. Actual dimensions, finishes, and amenities may vary. Prospective buyers should verify all information independently and consult our sales team before making any decisions.',
    ],
  },
  {
    title: '6. No Offer or Binding Contract',
    content: [
      'Nothing on this Website constitutes a formal offer, invitation to treat, or binding contract for the sale, lease, or transfer of any property. A binding agreement will only be formed upon execution of a duly signed sale or lease agreement and receipt of applicable payments as per the terms therein.',
    ],
  },
  {
    title: '7. Enquiries & Booking',
    content: [
      'Submitting an enquiry, expression of interest, or booking amount does not guarantee allotment of any unit. Allotment is subject to availability, eligibility, verification, and execution of formal sale documents. Amounts paid are governed by the booking form and applicable laws including RERA.',
    ],
  },
  {
    title: '8. Third-Party Links',
    content: [
      'Our Website may contain links to third-party websites (social media, property portals, etc.). MB Prime Projects does not endorse or accept responsibility for the content or practices of any third-party websites. Accessing such links is entirely at your own risk.',
    ],
  },
  {
    title: '9. Disclaimer of Warranties',
    content: [
      'This Website and all its content are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the Website will be uninterrupted or error-free.',
    ],
  },
  {
    title: '10. Limitation of Liability',
    content: ['To the fullest extent permitted by law, MB Prime Projects shall not be liable for any direct, indirect, incidental, or consequential damages arising out of:'],
    bullets: [
      'Your use of or inability to use this Website',
      'Reliance on any information displayed on the Website',
      'Unauthorized access to or alteration of your data',
      'Any errors, omissions, or inaccuracies in Website content',
    ],
    footer: 'Our total liability in any circumstance shall not exceed INR 10,000.',
  },
  {
    title: '11. Privacy Policy',
    content: [
      'Your use of this Website is also governed by our Privacy Policy, incorporated into these Terms by reference. Please review it to understand how we collect, use, and protect your personal information in accordance with the DPDP Act, 2023.',
    ],
  },
  {
    title: '12. RERA Compliance',
    content: [
      'MB Prime Projects complies with the Real Estate (Regulation and Development) Act, 2016 (RERA) and applicable Andhra Pradesh RERA regulations. Project-specific RERA registration numbers, approved plans, and statutory disclosures are available at the AP RERA portal and at our sales offices upon request.',
    ],
  },
  {
    title: '13. Governing Law & Jurisdiction',
    content: [
      'These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in Srikakulam, Andhra Pradesh, India.',
    ],
  },
  {
    title: '14. Amendments',
    content: [
      'We reserve the right to modify these Terms at any time without prior notice. Changes take effect immediately upon posting. It is your responsibility to review these Terms periodically. Continued use of the Website after changes are posted constitutes your acceptance.',
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <section className="bg-black py-12 md:py-26">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-serif text-primary mb-3">Terms & Conditions</h1>
          <p className="text-sm md:text-base text-slate-600 mb-1">
            Effective Date: April 20, 2025 | Last Updated: April 20, 2025 | www.mbprimeprojects.com
          </p>
          <p className="text-sm md:text-base text-slate-600 mb-1">
            &copy; 2025 MB Prime Projects. All rights reserved. | 90884 56999 | info@mbprimeprojects.com
          </p>
          <p className="text-sm md:text-base text-slate-600 mb-8">
            MB Prime Villas Plots, Gems Hospital Road, Srikakulam, AP 532484
          </p>

          <div className="space-y-8 text-slate-700">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">{section.title}</h2>

                {section.content?.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}

                {section.bullets?.length ? (
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.footer ? <p className="leading-relaxed">{section.footer}</p> : null}
              </article>
            ))}

            <article>
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">15. Contact Us</h2>
              <p className="leading-relaxed mb-3">For any questions regarding these Terms, reach out to us:</p>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium text-slate-900">Website:</span>{' '}
                  <a
                    className="text-primary hover:text-secondary transition-colors"
                    href="https://www.mbprimeprojects.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.mbprimeprojects.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-900">Email:</span>{' '}
                  <a className="text-primary hover:text-secondary transition-colors" href="mailto:info@mbprimeprojects.com">
                    info@mbprimeprojects.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-900">Phone:</span>{' '}
                  <a className="text-primary hover:text-secondary transition-colors" href="tel:+919088456999">
                    90884 56999
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-900">Address:</span> MB Prime Villas Plots, Gems Hospital Road, Srikakulam, Silagamsingivalasa, Andhra Pradesh 532484
                </li>
              </ul>
            </article>

            <p className="text-primary font-medium italic pt-2">We Create Landmarks — and we stand by our commitments.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
