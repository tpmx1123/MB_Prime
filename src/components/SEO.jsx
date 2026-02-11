import React from 'react';

const SEO = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "MB Prime Villa Plots",
        "description": "Premium luxury villa plots in Srikakulam urban hubs.",
        "url": "https://www.mbprime.com",
        "provider": {
            "@type": "Organization",
            "name": "MB Prime",
            "logo": "https://www.mbprime.com/logo.png"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Srikakulam",
            "addressRegion": "Andhra Pradesh",
            "addressCountry": "IN"
        }
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(schemaData)}
        </script>
    );
};

export default SEO;
