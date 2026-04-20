import React from 'react';

const sections = [
  {
    title: '1. Introduction',
    content: [
      'MB Prime Projects ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit www.mbprimeprojects.com, contact us about our real estate or construction projects, or engage with our services. By using our website, you agree to this Policy.',
    ],
  },
  {
    title: '2. Information We Collect',
    content: [
      'We collect the following types of information:',
    ],
    bullets: [
      'Personal details you provide: name, email, phone number, postal address, and enquiry messages via contact forms, newsletter sign-ups, or property interest registrations.',
      'Automatically collected data: IP address, browser type, device, pages visited, time on site, and referring URLs via cookies and analytics tools.',
      'Third-party data: information from referral partners, property listing platforms, or advertising networks.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    content: [
      'We use your information to:',
    ],
    bullets: [
      'Respond to enquiries and provide project details',
      'Schedule site visits, property tours, or sales meetings',
      'Send project updates, launches, and offers (with your consent)',
      'Process booking, sale, or lease agreements',
      'Improve our website and user experience',
      'Comply with legal and regulatory obligations',
      'Prevent fraud and unauthorized access',
    ],
    footer:
      'Processing is based on your consent, contract performance, legal obligation, or our legitimate business interests.',
  },
  {
    title: '4. Sharing Your Information',
    content: [
      'We do not sell your personal data. We may share it with:',
    ],
    bullets: [
      'Authorized sales agents, channel partners, and co-brokers',
      'Legal, financial, and professional advisors',
      'Technology service providers (hosting, CRM, email platforms) under data processing agreements',
      'Government or law enforcement authorities when required by law',
      'Successor entities in a merger, acquisition, or asset sale',
    ],
  },
  {
    title: '5. Cookies & Tracking',
    content: [
      'We use cookies to enhance browsing, analyse traffic, and serve relevant ads. You can control cookies via your browser settings, though disabling some may affect site functionality. We use:',
    ],
    bullets: [
      'Essential - required for site functionality',
      'Analytics - understand visitor behaviour (e.g. Google Analytics)',
      'Marketing - deliver personalised advertisements',
      'Preference - remember your settings and choices',
    ],
  },
  {
    title: '6. Data Security',
    content: [
      'We implement SSL/TLS encryption, secure server infrastructure, access controls, and periodic security reviews to protect your data. While we take all reasonable precautions, no internet transmission is completely secure. You provide information at your own risk.',
    ],
  },
  {
    title: '7. Data Retention',
    content: [
      'We retain personal data only as long as necessary for the purposes described here or as required by law. Transaction records may be retained for up to 7 years for regulatory compliance. Data no longer required is securely deleted or anonymized.',
    ],
  },
  {
    title: '8. Your Rights',
    content: [
      'Depending on your jurisdiction, you may have rights to:',
    ],
    bullets: [
      'Access - request a copy of data we hold about you',
      'Rectification - correct inaccurate or incomplete data',
      'Erasure - request deletion of your data in certain circumstances',
      'Restrict Processing - limit how we use your data',
      'Data Portability - receive your data in a machine-readable format',
      'Object - object to processing for direct marketing',
      'Withdraw Consent - at any time, where processing is consent-based',
    ],
    footer:
      'To exercise these rights, contact us at privacy@mbprimeprojects.com. We will respond within 30 days.',
  },
  {
    title: '9. Third-Party Links',
    content: [
      'Our website may link to external sites such as social media platforms or property listing portals. We are not responsible for their privacy practices. Please review their policies independently before sharing personal information.',
    ],
  },
  {
    title: "10. Children's Privacy",
    content: [
      'Our services are not directed to anyone under 18. We do not knowingly collect data from minors. If you believe we have done so, contact us immediately and we will promptly delete the information.',
    ],
  },
  {
    title: '11. Regulatory Compliance',
    content: [
      'MB Prime Projects complies with applicable Indian laws including the Information Technology Act, 2000, IT (Amendment) Act, 2008, and the Digital Personal Data Protection Act, 2023 (DPDP Act). We also adhere to RERA (Real Estate Regulation and Development Act, 2016) where applicable for our projects in Andhra Pradesh.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    content: [
      'We may update this Policy at any time. Changes will be posted here with a revised date. Continued use of our website constitutes your acceptance of the updated Policy.',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-serif text-primary mb-3">Privacy Policy</h1>
          <p className="text-sm md:text-base text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
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
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">13. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>

              <ul className="space-y-2">
                <li>
                  <span className="font-medium text-slate-900">Website:</span>{' '}
                  <a className="text-primary hover:text-secondary transition-colors" href="https://www.mbprimeprojects.com" target="_blank" rel="noopener noreferrer">
                    www.mbprimeprojects.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-900">Email:</span>{' '}
                  <a className="text-primary hover:text-secondary transition-colors" href="mailto:privacy@mbprimeprojects.com">
                    privacy@mbprimeprojects.com
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

            <p className="text-primary font-medium italic pt-2">We Create Landmarks — and we protect your trust.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
