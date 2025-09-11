'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function ClientsPage() {
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
        <h1 className="text-3xl font-bold">Müvekkiller</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Müvekkil
        </Button>
      </div>
      
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          Henüz müvekkil eklenmemiş
        </div>
      </Card>
    </div>
  );
}
