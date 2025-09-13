'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload,
  FileText,
  Download,
  Trash2,
  Search,
  Filter,
  Eye,
  File,
  FileImage,
  FileSpreadsheet,
  Folder,
  Plus,
  X
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import apiService from '@/lib/api';

interface Document {
  id: number;
  name: string;
  mimeType: string;
  size: number;
  key: string;
  createdAt: string;
  case?: {
    id: number;
    title: string;
    caseNo?: string;
  };
  client?: {
    id: number;
    name: string;
  };
}

export default function FilesPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCaseId, setUploadCaseId] = useState<string>('');
  const [uploadClientId, setUploadClientId] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDocuments();
  }, [page, search, selectedCaseId, selectedClientId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(selectedCaseId && { caseId: selectedCaseId.toString() }),
        ...(selectedClientId && { clientId: selectedClientId.toString() })
      });

      const response = await fetch(`${apiService.baseUrl}/api/documents?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Belgeler yüklenemedi');

      const data = await response.json();
      setDocuments(data.documents);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Belgeler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    if (uploadCaseId) formData.append('caseId', uploadCaseId);
    if (uploadClientId) formData.append('clientId', uploadClientId);

    try {
      const response = await fetch(`${apiService.baseUrl}/api/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Dosya yüklenemedi');
      }

      setUploadModalOpen(false);
      setSelectedFile(null);
      setUploadCaseId('');
      setUploadClientId('');
      fetchDocuments();
    } catch (error: any) {
      alert(error.message || 'Dosya yüklenemedi');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (id: number, name: string) => {
    try {
      const response = await fetch(`${apiService.baseUrl}/api/documents/${id}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('İndirme bağlantısı alınamadı');

      const data = await response.json();
      
      // Create download link
      const a = document.createElement('a');
      a.href = data.url;
      a.download = name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('İndirme hatası:', error);
      alert('Dosya indirilemedi');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" dosyasını silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`${apiService.baseUrl}/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Dosya silinemedi');
        return;
      }

      fetchDocuments();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Dosya silinemedi');
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage className="h-5 w-5" />;
    if (mimeType.includes('pdf')) return <FileText className="h-5 w-5 text-red-600" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) 
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    if (mimeType.includes('word')) return <FileText className="h-5 w-5 text-blue-600" />;
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Belgeler</h1>
          <p className="text-gray-600 mt-2">Dosya ve belge yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => router.push('/templates')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Şablonlar
          </Button>
          <Button 
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Dosya Yükle
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Dosya adı ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {selectedCaseId && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => setSelectedCaseId(null)}
                >
                  Dava Filtresi
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {selectedClientId && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => setSelectedClientId(null)}
                >
                  Müvekkil Filtresi
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Dosya Adı</TableHead>
                  <TableHead className="hidden sm:table-cell">Boyut</TableHead>
                  <TableHead className="hidden md:table-cell">Dava/Müvekkil</TableHead>
                  <TableHead className="hidden lg:table-cell">Yüklenme Tarihi</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      {getFileIcon(doc.mimeType)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500 sm:hidden">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatFileSize(doc.size)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        {doc.case && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer"
                            onClick={() => setSelectedCaseId(doc.case!.id)}
                          >
                            <Folder className="mr-1 h-3 w-3" />
                            {doc.case.title}
                          </Badge>
                        )}
                        {doc.client && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer"
                            onClick={() => setSelectedClientId(doc.client!.id)}
                          >
                            {doc.client.name}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(doc.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(doc.id, doc.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(doc.id, doc.name)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Henüz belge yüklenmemiş</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setUploadModalOpen(true)}
              >
                İlk Belgeyi Yükle
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dosya Yükle</DialogTitle>
            <DialogDescription>
              PDF, Word, Excel veya resim dosyası yükleyebilirsiniz (Max: 10MB)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Dosya Seç
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-1">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Dava (Opsiyonel)
              </label>
              <Input
                placeholder="Dava ID"
                value={uploadCaseId}
                onChange={(e) => setUploadCaseId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Müvekkil (Opsiyonel)
              </label>
              <Input
                placeholder="Müvekkil ID"
                value={uploadClientId}
                onChange={(e) => setUploadClientId(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setUploadModalOpen(false);
                  setSelectedFile(null);
                  setUploadCaseId('');
                  setUploadClientId('');
                }}
                disabled={uploading}
              >
                İptal
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? 'Yükleniyor...' : 'Yükle'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}