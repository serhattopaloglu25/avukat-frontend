'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined' && localStorage.getItem('analytics-consent') === 'true') {
      console.log('Analytics: landing_signup_click', { email, name });
    }
    
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (name) params.append('name', name);
    
    router.push(`/register?${params.toString()}`);
  };

  const features = [
    'Müvekkil takibi ve yönetimi',
    'Dava dosyası organizasyonu',
    'Ajanda ve duruşma takibi',
    'Otomatik hatırlatmalar',
    'Güvenli dosya saklama',
    'Fatura ve tahsilat takibi',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
            <Link href="/login">
              <Button variant="outline">Giriş Yap</Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hukuk Büronuz İçin
              <span className="text-primary block">Akıllı Ajanda Sistemi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.
              Büronuzun verimliliğini artırın.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">14 Gün Ücretsiz Deneyin</h2>
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
                Ücretsiz Başla
              </Button>
              <p className="text-center text-sm text-gray-500">
                Kredi kartı gerekmez • İstediğiniz zaman iptal edin
              </p>
            </form>
          </Card>
        </div>
      </section>

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

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
