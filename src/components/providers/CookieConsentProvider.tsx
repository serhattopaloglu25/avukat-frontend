'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'aa_consent';
const CONSENT_VERSION = 'v1';

interface CookieConsentContextType {
  hasConsent: boolean | null;
  setConsent: (value: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: null,
  setConsent: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (storedConsent === CONSENT_VERSION) {
      setHasConsent(true);
      // Load analytics immediately
      loadAnalytics();
    } else if (storedConsent === 'rejected') {
      setHasConsent(false);
    } else {
      // No consent decision yet
      setShowBanner(true);
    }
  }, []);

  const loadAnalytics = () => {
    // Trigger analytics loading without page reload
    if (typeof window !== 'undefined') {
      // Google Analytics
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (gaId && !window.gtag) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(script2);
      }

      // Plausible
      const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      if (plausibleDomain && !window.plausible) {
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', plausibleDomain);
        script.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(script);
      }
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, CONSENT_VERSION);
    setHasConsent(true);
    setShowBanner(false);
    loadAnalytics(); // Load analytics without page reload
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setHasConsent(false);
    setShowBanner(false);
  };

  return (
    <CookieConsentContext.Provider value={{ hasConsent, setConsent: setHasConsent }}>
      {children}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/20 backdrop-blur-sm animate-in slide-in-from-bottom duration-300">
          <Card className="max-w-4xl mx-auto p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-lg">Çerez Kullanımı</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Web sitemizin performansını analiz etmek ve geliştirmek için çerezler kullanıyoruz. 
                    Bu çerezler, site kullanımınız hakkında anonim istatistikler toplar. Detaylı bilgi için{' '}
                    <a href="/kvkk" className="text-primary hover:underline font-medium">
                      KVKK Aydınlatma Metnimizi
                    </a>{' '}
                    inceleyebilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleAccept} size="sm" className="min-w-[100px]">
                      Kabul Et
                    </Button>
                    <Button onClick={handleReject} variant="outline" size="sm" className="min-w-[100px]">
                      Reddet
                    </Button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleReject}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    plausible?: any;
  }
}
