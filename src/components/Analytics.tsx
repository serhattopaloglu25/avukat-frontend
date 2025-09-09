'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    plausible?: any;
  }
}

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    setConsentGiven(consent === 'true');
  }, []);

  // Event tracking helper
  useEffect(() => {
    if (typeof window !== 'undefined' && consentGiven) {
      window.gtag = function() {
        if (window.dataLayer) {
          window.dataLayer.push(arguments);
        }
      };
    }
  }, [consentGiven]);

  if (consentGiven === false || consentGiven === null) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && !window.dataLayer && (
        <>
          <Script
            id="google-analytics-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Plausible Analytics */}
      {plausibleDomain && !window.plausible && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

// Event tracking utilities
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Plausible
    if (window.plausible) {
      window.plausible(eventName, { props: parameters });
    }
  }
}
