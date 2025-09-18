'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Bireysel',
    price: '149',
    description: 'Tek avukat için ideal başlangıç',
    features: [
      '1 Kullanıcı',
      '50 Müvekkil',
      'Sınırsız Dava',
      '5 GB Depolama',
      'E-posta Desteği'
    ],
    cta: 'Ücretsiz Başla',
    popular: false
  },
  {
    name: 'Büro',
    price: '399',
    description: 'Küçük ve orta ölçekli bürolar için',
    features: [
      '5 Kullanıcı',
      'Sınırsız Müvekkil',
      'Sınırsız Dava',
      '50 GB Depolama',
      'Öncelikli Destek',
      'Gelişmiş Raporlama'
    ],
    cta: 'Ücretsiz Başla',
    popular: true
  },
  {
    name: 'Kurumsal',
    price: 'Özel',
    description: 'Büyük bürolar ve kurumlar için',
    features: [
      'Sınırsız Kullanıcı',
      'Sınırsız Müvekkil',
      'Sınırsız Dava',
      'Sınırsız Depolama',
      '7/24 Telefon Desteği',
      'Özel Entegrasyonlar',
      'SLA Garantisi'
    ],
    cta: 'İletişime Geç',
    popular: false
  }
];

export function PricingTeaser() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Size Uygun Plan Seçin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            14 gün ücretsiz deneme. Kredi kartı gerektirmez.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular 
                  ? 'border-2 border-primary shadow-xl scale-105' 
                  : 'border border-gray-200'
              } p-8 bg-white`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    En Popüler
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price === 'Özel' ? (
                    <span className="text-4xl font-bold text-gray-900">Özel Fiyat</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">₺{plan.price}</span>
                      <span className="text-gray-600">/ay</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
                onClick={() => {
                  if (plan.name === 'Kurumsal') {
                    window.location.href = '/iletisim';
                  } else {
                    window.location.href = '/register';
                  }
                }}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link 
            href="/fiyatlandirma" 
            className="text-primary hover:underline font-medium"
          >
            Detaylı fiyatlandırma bilgisi →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
