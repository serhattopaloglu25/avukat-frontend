import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
  description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda.',
  metadataBase: new URL('https://avukatajanda.com'),
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
