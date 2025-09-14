'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Receipt, 
  Plus,
  TrendingUp,
  Clock,
  AlertCircle,
  Activity,
  FileText,
  DollarSign
} from 'lucide-react';
import { apiService } from '@/services';

interface DashboardStats {
  clientCount: number;
  activeCaseCount: number;
  nextHearing: {
    id: string;
    title: string;
    startAt: string;
    location?: string;
  } | null;
  unpaidInvoiceCount: number;
  totalCases: number;
  upcomingEvents: number;
  recentActivities: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

interface DashboardSummary {
  weeklyNewClients: number;
  weeklyNewCases: number;
  monthlyRevenue: number;
  pendingTasks: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsData = await apiService.getDashboardStats();
      
      // Map the data to match the expected format
      setStats({
        clientCount: statsData.total_clients || 0,
        activeCaseCount: statsData.active_cases || 0,
        totalCases: statsData.total_cases || 0,
        upcomingEvents: statsData.upcoming_events || 0,
        unpaidInvoiceCount: 0,
        nextHearing: null,
        recentActivities: []
      });
      
      setSummary({
        weeklyNewClients: 0,
        weeklyNewCases: 0,
        monthlyRevenue: 0,
        pendingTasks: 0
      });
    } catch (error) {
      console.error('Dashboard veri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityDescription = (activity: any) => {
    const actionMap: Record<string, string> = {
      'create': 'oluşturdu',
      'update': 'güncelledi',
      'delete': 'sildi',
      'view': 'görüntüledi'
    };

    const entityMap: Record<string, string> = {
      'client': 'Müvekkil',
      'case': 'Dava',
      'event': 'Etkinlik',
      'invoice': 'Fatura',
      'document': 'Belge'
    };

    return `${activity.user.name} ${entityMap[activity.entityType] || activity.entityType} ${actionMap[activity.action] || activity.action}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Hukuk büronuzun genel durumu</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border p-4">
        <h2 className="text-lg font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => router.push('/clients/new')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Yeni Müvekkil
          </Button>
          <Button 
            onClick={() => router.push('/cases/new')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Yeni Dava
          </Button>
          <Button 
            onClick={() => router.push('/events/new')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Yeni Etkinlik
          </Button>
          <Button 
            onClick={() => router.push('/invoices/new')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Yeni Fatura
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Müvekkil
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.clientCount || 0}</div>
            {summary && (
              <p className="text-xs text-muted-foreground mt-1">
                Bu hafta +{summary.weeklyNewClients} yeni
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktif Dava
            </CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeCaseCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Toplam {stats?.totalCases || 0} davadan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yaklaşan Duruşma
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {stats?.nextHearing ? (
              <div>
                <div className="text-lg font-semibold truncate">
                  {stats.nextHearing.title}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(stats.nextHearing.startAt)}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Yaklaşan duruşma yok
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bekleyen Fatura
            </CardTitle>
            <Receipt className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unpaidInvoiceCount || 0}</div>
            {summary && summary.monthlyRevenue > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Bu ay {formatCurrency(summary.monthlyRevenue)} tahsilat
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Haftalık Yeni Davalar
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.weeklyNewCases}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aylık Gelir
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(summary.monthlyRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bekleyen Görevler
              </CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.pendingTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Önümüzdeki 7 gün
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Son Aktiviteler
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentActivities && stats.recentActivities.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {activity.entityType === 'client' && <Users className="h-4 w-4 text-gray-400" />}
                    {activity.entityType === 'case' && <Briefcase className="h-4 w-4 text-gray-400" />}
                    {activity.entityType === 'event' && <Calendar className="h-4 w-4 text-gray-400" />}
                    {activity.entityType === 'invoice' && <Receipt className="h-4 w-4 text-gray-400" />}
                    {activity.entityType === 'document' && <FileText className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {getActivityDescription(activity)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Henüz aktivite bulunmuyor</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}