import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hukuk Büronuz için
              <span className="text-blue-600 block">Dijital Asistan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Dava takibi, müvekkil yönetimi ve randevu hatırlatmalarını tek platformda toplayın.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Ücretsiz Başla
              </Link>
              <Link href="/login" className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">📁 Dava Takibi</h3>
              <p className="text-gray-600">Tüm davalarınızı tek yerden yönetin.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">👥 Müvekkil Yönetimi</h3>
              <p className="text-gray-600">Müvekkil bilgilerini güvenle saklayın.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">📅 Takvim & Hatırlatmalar</h3>
              <p className="text-gray-600">Önemli tarihleri asla kaçırmayın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime Garantisi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">Frankfurt</div>
              <div className="text-gray-600">Veri Merkezi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">256-bit</div>
              <div className="text-gray-600">SSL Şifreleme</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
