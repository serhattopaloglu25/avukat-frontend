'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2 } from 'lucide-react';
import { apiService } from '@/services/api.service';

interface File {
  id: number;
  name: string;
  size: number;
  type?: string;
  mimeType?: string;
  createdAt?: string;
  created_at?: string;
}

interface FileListProps {
  caseId?: number;
}

export function FileList({ caseId }: FileListProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    try {
      const params = caseId ? { caseId } : undefined;
      const data = await apiService.getFiles(params);
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async (fileId: number) => {
    try {
      await apiService.deleteFile(fileId);
      setFiles(files.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576) + ' MB';
  };

  if (loading) return <div>Dosyalar yükleniyor...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dosyalar</CardTitle>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <p className="text-gray-500">Henüz dosya yüklenmemiş</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
