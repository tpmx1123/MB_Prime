import { useEffect } from 'react';

/** Inject JSON-LD without a competing Helmet instance (fixes SPA title updates). */
export function useJsonLd(id, data) {
  useEffect(() => {
    if (!data) return undefined;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, data]);
}
