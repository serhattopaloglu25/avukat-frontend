'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">AvukatAjanda</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/ozellikler" className="text-gray-600 hover:text-primary">Özellikler</Link>
              <Link href="/fiyatlandirma" className="text-gray-600 hover:text-primary">Fiyatlandırma</Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-primary">Hakkımızda</Link>
              <Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-primary">İletişim</Link>
              <Link href="/destek-merkezi" className="text-gray-600 hover:text-primary">Destek Merkezi</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Giriş Yap</Button>
              </Link>
              <Link href="/register">
                <Button>Ücretsiz Başla</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Hukuk Büronuz İçin<br />
            <span className="text-primary">Akıllı Çözüm</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek 
            platformda birleştirin. Hukuk büronuzun dijital dönüşümünü başlatın.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Ücretsiz Deneyin</Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">Demo İzle</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-gray-600">Aktif Büro</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-gray-600">Yönetilen Dava</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">%99</div>
              <div className="text-gray-600">Memnuniyet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">7/24</div>
              <div className="text-gray-600">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto text-center px-4">
          <Link href="/register">
            <Button size="lg" variant="secondary">Ücretsiz Başla</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
