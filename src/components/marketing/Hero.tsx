'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              KVKK Uyumlu & Güvenli
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Avukat Ajanda
              <span className="block text-primary mt-2">
                Ofisinizi tek panelden yönetin
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Müvekkil takibi, dava yönetimi ve randevu organizasyonu için 
              özel olarak tasarlanmış, KVKK uyumlu dijital çözüm.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                onClick={() => window.location.href = '/register'}
              >
                Ücretsiz Dene
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Demo İzle
              </Button>
            </div>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 pt-16 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">%100 KVKK Uyumlu</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Verileriniz güvende
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">%99.9 Uptime</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Kesintisiz hizmet
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">500+ Hukuk Bürosu</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Bize güveniyor
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
