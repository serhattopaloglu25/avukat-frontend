'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FileText, Users, Calendar, FolderOpen, Receipt, BarChart3, Shield, Clock, Globe, Check } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Dava Takibi",
      description: "Tüm davalarınızı tek merkezden yönetin",
      details: [
        "Dava durumu ve aşama takibi",
        "Duruşma tarihleri ve notları",
        "Mahkeme evrak yönetimi",
        "Otomatik hatırlatmalar",
        "Dava takvimi görünümü"
      ]
    },
    {
      icon: Users,
      title: "Müvekkil Yönetimi",
      description: "Müvekkil bilgilerini güvenle saklayın",
      details: [
        "Detaylı müvekkil profilleri",
        "İletişim geçmişi kaydı",
        "Vekalet ve sözleşme takibi",
        "Müvekkil bazlı raporlama",
        "Toplu SMS ve e-posta"
      ]
    },
    {
      icon: Calendar,
      title: "Takvim & Hatırlatmalar",
      description: "Önemli tarihleri asla kaçırmayın",
      details: [
        "Akıllı duruşma takvimi",
        "SMS ve e-posta bildirimleri",
        "Google Calendar entegrasyonu",
        "Zamanaşımı takibi",
        "Ekip takvimi paylaşımı"
      ]
    },
    {
      icon: FolderOpen,
      title: "Dosya Yönetimi",
      description: "Belgelerinizi dijital arşivde saklayın",
      details: [
        "Bulut tabanlı depolama",
        "Dosya kategorilendirme",
        "Arama ve filtreleme",
        "Versiyon kontrolü",
        "256-bit şifreleme"
      ]
    },
    {
      icon: Receipt,
      title: "Fatura Yönetimi",
      description: "Finansal süreçlerinizi kolaylaştırın",
      details: [
        "Otomatik fatura oluşturma",
        "Vekalet ücreti hesaplama",
        "Tahsilat takibi",
        "Masraf yönetimi",
        "Mali rapor çıktıları"
      ]
    },
    {
      icon: BarChart3,
      title: "Raporlama & Analitik",
      description: "Büronuzun performansını ölçün",
      details: [
        "Dava istatistikleri",
        "Gelir-gider analizleri",
        "Müvekkil segmentasyonu",
        "Verimlilik raporları",
        "Excel'e aktarım"
      ]
    }
  ];

  const additionalFeatures = [
    { icon: Shield, text: "KVKK uyumlu güvenli altyapı" },
    { icon: Clock, text: "7/24 erişim imkanı" },
    { icon: Globe, text: "Mobil uyumlu responsive tasarım" }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hukuk Büronuz İçin <span className="text-primary">Komple Çözüm</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Modern teknoloji ile donatılmış, kullanımı kolay ve güvenli özellikleriyle 
                hukuk büronuzun tüm ihtiyaçlarını karşılayan dijital platform.
              </p>
              <Link href="/register">
                <Button size="lg" className="shadow-lg">
                  14 Gün Ücretsiz Dene
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-primary/5">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">
              Her Detay Düşünüldü
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {additionalFeatures.map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
                  <item.icon className="w-10 h-10 text-primary" />
                  <span className="text-lg font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20">
          <Container>
            <div className="bg-gradient-to-r from-primary to-blue-700 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Tüm Bu Özellikleri 14 Gün Ücretsiz Deneyin
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Kredi kartı bilgisi gerekmez, dilediğiniz zaman iptal edebilirsiniz.
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Hemen Başla →
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
