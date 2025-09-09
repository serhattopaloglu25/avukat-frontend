'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export default function FiyatlandirmaPage() {
  const plans = [
    {
      name: 'Başlangıç',
      price: '299',
      description: 'Küçük hukuk büroları için ideal',
      features: [
        '5 kullanıcıya kadar',
        '100 müvekkil',
        'Temel dava takibi',
        'Ajanda yönetimi',
        'E-posta desteği',
      ],
      notIncluded: [
        'Gelişmiş raporlama',
        'API erişimi',
        'Özel eğitim',
      ],
      popular: false,
    },
    {
      name: 'Profesyonel',
      price: '599',
      description: 'Orta ölçekli bürolar için',
      features: [
        '15 kullanıcıya kadar',
        'Sınırsız müvekkil',
        'Gelişmiş dava takibi',
        'Dosya yönetimi',
        'Fatura sistemi',
        'Öncelikli destek',
        'Gelişmiş raporlama',
      ],
      notIncluded: [
        'API erişimi',
        'Özel eğitim',
      ],
      popular: true,
    },
    {
      name: 'Kurumsal',
      price: 'Özel Fiyat',
      description: 'Büyük hukuk büroları için',
      features: [
        'Sınırsız kullanıcı',
        'Sınırsız müvekkil',
        'Tüm özellikler',
        'API erişimi',
        'Özel eğitim',
        '7/24 destek',
        'Özel entegrasyonlar',
        'Veri yedekleme',
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              AvukatAjanda
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/ozellikler" className="text-gray-700 hover:text-gray-900">
                Özellikler
              </Link>
              <Link href="/fiyatlandirma" className="text-gray-900 font-medium">
                Fiyatlandırma
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-gray-900">
                İletişim
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Giriş Yap</Button>
              </Link>
              <Link href="/register">
                <Button>Ücretsiz Dene</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Büronuza Uygun Planı Seçin
          </h1>
          <p className="text-xl text-gray-600">
            14 gün ücretsiz deneme. Kredi kartı gerektirmez.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={plan.popular ? 'border-primary shadow-lg relative' : ''}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      En Popüler
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    {plan.price === 'Özel Fiyat' ? (
                      <span className="text-3xl font-bold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">₺{plan.price}</span>
                        <span className="text-gray-600">/ay</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start text-gray-400">
                        <X className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.price === 'Özel Fiyat' ? 'İletişime Geç' : 'Başla'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Ücretsiz deneme nasıl çalışır?
              </h3>
              <p className="text-gray-600">
                14 gün boyunca tüm özellikleri ücretsiz deneyebilirsiniz. 
                Kredi kartı bilgisi gerekmez ve deneme süresi sonunda otomatik ödeme alınmaz.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Plan değişikliği yapabilir miyim?
              </h3>
              <p className="text-gray-600">
                Evet, dilediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. 
                Değişiklikler bir sonraki fatura döneminde geçerli olur.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                İptal politikanız nedir?
              </h3>
              <p className="text-gray-600">
                Dilediğiniz zaman aboneliğinizi iptal edebilirsiniz. 
                İptal ettiğinizde mevcut dönem sonuna kadar erişiminiz devam eder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            14 gün ücretsiz deneyin. Kredi kartı gerekmez.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Ücretsiz Denemeye Başla
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
