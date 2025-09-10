import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları İçin Akıllı Yönetim Sistemi',
  description: 'Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <Suspense fallback={null}>
          <AuthModal />
        </Suspense>
      </body>
    </html>
  );
}
