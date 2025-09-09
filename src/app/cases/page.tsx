'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Calendar } from 'lucide-react';

interface Case {
  id: number;
  title: string;
  caseNumber?: string;
  court?: string;
  status: string;
  client?: { name: string };
  nextHearing?: string;
  createdAt: string;
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/cases', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setCases(data.cases || []);
      }
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="flex space-x-8">
              <a href="/dashboard" className="text-gray-500 hover:text-gray-900">
                Panel
              </a>
              <a href="/clients" className="text-gray-500 hover:text-gray-900">
                Müvekkiller
              </a>
              <a href="/cases" className="text-gray-900 font-medium">
                Davalar
              </a>
              <a href="/events" className="text-gray-500 hover:text-gray-900">
                Takvim
              </a>
            </nav>
            <Button onClick={() => router.push('/dashboard')} variant="ghost">
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Davalar</h1>
            <p className="text-gray-600">Dava listesi ve takibi</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Dava
          </Button>
        </div>

        {/* Cases Grid */}
        {cases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dava bulunamadı</h3>
              <p className="text-gray-500">Yeni dava ekleyerek başlayın</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {cases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{case_.title}</h3>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status === 'active' ? 'Aktif' : case_.status}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        {case_.caseNumber && <p>Dosya No: {case_.caseNumber}</p>}
                        {case_.court && <p>Mahkeme: {case_.court}</p>}
                        {case_.client && <p>Müvekkil: {case_.client.name}</p>}
                      </div>
                    </div>

                    {case_.nextHearing && (
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Duruşma
                        </div>
                        <p className="text-sm font-medium">
                          {new Date(case_.nextHearing).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
