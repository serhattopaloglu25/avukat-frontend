'use client';

import { useState, useEffect } from 'react';
import { 
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Calendar,
  Search,
  Users,
  Briefcase,
  CalendarDays,
  Receipt,
  Clock,
  TrendingUp,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import apiService from '@/lib/api';

type ReportType = 'clients' | 'cases' | 'events' | 'invoices' | 'time-entries';
type ExportFormat = 'csv' | 'excel';

interface ReportConfig {
  title: string;
  icon: React.ReactNode;
  description: string;
  filters: string[];
}

const reportConfigs: Record<ReportType, ReportConfig> = {
  clients: {
    title: 'Müvekkil Raporu',
    icon: <Users className="h-5 w-5" />,
    description: 'Müvekkil listesi ve istatistikleri',
    filters: ['dateRange']
  },
  cases: {
    title: 'Dava Raporu',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Dava durumları ve detayları',
    filters: ['status', 'dateRange']
  },
  events: {
    title: 'Etkinlik Raporu',
    icon: <CalendarDays className="h-5 w-5" />,
    description: 'Duruşmalar ve toplantılar',
    filters: ['type', 'dateRange']
  },
  invoices: {
    title: 'Fatura Raporu',
    icon: <Receipt className="h-5 w-5" />,
    description: 'Faturalama ve tahsilat durumu',
    filters: ['status', 'dateRange']
  },
  'time-entries': {
    title: 'Zaman Takibi Raporu',
    icon: <Clock className="h-5 w-5" />,
    description: 'Çalışma saatleri ve ücretlendirme',
    filters: ['caseId', 'userId', 'dateRange']
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('clients');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [eventType, setEventType] = useState('');
  const [caseId, setCaseId] = useState('');
  const [userId, setUserId] = useState('');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Quick date presets
  const setDatePreset = (preset: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    switch (preset) {
      case 'this-month':
        setStartDate(new Date(year, month, 1).toISOString().split('T')[0]);
        setEndDate(new Date(year, month + 1, 0).toISOString().split('T')[0]);
        break;
      case 'last-month':
        setStartDate(new Date(year, month - 1, 1).toISOString().split('T')[0]);
        setEndDate(new Date(year, month, 0).toISOString().split('T')[0]);
        break;
      case 'this-year':
        setStartDate(new Date(year, 0, 1).toISOString().split('T')[0]);
        setEndDate(new Date(year, 11, 31).toISOString().split('T')[0]);
        break;
      case 'last-30-days':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
    }
  };

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        format: 'json',
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
        ...(eventType && { type: eventType }),
        ...(caseId && { caseId }),
        ...(userId && { userId })
      });

      const response = await fetch(`${apiService.baseUrl}/api/reports/${selectedReport}?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Rapor yüklenemedi');

      const data = await response.json();
      setPreviewData(Array.isArray(data) ? data.slice(0, 10) : []);
      setShowPreview(true);
    } catch (error) {
      console.error('Rapor önizleme hatası:', error);
      alert('Rapor önizlemesi yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: ExportFormat) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        format,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
        ...(eventType && { type: eventType }),
        ...(caseId && { caseId }),
        ...(userId && { userId })
      });

      const response = await fetch(`${apiService.baseUrl}/api/reports/${selectedReport}?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Rapor indirilemedi');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const extension = format === 'csv' ? 'csv' : 'xlsx';
      const filename = `${selectedReport}-${new Date().toISOString().split('T')[0]}.${extension}`;
      a.download = filename;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export hatası:', error);
      alert('Rapor indirilemedi');
    } finally {
      setLoading(false);
    }
  };

  const config = reportConfigs[selectedReport];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
        <p className="text-gray-600 mt-2">Verilerinizi analiz edin ve dışa aktarın</p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(reportConfigs).map(([key, conf]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all ${
              selectedReport === key ? 'ring-2 ring-primary' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedReport(key as ReportType)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedReport === key ? 'bg-primary text-white' : 'bg-gray-100'
                }`}>
                  {conf.icon}
                </div>
                <div>
                  <p className="font-medium">{conf.title}</p>
                  <p className="text-xs text-gray-500">{conf.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Range Filter */}
          {config.filters.includes('dateRange') && (
            <div>
              <Label className="mb-2 block">Tarih Aralığı</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDatePreset('this-month')}
                >
                  Bu Ay
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDatePreset('last-month')}
                >
                  Geçen Ay
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDatePreset('this-year')}
                >
                  Bu Yıl
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDatePreset('last-30-days')}
                >
                  Son 30 Gün
                </Button>
              </div>
            </div>
          )}

          {/* Status Filter */}
          {config.filters.includes('status') && (
            <div>
              <Label htmlFor="status" className="mb-2 block">Durum</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tümü</SelectItem>
                  {selectedReport === 'cases' && (
                    <>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="closed">Kapalı</SelectItem>
                      <SelectItem value="archived">Arşivlenmiş</SelectItem>
                    </>
                  )}
                  {selectedReport === 'invoices' && (
                    <>
                      <SelectItem value="draft">Taslak</SelectItem>
                      <SelectItem value="sent">Gönderildi</SelectItem>
                      <SelectItem value="paid">Ödendi</SelectItem>
                      <SelectItem value="overdue">Gecikmiş</SelectItem>
                      <SelectItem value="cancelled">İptal</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Event Type Filter */}
          {config.filters.includes('type') && (
            <div>
              <Label htmlFor="type" className="mb-2 block">Etkinlik Tipi</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tümü</SelectItem>
                  <SelectItem value="hearing">Duruşma</SelectItem>
                  <SelectItem value="meeting">Toplantı</SelectItem>
                  <SelectItem value="reminder">Hatırlatma</SelectItem>
                  <SelectItem value="deadline">Son Tarih</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Case ID Filter */}
          {config.filters.includes('caseId') && (
            <div>
              <Label htmlFor="caseId" className="mb-2 block">Dava ID</Label>
              <Input
                id="caseId"
                placeholder="Dava ID girin"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              />
            </div>
          )}

          {/* User ID Filter */}
          {config.filters.includes('userId') && (
            <div>
              <Label htmlFor="userId" className="mb-2 block">Kullanıcı ID</Label>
              <Input
                id="userId"
                placeholder="Kullanıcı ID girin"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={fetchPreview} disabled={loading}>
              <Search className="mr-2 h-4 w-4" />
              Önizle
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setStatus('');
                setEventType('');
                setCaseId('');
                setUserId('');
                setShowPreview(false);
              }}
            >
              Temizle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && previewData.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Önizleme (İlk 10 Kayıt)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {Object.keys(previewData[0] || {}).map(key => (
                      <th key={key} className="text-left p-2 font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i} className="border-b">
                      {Object.values(row).map((value: any, j) => (
                        <td key={j} className="p-2">
                          {typeof value === 'number' && value > 1000 
                            ? value.toLocaleString('tr-TR')
                            : value?.toString() || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {previewData.length === 10 && (
              <p className="text-sm text-gray-500 mt-2">
                * Tam raporda daha fazla kayıt bulunmaktadır
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Dışa Aktar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => exportReport('csv')}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              CSV Olarak İndir
            </Button>
            <Button
              onClick={() => exportReport('excel')}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel Olarak İndir
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Raporlar UTF-8 formatında ve Türkçe karakterleri destekleyecek şekilde oluşturulur
          </p>
        </CardContent>
      </Card>
    </div>
  );
}