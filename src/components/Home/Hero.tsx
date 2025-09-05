'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Hukuk Büronuz için
              <span className="text-blue-600 block">Dijital Asistan</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Dava takibi, müvekkil yönetimi ve randevu hatırlatmalarını tek platformda toplayın. 
              Zamanınızı davalarınıza ayırın, gerisini bize bırakın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-3xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg text-center"
                aria-label="Ücretsiz hesap oluştur"
              >
                Ücretsiz Başla
              </Link>
              
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-3xl hover:border-blue-600 hover:text-blue-600 transition-all text-center"
                aria-label="Demo videosu izle"
              >
                Demo İzle
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Kredi kartı gerektirmez
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                5 dakikada kurulum
              </span>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/dashboard-preview.png"
              alt="AvukatAjanda dashboard görünümü"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
