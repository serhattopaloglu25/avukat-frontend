'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, X, HelpCircle } from 'lucide-react';

const metadata: Metadata = {
  title: 'Fiyatlandırma | AvukatAjanda - Şeffaf ve Esnek Paketler',
  description: 'AvukatAjanda fiyatları. Solo avukatlar için ₺299, küçük bürolar için ₺699, kurumsal çözümler ₺1499. 14 gün ücretsiz deneyin.',
  openGraph: {
    title: 'AvukatAjanda Fiyatlandırma',
    description: 'Büronuza uygun paketi seçin. 14 gün ücretsiz deneme.',
    url: 'https://avukatajanda.com/fiyatlandirma',
  },
};

export default function FiyatlandirmaPage() {
  const [isYearly, setIsYearly] = useState(false);
  
  const calculatePrice = (monthlyPrice: number) => {
    return isYearly ? Math.floor(monthlyPrice * 12 * 0.85) : monthlyPrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const plans = [
    {
      name: "Başlangıç",
      monthlyPrice: 299,
      description: "Solo avukatlar için ideal başlangıç",
      features: [
        { text: "1 kullanıcı", included: true },
        { text: "50 müvekkil", included: true },
        { text: "100 dava", included: true },
        { text: "Temel raporlama", included: true },
        { text: "E-posta desteği", included: true },
        { text: "1 GB depolama", included: true },
        { text: "SMS bildirimleri", included: false },
        { text: "API erişimi", included: false },
        { text: "Özel raporlar", included: false },
        { text: "SSO giriş", included: false }
      ],
      popular: false
    },
    {
      name: "Profesyonel",
      monthlyPrice: 699,
      description: "Küçük ve orta ölçekli bürolar için",
      features: [
        { text: "5 kullanıcı", included: true },
        { text: "500 müvekkil", included: true },
        { text: "Sınırsız dava", included: true },
        { text: "Gelişmiş raporlama", included: true },
        { text: "Öncelikli destek", included: true },
        { text: "10 GB depolama", included: true },
        { text: "SMS bildirimleri", included: true },
        { text: "API erişimi", included: false },
        { text: "Özel raporlar", included: false },
        { text: "SSO giriş", included: false }
      ],
      popular: true
    },
    {
      name: "Kurumsal",
      monthlyPrice: 1499,
      description: "Büyük bürolar ve kurumsal firmalar için",
      features: [
        { text: "Sınırsız kullanıcı", included: true },
        { text: "Sınırsız müvekkil", included: true },
        { text: "Sınırsız dava", included: true },
        { text: "Özel raporlama", included: true },
        { text: "7/24 telefon desteği", included: true },
        { text: "100 GB depolama", included: true },
        { text: "SMS bildirimleri", included: true },
        { text: "API erişimi", included: true },
        { text: "Özel raporlar", included: true },
        { text: "SSO giriş", included: true }
      ],
      popular: false
    }
  ];

  const featureMatrix = [
    { name: "Dava Takibi", starter: true, professional: true, enterprise: true },
    { name: "Ajanda Hatırlatma", starter: true, professional: true, enterprise: true },
    { name: "Dosya Paylaşımı", starter: true, professional: true, enterprise: true },
    { name: "Fatura Yönetimi", starter: "Temel", professional: "Gelişmiş", enterprise: "Özelleştirilmiş" },
    { name: "Raporlama", starter: "Temel", professional: "Gelişmiş", enterprise: "Özel" },
    { name: "Kullanıcı Sayısı", starter: "1", professional: "5", enterprise: "Sınırsız" },
  ];

  const faqs = [
    {
      question: "14 günlük deneme süresi nasıl çalışır?",
      answer: "Kayıt olduktan sonra 14 gün boyunca tüm özellikleri ücretsiz kullanabilirsiniz. Kredi kartı bilgisi gerekmez."
    },
    {
      question: "Plan değişikliği yapabilir miyim?",
      answer: "Evet, dilediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki faturalama döneminde geçerli olur."
    },
    {
      question: "Yıllık ödemede avantaj var mı?",
      answer: "Evet, yıllık ödemede %15 indirim uygulanır. 12 aylık ödemeyi peşin yaparsınız."
    },
    {
      question: "İptal politikanız nedir?",
      answer: "Dilediğiniz zaman iptal edebilirsiniz. İptal ettiğinizde dönem sonuna kadar kullanmaya devam edersiniz."
    },
    {
      question: "Verilerim güvende mi?",
      answer: "Tüm verileriniz 256-bit SSL şifreleme ile korunur. KVKK uyumlu altyapımız ve günlük yedeklemelerimiz ile verileriniz güvende."
    },
    {
      question: "Fatura kesiliyor mu?",
      answer: "Evet, her ödemeniz için e-fatura kesilir ve e-posta adresinize gönderilir."
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Şeffaf fiyat, <span className="text-primary">esnek paket</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Büronuzun ihtiyaçlarına göre paket seçin. Gizli ücret yok, sürpriz yok.
              </p>
              
              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    !isYearly ? 'bg-white shadow-sm text-primary' : 'text-gray-500'
                  }`}
                >
                  Aylık
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    isYearly ? 'bg-white shadow-sm text-primary' : 'text-gray-500'
                  }`}
                >
                  Yıllık
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    %15 indirim
                  </span>
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'border-primary shadow-xl scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                        En Popüler
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="mb-4">{plan.description}</CardDescription>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold">
                        {formatPrice(calculatePrice(plan.monthlyPrice))}
                      </span>
                      <span className="text-gray-500 ml-2">
                        /{isYearly ? 'yıl' : 'ay'}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-gray-500 mt-2">
                        Aylık {formatPrice(plan.monthlyPrice)} yerine
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })} className="w-full block">
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        Ücretsiz Başla
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Feature Matrix */}
        <section className="py-20 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">Özellik Karşılaştırması</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Özellik</th>
                    <th className="text-center p-4">Başlangıç</th>
                    <th className="text-center p-4">Profesyonel</th>
                    <th className="text-center p-4">Kurumsal</th>
                  </tr>
                </thead>
                <tbody>
                  {featureMatrix.map((feature, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="text-center p-4">
                        {typeof feature.starter === 'boolean' ? (
                          feature.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.starter}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof feature.professional === 'boolean' ? (
                          feature.professional ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.professional}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-lg">{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 ml-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                14 Gün Ücretsiz Deneyin
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Kredi kartı gerekmez. İstediğiniz zaman iptal edin.
              </p>
              <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
                <Button size="lg" variant="secondary" className="shadow-xl">
                  Ücretsiz Başla
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "AvukatAjanda",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Başlangıç",
                  "price": "299",
                  "priceCurrency": "TRY"
                },
                {
                  "@type": "Offer",
                  "name": "Profesyonel",
                  "price": "699",
                  "priceCurrency": "TRY"
                },
                {
                  "@type": "Offer",
                  "name": "Kurumsal",
                  "price": "1499",
                  "priceCurrency": "TRY"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
