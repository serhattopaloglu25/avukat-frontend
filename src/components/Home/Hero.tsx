'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center py-20 px-4">
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
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-3xl hover:bg-blue-700 transition-colors shadow-lg text-center"
              >
                Ücretsiz Başla
              </Link>
              
              <Link
                href="#features"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-3xl hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
              >
                Özellikleri İncele
              </Link>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                ✓ Kredi kartı gerektirmez
              </span>
              <span className="flex items-center gap-2">
                ✓ 5 dakikada kurulum
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">⚖️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Avukatlar İçin Tasarlandı</h2>
              <p className="text-gray-600">Modern, hızlı ve güvenli</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
