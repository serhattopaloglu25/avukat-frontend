import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { GlobalProviders } from '@/components/layout/GlobalProviders';
import { GlobalTopbar } from '@/components/layout/GlobalTopbar';
import { AuthModal } from '@/components/auth/AuthModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
  description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
  keywords: 'avukat ajanda, hukuk bürosu yönetimi, dava takibi, müvekkil yönetimi, duruşma takvimi',
  authors: [{ name: 'AvukatAjanda' }],
  openGraph: {
    title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
    description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
    url: 'https://avukatajanda.com',
    siteName: 'AvukatAjanda',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
    description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <GlobalProviders>
          <GlobalTopbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Suspense fallback={null}>
            <AuthModal />
          </Suspense>
        </GlobalProviders>
      </body>
    </html>
  );
}
