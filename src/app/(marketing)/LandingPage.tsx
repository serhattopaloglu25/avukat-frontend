'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Shield, Clock, Users, BarChart, FileText, Zap, Award, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">AvukatAjanda</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/ozellikler" className="text-gray-600 hover:text-gray-900 transition">
                Özellikler
              </Link>
              <Link href="/fiyatlandirma" className="text-gray-600 hover:text-gray-900 transition">
                Fiyatlandırma
              </Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-gray-900 transition">
                Hakkımızda
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">
                Blog
              </Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-gray-900 transition">
                İletişim
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Giriş Yap
                </Button>
              </Link>
              <Button onClick={handleCTAClick} size="sm">
                Ücretsiz Dene
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Türkiye'nin En Kapsamlı Hukuk Büro Yönetimi</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Hukuk Büronuz İçin
              <span className="text-primary block mt-2">Dijital Dönüşüm</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin. 
              Verimliliğinizi %40 artırın, zamandan tasarruf edin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={handleCTAClick}>
                14 Gün Ücretsiz Başla
              </Button>
              <Link href="/ozellikler">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Canlı Demo İzle
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Kredi kartı gerekmez • 5 dakikada kurulum • İstediğiniz zaman iptal
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm">ISO 27001 Sertifikalı</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm">KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm">E-İmza Entegrasyonu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tek Platform, Tam Çözüm
            </h2>
            <p className="text-lg text-gray-600">
              İhtiyacınız olan tüm araçlar bir arada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Hukuk Büronuzu Dijitalleştirmeye Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Binlerce avukat AvukatAjanda ile büro yönetimini kolaylaştırıyor
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleCTAClick}>
            Hemen Ücretsiz Deneyin
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">AvukatAjanda</h4>
              <p className="text-gray-400 text-sm">
                Hukuk büroları için yeni nesil yönetim platformu
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/ozellikler" className="hover:text-white transition">Özellikler</Link></li>
                <li><Link href="/fiyatlandirma" className="hover:text-white transition">Fiyatlandırma</Link></li>
                <li><Link href="/entegrasyonlar" className="hover:text-white transition">Entegrasyonlar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Şirket</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/iletisim" className="hover:text-white transition">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/kvkk" className="hover:text-white transition">KVKK</Link></li>
                <li><Link href="/aydinlatma-metni" className="hover:text-white transition">Aydınlatma Metni</Link></li>
                <li><Link href="/uyelik-sozlesmesi" className="hover:text-white transition">Üyelik Sözleşmesi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
