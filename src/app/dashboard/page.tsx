'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Calendar, FileText, BarChart3, Settings, LogOut, 
  Plus, Search, Bell, Menu, X, Home, Clock, TrendingUp,
  UserPlus, CalendarPlus, FolderPlus, Eye
} from 'lucide-react';
import Link from 'next/link';

interface User {
  id: number;
  username: string;
  email: string;
}

interface DashboardStats {
  totalClients: number;
  totalAppointments: number;
  totalCases: number;
  upcomingAppointments: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalAppointments: 0,
    totalCases: 0,
    upcomingAppointments: 0
  });

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // İstatistikleri getir (simulated data)
    setStats({
      totalClients: 24,
      totalAppointments: 12,
      totalCases: 8,
      upcomingAppointments: 3
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Users, label: 'Müşteriler', href: '/dashboard/clients' },
    { icon: Calendar, label: 'Randevular', href: '/dashboard/appointments' },
    { icon: FileText, label: 'Davalar', href: '/dashboard/cases' },
    { icon: BarChart3, label: 'Raporlar', href: '/dashboard/reports' },
    { icon: Settings, label: 'Ayarlar', href: '/dashboard/settings' },
  ];

  const quickActions = [
    { icon: UserPlus, label: 'Yeni Müşteri', description: 'Müşteri bilgilerini ekleyin', color: 'from-blue-500 to-blue-600' },
    { icon: CalendarPlus, label: 'Randevu Oluştur', description: 'Yeni randevu planlayın', color: 'from-green-500 to-green-600' },
    { icon: FolderPlus, label: 'Dava Ekle', description: 'Yeni dava dosyası açın', color: 'from-purple-500 to-purple-600' },
    { icon: Eye, label: 'Bugünün Randevuları', description: 'Günlük programınızı görün', color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivities = [
    { type: 'appointment', text: 'Ahmet Yılmaz ile randevu oluşturuldu', time: '2 saat önce' },
    { type: 'client', text: 'Yeni müşteri eklendi: Ayşe Demir', time: '4 saat önce' },
    { type: 'case', text: 'Dava #2024-001 güncellendi', time: '6 saat önce' },
    { type: 'appointment', text: 'Randevu tamamlandı: Can Özkan', time: '1 gün önce' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-800">AvukatAjanda</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                item.active 
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Arama yapın..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hoş geldiniz, {user?.username || 'Admin'}!
            </h2>
            <p className="text-gray-600">İşlerinizi yönetmek için kontrol panelinizi kullanın.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Müşteri</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">+12% bu ay</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bu Ay Randevu</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="text-green-600" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Clock className="text-orange-500" size={16} />
                <span className="text-sm text-orange-500 ml-1">{stats.upcomingAppointments} yaklaşan</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aktif Dava</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCases}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FileText className="text-purple-600" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">2 yeni bu hafta</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bu Ay Kazanç</p>
                  <p className="text-3xl font-bold text-gray-900">₺45,280</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <BarChart3 className="text-orange-600" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">+8% geçen aya göre</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.label}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Son Aktiviteler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'appointment' ? 'bg-blue-500' :
                      activity.type === 'client' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Tüm aktiviteleri görüntüle →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
