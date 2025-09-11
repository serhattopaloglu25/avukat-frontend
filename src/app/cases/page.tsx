'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';

export default function CasesPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/?auth=login');
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Davalar</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          Yeni Dava
        </Button>
      </div>
      
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          Henüz dava eklenmemiş
        </div>
      </Card>
    </div>
  );
}
