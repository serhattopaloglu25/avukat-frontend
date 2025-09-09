'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, TrendingUp, Users, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/api/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    const token = localStorage.getItem('token');
    const url = `https://avukat-ajanda-backend.onrender.com/reports/export.csv?from=${dateRange.from}&to=${dateRange.to}`;
    
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (res.ok) {
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `report-${dateRange.from}-${dateRange.to}.csv`;
      a.click();
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
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="flex space-x-8">
              <a href="/dashboard" className="text-gray-500 hover:text-gray-900">Panel</a>
              <a href="/reports" className="text-gray-900 font-medium">Raporlar</a>
            </nav>
            <Button onClick={() => router.push('/dashboard')} variant="ghost">
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
            <p className="text-gray-600">Detaylı istatistikler ve raporlar</p>
          </div>
          <div className="flex space-x-4">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <Button onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              CSV İndir
            </Button>
          </div>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Müvekkil</CardTitle>
                  <Users className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_clients}</div>
                  <p className="text-xs text-gray-500">
                    Bu ay +{stats.new_clients_month} yeni
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Aktif Davalar</CardTitle>
                  <FileText className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.active_cases}</div>
                  <p className="text-xs text-gray-500">
                    Toplam {stats.total_cases} dava
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Yaklaşan Etkinlik</CardTitle>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.upcoming_events}</div>
                  <p className="text-xs text-gray-500">Önümüzdeki dönem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₺{stats.invoices_total_month?.toLocaleString('tr-TR') || 0}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stats.pending_invoices} bekleyen fatura
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Aylık Özet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Yeni Müvekkiller</span>
                    <span className="font-medium">{stats.new_clients_month}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Kapanan Davalar</span>
                    <span className="font-medium">{stats.closed_cases_month}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bekleyen Faturalar</span>
                    <span className="font-medium">{stats.pending_invoices}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
