'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            14 Gün Ücretsiz Deneme
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Hukuk büronuzu dijitalleştirmeye
            <span className="block text-primary mt-2">bugün başlayın</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Binlerce hukuk profesyoneli gibi siz de AvukatAjanda ile 
            verimliliğinizi artırın, müvekkillerinize daha iyi hizmet verin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => window.location.href = '/register'}
            >
              Hemen Başla
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => window.location.href = '/iletisim'}
            >
              İletişime Geç
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            Kredi kartı gerektirmez • KVKK uyumlu • İstediğiniz zaman iptal edin
          </p>
        </motion.div>
      </div>
    </section>
  );
}
