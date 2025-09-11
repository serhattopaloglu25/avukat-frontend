'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Calendar, Receipt, TrendingUp, Clock } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/?auth=login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    { title: 'Toplam Müvekkil', value: '0', icon: Users, color: 'text-blue-600' },
    { title: 'Aktif Dava', value: '0', icon: FileText, color: 'text-green-600' },
    { title: 'Bu Ay Duruşma', value: '0', icon: Calendar, color: 'text-purple-600' },
    { title: 'Bekleyen Fatura', value: '0', icon: Receipt, color: 'text-orange-600' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hoş Geldiniz{user?.name ? `, ${user.name}` : ''}</h1>
        <p className="text-muted-foreground mt-2">
          Hukuk büronuzun dijital kontrol paneli
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Yaklaşan Duruşmalar
          </h2>
          <div className="text-center py-8 text-muted-foreground">
            Henüz duruşma bulunmuyor
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Son Aktiviteler
          </h2>
          <div className="text-center py-8 text-muted-foreground">
            Henüz aktivite bulunmuyor
          </div>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button onClick={() => router.push('/clients')}>
          <Users className="mr-2 h-4 w-4" />
          Müvekkil Ekle
        </Button>
        <Button onClick={() => router.push('/cases')} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Dava Ekle
        </Button>
        <Button onClick={() => router.push('/events')} variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Duruşma Planla
        </Button>
      </div>
    </div>
  );
}
