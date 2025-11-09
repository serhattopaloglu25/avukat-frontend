import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { CookieConsent } from '@/components/CookieConsent';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
  description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
  keywords: 'avukat ajanda, hukuk bürosu yönetimi, dava takibi, müvekkil yönetimi, duruşma takvimi',
  authors: [{ name: 'AvukatAjanda' }],
  applicationName: 'AvukatAjanda',
  generator: 'Next.js',
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
    description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
    url: 'https://avukatajanda.com',
    siteName: 'AvukatAjanda',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AvukatAjanda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
    description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
    images: ['/og-image.png'],
  },
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico?v=4' },
      { url: '/favicon.svg?v=4', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=4', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2ECC71',
      },
    ],
  },
  other: {
    'msapplication-TileColor': '#2ECC71',
    'theme-color': '#2ECC71',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className={`${inter.className} font-sans antialiased`}>
        <GlobalHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <CookieConsent />
      </body>
    </html>
  );
}
