import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, Building2, Briefcase, Check } from 'lucide-react';

export default function CozumlerPage() {
  const solutions = [
    {
      icon: User,
      title: "Bireysel Avukatlar",
      description: "Tek kişilik ofisler için basit ve etkili çözüm",
      features: [
        "Kolay kullanım arayüzü",
        "Temel dava takibi",
        "Müvekkil yönetimi",
        "Takvim ve hatırlatmalar",
        "Mobil erişim"
      ],
      recommended: "Başlangıç Planı"
    },
    {
      icon: Building2,
      title: "Küçük ve Orta Bürolar",
      description: "2-10 avukatlı bürolar için ekip çözümü",
      features: [
        "Çoklu kullanıcı desteği",
        "Ekip takvimi paylaşımı",
        "Görev atama ve takibi",
        "Gelişmiş raporlama",
        "Dosya paylaşımı"
      ],
      recommended: "Profesyonel Plan"
    },
    {
      icon: Briefcase,
      title: "Kurumsal Hukuk Büroları",
      description: "Büyük ölçekli firmalar için özelleştirilmiş çözüm",
      features: [
        "Sınırsız kullanıcı",
        "Departman yönetimi",
        "Özel raporlar ve analizler",
        "API entegrasyonu",
        "Özel eğitim ve destek"
      ],
      recommended: "Kurumsal Plan"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-16 lg:py-24">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Her Büyüklükte Büro İçin <span className="text-primary">Çözümler</span>
              </h1>
              <p className="text-xl text-gray-600">
                İster tek çalışın, ister büyük bir ekip olun. Size özel çözümümüz var.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <solution.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{solution.title}</CardTitle>
                    <CardDescription className="text-base">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-3">Önerilen:</p>
                      <p className="font-semibold text-primary mb-4">{solution.recommended}</p>
                      <Link href="/fiyatlandirma">
                        <Button variant="outline" className="w-full">
                          Planları İncele
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 bg-primary text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hangi Çözüm Size Uygun?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Emin değilseniz, uzmanlarımız size yardımcı olsun.
              </p>
              <Link href="/iletisim">
                <Button size="lg" variant="secondary">
                  Demo Talep Et
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
