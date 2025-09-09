'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Bir şeyler yanlış gitti</h2>
        <p className="text-gray-600 mb-6">
          Beklenmeyen bir hata oluştu. Sorun devam ederse lütfen destek ekibimizle iletişime geçin.
        </p>
        <Button onClick={reset}>Tekrar Dene</Button>
      </div>
    </div>
  );
}
