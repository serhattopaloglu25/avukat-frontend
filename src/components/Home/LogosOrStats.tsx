'use client';

export default function LogosOrStats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Garantisi</div>
              <div className="text-sm text-gray-500 mt-1">Son 12 ay</div>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Frankfurt</div>
              <div className="text-gray-600">Veri Merkezi</div>
              <div className="text-sm text-gray-500 mt-1">GDPR Uyumlu</div>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">256-bit</div>
              <div className="text-gray-600">SSL Şifreleme</div>
              <div className="text-sm text-gray-500 mt-1">Banka seviyesi güvenlik</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
