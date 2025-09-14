'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, File, X } from 'lucide-react';

export default function DocumentUploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      // TODO: Implement file upload
      console.log('Uploading file:', selectedFile.name);
      
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/documents');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Dosya yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Belge Yükle</h1>
          <p className="text-gray-600 mt-1">PDF, Word, Excel veya resim dosyası yükleyebilirsiniz</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* File Drop Zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-900">
                    Dosya seçmek için tıklayın
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Maks: 10MB)
                  </p>
                </label>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Additional Fields */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="case">Dava (Opsiyonel)</Label>
                  <select
                    id="case"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Dava seçin</option>
                    <option value="1">2024/123 - Boşanma Davası</option>
                    <option value="2">2024/456 - Kira Uyuşmazlığı</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="client">Müvekkil (Opsiyonel)</Label>
                  <select
                    id="client"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Müvekkil seçin</option>
                    <option value="1">Ahmet Yılmaz</option>
                    <option value="2">Ayşe Kaya</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push('/documents')}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Yükleniyor...' : 'Yükle'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}