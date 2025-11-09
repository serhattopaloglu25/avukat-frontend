'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DebugPanel() {
  const [storageData, setStorageData] = useState<any>({});

  const loadStorageData = () => {
    if (typeof window === 'undefined') return;

    const data: any = {};

    // Get all localStorage keys that start with avukatajanda_mock_
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('avukatajanda_mock_')) {
        try {
          const value = localStorage.getItem(key);
          data[key] = value ? JSON.parse(value) : null;
        } catch (e) {
          data[key] = localStorage.getItem(key);
        }
      }
    }

    setStorageData(data);
  };

  useEffect(() => {
    loadStorageData();
  }, []);

  const clearAllData = () => {
    if (confirm('Tüm localStorage verileri silinecek. Emin misiniz?')) {
      Object.keys(storageData).forEach(key => {
        localStorage.removeItem(key);
      });
      loadStorageData();
      window.location.reload();
    }
  };

  return (
    <Card className="mt-6 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-900 flex items-center justify-between">
          <span>🔧 Debug Console (LocalStorage)</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={loadStorageData}>
              Yenile
            </Button>
            <Button size="sm" variant="destructive" onClick={clearAllData}>
              Tümünü Temizle
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-orange-800">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">LocalStorage Bilgileri:</p>
            <pre className="bg-white p-4 rounded text-xs overflow-auto max-h-96">
              {JSON.stringify(storageData, null, 2)}
            </pre>
          </div>

          <div className="text-xs space-y-1 bg-white p-3 rounded">
            <p><strong>Not:</strong> Bu sayfa localStorage kullanır (geliştirme amaçlı)</p>
            <p>• Kayıtlar browser'ınızın localStorage'ında saklanır</p>
            <p>• Farklı browser/incognito mode'da görünmez</p>
            <p>• Production'da gerçek database kullanılmalıdır</p>
            <p>• Domain: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
