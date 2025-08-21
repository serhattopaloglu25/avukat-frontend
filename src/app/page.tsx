'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Calendar, Users, FileText, BarChart3, Shield, Clock, Star, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Akilli Randevu Sistemi",
      description: "cakisma kontrolu ile otomatik randevu yonetimi. Musterilerinizle kolay iletisim."
    },
    {
      icon: Users,
      title: "Musteri Yonetimi",
      description: "Tum musteri bilgilerini tek yerden yonetin. Detayli kayitlar ve hizli arama."
    },
    {
      icon: FileText,
      title: "Dava Takip Sistemi",
      description: "Davalarinizi, durusmalarinizi ve belgelerinizi sistematik olarak takip edin."
    },
    {
      icon: BarChart3,
      title: "Analitik Raporlar",
      description: "İs performansinizi analiz edin. Detayli raporlar ve istatistikler."
    },
    {
      icon: Shield,
      title: "Guvenli Veri Saklama",
      description: "Musteri bilgileri guvenle saklanir. KVKK uyumlu veri yonetimi."
    },
    {
      icon: Clock,
      title: "7/24 Erisim",
      description: "İstediginiz yerden, istediginiz zaman sisteminize erisin."
    }
  ];

  const testimonials = [
    {
      name: "Av. Mehmet Yilmaz",
      title: "Ticaret Hukuku Uzmani",
      content: "Avukat Ajanda sayesinde is sureclerim daha verimli. Musteri memnuniyeti artti.",
      rating: 5
    },
    {
      name: "Av. Ayse Demir",
      title: "Aile Hukuku Avukati",
      content: "Dava takibi hic bu kadar kolay olmamisti. Tum bilgilerim duzenli ve erisilebilir.",
      rating: 5
    },
    {
      name: "Av. Can ozkan",
      title: "Ceza Hukuku Uzmani",
      content: "Randevu sistemi mukemmel. Artik cifte rezervasyon sorunlari yasamiyorum.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
              <span className="text-white font-bold text-xl">AvukatAjanda</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">ozellikler</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Referanslar</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Fiyatlar</a>
              <Link href="/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Giris Yap
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setisMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/20 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white">ozellikler</a>
              <a href="#testimonials" className="block text-white/80 hover:text-white">Referanslar</a>
              <a href="#pricing" className="block text-white/80 hover:text-white">Fiyatlar</a>
              <Link href="/login" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg">
                Giris Yap
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Avukatlar İcin
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block">
                Akilli Ajanda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Musterilerinizi, randevularinizi ve davalarinizi tek platformda yonetin. 
              Hukuk pratiginizi dijitallestirin, verimliliginizi artirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>ucretsiz Deneyin</span>
                <ChevronRight size={20} />
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Demo İzleyin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Guclu ozellikler
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Avukatlik pratiginizi kolaylastiracak, zamandan tasarruf ettirecek akilli araclar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Musteri Yorumlari
            </h2>
            <p className="text-xl text-white/70">
              Avukat Ajandayi kullanan meslektaslarimizin deneyimleri
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hemen Baslayin
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Avukat Ajanda ile hukuk pratiginizi modernlestirin. 
            ucretsiz deneme surumu ile risksiz baslayin.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            ucretsiz Hesap Olusturun
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
              <span className="text-white font-bold text-xl">AvukatAjanda</span>
            </div>
            <p className="text-white/60">
              © 2024 AvukatAjanda. Tum haklari saklidir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
