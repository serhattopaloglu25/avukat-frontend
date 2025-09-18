'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aa_cookie_consent_v1');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aa_cookie_consent_v1', 'true');
    setShowBanner(false);
    window.location.reload(); // Analytics'i yüklemek için
  };

  const handleReject = () => {
    localStorage.setItem('aa_cookie_consent_v1', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/20 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold mb-2">Çerez Kullanımı</h3>
            <p className="text-sm text-gray-600 mb-4">
              Web sitemizin performansını analiz etmek ve geliştirmek için çerezler kullanıyoruz. Bu
              çerezler, site kullanımınız hakkında anonim istatistikler toplar. KVKK kapsamında kişisel verileriniz korunmaktadır. Detaylı bilgi için{' '}
              <a href="/kvkk" className="text-primary hover:underline">
                KVKK Aydınlatma Metnimizi
              </a>{' '}
              inceleyebilirsiniz.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleAccept} size="sm">
                Kabul Et
              </Button>
              <Button onClick={handleReject} variant="outline" size="sm">
                Reddet
              </Button>
            </div>
          </div>
          <button
            onClick={handleReject}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </div>
  );
}
