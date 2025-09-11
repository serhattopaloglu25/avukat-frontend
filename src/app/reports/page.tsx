'use client';

import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, FileText } from 'lucide-react';

export default function ReportsPage() {
  const stats = [
    { title: 'Toplam Dava', value: '156', icon: FileText, change: '+12%' },
    { title: 'Aktif Müvekkil', value: '89', icon: Users, change: '+5%' },
    { title: 'Aylık Gelir', value: '₺125,000', icon: TrendingUp, change: '+18%' },
    { title: 'Tahsilat Oranı', value: '%92', icon: BarChart3, change: '+3%' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Raporlar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-primary" />
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          );
        })}
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Aylık Gelir Grafiği</h2>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <BarChart3 className="h-24 w-24 text-gray-300" />
        </div>
      </Card>
    </div>
  );
}
