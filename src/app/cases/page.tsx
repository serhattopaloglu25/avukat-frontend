'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus,
  Search, 
  Filter,
  Download,
  Scale,
  Briefcase,
  Calendar,
  User,
  FileText
} from 'lucide-react';

// Mock data - gerçek API hazır olana kadar kullanılacak
const mockCases = [
  {
    id: 1,
    case_number: 'D-2024-001',
    title: 'Boşanma Davası - Ahmet Yılmaz',
    client_name: 'Ahmet Yılmaz',
    status: 'active',
    description: 'Anlaşmalı boşanma davası',
    start_date: '2024-01-15',
    next_hearing: '2024-02-20'
  },
  {
    id: 2,
    case_number: 'C-2024-002',
    title: 'Kira Sözleşmesi İhtilafı',
    client_name: 'Mehmet Demir',
    status: 'active',
    description: 'Kiracı tahliye davası',
    start_date: '2024-01-20',
    next_hearing: '2024-02-25'
  },
  {
    id: 3,
    case_number: 'T-2024-003',
    title: 'Trafik Kazası Tazminatı',
    client_name: 'Ayşe Kaya',
    status: 'pending',
    description: 'Maddi ve manevi tazminat talebi',
    start_date: '2024-01-25',
    next_hearing: '2024-03-01'
  },
  {
    id: 4,
    case_number: 'M-2024-004',
    title: 'Miras Paylaşımı',
    client_name: 'Ali Öztürk',
    status: 'closed',
    description: 'Miras paylaşımı anlaşmazlığı',
    start_date: '2023-11-10',
    end_date: '2024-01-10'
  }
];

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState(mockCases);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'pending':
        return 'Beklemede';
      case 'closed':
        return 'Kapalı';
      default:
        return status;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = searchQuery === '' || 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Davalar</h1>
        <p className="text-gray-500">Tüm davalarınızı buradan yönetebilirsiniz</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Dava ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="pending">Beklemede</option>
            <option value="closed">Kapalı</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button 
            onClick={() => router.push('/cases/new')}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Dava
          </Button>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((caseItem) => (
          <Card 
            key={caseItem.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/cases/${caseItem.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{caseItem.case_number}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                  {getStatusText(caseItem.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {caseItem.client_name}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  {caseItem.description}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {caseItem.status === 'closed' 
                    ? `Kapanış: ${new Date(caseItem.end_date || '').toLocaleDateString('tr-TR')}`
                    : `Sonraki Duruşma: ${caseItem.next_hearing ? new Date(caseItem.next_hearing).toLocaleDateString('tr-TR') : 'Belirlenmedi'}`
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <Scale className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Dava bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || statusFilter !== 'all' 
              ? 'Arama kriterlerinize uygun dava bulunamadı.' 
              : 'Henüz hiç dava eklenmemiş.'}
          </p>
          {searchQuery === '' && statusFilter === 'all' && (
            <div className="mt-6">
              <Button 
                onClick={() => router.push('/cases/new')}
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                İlk Davayı Ekle
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Dava</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Davalar</CardTitle>
            <Scale className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter(c => c.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter(c => c.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kapanan</CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter(c => c.status === 'closed').length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}