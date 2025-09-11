'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Calendar,
  TrendingUp,
  Star,
  Zap,
  Lock,
  Award,
  BarChart3,
  Globe,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPageV2() {
  const router = useRouter();

  const features = [
    {
      icon: Users,
      title: 'Müvekkil Yönetimi',
      description: 'Tüm müvekkil bilgilerini tek platformda organize edin',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      title: 'Dava Takibi',
      description: 'Dava dosyalarını dijital ortamda güvenle saklayın',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Duruşma Takvimi',
      description: 'Duruşma tarihlerini kaçırmayın, otomatik hatırlatmalar alın',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Zaman Takibi',
      description: 'Çalışma saatlerinizi kaydedin, faturalandırma kolaylaştırın',
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'Güvenli Saklama',
      description: 'Verileriniz 256-bit şifreleme ile güvende',
      color: 'text-red-600'
    },
    {
      icon: BarChart3,
      title: 'Detaylı Raporlar',
      description: 'Büronuzun performansını analiz edin',
      color: 'text-indigo-600'
    },
    {
      icon: Globe,
      title: 'Her Yerden Erişim',
      description: 'Web tabanlı, kurulum gerektirmez',
      color: 'text-teal-600'
    },
    {
      icon: Smartphone,
      title: 'Mobil Uyumlu',
      description: 'Telefon ve tabletten rahatlıkla kullanın',
      color: 'text-pink-600'
    },
    {
      icon: Zap,
      title: 'Hızlı ve Pratik',
      description: 'Kullanıcı dostu arayüz, hızlı işlem',
      color: 'text-yellow-600'
    }
  ];

  const testimonials = [
    {
      name: 'Av. Mehmet Yılmaz',
      role: 'Ceza Hukuku Uzmanı',
      content: 'AvukatAjanda sayesinde dosya takibim çok kolaylaştı. Artık hiçbir duruşmayı kaçırmıyorum.',
      rating: 5
    },
    {
      name: 'Av. Ayşe Demir',
      role: 'Aile Hukuku Uzmanı',
      content: 'Müvekkil bilgilerini organize etmek hiç bu kadar kolay olmamıştı. Harika bir platform.',
      rating: 5
    },
    {
      name: 'Av. Ali Kaya',
      role: 'Ticaret Hukuku Uzmanı',
      content: 'Zaman takibi özelliği faturalandırmayı çok kolaylaştırdı. Kesinlikle tavsiye ediyorum.',
      rating: 5
    }
  ];

  const stats = [
    { value: '1000+', label: 'Aktif Kullanıcı' },
    { value: '50K+', label: 'Yönetilen Dava' },
    { value: '99.9%', label: 'Çalışma Süresi' },
    { value: '4.9/5', label: 'Kullanıcı Puanı' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4" variant="outline">
                <Zap className="w-3 h-3 mr-1" />
                Yeni Nesil Hukuk Yönetimi
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Hukuk Büronuz İçin
              <br />
              <span className="text-primary">Akıllı Çözüm</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin. 
              Verimliliğinizi artırın, zamandan kazanın.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => router.push('/?auth=register')}
              >
                Ücretsiz Deneyin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => router.push('/demo')}
              >
                Demo İzle
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Kredi kartı gerekmez
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                14 gün ücretsiz
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                İptal kolaylığı
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 relative max-w-6xl mx-auto"
          >
            <div className="relative rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-24 h-24 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-gray-800">Dashboard Önizleme</p>
                  <p className="text-muted-foreground mt-2">Modern ve kullanıcı dostu arayüz</p>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 hidden sm:block">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold">ISO 27001</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 hidden sm:block">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold">256-bit Şifreleme</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Band */}
      <section className="border-y bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Her İhtiyacınız İçin Özellikler
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hukuk büronuzun dijital dönüşümü için gereken tüm araçlar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className={`inline-flex p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-xl text-muted-foreground">
              Binlerce avukat AvukatAjanda'yı tercih ediyor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hukuk Büronuzu Dijitalleştirin
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              14 gün ücretsiz deneme süresiyle AvukatAjanda'nın gücünü keşfedin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8"
                onClick={() => router.push('/?auth=register')}
              >
                Hemen Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white/20"
                onClick={() => router.push('/iletisim')}
              >
                Satış Ekibiyle Konuş
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-80">
              Kredi kartı bilgisi gerekmez • İstediğiniz zaman iptal edin
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
