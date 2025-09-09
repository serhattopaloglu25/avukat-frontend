'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Shield, Clock, Users, BarChart, FileText } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (name) params.append('name', name);
    
    router.push(`/register?${params.toString()}`);
  };

  const features = [
    { icon: Users, title: 'Müvekkil Yönetimi', desc: 'Tüm müvekkil bilgilerini tek yerde toplayın' },
    { icon: FileText, title: 'Dava Takibi', desc: 'Dava dosyalarını organize edin ve takip edin' },
    { icon: Clock, title: 'Ajanda Sistemi', desc: 'Duruşmaları ve randevuları kaçırmayın' },
    { icon: Shield, title: 'Güvenli Saklama', desc: 'Verileriniz güvenle saklanır' },
    { icon: BarChart, title: 'Raporlama', desc: 'Detaylı raporlar ve istatistikler' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">AvukatAjanda</div>
          <div className="flex items-center space-x-6">
            <Link href="/ozellikler" className="text-gray-600 hover:text-gray-900">
              Özellikler
            </Link>
            <Link href="/fiyatlandirma" className="text-gray-600 hover:text-gray-900">
              Fiyatlandırma
            </Link>
            <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">
              İletişim
            </Link>
            <Link href="/login">
              <Button variant="outline">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button>Ücretsiz Dene</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hukuk Büronuz İçin
              <span className="text-primary block">Akıllı Ajanda Sistemi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.
              Büronuzun verimliliğini %40 artırın.
            </p>
            <div className="flex space-x-4">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8">
                  14 Gün Ücretsiz Dene
                </Button>
              </Link>
              <Link href="/ozellikler">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Özellikleri İncele
                </Button>
              </Link>
            </div>
          </div>

          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Hemen Başlayın</h2>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium mb-2">
                  Ad Soyad
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Adınız Soyadınız"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                  E-posta
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Ücretsiz Kayıt Ol
              </Button>
              <p className="text-center text-sm text-gray-500">
                Kredi kartı gerekmez • 14 gün ücretsiz
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Neden AvukatAjanda?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl">Aktif Büro</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl">Yönetilen Dava</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">%99</div>
              <div className="text-xl">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">AvukatAjanda</h4>
              <p className="text-gray-400">Hukuk büroları için akıllı yönetim sistemi</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ozellikler" className="hover:text-white">Özellikler</Link></li>
                <li><Link href="/fiyatlandirma" className="hover:text-white">Fiyatlandırma</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
                <li><Link href="/yardim" className="hover:text-white">Yardım</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/gizlilik" className="hover:text-white">Gizlilik</Link></li>
                <li><Link href="/kullanim" className="hover:text-white">Kullanım Koşulları</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
