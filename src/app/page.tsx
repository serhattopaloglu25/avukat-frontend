export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">AvukatAjanda</h1>
        <div className="space-x-4">
          <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded">Login</a>
          <a href="/register" className="px-6 py-3 bg-green-600 text-white rounded">Register</a>
          <a href="/clients" className="px-6 py-3 bg-gray-600 text-white rounded">Clients</a>
          <a href="/cases" className="px-6 py-3 bg-purple-600 text-white rounded">Cases</a>
        </div>
      </div>
    </main>
  );
}
