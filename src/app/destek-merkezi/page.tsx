'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, HelpCircle, FileText, CreditCard, Settings, Shield, Phone } from 'lucide-react';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

const categories = [
  {
    id: 'hesap',
    icon: Settings,
    title: 'Hesap ve Üyelik',
    faqs: [
      { q: 'Nasıl kayıt olabilirim?', a: 'Ana sayfadaki "Ücretsiz Başla" butonuna tıklayarak kayıt formunu doldurabilirsiniz. E-posta adresiniz ve şifrenizle hemen kullanmaya başlayabilirsiniz.' },
      { q: 'Şifremi unuttum, ne yapmalıyım?', a: 'Giriş sayfasında "Şifremi Unuttum" linkine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.' },
      { q: 'Hesabımı nasıl silebilirim?', a: 'Ayarlar > Hesap bölümünden hesap silme talebinde bulunabilirsiniz. KVKK kapsamında verileriniz güvenli şekilde silinecektir.' },
    ]
  },
  {
    id: 'faturalama',
    icon: CreditCard,
    title: 'Faturalama ve Ödemeler',
    faqs: [
      { q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeleriniz SSL ile güvenli şekilde işlenir.' },
      { q: 'Faturamı nasıl indirebilirim?', a: 'Ayarlar > Faturalama bölümünden tüm faturalarınıza erişebilir ve PDF olarak indirebilirsiniz.' },
      { q: 'Planımı nasıl değiştirebilirim?', a: 'Ayarlar > Abonelik bölümünden planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki faturalama döneminde geçerli olur.' },
    ]
  },
  {
    id: 'teknik',
    icon: HelpCircle,
    title: 'Teknik Destek',
    faqs: [
      { q: 'Hangi tarayıcıları destekliyorsunuz?', a: 'Chrome, Firefox, Safari ve Edge tarayıcılarının güncel versiyonlarını destekliyoruz. En iyi deneyim için Chrome öneriyoruz.' },
      { q: 'Mobil uygulama var mı?', a: 'Web uygulamamız mobil uyumludur. iOS ve Android uygulamalarımız yakında yayınlanacak.' },
      { q: 'Verilerim güvende mi?', a: '256-bit SSL şifreleme kullanıyoruz. Tüm verileriniz KVKK uyumlu olarak güvenli sunucularda saklanır ve günlük yedeklenir.' },
    ]
  },
  {
    id: 'kvkk',
    icon: Shield,
    title: 'KVKK ve Güvenlik',
    faqs: [
      { q: 'Kişisel verilerim nasıl korunuyor?', a: 'Tüm verileriniz 256-bit SSL şifreleme ile korunur ve KVKK standartlarına uygun olarak işlenir.' },
      { q: 'Veri ihlali durumunda ne olur?', a: 'KVKK gereği 72 saat içinde bilgilendirilirsiniz. Tüm güvenlik önlemlerimiz ISO 27001 sertifikalıdır.' },
      { q: 'Verilerimi nasıl silebilirim?', a: 'KVKK kapsamındaki veri silme hakkınızı kullanmak için destek@avukatajanda.com adresine başvurabilirsiniz.' },
    ]
  }
];

const allFaqs = categories.flatMap(cat => 
  cat.faqs.map(faq => ({ ...faq, category: cat.title }))
);

export default function SupportCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      faq.category === categories.find(c => c.id === selectedCategory)?.title;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
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
                Destek Merkezi
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Size nasıl yardımcı olabiliriz? Sık sorulan sorular ve çözümler.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Sorununuzu arayın..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-6 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 bg-white hover:border-primary/50'
                      }`}
                    >
                      <Icon className={`h-8 w-8 mb-3 ${
                        selectedCategory === category.id ? 'text-primary' : 'text-gray-600'
                      }`} />
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.faqs.length} soru</p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tümü ({allFaqs.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aradığınız soruyu bulamadınız mı?</p>
                    <p className="text-gray-500 mt-2">
                      <a href="/iletisim" className="text-primary hover:underline">
                        Bize ulaşın
                      </a>, size yardımcı olalım.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white border border-gray-200 rounded-xl"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        <svg
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            expandedFaq === faq.q ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFaq === faq.q && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{faq.a}</p>
                          <p className="text-sm text-gray-500 mt-2">Kategori: {faq.category}</p>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hala Yardıma mı İhtiyacınız Var?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Destek ekibimiz size yardımcı olmak için hazır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+905443252500"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +90 (544) 325 2500
                </a>
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  İletişim Formu
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
