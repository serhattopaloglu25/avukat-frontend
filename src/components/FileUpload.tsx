'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface FileUploadProps {
  clientId?: number;
  caseId?: number;
  onUploadComplete: () => void;
}

export default function FileUpload({ clientId, caseId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Get signed URL
      const { data } = await api.post('/api/files/sign-upload', {
        name: file.name,
        mimeType: file.type,
        size: file.size
      });

      // 2. Upload to S3
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress((e.loaded / e.total) * 100);
        }
      };

      await new Promise((resolve, reject) => {
        xhr.onload = () => resolve(xhr);
        xhr.onerror = reject;
        xhr.open('PUT', data.uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });

      // 3. Finalize
      await api.post('/api/files/finalize', {
        key: data.key,
        name: file.name,
        mimeType: file.type,
        size: file.size,
        clientId,
        caseId
      });

      onUploadComplete();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Yükleme başarısız');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="mb-4">
      <label className="block">
        <span className="sr-only">Dosya seç</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50"
        />
      </label>
      {uploading && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">Yükleniyor... {Math.round(progress)}%</p>
        </div>
      )}
    </div>
  );
}
