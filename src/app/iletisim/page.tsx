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
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Konu *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajınız *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-start">
                      <Checkbox
                        id="kvkk"
                        checked={formData.kvkkConsent}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, kvkkConsent: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <label htmlFor="kvkk" className="ml-3 text-sm text-gray-600">
                        <a href="/kvkk" className="text-primary hover:underline">KVKK aydınlatma metnini</a> 
                        {' '}okudum ve onaylıyorum.
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={loading}
                      >
                        {loading ? 'Gönderiliyor...' : 'Gönder'}
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                      >
                        Giriş Yap
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="default"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => window.location.href = '/register'}
                      >
                        Ücretsiz Başla
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    İletişim Bilgileri
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                        <p className="text-gray-600">+90 (212) 123 45 67</p>
                        <p className="text-gray-600">+90 (850) 123 45 67</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                        <p className="text-gray-600">info@avukatajanda.com</p>
                        <p className="text-gray-600">destek@avukatajanda.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                        <p className="text-gray-600">
                          Levent Mahallesi, Büyükdere Caddesi<br />
                          No: 123, Kat: 5, 34394<br />
                          Şişli / İstanbul
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                        <p className="text-gray-600">
                          Pazartesi - Cuma: 09:00 - 18:00<br />
                          Cumartesi: 09:00 - 13:00<br />
                          Pazar: Kapalı
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Sıkça Sorulan Sorular
                  </h3>
                  <div className="space-y-3">
                    <a href="/destek-merkezi" className="block text-primary hover:underline">
                      Ücretsiz deneme nasıl başlatılır?
                    </a>
                    <a href="/destek-merkezi" className="block text-primary hover:underline">
                      Hangi ödeme yöntemlerini kabul ediyorsunuz?
                    </a>
                    <a href="/destek-merkezi" className="block text-primary hover:underline">
                      Veri güvenliği nasıl sağlanıyor?
                    </a>
                    <a href="/destek-merkezi" className="block text-primary hover:underline">
                      Teknik destek nasıl alınır?
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}