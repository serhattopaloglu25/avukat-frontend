'use client';

export default function DashboardContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/clients" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Müvekkillerim</h2>
            <p className="text-gray-600">Müvekkil listesini görüntüle</p>
          </a>
          <a href="/cases" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Davalarım</h2>
            <p className="text-gray-600">Dava listesini görüntüle</p>
          </a>
          <a href="/events" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Takvim</h2>
            <p className="text-gray-600">Etkinlikleri görüntüle</p>
          </a>
        </div>
      </div>
    </div>
  );
}
