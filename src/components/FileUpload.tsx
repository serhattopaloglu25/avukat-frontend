'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  caseId?: number;
  onUploadComplete?: () => void;
}

export function FileUpload({ caseId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('token');

      // Get signed URL from backend
      const signResponse = await fetch('http://localhost:3000/files/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: file.name,
          mimeType: file.type,
          size: file.size,
          caseId,
        }),
      });

      if (!signResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileKey } = await signResponse.json();

      // Upload file to signed URL
      if (uploadUrl) {
        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
      }

      // Notify backend of successful upload
      await fetch('http://localhost:3000/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: file.name,
          key: fileKey || file.name,
          mimeType: file.type,
          size: file.size,
          caseId,
        }),
      });

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Dosya yükleme başarısız oldu');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <label htmlFor="file-upload">
        <Button asChild disabled={uploading}>
          <span>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Yükleniyor...' : 'Dosya Yükle'}
          </span>
        </Button>
      </label>
    </div>
  );
}
