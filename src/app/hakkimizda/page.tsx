'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Güven',
    description: 'Müvekkil bilgilerinin güvenliği ve gizliliği bizim için önceliklidir. KVKK uyumlu sistemimizle verileriniz güvende.'
  },
  {
    icon: Heart,
    title: 'Müşteri Odaklılık',
    description: 'Kullanıcılarımızın ihtiyaçlarını dinler, geri bildirimlerini değerlendirip sürekli kendimizi geliştiririz.'
  },
  {
    icon: Zap,
    title: 'İnovasyon',
    description: 'Hukuk sektörünün dijital dönüşümüne öncülük eder, en yeni teknolojileri büronuzun hizmetine sunarız.'
  },
  {
    icon: Users,
    title: 'İşbirliği',
    description: 'Avukatlar ve hukuk büroları ile yakın işbirliği içinde çalışarak, gerçek ihtiyaçlara çözümler üretiriz.'
  }
];

const milestones = [
  { year: '2020', event: 'AvukatAjanda kuruldu' },
  { year: '2021', event: 'İlk 100 kullanıcıya ulaştık' },
  { year: '2022', event: 'KVKK tam uyumluluk sertifikası' },
  { year: '2023', event: 'Mobil uygulama lansmanı' },
  { year: '2024', event: '500+ büro bize güveniyor' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Hukuk Bürolarının
                <span className="block text-primary mt-2">Dijital Ortağı</span>
              </h1>
              <p className="text-xl text-gray-600">
                AvukatAjanda olarak, hukuk profesyonellerinin işlerini kolaylaştırmak 
                ve dijital dönüşümlerine destek olmak için çalışıyoruz.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Hukuk bürolarının günlük operasyonlarını dijitalleştirerek, 
                  avukatların asıl işlerine odaklanmalarını sağlamak. Müvekkil 
                  yönetiminden dava takibine, faturalama süreçlerinden raporlamaya 
                  kadar tüm ihtiyaçları tek platformda, güvenli ve kullanımı kolay 
                  bir şekilde sunmak.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-primary-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Vizyonumuz</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Türkiye'nin lider hukuk teknolojileri platformu olmak. Her ölçekten 
                  hukuk bürosunun dijital dönüşüm yolculuğunda güvenilir ortağı 
                  olarak, sektörün verimliliğini artırmak ve müvekkil memnuniyetini 
                  en üst düzeye çıkarmak için çözümler geliştirmek.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Değerlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Çalışma prensiplermiz ve müşterilerimize verdiğimiz sözler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center"
                >
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Yolculuğumuz
              </h2>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
                
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className={`w-5/12 ${
                      index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                    }`}>
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <span className="text-primary font-bold">{milestone.year}</span>
                        <p className="text-gray-700 mt-1">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* KVKK Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                KVKK Yaklaşımımız
              </h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-100 rounded-lg flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Veri Güvenliği En Üst Düzeyde
                      </h3>
                      <p className="text-gray-600">
                        Tüm veriler 256-bit SSL şifreleme ile korunur. Sunucularımız 
                        ISO 27001 sertifikalı veri merkezlerinde barındırılır.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Tam KVKK Uyumluluğu
                      </h3>
                      <p className="text-gray-600">
                        6698 sayılı Kişisel Verilerin Korunması Kanunu'na tam uyumlu 
                        olarak çalışır, düzenli denetimlerden geçeriz.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Veri İmha Politikası
                      </h3>
                      <p className="text-gray-600">
                        Yasal saklama süreleri sonunda veriler güvenli bir şekilde 
                        imha edilir. Tüm süreç kayıt altına alınır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-primary rounded-3xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Dijital Dönüşüm Yolculuğunuza Başlayın
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                500'den fazla hukuk bürosu gibi siz de AvukatAjanda'yı tercih edin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ücretsiz Deneyin
                </button>
                <button 
                  onClick={() => window.location.href = '/iletisim'}
                  className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  İletişime Geçin
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
