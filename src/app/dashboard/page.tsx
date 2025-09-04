'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold">AvukatAjanda</h1>
              <div className="flex space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/clients" className="text-gray-700 hover:text-gray-900">
                  Clients
                </Link>
                <Link href="/cases" className="text-gray-700 hover:text-gray-900">
                  Cases
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/clients" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Clients</h2>
            <p className="text-gray-600">Manage your clients</p>
          </Link>
          <Link href="/cases" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Cases</h2>
            <p className="text-gray-600">Manage your cases</p>
          </Link>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
