import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@/components/Analytics';
import { CookieConsent } from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
  description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda.',
  keywords: 'avukat yazılımı, hukuk bürosu yönetimi, dava takibi, müvekkil yönetimi',
  authors: [{ name: 'AvukatAjanda' }],
  robots: 'index, follow',
  openGraph: {
    title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
    description: 'Modern hukuk bürosu yönetim yazılımı',
    url: 'https://avukatajanda.com',
    siteName: 'AvukatAjanda',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AvukatAjanda',
    description: 'Hukuk büroları için dijital çözüm',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
