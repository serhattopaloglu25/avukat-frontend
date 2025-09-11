'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Shield, Clock, Users, BarChart, FileText, Zap, 
  Award, Check, ArrowRight, Star, TrendingUp, Lock
} from 'lucide-react';

export default function LandingPageV2() {
  const router = useRouter();

  const handleCTAClick = () => {
    router.push('/?auth=register');
  };

  const features = [
    {
      icon: Users,
      title: 'Müvekkil Yönetimi',
      desc: 'Tüm müvekkil bilgilerini tek merkezde organize edin',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      title: 'Dava Takibi',
      desc: 'Dava dosyalarını dijital ortamda güvenle saklayın',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Akıllı Ajanda',
      desc: 'Duruşma ve randevuları otomatik hatırlatmalarla takip edin',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Güvenli Altyapı',
      desc: '256-bit şifreleme ve KVKK uyumlu veri koruması',
      color: 'text-red-600'
    },
    {
      icon: BarChart,
      title: 'Detaylı Raporlama',
      desc: 'Büro performansınızı anlık olarak analiz edin',
      color: 'text-yellow-600'
    },
    {
      icon: Zap,
      title: 'Hızlı Erişim',
      desc: 'Mobil uyumlu arayüz ile her yerden erişim imkanı',
      color: 'text-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Av. Mehmet Yılmaz',
      firm: 'Yılmaz Hukuk Bürosu',
      content: 'AvukatAjanda sayesinde büro verimliliğimiz %40 arttı. Müvekkil takibi artık çok daha kolay.',
      rating: 5
    },
    {
      name: 'Av. Ayşe Kaya',
      firm: 'Kaya & Ortakları',
      content: 'Duruşma takibi ve otomatik hatırlatmalar hayatımızı kolaylaştırdı. Kesinlikle tavsiye ediyorum.',
      rating: 5
    },
    {
      name: 'Av. Ali Demir',
      firm: 'Demir Avukatlık',
      content: 'KVKK uyumlu yapısı ve güvenlik özellikleri bizi çok rahatlattı. Mükemmel bir platform.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - No header here, GlobalTopbar handles it */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-24 pb-20">
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:20px_20px] opacity-50" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  <span>Türkiye'nin #1 Hukuk Büro Yazılımı</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Hukuk Büronuzu
                  <span className="text-primary block">Geleceğe Taşıyın</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Müvekkil yönetiminden dava takibine, ajanda organizasyonundan 
                  faturalama sistemine kadar tüm büro süreçlerinizi tek platformda yönetin.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow"
                    onClick={handleCTAClick}
                  >
                    14 Gün Ücretsiz Başla
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Link href="/ozellikler">
                    <Button size="lg" variant="outline" className="text-lg px-8 w-full">
                      Canlı Demo
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-600" />
                    Kredi kartı gerekmez
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-600" />
                    5 dakikada kurulum
                  </span>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative z-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-8">
                  <div className="bg-white rounded-xl shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Bugünün Özeti</h3>
                      <span className="text-sm text-gray-500">10 Ocak 2025</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-gray-600">Duruşma</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600">7</div>
                        <div className="text-sm text-gray-600">Görüşme</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-600">12</div>
                        <div className="text-sm text-gray-600">Aktif Dava</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-600">₺45K</div>
                        <div className="text-sm text-gray-600">Tahsilat</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-semibold">ISO 27001</div>
                <div className="text-sm text-gray-600">Sertifikalı</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-semibold">KVKK</div>
                <div className="text-sm text-gray-600">Uyumlu</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-semibold">E-İmza</div>
                <div className="text-sm text-gray-600">Entegrasyonu</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <div className="font-semibold">%99.9</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Her İhtiyacınız İçin Bir Çözüm
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hukuk büronuzun tüm süreçlerini dijitalleştiren kapsamlı özelliklerimiz
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kullanıcılarımız Ne Diyor?
              </h2>
              <p className="text-xl text-gray-600">
                500+ hukuk bürosu AvukatAjanda'yı tercih ediyor
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.firm}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Hemen Başlayın, Farkı Görün
            </h2>
            <p className="text-xl mb-8 text-white/90">
              14 gün boyunca tüm özellikleri ücretsiz deneyin
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 shadow-lg hover:shadow-xl"
              onClick={handleCTAClick}
            >
              Ücretsiz Denemeye Başla
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">A</span>
                </div>
                <span className="text-xl font-bold">AvukatAjanda</span>
              </div>
              <p className="text-gray-400 text-sm">
                Hukuk büroları için yeni nesil yönetim platformu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/ozellikler" className="hover:text-white">Özellikler</Link></li>
                <li><Link href="/fiyatlandirma" className="hover:text-white">Fiyatlandırma</Link></li>
                <li><Link href="/entegrasyonlar" className="hover:text-white">Entegrasyonlar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/kvkk" className="hover:text-white">KVKK</Link></li>
                <li><Link href="/aydinlatma-metni" className="hover:text-white">Aydınlatma Metni</Link></li>
                <li><Link href="/uyelik-sozlesmesi" className="hover:text-white">Üyelik Sözleşmesi</Link></li>
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
