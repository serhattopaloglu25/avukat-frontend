'use client';

import { useState, useEffect } from 'react';
import { 
  Shield,
  User,
  Activity,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  LogIn,
  LogOut,
  Download,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import apiService from '@/lib/api';

interface AuditLog {
  id: number;
  action: string;
  entityType: string;
  entityId?: string;
  ip?: string;
  ua?: string;
  meta?: any;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface AuditSummary {
  actionCounts: Array<{ action: string; count: number }>;
  entityCounts: Array<{ entityType: string; count: number }>;
  activeUsers: Array<{ user: any; count: number }>;
  dailyActivity: Array<{ date: string; count: number }>;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [dateRange, setDateRange] = useState('7');

  useEffect(() => {
    fetchAuditLogs();
    fetchSummary();
  }, [page, selectedAction, selectedEntity, dateRange]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
        ...(selectedAction && { action: selectedAction }),
        ...(selectedEntity && { entityType: selectedEntity })
      });

      const response = await fetch(`${apiService.baseUrl}/api/audit?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          alert('Bu sayfaya erişim yetkiniz yok. Sadece admin ve owner erişebilir.');
          return;
        }
        throw new Error('Denetim kayıtları yüklenemedi');
      }

      const data = await response.json();
      setLogs(data.logs);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error('Denetim kayıtları yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch(`${apiService.baseUrl}/api/audit/summary?days=${dateRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Özet yüklenemedi');

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Özet yüklenemedi:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'update': return <Edit className="h-4 w-4 text-blue-600" />;
      case 'delete': return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'view': return <Eye className="h-4 w-4 text-gray-600" />;
      case 'login': return <LogIn className="h-4 w-4 text-green-600" />;
      case 'logout': return <LogOut className="h-4 w-4 text-gray-600" />;
      case 'upload': return <Upload className="h-4 w-4 text-blue-600" />;
      case 'download': return <Download className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'create': 'Oluşturma',
      'update': 'Güncelleme',
      'delete': 'Silme',
      'view': 'Görüntüleme',
      'login': 'Giriş',
      'logout': 'Çıkış',
      'upload': 'Yükleme',
      'download': 'İndirme',
      'api_access': 'API Erişim'
    };
    return labels[action] || action;
  };

  const getEntityLabel = (entity: string) => {
    const labels: Record<string, string> = {
      'client': 'Müvekkil',
      'case': 'Dava',
      'event': 'Etkinlik',
      'invoice': 'Fatura',
      'document': 'Belge',
      'user': 'Kullanıcı'
    };
    return labels[entity] || entity;
  };

  const getUserDevice = (ua?: string) => {
    if (!ua) return 'Bilinmiyor';
    if (ua.includes('Mobile')) return '📱 Mobil';
    if (ua.includes('Tablet')) return '📱 Tablet';
    return '💻 Masaüstü';
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Denetim Kayıtları</h1>
          <p className="text-gray-600 mt-1">Sistem aktivitelerini izleyin ve denetleyin</p>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Toplam İşlem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-gray-500">Son {dateRange} gün</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En Aktif Kullanıcı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {summary.activeUsers[0]?.user?.name || '—'}
              </p>
              <p className="text-xs text-gray-500">
                {summary.activeUsers[0]?.count || 0} işlem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En Çok İşlem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {getActionLabel(summary.actionCounts[0]?.action || '')}
              </p>
              <p className="text-xs text-gray-500">
                {summary.actionCounts[0]?.count || 0} kez
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En Çok Erişilen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {getEntityLabel(summary.entityCounts[0]?.entityType || '')}
              </p>
              <p className="text-xs text-gray-500">
                {summary.entityCounts[0]?.count || 0} işlem
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Kullanıcı ara..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tüm İşlemler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm İşlemler</SelectItem>
                <SelectItem value="create">Oluşturma</SelectItem>
                <SelectItem value="update">Güncelleme</SelectItem>
                <SelectItem value="delete">Silme</SelectItem>
                <SelectItem value="view">Görüntüleme</SelectItem>
                <SelectItem value="login">Giriş</SelectItem>
                <SelectItem value="upload">Yükleme</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tüm Varlıklar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Varlıklar</SelectItem>
                <SelectItem value="client">Müvekkil</SelectItem>
                <SelectItem value="case">Dava</SelectItem>
                <SelectItem value="event">Etkinlik</SelectItem>
                <SelectItem value="invoice">Fatura</SelectItem>
                <SelectItem value="document">Belge</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Bugün</SelectItem>
                <SelectItem value="7">Son 7 Gün</SelectItem>
                <SelectItem value="30">Son 30 Gün</SelectItem>
                <SelectItem value="90">Son 90 Gün</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      {summary && summary.dailyActivity.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Günlük Aktivite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {summary.dailyActivity.map((day: any, i) => {
                const maxCount = Math.max(...summary.dailyActivity.map((d: any) => d.count));
                const height = (day.count / maxCount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${height}%` }}
                      title={`${day.date}: ${day.count} işlem`}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).toLocaleDateString('tr-TR', { 
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>İşlem Kayıtları</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zaman</TableHead>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>İşlem</TableHead>
                  <TableHead>Varlık</TableHead>
                  <TableHead className="hidden lg:table-cell">IP</TableHead>
                  <TableHead className="hidden xl:table-cell">Cihaz</TableHead>
                  <TableHead>Detay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      <div>
                        <p>{new Date(log.createdAt).toLocaleDateString('tr-TR')}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.createdAt).toLocaleTimeString('tr-TR')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.user ? (
                        <div>
                          <p className="font-medium">{log.user.name}</p>
                          <p className="text-xs text-gray-500">{log.user.email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-500">Sistem</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span>{getActionLabel(log.action)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getEntityLabel(log.entityType)}
                        {log.entityId && ` #${log.entityId}`}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {log.ip || '—'}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-sm">
                      {getUserDevice(log.ua)}
                    </TableCell>
                    <TableCell>
                      {log.meta && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            alert(JSON.stringify(log.meta, null, 2));
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-gray-600">
                Sayfa {page} / {totalPages} (Toplam {total} kayıt)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Önceki
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}