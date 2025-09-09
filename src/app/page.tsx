import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Check, Users, Calendar, FileText, Shield, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
                Hukuk Büronuz İçin
                <span className="text-primary block mt-2">Dijital Dönüşüm</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Müvekkil yönetimi, dava takibi ve randevu hatırlatmalarını tek platformda toplayın. 
                Verimliliğinizi artırın, zamandan tasarruf edin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
                  <Button size="lg" className="min-w-[200px]">
                    14 Gün Ücretsiz Dene
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="min-w-[200px]">
                    Demo Talep Et
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">Kredi kartı gerektirmez</p>
            </div>
          </Container>
        </section>

        {/* Trust Section */}
        <section className="py-12 bg-white border-y">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Aktif Kullanıcı</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-gray-600">Uptime Garantisi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">7/24</div>
                <div className="text-sm text-gray-600">Teknik Destek</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">256-bit</div>
                <div className="text-sm text-gray-600">SSL Şifreleme</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Tek Platform, Tüm İhtiyaçlarınız
              </h2>
              <p className="text-xl text-gray-600">
                Hukuk büronuzun dijital altyapısı için gereken her şey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Müvekkil Yönetimi</CardTitle>
                  <CardDescription>
                    Tüm müvekkil bilgilerinizi güvenli bir şekilde saklayın ve yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Detaylı müvekkil kartları</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>İletişim geçmişi takibi</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Dosya ve belge yönetimi</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <FileText className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Dava Takibi</CardTitle>
                  <CardDescription>
                    Tüm davalarınızı tek yerden takip edin ve yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Dava durumu takibi</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Duruşma takvimi</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Belge arşivleme</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Takvim & Hatırlatmalar</CardTitle>
                  <CardDescription>
                    Önemli tarihleri ve duruşmaları asla kaçırmayın
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Otomatik hatırlatmalar</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>SMS ve e-posta bildirimleri</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Takvim senkronizasyonu</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hukuk Büronuzu Dijitalleştirmeye Hazır mısınız?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                14 gün ücretsiz deneme süresi ile tüm özellikleri test edin
              </p>
              <Link href="/register" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
                <Button size="lg" variant="secondary">
                  Hemen Başla
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
