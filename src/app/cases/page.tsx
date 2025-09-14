'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus,
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  AlertCircle,
  Filter,
  Download,
  Eye,
  Scale,
  Briefcase,
  Calendar,
  User,
  FileText,
  Clock
} from 'lucide-react';
import { apiService, type Case, type Client } from '@/services/api.service';

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    case_number: '',
    title: '',
    client_id: 0,
    status: 'active' as 'active' | 'pending' | 'closed',
    description: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load clients first
      const clientsResponse = await fetch('http://localhost:8000/api/clients');
      const clientsData = await clientsResponse.json();
      console.log('Loaded clients:', clientsData);
      setClients(clientsData || []);
      
      // Then load cases
      const casesResponse = await fetch('http://localhost:8000/api/cases');
      const casesData = await casesResponse.json();
      setCases(casesData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchQuery.trim()) params.search = searchQuery;
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const data = await apiService.getCases(params);
      setCases(data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Arama yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCase = async () => {
    try {
      setFormLoading(true);
      const newCase = await apiService.createCase(formData);
      setCases([newCase, ...cases]);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error creating case:', err);
      setError('Dava eklenirken bir hata oluştu.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditCase = async () => {
    if (!selectedCase) return;

    try {
      setFormLoading(true);
      const updatedCase = await apiService.updateCase(selectedCase.id!, formData);
      setCases(cases.map(c => c.id === selectedCase.id ? updatedCase : c));
      setIsEditDialogOpen(false);
      setSelectedCase(null);
      resetForm();
    } catch (err) {
      console.error('Error updating case:', err);
      setError('Dava güncellenirken bir hata oluştu.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCase = async () => {
    if (!selectedCase) return;

    try {
      setFormLoading(true);
      await apiService.deleteCase(selectedCase.id!);
      setCases(cases.filter(c => c.id !== selectedCase.id));
      setIsDeleteDialogOpen(false);
      setSelectedCase(null);
    } catch (err) {
      console.error('Error deleting case:', err);
      setError('Dava silinirken bir hata oluştu.');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditDialog = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setFormData({
      case_number: caseItem.case_number,
      title: caseItem.title,
      client_id: caseItem.client_id,
      status: caseItem.status,
      description: caseItem.description || '',
      start_date: caseItem.start_date || '',
      end_date: caseItem.end_date || ''
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      case_number: '',
      title: '',
      client_id: 0,
      status: 'active',
      description: '',
      start_date: '',
      end_date: ''
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'Aktif', variant: 'default' as const },
      pending: { label: 'Beklemede', variant: 'secondary' as const },
      closed: { label: 'Kapalı', variant: 'outline' as const }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const exportCases = () => {
    const csv = [
      ['Dava No', 'Başlık', 'Müvekkil', 'Durum', 'Başlangıç Tarihi', 'Bitiş Tarihi'],
      ...cases.map(c => [
        c.case_number,
        c.title,
        c.client?.name || '',
        c.status,
        formatDate(c.start_date),
        formatDate(c.end_date)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `davalar-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Davalar</h1>
          <p className="text-gray-600 mt-1">Tüm davalarınızı buradan yönetebilirsiniz</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportCases} disabled={cases.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Dava
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Dava Ekle</DialogTitle>
                <DialogDescription>
                  Dava bilgilerini girin
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="case_number">Dava No *</Label>
                  <Input
                    id="case_number"
                    value={formData.case_number}
                    onChange={(e) => setFormData({ ...formData, case_number: e.target.value })}
                    placeholder="Örn: 2024/123"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Dava başlığı"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client">Müvekkil *</Label>
                  <Select
                    value={formData.client_id ? formData.client_id.toString() : ''}
                    onValueChange={(value) => setFormData({ ...formData, client_id: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Müvekkil seçin" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="0" disabled>Müvekkil seçin</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id!.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="closed">Kapalı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start_date">Başlangıç Tarihi</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end_date">Bitiş Tarihi</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Dava hakkında detaylar..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  onClick={handleAddCase} 
                  disabled={!formData.case_number || !formData.title || !formData.client_id || formLoading}
                >
                  {formLoading ? 'Ekleniyor...' : 'Ekle'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Dava ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="closed">Kapalı</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} variant="secondary">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Dava</p>
                <p className="text-2xl font-bold">{cases.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif</p>
                <p className="text-2xl font-bold">
                  {cases.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Scale className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Beklemede</p>
                <p className="text-2xl font-bold">
                  {cases.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kapalı</p>
                <p className="text-2xl font-bold">
                  {cases.filter(c => c.status === 'closed').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dava Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {cases.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">Henüz dava eklenmemiş</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                İlk Davanızı Ekleyin
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dava No</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Müvekkil</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Başlangıç</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseItem) => (
                    <TableRow key={caseItem.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <span className="text-sm font-semibold">{caseItem.case_number}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{caseItem.title}</p>
                          {caseItem.description && (
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                              {caseItem.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{caseItem.client?.name || '-'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(caseItem.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span>{formatDate(caseItem.start_date)}</span>
                          </div>
                          {caseItem.end_date && (
                            <div className="text-xs text-gray-500 mt-1">
                              Bitiş: {formatDate(caseItem.end_date)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push(`/cases/${caseItem.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(caseItem)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(caseItem)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog - Similar structure as Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dava Düzenle</DialogTitle>
            <DialogDescription>
              Dava bilgilerini güncelleyin
            </DialogDescription>
          </DialogHeader>
          {/* Same form fields as Add Dialog */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleEditCase} disabled={formLoading}>
              {formLoading ? 'Güncelleniyor...' : 'Güncelle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Davayı Sil</DialogTitle>
            <DialogDescription>
              <strong>{selectedCase?.title}</strong> başlıklı davayı silmek istediğinizden emin misiniz?
              Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCase} 
              disabled={formLoading}
            >
              {formLoading ? 'Siliniyor...' : 'Sil'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}