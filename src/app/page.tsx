'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Hukuk Büronuz İçin
            <span className="text-blue-600 block mt-2">Akıllı Çözüm</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Müvekkil takibi, dava yönetimi ve ajanda organizasyonunu tek platformda birleştirin.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => router.push('/?auth=register')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ücretsiz Deneyin
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Demo İzle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Müvekkil Yönetimi</h3>
              <p className="text-gray-600">Tüm müvekkil bilgilerini organize edin</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Dava Takibi</h3>
              <p className="text-gray-600">Dava dosyalarını dijital ortamda saklayın</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Duruşma Takvimi</h3>
              <p className="text-gray-600">Duruşmaları kaçırmayın, hatırlatmalar alın</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
