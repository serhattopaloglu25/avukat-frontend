'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Shield, User, Activity, Clock, FileText, TrendingUp, Calendar,
  Search, Filter, ChevronLeft, ChevronRight, Eye, Edit, Trash2,
  UserPlus, LogIn, LogOut, Download, Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

// Mock data
const mockLogs = [
  {
    id: 1,
    action: 'create',
    entityType: 'client',
    entityId: '123',
    ip: '192.168.1.1',
    ua: 'Chrome/Windows',
    createdAt: new Date().toISOString(),
    user: { id: 1, name: 'Demo User', email: 'demo@avukatajanda.com' }
  }
];

const mockSummary = {
  actionCounts: [
    { action: 'create', count: 45 },
    { action: 'update', count: 32 },
    { action: 'delete', count: 8 }
  ],
  entityCounts: [
    { entityType: 'client', count: 25 },
    { entityType: 'case', count: 18 }
  ],
  activeUsers: [],
  dailyActivity: [
    { date: new Date().toISOString(), count: 15 }
  ]
};

export default function AuditPage() {
  const [logs, setLogs] = useState(mockLogs);
  const [summary, setSummary] = useState(mockSummary);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [dateRange, setDateRange] = useState('7');

  const getActionIcon = (action: string) => {
    const icons = {
      create: <UserPlus className="h-4 w-4 text-green-600" />,
      update: <Edit className="h-4 w-4 text-blue-600" />,
      delete: <Trash2 className="h-4 w-4 text-red-600" />,
      view: <Eye className="h-4 w-4 text-gray-600" />,
      login: <LogIn className="h-4 w-4 text-purple-600" />,
      upload: <Upload className="h-4 w-4 text-indigo-600" />
    };
    return icons[action as keyof typeof icons] || <Activity className="h-4 w-4" />;
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      create: 'Oluşturdu',
      update: 'Güncelledi',
      delete: 'Sildi',
      view: 'Görüntüledi',
      login: 'Giriş yaptı',
      upload: 'Yükledi'
    };
    return labels[action] || action;
  };

  const getEntityLabel = (entity: string) => {
    const labels: Record<string, string> = {
      client: 'Müvekkil',
      case: 'Dava',
      event: 'Etkinlik',
      invoice: 'Fatura',
      document: 'Belge'
    };
    return labels[entity] || entity;
  };

  const getUserDevice = (ua?: string) => {
    if (!ua) return '—';
    if (ua.includes('Mobile')) return '📱 Mobil';
    if (ua.includes('Tablet')) return '📱 Tablet';
    return '💻 Masaüstü';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Denetim Kayıtları</h1>
        <p className="text-gray-600">Sistem genelindeki tüm işlemleri takip edin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <p className="text-2xl font-bold">{summary?.actionCounts?.reduce((a, b) => a + b.count, 0) || 0}</p>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <User className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{summary?.activeUsers?.length || 0}</p>
                <p className="text-sm text-gray-600">Aktif Kullanıcı</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Activity className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{summary?.dailyActivity?.[0]?.count || 0}</p>
                <p className="text-sm text-gray-600">Bugünkü İşlem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="h-10 w-10 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-gray-600">Son Güncelleme</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filtreler:</span>
            </div>

            <div className="flex-1 min-w-[200px]">
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
