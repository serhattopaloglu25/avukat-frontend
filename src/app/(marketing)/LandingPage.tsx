'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart,
  Bell,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Müvekkil Yönetimi",
      description: "Tüm müvekkil bilgilerini tek platformda organize edin"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Dava Takibi",
      description: "Dava dosyalarını dijital ortamda güvenle saklayın"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Akıllı Takvim",
      description: "Duruşma ve randevularınızı asla kaçırmayın"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Doküman Yönetimi",
      description: "Tüm belgelerinize anında ulaşın"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Detaylı Raporlama",
      description: "Büronuzun performansını analiz edin"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Otomatik Hatırlatıcılar",
      description: "Önemli tarihleri sistem size hatırlatsın"
    }
  ];

  const testimonials = [
    {
      name: "Av. Mehmet Kaya",
      firm: "Kaya Hukuk Bürosu",
      comment: "AvukatAjanda sayesinde büromuzdaki iş yükü %40 azaldı. Artık daha organize çalışıyoruz.",
      rating: 5
    },
    {
      name: "Av. Ayşe Demir",
      firm: "Demir & Ortakları",
      comment: "Müvekkil memnuniyetimiz arttı. Her şey dijital ve ulaşılabilir.",
      rating: 5
    },
    {
      name: "Av. Ali Yılmaz",
      firm: "Yılmaz Hukuk",
      comment: "Duruşma takibi ve hatırlatıcılar harika çalışıyor. Kesinlikle tavsiye ederim.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Marketing Header - Diğer sayfalarla uyumlu */}
      <MarketingHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Güvenli ve Hızlı Hukuk Yönetimi</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hukuk Büronuz İçin
              <span className="block text-primary-600 mt-2">Akıllı Çözüm</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin. 
              Hukuk büronuzun dijital dönüşümünü başlatın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-6">
                  Ücretsiz Deneyin
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-400 text-primary-700 hover:bg-primary-50">
                  Demo İzle
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500" />
                <span>Kredi kartı gerektirmez</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500" />
                <span>14 gün ücretsiz deneme</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500" />
                <span>İstediğiniz zaman iptal edin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600 mt-2">Aktif Büro</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">10K+</div>
              <div className="text-gray-600 mt-2">Yönetilen Dava</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">%99</div>
              <div className="text-gray-600 mt-2">Memnuniyet</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">7/24</div>
              <div className="text-gray-600 mt-2">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tek Platform, Tüm İhtiyaçlar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hukuk büronuzun tüm süreçlerini dijitalleştiren kapsamlı özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition border-gray-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-lg text-gray-600">
              Binlerce hukuk bürosu AvukatAjanda\'ya güveniyor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.firm}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="p-12 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hukuk Büronuzu Dijitalleştirmeye Hazır mısınız?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              14 gün ücretsiz deneme sürümüyle tüm özellikleri keşfedin. 
              Kredi kartı gerekmez.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Hemen Başlayın
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all">
                  Satış Ekibiyle Görüşün
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Marketing Footer - Diğer sayfalarla uyumlu */}
      <MarketingFooter />
    </div>
  );
}