'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface FileListProps {
  clientId?: number;
  caseId?: number;
  refreshTrigger?: number;
}

export default function FileList({ clientId, caseId, refreshTrigger }: FileListProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, [clientId, caseId, refreshTrigger]);

  const fetchFiles = async () => {
    try {
      const params = new URLSearchParams();
      if (clientId) params.append('clientId', clientId.toString());
      if (caseId) params.append('caseId', caseId.toString());
      
      const response = await api.get(`/api/files?${params}`);
      setFiles(response.data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file: any) => {
    try {
      const response = await api.get(`/api/files/download/${file.id}`);
      window.open(response.data.url, '_blank');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu dosyayı silmek istediğinize emin misiniz?')) return;
    
    try {
      await api.delete(`/api/files/${id}`);
      fetchFiles();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  if (files.length === 0) {
    return <p className="text-gray-500">Henüz dosya yok</p>;
  }

  return (
    <div className="space-y-2">
      {files.map(file => (
        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB • {new Date(file.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload(file)}
              className="text-blue-600 hover:text-blue-800"
            >
              İndir
            </button>
            <button
              onClick={() => handleDelete(file.id)}
              className="text-red-600 hover:text-red-800"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
