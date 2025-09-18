'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  CreditCard, 
  BarChart3,
  Shield,
  Clock,
  Database
} from 'lucide-react';

const features = [
  {
    title: 'Müvekkil Yönetimi',
    description: 'Tüm müvekkil bilgilerini tek yerden yönetin. İletişim bilgileri, davalar ve geçmiş kayıtlar hızlıca erişilebilir.',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Dava Takibi',
    description: 'Aktif davalarınızı takip edin, duruşma tarihlerini planlayın ve dava dosyalarını organize edin.',
    icon: Briefcase,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Takvim & Duruşma',
    description: 'Duruşmalar, randevular ve önemli tarihler için akıllı takvim sistemi. Otomatik hatırlatmalar ile hiçbir şeyi kaçırmayın.',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Dosya Yönetimi',
    description: 'KVKK uyumlu güvenli dosya depolama. Belgelerinizi kategorize edin ve hızlıca erişin.',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Faturalama',
    description: 'Müvekkil faturalarını kolayca oluşturun, takip edin ve tahsilat süreçlerinizi yönetin.',
    icon: CreditCard,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    title: 'Raporlama',
    description: 'Detaylı raporlar ile büronuzun performansını analiz edin. Gelir, dava durumu ve müvekkil istatistikleri.',
    icon: BarChart3,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  }
];

const additionalFeatures = [
  {
    title: 'KVKK Uyumlu',
    description: 'Tüm veriler KVKK standartlarında',
    icon: Shield
  },
  {
    title: '7/24 Erişim',
    description: 'İstediğiniz yerden, istediğiniz zaman',
    icon: Clock
  },
  {
    title: 'Otomatik Yedekleme',
    description: 'Verileriniz güvende ve yedekli',
    icon: Database
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Her İhtiyacınız İçin Özellikler
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hukuk bürolarının dijital dönüşümü için tasarlanmış kapsamlı özellikler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-6`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="text-center text-white">
                <feature.icon className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
