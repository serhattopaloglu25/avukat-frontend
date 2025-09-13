'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Receipt,
  Plus,
  Download,
  Search,
  Filter,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  FileText,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import apiService from '@/lib/api';

interface Invoice {
  id: number;
  invoiceNo: string;
  date: string;
  dueDate?: string;
  amount: number;
  tax?: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  paidAt?: string;
  client: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
  };
  creator?: {
    id: number;
    name: string;
    email: string;
  };
}

interface InvoiceSummary {
  totalDraft: number;
  totalSent: number;
  totalPaid: number;
  totalOverdue: number;
}

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState<InvoiceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, [page, selectedStatus]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      });

      const response = await fetch(`${apiService.baseUrl}/api/invoices?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Faturalar yüklenemedi');

      const data = await response.json();
      setInvoices(data.invoices);
      setSummary(data.summary);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error('Faturalar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`${apiService.baseUrl}/api/invoices/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Durum güncellenemedi');

      fetchInvoices();
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      alert('Fatura durumu güncellenemedi');
    }
  };

  const downloadPDF = async (id: number, invoiceNo: string) => {
    try {
      const response = await fetch(`${apiService.baseUrl}/api/invoices/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('PDF indirilemedi');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fatura-${invoiceNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      alert('PDF indirilemedi');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Taslak';
      case 'sent': return 'Gönderildi';
      case 'paid': return 'Ödendi';
      case 'overdue': return 'Gecikmiş';
      case 'cancelled': return 'İptal';
      default: return status;
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faturalar</h1>
          <p className="text-gray-600 mt-2">Faturalama ve tahsilat yönetimi</p>
        </div>
        <Button 
          onClick={() => router.push('/invoices/new')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Yeni Fatura
        </Button>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Taslak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(summary.totalDraft)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Gönderildi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(summary.totalSent)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Ödendi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(summary.totalPaid)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">
                Gecikmiş
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(summary.totalOverdue)}</p>
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
                  placeholder="Fatura no veya müvekkil adı ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
              >
                Tümü
              </Button>
              <Button
                variant={selectedStatus === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('draft')}
              >
                Taslak
              </Button>
              <Button
                variant={selectedStatus === 'sent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('sent')}
              >
                Gönderildi
              </Button>
              <Button
                variant={selectedStatus === 'paid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('paid')}
              >
                Ödendi
              </Button>
              <Button
                variant={selectedStatus === 'overdue' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('overdue')}
              >
                Gecikmiş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fatura No</TableHead>
                  <TableHead>Müvekkil</TableHead>
                  <TableHead className="hidden sm:table-cell">Tarih</TableHead>
                  <TableHead className="hidden md:table-cell">Vade</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNo}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.client.name}</p>
                        {invoice.client.email && (
                          <p className="text-sm text-gray-500 hidden sm:block">
                            {invoice.client.email}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatDate(invoice.date)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {invoice.dueDate ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {formatDate(invoice.dueDate)}
                        </div>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{formatCurrency(invoice.totalAmount)}</p>
                        <p className="text-xs text-gray-500">
                          +KDV {formatCurrency(invoice.tax || 0)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(invoice.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(invoice.status)}
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/invoices/${invoice.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => downloadPDF(invoice.id, invoice.invoiceNo)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            PDF İndir
                          </DropdownMenuItem>
                          {invoice.status === 'draft' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => router.push(`/invoices/${invoice.id}/edit`)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => updateInvoiceStatus(invoice.id, 'sent')}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Gönder
                              </DropdownMenuItem>
                            </>
                          )}
                          {invoice.status === 'sent' && (
                            <DropdownMenuItem
                              onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Ödendi Olarak İşaretle
                            </DropdownMenuItem>
                          )}
                          {(invoice.status === 'draft' || invoice.status === 'sent') && (
                            <DropdownMenuItem
                              onClick={() => updateInvoiceStatus(invoice.id, 'cancelled')}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              İptal Et
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {invoices.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Henüz fatura oluşturulmamış</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push('/invoices/new')}
              >
                İlk Faturayı Oluştur
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-gray-600">
                Sayfa {page} / {totalPages} (Toplam {total} fatura)
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