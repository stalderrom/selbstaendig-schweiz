'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'declined') {
      updateConsent('denied');
    }
  }, []);

  const updateConsent = (state: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: state,
        ad_storage: 'denied',
      });
    }
  };

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    updateConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-6 flex-wrap">
        <p className="text-sm text-gray-600 flex-1 min-w-0">
          Wir nutzen Google Analytics, um zu verstehen, wie Besucher unsere Website nutzen. Sie können dies ablehnen.{' '}
          <a href="/datenschutz" className="underline hover:text-gray-900">
            Datenschutz
          </a>
        </p>
        <div className="flex items-center gap-5 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-[#8B1A1A] text-white text-sm font-semibold rounded-lg hover:bg-[#7a1616] transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
