'use client';

import { useEffect } from 'react';

export const SkipToContent = () => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const main = document.getElementById('main-content');
        if (main) {
          main.focus();
        }
      }
    };
    const link = document.getElementById('skip-to-content-link');
    link?.addEventListener('keydown', handler);
    return () => link?.removeEventListener('keydown', handler);
  }, []);

  return (
    <a
      id="skip-to-content-link"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-white px-4 py-2 text-sm font-semibold text-green shadow"
    >
      Aller au contenu principal
    </a>
  );
};
