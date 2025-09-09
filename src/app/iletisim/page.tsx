'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';

const metadata: Metadata = {
  title: 'İletişim | AvukatAjanda - Bizimle İletişime Geçin',
  description: 'AvukatAjanda destek ekibi ile iletişime geçin. Sorularınız için bize ulaşın.',
  openGraph: {
    title: 'AvukatAjanda İletişim',
    description: 'Sorularınız için bizimle iletişime geçin',
    url: 'https://avukatajanda.com/iletisim',
  },
};

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Webhook varsa kullan
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK;

    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(console.error);
    } else {
      // Fallback: mailto
      const mailtoLink = `mailto:destek@avukatajanda.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Bizimle <span className="text-primary">İletişime Geçin</span>
              </h1>
              <p className="text-xl text-gray-600">
                Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Cards */}
        <section className="py-20">
          <Container>
            <div className="grid lg:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">E-posta</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:destek@avukatajanda.com" className="text-primary hover:underline">
                    destek@avukatajanda.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Telefon</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+905443252500" className="text-primary hover:underline">
                    0544 325 25 00
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Çalışma Saatleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pazartesi - Cuma
                    <br />
                    09:00 - 18:00
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Adres</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Levent, Büyükdere Cad.
                    <br />
                    34394 Şişli/İstanbul
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Bize Mesaj Gönderin</CardTitle>
                <p className="text-gray-600">Formu doldurun, en kısa sürede size dönüş yapalım.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Konu *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                    <p>
                      <strong>KVKK Aydınlatma:</strong> Formu doldurarak kişisel verilerinizin
                      işlenmesine ilişkin{' '}
                      <a href="/kvkk" className="text-primary hover:underline">
                        Aydınlatma Metni
                      </a>
                      'ni okuduğunuzu ve kabul ettiğinizi beyan edersiniz.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 w-5 h-5" />
                    Mesajı Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
        </section>
      </main>
      <Footer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AvukatAjanda',
            url: 'https://avukatajanda.com',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+90-544-325-2500',
              contactType: 'customer service',
              email: 'destek@avukatajanda.com',
              areaServed: 'TR',
              availableLanguage: ['Turkish'],
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Levent, Büyükdere Cad.',
              addressLocality: 'Şişli',
              addressRegion: 'İstanbul',
              postalCode: '34394',
              addressCountry: 'TR',
            },
          }),
        }}
      />
    </>
  );
}
