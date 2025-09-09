'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  FileText,
  Users,
  Calendar,
  FolderOpen,
  Receipt,
  BarChart3,
  Shield,
  Clock,
  Globe,
  Check,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Dava Takibi',
      description:
        'Tüm davalarınızı tek merkezden yönetin. Duruşma tarihleri ve otomatik hatırlatmalar.',
    },
    {
      icon: Users,
      title: 'Müvekkil Yönetimi',
      description:
        'Müvekkil bilgilerini güvenle saklayın. İletişim geçmişi ve dosya ilişkilendirme.',
    },
    {
      icon: Calendar,
      title: 'Akıllı Takvim',
      description: 'Önemli tarihleri kaçırmayın. E-posta ve SMS bildirimleri.',
    },
    {
      icon: FolderOpen,
      title: 'Dosya Yönetimi',
      description: 'Belgelerinizi bulutta güvenle saklayın. Hızlı arama ve erişim.',
    },
    {
      icon: Receipt,
      title: 'Faturalama',
      description: 'Kolay fatura oluşturma ve tahsilat takibi.',
    },
    {
      icon: BarChart3,
      title: 'Raporlama',
      description: 'Detaylı raporlar ve performans analizleri.',
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Hukuk Büronuz İçin
                <span className="text-primary block mt-2">Dijital Çözüm Ortağı</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dava takibi, müvekkil yönetimi ve ajanda özellikleriyle büronuzun verimliliğini
                artırın. Tüm süreçlerinizi tek platformdan yönetin.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="shadow-lg hover:shadow-xl">
                    14 Gün Ücretsiz Dene <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Demo İste
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Öne Çıkan Özellikler</h2>
              <p className="text-xl text-gray-600">Modern hukuk büroları için tasarlandı</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 bg-primary text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hemen Başlayın</h2>
              <p className="text-xl mb-8 text-blue-100">
                14 gün ücretsiz deneme. Kredi kartı gerekmez.
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="shadow-xl">
                  Ücretsiz Hesap Oluştur
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
