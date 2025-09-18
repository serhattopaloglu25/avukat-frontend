'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/services/api.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DashboardContent() {
  const [stats, setStats] = useState({
    total_clients: 0,
    total_cases: 0,
    active_cases: 0,
    upcoming_events: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Toplam Müvekkil',
      value: stats.total_clients,
      icon: Users,
      color: 'bg-blue-500',
      link: '/clients'
    },
    {
      title: 'Toplam Dava',
      value: stats.total_cases,
      icon: Briefcase,
      color: 'bg-green-500',
      link: '/cases'
    },
    {
      title: 'Aktif Davalar',
      value: stats.active_cases,
      icon: FileText,
      color: 'bg-orange-500',
      link: '/cases?status=active'
    },
    {
      title: 'Yaklaşan Etkinlikler',
      value: stats.upcoming_events,
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/events'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link key={index} href={stat.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/clients/new" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Yeni Müvekkil</h2>
            <p className="text-gray-600">Yeni müvekkil kaydı oluştur</p>
          </Link>
          <Link href="/cases/new" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Yeni Dava</h2>
            <p className="text-gray-600">Yeni dava kaydı oluştur</p>
          </Link>
          <Link href="/events/new" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Yeni Etkinlik</h2>
            <p className="text-gray-600">Takvime etkinlik ekle</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
