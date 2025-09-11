'use client';

import { ReactNode } from 'react';
import { CookieConsentProvider } from '@/components/providers/CookieConsentProvider';
import { Analytics } from '@/components/Analytics';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <Analytics />
    </CookieConsentProvider>
  );
}
