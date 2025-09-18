'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import pricingData from '@/data/pricing.json';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      
      <main className="pt-20">
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
                Şeffaf ve Adil Fiyatlandırma
              </h1>
              <p className="text-xl text-gray-600">
                Büronuzun ihtiyaçlarına uygun planı seçin. 14 gün ücretsiz deneyin, 
                kredi kartı gerektirmez.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingData.plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`rounded-2xl ${
                    plan.badge === 'En Popüler' 
                      ? 'border-2 border-primary shadow-xl' 
                      : 'border border-gray-200'
                  } p-8 h-full bg-white`}>
                    {plan.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                          plan.badge === 'En Popüler'
                            ? 'bg-primary text-white'
                            : 'bg-gray-900 text-white'
                        }`}>
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {plan.description}
                      </p>
                      
                      <div className="flex items-baseline justify-center gap-1">
                        {plan.price ? (
                          <>
                            {plan.originalPrice && (
                              <span className="text-2xl text-gray-400 line-through">
                                {pricingData.currency}{plan.originalPrice}
                              </span>
                            )}
                            <span className="text-5xl font-bold text-gray-900">
                              {pricingData.currency}{plan.price}
                            </span>
                            <span className="text-gray-600">/{pricingData.billingPeriod}</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-gray-900">
                            Özel Fiyatlama
                          </span>
                        )}
                      </div>
                      
                      {plan.trial && (
                        <p className="text-sm text-green-600 mt-2">
                          {plan.trial} gün ücretsiz deneme
                        </p>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.included.slice(0, 8).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.features.excluded.slice(0, 2).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 opacity-50">
                          <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500 text-sm line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className={`w-full ${
                        plan.badge === 'En Popüler'
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                      onClick={() => window.location.href = '/register'}
                    >
                      {plan.id === 'kurumsal' ? 'İletişime Geç' : 'Ücretsiz Başla'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Detaylı Plan Karşılaştırması
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Özellikler
                      </th>
                      {pricingData.plans.map((plan) => (
                        <th key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pricingData.comparison.features.map((feature) => (
                      <tr key={feature.name}>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {feature.name}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {feature.bireysel === '✓' ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : feature.bireysel === '—' ? (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-gray-700">{feature.bireysel}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {feature.buro === '✓' ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : feature.buro === '—' ? (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-gray-700">{feature.buro}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {feature.kurumsal === '✓' ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : feature.kurumsal === '—' ? (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-gray-700">{feature.kurumsal}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
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
                Sıkça Sorulan Sorular
              </h2>
              
              <div className="space-y-6">
                {pricingData.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Hemen Başlayın, Sonra Karar Verin
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                14 gün boyunca tüm özellikleri ücretsiz deneyin. 
                Kredi kartı bilgisi gerekmez.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => window.location.href = '/register'}
              >
                Ücretsiz Denemeye Başla
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
