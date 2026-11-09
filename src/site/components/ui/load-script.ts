const loading = new Map<string, Promise<void>>();

/**
 * Loads a script from the site's own `public/vendor` once and resolves when it has run.
 * For heavy libraries (three.js, lottie) that only one page needs: the page's bundle stays
 * small and the library loads after the page is interactive.
 */
export function loadScript(src: string): Promise<void> {
  const known = loading.get(src);
  if (known) return known;
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading.delete(src);
      reject(new Error(`Could not load ${src}`));
    };
    document.head.append(script);
  });
  loading.set(src, promise);
  return promise;
}

/** Runs `task` when the browser is idle (or soon after, where idle callbacks do not exist). */
export function whenIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(task, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 300);
  return () => window.clearTimeout(id);
}
