import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import LogosOrStats from '@/components/Home/LogosOrStats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
  description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda. Hukuk büronuzun dijital asistanı.',
  openGraph: {
    title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
    description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda.',
    url: 'https://avukatajanda.com',
    siteName: 'AvukatAjanda',
    type: 'website',
    images: [
      {
        url: 'https://avukatajanda.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AvukatAjanda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
    description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda.',
    images: ['https://avukatajanda.com/og-image.png']
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AvukatAjanda',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'TRY'
  }
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <LogosOrStats />
        
        <section className="py-20 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hukuk Büronuzu Dijitalleştirmeye Hazır mısınız?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Ücretsiz hesap oluşturun ve tüm özellikleri 30 gün boyunca deneyin.
            </p>
            
              href="/register"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-3xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Hemen Başla →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
