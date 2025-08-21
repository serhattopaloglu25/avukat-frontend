'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Calendar, FileText, BarChart3, Settings, LogOut, 
  Plus, Search, Bell, Menu, X, Home, Clock, TrendingUp,
  UserPlus, CalendarPlus, FolderPlus, DollarSign, AlertTriangle,
  CheckCircle, Filter, MoreHorizontal, Star, Phone, Mail,
  MapPin, Eye, Edit, Archive
} from 'lucide-react';
import Link from 'next/link';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastContact: string;
  status: 'active' | 'inactive';
  totalBilled: number;
}

interface Appointment {
  id: number;
  client: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Case {
  id: number;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'closed';
  nextHearing: string;
  priority: 'high' | 'medium' | 'low';
}

export default function ClioStyleDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - Clio tarzı
  const clients: Client[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '0532 123 45 67', lastContact: '2 gün önce', status: 'active', totalBilled: 15600 },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '0533 987 65 43', lastContact: '1 hafta önce', status: 'active', totalBilled: 8900 },
    { id: 3, name: 'Can Özkan', email: 'can@example.com', phone: '0534 567 89 01', lastContact: '3 gün önce', status: 'inactive', totalBilled: 22300 },
  ];

  const upcomingAppointments: Appointment[] = [
    { id: 1, client: 'Ahmet Yılmaz', time: 'Bugün 14:00', type: 'Danışmanlık', status: 'upcoming' },
    { id: 2, client: 'Ayşe Demir', time: 'Yarın 10:30', type: 'Duruşma Hazırlığı', status: 'upcoming' },
    { id: 3, client: 'Can Özkan', time: 'Cuma 16:00', type: 'İlk Görüşme', status: 'upcoming' },
  ];

  const activeCases: Case[] = [
    { id: 1, title: 'Boşanma Davası #2024-001', client: 'Ahmet Yılmaz', status: 'active', nextHearing: '25 Ağu 2024', priority: 'high' },
    { id: 2, title: 'İş Kazası Tazminatı', client: 'Ayşe Demir', status: 'pending', nextHearing: '30 Ağu 2024', priority: 'medium' },
    { id: 3, title: 'Ticaret Sözleşmesi', client: 'Can Özkan', status: 'active', nextHearing: '2 Eyl 2024', priority: 'low' },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Users, label: 'Müşteriler', href: '/dashboard/clients', count: clients.length },
    { icon: Calendar, label: 'Takvim', href: '/dashboard/calendar', count: upcomingAppointments.length },
    { icon: FileText, label: 'Davalar', href: '/dashboard/cases', count: activeCases.length },
    { icon: DollarSign, label: 'Faturalar', href: '/dashboard/billing' },
    { icon: BarChart3, label: 'Raporlar', href: '/dashboard/reports' },
    { icon: Settings, label: 'Ayarlar', href: '/dashboard/settings' },
  ];

  const stats = [
    { label: 'Bu Ay Kazanç', value: '₺47,280', change: '+12%', positive: true, icon: DollarSign },
    { label: 'Aktif Müşteri', value: clients.filter(c => c.status === 'active').length.toString(), change: '+3 bu ay', positive: true, icon: Users },
    { label: 'Yaklaşan Randevu', value: upcomingAppointments.length.toString(), change: 'Bu hafta', positive: null, icon: Calendar },
    { label: 'Aktif Dava', value: activeCases.filter(c => c.status === 'active').length.toString(), change: '2 acil', positive: false, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Clio-style Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AA</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">AvukatAjanda</div>
              <div className="text-xs text-gray-500">Hukuk Yönetim Sistemi</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Quick Create Button */}
        <div className="p-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
            <Plus size={18} />
            <span>Yeni Oluştur</span>
          </button>
        </div>

        <nav className="px-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                item.active 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <item.icon size={18} className="mr-3" />
                {item.label}
              </div>
              {item.count && (
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{user?.username?.charAt(0).toUpperCase() || 'A'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{user?.username || 'Admin'}</div>
              <div className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header - Clio Style */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Hoş geldiniz, {user?.username || 'Admin'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Müşteri, dava veya randevu arayın..."
                  className="pl-9 pr-4 py-2 w-80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards - Clio Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="text-gray-400" size={20} />
                  {stat.positive !== null && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Clients */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Son Müşteriler</h3>
                  <Link href="/dashboard/clients" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Tümünü Gör
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-xs text-gray-500">{client.lastContact}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">₺{client.totalBilled.toLocaleString()}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          client.status === 'active' ? 'text-green-700 bg-green-100' : 'text-gray-500 bg-gray-100'
                        }`}>
                          {client.status === 'active' ? 'Aktif' : 'Pasif'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Yaklaşan Randevular</h3>
                  <Link href="/dashboard/calendar" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Takvimi Aç
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{appointment.client}</div>
                        <div className="text-xs text-gray-500">{appointment.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{appointment.time}</div>
                        <div className="text-xs text-gray-500">Randevu</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  + Yeni Randevu Ekle
                </button>
              </div>
            </div>

            {/* Active Cases */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Aktif Davalar</h3>
                  <Link href="/dashboard/cases" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Tümünü Gör
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeCases.map((case_item) => (
                    <div key={case_item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">{case_item.title}</div>
                          <div className="text-xs text-gray-500">{case_item.client}</div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          case_item.priority === 'high' ? 'text-red-700 bg-red-100' :
                          case_item.priority === 'medium' ? 'text-yellow-700 bg-yellow-100' :
                          'text-green-700 bg-green-100'
                        }`}>
                          {case_item.priority === 'high' ? 'Acil' : 
                           case_item.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Sonraki duruşma: {case_item.nextHearing}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          case_item.status === 'active' ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'
                        }`}>
                          {case_item.status === 'active' ? 'Aktif' : 'Beklemede'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  + Yeni Dava Ekle
                </button>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bugünün Programı</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>3 Randevu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>1 Duruşma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>2 Deadline</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/calendar" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Detaylı takvimi görüntüle →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}