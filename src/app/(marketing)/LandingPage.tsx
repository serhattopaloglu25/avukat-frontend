'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Shield, Clock, Users, BarChart, FileText, Zap, Award } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleCTAClick = () => {
    router.push('/register?from=landing');
  };

  const features = [
    { icon: Users, title: 'Müvekkil Yönetimi', desc: 'Tüm müvekkil bilgilerini organize edin' },
    { icon: FileText, title: 'Dava Takibi', desc: 'Dosyaları kolayca yönetin ve takip edin' },
    { icon: Clock, title: 'Akıllı Ajanda', desc: 'Duruşmaları ve randevuları kaçırmayın' },
    { icon: Shield, title: 'Güvenli Saklama', desc: '256-bit şifreleme ile veriler korunur' },
    { icon: BarChart, title: 'Detaylı Raporlar', desc: 'Performans ve ilerleme raporları' },
    { icon: Zap, title: 'Hızlı Erişim', desc: 'Mobil uyumlu, her yerden erişim' },
  ];

  const stats = [
    { value: '500+', label: 'Aktif Büro' },
    { value: '10K+', label: 'Yönetilen Dava' },
    { value: '%99', label: 'Memnuniyet' },
    { value: '7/24', label: 'Destek' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Header kaldırıldı, doğrudan hero başlıyor */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hukuk Büronuz İçin
              <span className="block text-primary mt-2">Akıllı Çözüm</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.
              Hukuk büronuzun dijital dönüşümünü başlatın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleCTAClick}
                className="text-lg px-8 py-6"
              >
                Ücretsiz Deneyin
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/demo')}
                className="text-lg px-8 py-6"
              >
                Demo İzle
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600">
              İhtiyacınız olan tüm araçlar tek platformda
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hukuk Büronuzu Dijitalleştirin
          </h2>
          <p className="text-xl mb-8 opacity-90">
            14 gün ücretsiz deneme süresi ile başlayın, kredi kartı gerekmez.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleCTAClick}
            className="text-lg px-8 py-6"
          >
            Hemen Başlayın
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AvukatAjanda</h3>
              <p className="text-gray-400">
                Hukuk büroları için geliştirilmiş profesyonel yönetim sistemi.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ozellikler" className="hover:text-white">Özellikler</Link></li>
                <li><Link href="/fiyatlandirma" className="hover:text-white">Fiyatlandırma</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/kvkk" className="hover:text-white">KVKK</Link></li>
                <li><Link href="/aydinlatma-metni" className="hover:text-white">Aydınlatma Metni</Link></li>
                <li><Link href="/uyelik-sozlesmesi" className="hover:text-white">Üyelik Sözleşmesi</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AvukatAjanda. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}