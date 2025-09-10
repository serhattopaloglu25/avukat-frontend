'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Eye, Users, Award, Shield, Clock } from 'lucide-react';

export default function HakkimizdaPage() {
  const values = [
    {
      icon: Shield,
      title: 'Güvenlik',
      description: 'Verilerinizi 256-bit şifreleme ve ISO 27001 standartlarıyla koruyoruz.'
    },
    {
      icon: Users,
      title: 'Müşteri Odaklılık',
      description: 'Kullanıcı deneyimini sürekli iyileştiriyor, geri bildirimlerinizi değerlendiriyoruz.'
    },
    {
      icon: Clock,
      title: 'Zaman Yönetimi',
      description: 'Büro süreçlerinizi optimize ederek verimliliğinizi %40 artırıyoruz.'
    },
    {
      icon: Award,
      title: 'Kalite',
      description: 'Sektördeki en güncel teknolojileri kullanarak kesintisiz hizmet sunuyoruz.'
    }
  ];

  const milestones = [
    { year: '2023', event: 'AvukatAjanda kuruldu' },
    { year: '2024', event: '100+ aktif büro' },
    { year: '2024', event: 'Mobil uygulama lansmanı' },
    { year: '2025', event: '500+ aktif büro ve 10.000+ dava yönetimi' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">AvukatAjanda</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="text-gray-900 font-medium">Hakkımızda</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">İletişim</Link>
            </div>

            <Link href="/login">
              <Button>Giriş Yap</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hukuk Bürolarının Dijital Dönüşüm Ortağı
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AvukatAjanda olarak, Türkiye'deki hukuk bürolarının teknoloji ile buluşmasını sağlıyor,
            verimliliği artırıyor ve büro yönetimini kolaylaştırıyoruz.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Misyonumuz</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Hukuk profesyonellerinin günlük iş yükünü hafifletmek, büro yönetimini dijitalleştirmek 
              ve avukatların asıl işleri olan hukuki danışmanlığa daha fazla zaman ayırmalarını sağlamak. 
              Teknolojinin gücüyle adalet sistemine katkıda bulunmak ve hukuk hizmetlerinin kalitesini 
              artırmak için çalışıyoruz.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Vizyonumuz</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Türkiye'nin ve bölgenin lider hukuk teknolojisi platformu olmak. Yapay zeka ve ileri 
              teknolojileri kullanarak hukuk sektöründe dijital dönüşümün öncüsü olmak. Her büyüklükteki 
              hukuk bürosunun erişebileceği, kullanımı kolay ve güvenilir çözümler sunarak sektörün 
              standartlarını belirlemek.
            </p>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600">İşimizin temelinde yatan ilkeler</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition">
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Yolculuğumuz</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2 px-8">
                  <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-primary font-bold text-lg">{milestone.year}</div>
                    <div className="text-gray-600">{milestone.event}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ekibimiz</h2>
            <p className="text-lg text-gray-600">
              Hukuk ve teknoloji alanında uzman, tutkulu bir ekip
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 leading-relaxed mb-8">
              AvukatAjanda ekibi, hukuk sektörünün ihtiyaçlarını derinden anlayan yazılım geliştiriciler, 
              hukuk danışmanları ve ürün tasarımcılarından oluşmaktadır. Ekibimiz, sürekli öğrenme ve 
              gelişim felsefesiyle hareket ederek, kullanıcılarımıza en iyi deneyimi sunmak için 
              çalışmaktadır.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Uzman Kadro</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-gray-600">Yıllık Deneyim</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">7/24</div>
                <div className="text-sm text-gray-600">Destek</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siz de Dijital Dönüşüm Yolculuğumuza Katılın
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            500+ hukuk bürosu AvukatAjanda ile büyüyor
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              14 Gün Ücretsiz Deneyin
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 AvukatAjanda. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
