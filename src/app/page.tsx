import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import LogosOrStats from '@/components/Home/LogosOrStats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
  description: 'Dava takibi, müvekkil yönetimi ve randevu hatırlatmaları tek platformda.',
};

export default function HomePage() {
  return (
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
            Hemen Başla
          </a>
        </div>
      </section>
    </main>
  );
}
