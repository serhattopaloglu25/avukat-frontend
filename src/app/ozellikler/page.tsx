import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  FileText, Users, Calendar, FolderOpen, Receipt, BarChart3, 
  Shield, Clock, Globe, Check, ArrowRight, Lock, Cloud, RefreshCw 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Özellikler | AvukatAjanda - Hukuk Bürosu Yönetim Yazılımı',
  description: 'Dava takibi, müvekkil yönetimi, ajanda, dosya paylaşımı ve raporlama özellikleriyle hukuk büronuzun dijital dönüşümü.',
  openGraph: {
    title: 'AvukatAjanda Özellikleri',
    description: 'Modern hukuk bürosu yönetimi için ihtiyacınız olan tüm özellikler',
    url: 'https://avukatajanda.com/ozellikler',
  },
};

export default function OzelliklerPage() {
  const features = [
    {
      icon: FileText,
      title: "Dava Takibi",
      description: "Tüm davalarınızı tek merkezden yönetin. Duruşma tarihleri, evrak takibi ve otomatik hatırlatmalarla hiçbir detayı kaçırmayın.",
      details: [
        "Takvim entegrasyonu",
        "Duruşma hatırlatmaları",
        "Evrak yönetimi"
      ]
    },
    {
      icon: Users,
      title: "Müvekkil Yönetimi",
      description: "Müvekkil bilgilerini güvenle saklayın. İletişim geçmişi, dosya ilişkilendirme ve detaylı profil kartlarıyla profesyonel hizmet.",
      details: [
        "İletişim geçmişi",
        "Dosya ilişkilendirme",
        "Detaylı profiller"
      ]
    },
    {
      icon: Calendar,
      title: "Ajanda & Bildirimler",
      description: "Akıllı hatırlatma sistemi ile önemli tarihleri kaçırmayın. E-posta ve push bildirimlerle her zaman güncel kalın.",
      details: [
        "E-posta bildirimleri",
        "Push notifications",
        "Özelleştirilebilir hatırlatmalar"
      ]
    },
    {
      icon: FolderOpen,
      title: "Dosya Paylaşımı",
      description: "Güvenli dosya yönetimi ve paylaşımı. Erişim düzeyleri belirleyin, güvenli bağlantılar oluşturun.",
      details: [
        "Güvenli bağlantılar",
        "Erişim düzeyleri",
        "Versiyon kontrolü"
      ]
    },
    {
      icon: Receipt,
      title: "Fatura & Tahsilat",
      description: "Basit faturalama çözümü. Taslak oluşturun, PDF olarak kaydedin ve müvekkillerinize gönderin.",
      details: [
        "Taslak faturalar",
        "PDF dışa aktarım",
        "Tahsilat takibi"
      ]
    },
    {
      icon: BarChart3,
      title: "Raporlama & Arama",
      description: "Gelişmiş filtreleme ve akıllı arama özellikleriyle verilerinize anında ulaşın. Detaylı raporlar oluşturun.",
      details: [
        "Gelişmiş filtreleme",
        "Akıllı arama",
        "Özelleştirilebilir raporlar"
      ]
    }
  ];

  const steps = [
    { number: "1", title: "Kaydol", description: "Hızlı kayıt ile hesabınızı oluşturun" },
    { number: "2", title: "Dosyaları Ekle", description: "Müvekkil ve dava bilgilerinizi girin" },
    { number: "3", title: "Takvimi Yönet", description: "Duruşmaları takip edin, hatırlatmalar alın" }
  ];

  const trustFeatures = [
    { icon: Shield, text: "256-bit SSL şifreleme" },
    { icon: Cloud, text: "Bulut tabanlı güvenli depolama" },
    { icon: RefreshCw, text: "Günlük otomatik yedekleme" },
    { icon: Lock, text: "KVKK uyumlu altyapı" }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Avukat Ajanda
                <span className="block text-primary mt-2">Bürolar için akıllı iş takip ve müvekkil yönetimi</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Modern teknoloji ile hukuk büronuzun verimliliğini artırın. 
                Tüm süreçlerinizi tek platformdan yönetin.
              </p>
              <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  Ücretsiz Başla <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Güçlü Özellikler</h2>
              <p className="text-xl text-gray-600">Her detay, büronuzun ihtiyaçları düşünülerek tasarlandı</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nasıl Çalışır?</h2>
              <p className="text-xl text-gray-600">3 basit adımda büronuzu dijitalleştirin</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Trust Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Güvenlik & KVKK Uyumu</h2>
              <p className="text-xl text-gray-600">Verileriniz güvende, gönlünüz rahat</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustFeatures.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hemen Başlayın
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                14 gün ücretsiz deneme. Kredi kartı gerekmez.
              </p>
              <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
                <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl">
                  Ücretsiz Başla
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "AvukatAjanda",
            "description": "Hukuk büroları için dijital yönetim platformu",
            "brand": {
              "@type": "Brand",
              "name": "AvukatAjanda"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "lowPrice": "299",
              "offerCount": "3"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })
        }}
      />
    </>
  );
}
