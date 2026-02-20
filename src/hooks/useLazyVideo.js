import { useState, useEffect, useRef } from 'react';

/**
 * Defer loading video (and other heavy media) until the container is in view
 * or after an optional delay. Reduces initial load time and latency.
 * @param {Object} options
 * @param {React.RefObject} [options.containerRef] - Use this ref for the observed element (e.g. same ref as your section)
 * @param {number} [options.delayMs] - Delay in ms before allowing load (e.g. 400 for above-the-fold hero so page paints first)
 * @param {string} [options.rootMargin] - Intersection Observer rootMargin (e.g. '100px' to load slightly before in view)
 * @returns {{ shouldLoad: boolean }}
 */
export function useLazyVideo(options = {}) {
  const { containerRef: externalRef, delayMs = 0, rootMargin = '50px' } = options;
  const internalRef = useRef(null);
  const ref = externalRef || internalRef;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let delayTimer = null;
    let observer = null;

    const startLoad = () => {
      if (delayMs > 0) {
        delayTimer = setTimeout(() => setShouldLoad(true), delayMs);
      } else {
        setShouldLoad(true);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) startLoad();
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (observer && el) observer.unobserve(el);
    };
  }, [delayMs, rootMargin]);

  return externalRef ? { shouldLoad } : { ref: internalRef, shouldLoad };
}
