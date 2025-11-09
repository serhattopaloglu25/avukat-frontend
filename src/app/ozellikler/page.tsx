'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  CreditCard, 
  BarChart3,
  Shield,
  Database,
  Bell,
  Globe,
  Smartphone,
  Lock
} from 'lucide-react';
import Image from 'next/image';

const featureCategories = [
  {
    title: 'Müvekkil Yönetimi',
    description: 'Müvekkillerinizi ve iletişim bilgilerini profesyonelce yönetin',
    icon: Users,
    details: [
      'Detaylı müvekkil profilleri oluşturma ve yönetme',
      'İletişim geçmişi ve notlar',
      'Müvekkil bazlı dosya ve belge organizasyonu',
      'Otomatik veri yedekleme ve koruma',
      'Hızlı arama ve filtreleme özellikleri'
    ],
    benefits: 'Müvekkil bilgilerinize anında erişin, iletişim geçmişini takip edin ve müvekkil memnuniyetini artırın. KVKK uyumlu veri saklama ile müvekkil bilgilerinin güvenliğini garanti altına alın.'
  },
  {
    title: 'Dava ve Dosya Takibi',
    description: 'Tüm davalarınızı tek merkezden organize edin',
    icon: Briefcase,
    details: [
      'Dava dosyası oluşturma ve takibi',
      'Duruşma takvimi entegrasyonu',
      'Evrak yönetimi ve kategorilendirme',
      'Dava durumu güncellemeleri',
      'İlgili taraflar ve vekalet yönetimi'
    ],
    benefits: 'Her davanın güncel durumunu takip edin, önemli tarihleri kaçırmayın. Dosya bazlı raporlama ile davalarınızın ilerleyişini analiz edin.'
  },
  {
    title: 'Takvim ve Duruşma Yönetimi',
    description: 'Randevularınızı ve duruşmalarınızı akıllıca planlayın',
    icon: Calendar,
    details: [
      'Akıllı takvim görünümü',
      'Duruşma hatırlatmaları',
      'Müvekkil randevuları',
      'Toplu etkinlik oluşturma',
      'Takvim senkronizasyonu'
    ],
    benefits: 'Duruşma ve randevularınızı asla kaçırmayın. Otomatik hatırlatmalar ile zamanınızı verimli kullanın.'
  },
  {
    title: 'Belge ve KVKK Yönetimi',
    description: 'Belgelerinizi güvenle saklayın ve paylaşın',
    icon: FileText,
    details: [
      'Güvenli belge depolama',
      'KVKK uyumlu veri işleme',
      'Belge şablonları',
      'Dijital imza desteği',
      'Versiyonlama ve geri alma'
    ],
    benefits: 'Tüm belgelerinizi KVKK standartlarında güvenle saklayın. Müvekkillerinizin verilerini koruyun ve yasal yükümlülüklerinizi yerine getirin.'
  },
  {
    title: 'Faturalama ve Tahsilat',
    description: 'Finansal süreçlerinizi kolaylaştırın',
    icon: CreditCard,
    details: [
      'Otomatik fatura oluşturma',
      'Tahsilat takibi',
      'Masraf yönetimi',
      'Ödeme hatırlatmaları',
      'Finansal raporlama'
    ],
    benefits: 'Faturalarınızı hızlıca oluşturun, tahsilatlarınızı takip edin. Büronuzun finansal durumunu anlık olarak görüntüleyin.'
  },
  {
    title: 'Raporlama ve Analitik',
    description: 'Büronuzun performansını detaylı analiz edin',
    icon: BarChart3,
    details: [
      'Detaylı performans raporları',
      'Müvekkil analizleri',
      'Dava istatistikleri',
      'Gelir-gider takibi',
      'Özelleştirilebilir dashboard'
    ],
    benefits: 'Büronuzun büyümesini takip edin, verimliliğinizi artırın. Veriye dayalı kararlar alarak büronuzu bir üst seviyeye taşıyın.'
  }
];

const additionalFeatures = [
  { icon: Shield, title: '%100 KVKK Uyumlu', desc: 'Yasal standartlarda veri güvenliği' },
  { icon: Database, title: 'Otomatik Yedekleme', desc: 'Verileriniz her zaman güvende' },
  { icon: Bell, title: 'Akıllı Bildirimler', desc: 'Önemli gelişmeleri kaçırmayın' },
  { icon: Globe, title: 'Her Yerden Erişim', desc: 'Web tabanlı, cihaz bağımsız' },
  { icon: Smartphone, title: 'Mobil Uyumlu', desc: 'Telefon ve tabletten erişim' },
  { icon: Lock, title: 'Gelişmiş Güvenlik', desc: '256-bit SSL şifreleme' }
];

export default function FeaturesPage() {
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
                Hukuk Büronuz İçin
                <span className="block text-primary mt-2">Kapsamlı Özellikler</span>
              </h1>
              <p className="text-xl text-gray-600">
                AvukatAjanda ile büronuzun tüm ihtiyaçlarını tek bir platformdan yönetin. 
                Modern, güvenli ve kullanımı kolay özelliklerimiziyle verimliliğinizi artırın.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {featureCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-20"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <category.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {category.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {category.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-900">Faydaları:</strong> {category.benefits}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center`}>
                    <category.icon className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Features Grid */}
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
                Ve Daha Fazlası
              </h2>
              <p className="text-lg text-gray-600">
                Büronuzun ihtiyaçlarını karşılayan ek özellikler
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl"
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
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
                Tüm Bu Özellikleri Ücretsiz Deneyin
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                14 gün boyunca tüm özelliklere sınırsız erişim. Kredi kartı gerektirmez.
              </p>
              <button 
                onClick={() => window.location.href = '/register'}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Hemen Başla
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
