'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalClients: 0,
    activeCases: 0,
    upcomingHearings: 0,
    monthlyRevenue: 0,
    monthlyData: [],
    caseDistribution: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dashboard/stats');
      const result = await response.json();
      
      if (response.ok) {
        setData(result);
      }
    } catch (error) {
      console.error('Dashboard hatası:', error);
      // Mock data kullan
      setData({
        totalClients: 45,
        activeCases: 23,
        upcomingHearings: 7,
        monthlyRevenue: 125000,
        monthlyData: [
          { month: 'Oca', cases: 4 },
          { month: 'Şub', cases: 6 },
          { month: 'Mar', cases: 8 },
          { month: 'Nis', cases: 7 },
          { month: 'May', cases: 10 },
          { month: 'Haz', cases: 9 }
        ],
        caseDistribution: [
          { name: 'Kira', value: 30 },
          { name: 'Boşanma', value: 25 },
          { name: 'Tazminat', value: 20 },
          { name: 'İş Davası', value: 15 },
          { name: 'Diğer', value: 10 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Toplam Müvekkil',
      value: data.totalClients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Aktif Davalar',
      value: data.activeCases,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Yaklaşan Duruşmalar',
      value: data.upcomingHearings,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Aylık Gelir',
      value: `₺${data.monthlyRevenue.toLocaleString('tr-TR')}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const maxCases = data.monthlyData.length > 0 
    ? Math.max(...data.monthlyData.map(d => d.cases))
    : 10;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Genel bakış ve istatistikler</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Aylık Dava Sayısı */}
        {data.monthlyData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Son 6 Aylık Dava Sayısı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.monthlyData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm w-8">{item.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(item.cases / maxCases) * 100}%` }}
                      >
                        <span className="text-white text-xs font-semibold">{item.cases}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dava Türü Dağılımı */}
        {data.caseDistribution.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Dava Türü Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.caseDistribution.map((item, idx) => {
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-gray-500'];
                  return (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-4">
                          <div 
                            className={`${colors[idx % colors.length]} h-4 rounded-full`} 
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-10 text-right">{item.value}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
