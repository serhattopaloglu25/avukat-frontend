'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    kvkkConsent: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.kvkkConsent) {
      alert('KVKK aydınlatma metnini onaylamanız gerekmektedir.');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        kvkkConsent: false
      });
    }, 1500);
  };

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
                İletişime Geçin
              </h1>
              <p className="text-xl text-gray-600">
                Sorularınız mı var? Size nasıl yardımcı olabileceğimizi öğrenmek için 
                bize ulaşın.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Mesaj Gönderin
                </h2>
                
                {success ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Mesajınız başarıyla gönderildi!
                    </h3>
                    <p className="text-green-700">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="ornek@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Konu *
                      </label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="Mesajınızın konusu"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mesaj *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Mesajınızı buraya yazın..."
                        className="w-full"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="kvkk"
                          checked={formData.kvkkConsent}
                          onCheckedChange={(checked) => 
                            setFormData({...formData, kvkkConsent: checked as boolean})
                          }
                          className="mt-1"
                        />
                        <label htmlFor="kvkk" className="text-sm text-gray-600 cursor-pointer">
                          <a href="/aydinlatma-metni" target="_blank" className="text-primary hover:underline">
                            KVKK Aydınlatma Metni
                          </a>
                          'ni okudum, anladım ve kişisel verilerimin işlenmesini kabul ediyorum. *
                        </label>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={loading || !formData.kvkkConsent}
                      className="w-full"
                    >
                      {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                    </Button>
                  </form>
                )}
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <p className="text-gray-600">+90 (212) 555 0123</p>
                      <p className="text-sm text-gray-500">Pazartesi - Cuma, 09:00 - 18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                      <p className="text-gray-600">destek@avukatajanda.com</p>
                      <p className="text-gray-600">bilgi@avukatajanda.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Ofis</h3>
                      <p className="text-gray-600">
                        Levent, Büyükdere Caddesi No:123<br />
                        34394 Şişli/İstanbul
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 10:00 - 14:00<br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Map Section */}
                <div className="mt-8 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <p className="text-gray-500">Harita Alanı</p>
                </div>
                
                {/* Support Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-3">
                    Destek Merkezi
                  </h3>
                  <p className="text-white/90 mb-4">
                    Sıkça sorulan sorular ve kullanım kılavuzları için 
                    destek merkezimizi ziyaret edebilirsiniz.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/destek'}
                    className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Destek Merkezi
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hızlı Yanıtlar
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                En sık sorulan sorulara hızlıca göz atın. Aradığınızı 
                bulamadıysanız, yukarıdaki formu kullanarak bize ulaşın.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/fiyatlandirma#faq" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Fiyatlandırma</h3>
                  <p className="text-sm text-gray-600">Plan özellikleri ve fiyatlar</p>
                </a>
                <a href="/ozellikler" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Özellikler</h3>
                  <p className="text-sm text-gray-600">Platform özellikleri</p>
                </a>
                <a href="/kvkk" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">KVKK</h3>
                  <p className="text-sm text-gray-600">Veri güvenliği politikaları</p>
                </a>
                <a href="/hakkimizda" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Hakkımızda</h3>
                  <p className="text-sm text-gray-600">Şirket ve ekip bilgileri</p>
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
