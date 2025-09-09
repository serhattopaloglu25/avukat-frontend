'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Calendar, TrendingUp, Activity, Clock, LogOut, FolderOpen, Receipt } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('https://avukat-ajanda-backend.onrender.com/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Toplam Müvekkil', value: '24', icon: Users, change: '+12%', color: 'text-blue-600', href: '/clients' },
    { title: 'Aktif Dava', value: '18', icon: FileText, change: '+5%', color: 'text-green-600', href: '/cases' },
    { title: 'Bu Ay Duruşma', value: '7', icon: Calendar, change: '-2%', color: 'text-orange-600', href: '/events' },
    { title: 'Tahsilat Oranı', value: '%85', icon: TrendingUp, change: '+8%', color: 'text-purple-600', href: '/invoices' },
  ];

  const quickLinks = [
    { title: 'Müvekkiller', icon: Users, href: '/clients', color: 'bg-blue-500' },
    { title: 'Davalar', icon: FileText, href: '/cases', color: 'bg-green-500' },
    { title: 'Takvim', icon: Calendar, href: '/events', color: 'bg-orange-500' },
    { title: 'Dosyalar', icon: FolderOpen, href: '/files', color: 'bg-purple-500' },
    { title: 'Faturalar', icon: Receipt, href: '/invoices', color: 'bg-red-500' },
  ];

  const activities = [
    { type: 'client', text: 'Yeni müvekkil eklendi: Ahmet Yılmaz', time: '2 saat önce', icon: Users },
    { type: 'case', text: 'Dava güncellendi: 2024/123', time: '5 saat önce', icon: FileText },
    { type: 'event', text: 'Duruşma hatırlatması: Yarın 14:00', time: '1 gün önce', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AvukatAjanda</h1>
              <nav className="ml-10 flex space-x-4">
                <a href="/dashboard" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Panel
                </a>
                <a href="/clients" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Müvekkiller
                </a>
                <a href="/cases" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Davalar
                </a>
                <a href="/events" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Takvim
                </a>
                <a href="/files" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dosyalar
                </a>
                <a href="/invoices" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Faturalar
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Hoş geldin, {user?.name || user?.email}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Panel Özeti</h2>
          <p className="text-gray-600">Büronuzun genel durumunu buradan takip edebilirsiniz</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(stat.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}geçen aya göre
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => router.push(link.href)}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className={`p-3 rounded-full ${link.color} bg-opacity-10 mb-2`}>
                  <link.icon className={`w-6 h-6 ${link.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium">{link.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activity & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Son Aktiviteler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-1">
                      <activity.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Yaklaşan Duruşmalar
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/events')}
                >
                  Tümü
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium text-sm">Mehmet Demir - Boşanma Davası</p>
                  <p className="text-xs text-gray-600 mt-1">10 Ocak 2025, 14:00</p>
                  <p className="text-xs text-gray-500">İstanbul 3. Aile Mahkemesi</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-medium text-sm">ABC Ltd. - Ticari Dava</p>
                  <p className="text-xs text-gray-600 mt-1">12 Ocak 2025, 10:30</p>
                  <p className="text-xs text-gray-500">İstanbul 5. Ticaret Mahkemesi</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <p className="font-medium text-sm">Ayşe Kaya - Kira Davası</p>
                  <p className="text-xs text-gray-600 mt-1">15 Ocak 2025, 09:00</p>
                  <p className="text-xs text-gray-500">İstanbul 2. Sulh Hukuk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
