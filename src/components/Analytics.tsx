'use client';

import { useEffect } from 'react';
import { useCookieConsent } from '@/components/providers/CookieConsentProvider';

export function Analytics() {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    // Analytics are now loaded by CookieConsentProvider when consent is given
    // This component can be used for additional tracking setup if needed
  }, [hasConsent]);

  // Analytics scripts are dynamically loaded by CookieConsentProvider
  return null;
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  if (typeof window !== 'undefined') {
    // Check if consent was given
    const consent = localStorage.getItem('aa_consent');
    if (consent !== 'v1') return;

    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
    if (window.plausible) {
      window.plausible(action, { props: { category, label } });
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    plausible?: any;
  }
}
