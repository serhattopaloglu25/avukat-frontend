'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Tag,
  Briefcase,
  FileText,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import apiService from '@/lib/api';

interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  tcKimlik?: string;
  vergiNo?: string;
  address?: string;
  tags: string[];
  createdAt: string;
  _count?: {
    cases: number;
    invoices: number;
  };
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchClients();
  }, [page, search, selectedTags]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(selectedTags.length && { tags: selectedTags.join(',') })
      });

      const response = await fetch(`${apiService.baseUrl}/api/clients?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Müvekkiller yüklenemedi');

      const data = await response.json();
      setClients(data.clients);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error('Müvekkiller yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`${name} müvekkilini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`${apiService.baseUrl}/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Müvekkil silinemedi');
        return;
      }

      fetchClients();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Müvekkil silinemedi');
    }
  };

  const formatTcKimlik = (tc?: string) => {
    if (!tc) return '—';
    // Mask TC number: 123****5678
    return tc.slice(0, 3) + '****' + tc.slice(-4);
  };

  const allTags = Array.from(new Set(clients.flatMap(c => c.tags)));

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
          <h1 className="text-3xl font-bold text-gray-900">Müvekkiller</h1>
          <p className="text-gray-600 mt-2">Toplam {total} müvekkil</p>
        </div>
        <Button 
          onClick={() => router.push('/clients/new')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Yeni Müvekkil
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="İsim, e-posta, telefon veya TC/Vergi No ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-gray-400" />
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müvekkil</TableHead>
                  <TableHead className="hidden sm:table-cell">İletişim</TableHead>
                  <TableHead className="hidden md:table-cell">TC/Vergi No</TableHead>
                  <TableHead className="hidden lg:table-cell">Etiketler</TableHead>
                  <TableHead>Davalar</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          {client.address && (
                            <p className="text-sm text-gray-500 hidden sm:block">
                              <MapPin className="inline h-3 w-3 mr-1" />
                              {client.address.substring(0, 30)}...
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        {client.email && (
                          <p className="text-sm">
                            <Mail className="inline h-3 w-3 mr-1 text-gray-400" />
                            {client.email}
                          </p>
                        )}
                        {client.phone && (
                          <p className="text-sm">
                            <Phone className="inline h-3 w-3 mr-1 text-gray-400" />
                            {client.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        {client.tcKimlik && (
                          <p className="text-sm">
                            <CreditCard className="inline h-3 w-3 mr-1 text-gray-400" />
                            TC: {formatTcKimlik(client.tcKimlik)}
                          </p>
                        )}
                        {client.vergiNo && (
                          <p className="text-sm">
                            <CreditCard className="inline h-3 w-3 mr-1 text-gray-400" />
                            VN: {client.vergiNo}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {client.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <Briefcase className="inline h-3 w-3 mr-1 text-gray-400" />
                          {client._count?.cases || 0}
                        </div>
                        <div className="text-sm">
                          <FileText className="inline h-3 w-3 mr-1 text-gray-400" />
                          {client._count?.invoices || 0}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/clients/${client.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/clients/${client.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(client.id, client.name)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-gray-600">
                Sayfa {page} / {totalPages}
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