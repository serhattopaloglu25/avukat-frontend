'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Briefcase,
} from 'lucide-react';
import { apiService } from '@/services/api.service';

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [formData, setFormData] = useState({
    client_id: '',
    case_number: '',
    title: '',
    status: 'active'
  });

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [casesData, clientsData] = await Promise.all([
        apiService.getCases({ 
          q: searchQuery, 
          ...(statusFilter && { status: statusFilter }) 
        }),
        apiService.getClients()
      ]);
      setCases(casesData);
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleAdd = async () => {
    try {
      await apiService.createCase({
        ...formData,
        client_id: parseInt(formData.client_id)
      });
      setShowAddDialog(false);
      setFormData({ client_id: '', case_number: '', title: '', status: 'active' });
      loadData();
    } catch (error: any) {
      alert(error.message || 'Dava eklenirken hata oluştu');
    }
  };

  const handleEdit = async () => {
    if (!selectedCase) return;
    try {
      await apiService.updateCase(selectedCase.id, {
        ...formData,
        client_id: parseInt(formData.client_id)
      });
      setShowEditDialog(false);
      setSelectedCase(null);
      setFormData({ client_id: '', case_number: '', title: '', status: 'active' });
      loadData();
    } catch (error: any) {
      alert(error.message || 'Dava güncellenirken hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu davayı silmek istediğinizden emin misiniz?')) return;
    try {
      await apiService.deleteCase(id);
      loadData();
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  const openEditDialog = (caseItem: any) => {
    setSelectedCase(caseItem);
    setFormData({
      client_id: caseItem.client_id.toString(),
      case_number: caseItem.case_number,
      title: caseItem.title,
      status: caseItem.status
    });
    setShowEditDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      active: 'default',
      pending: 'secondary',
      closed: 'outline'
    };
    const labels: any = {
      active: 'Aktif',
      pending: 'Beklemede',
      closed: 'Kapalı'
    };
    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Davalarım</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Dava
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Dava Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni dava bilgilerini girin
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Müvekkil</Label>
                    <Select
                      value={formData.client_id}
                      onValueChange={(value) => setFormData({...formData, client_id: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Müvekkil seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Dava No</Label>
                    <Input
                      value={formData.case_number}
                      onChange={(e) => setFormData({...formData, case_number: e.target.value})}
                      placeholder="2024/001"
                      required
                    />
                  </div>
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label>Durum</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({...formData, status: value})}
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
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleAdd}>Ekle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex gap-2 mt-4">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
              <Input
                placeholder="Dava ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tüm durumlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="closed">Kapalı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {cases.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Henüz dava kaydı bulunmuyor
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dava No</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Müvekkil</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-mono">{caseItem.case_number}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {caseItem.title}
                      </div>
                    </TableCell>
                    <TableCell>{caseItem.client?.name || '-'}</TableCell>
                    <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(caseItem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(caseItem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dava Düzenle</DialogTitle>
            <DialogDescription>
              Dava bilgilerini güncelleyin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Müvekkil</Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) => setFormData({...formData, client_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Müvekkil seçin" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Dava No</Label>
              <Input
                value={formData.case_number}
                onChange={(e) => setFormData({...formData, case_number: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Başlık</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              İptal
            </Button>
            <Button onClick={handleEdit}>Güncelle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
