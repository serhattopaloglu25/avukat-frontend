'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bir Hata Oluştu
        </h2>
        <p className="text-gray-600 mb-6">
          Üzgünüz, bir şeyler yanlış gitti. Lütfen tekrar deneyin.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Ana Sayfaya Dön
          </Button>
          <Button onClick={reset}>
            Tekrar Dene
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left bg-gray-100 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">
              Hata Detayları (Geliştirici)
            </summary>
            <pre className="mt-2 text-xs overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}