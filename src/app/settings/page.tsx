'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building, CreditCard, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ayarlar</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Profil Bilgileri</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input id="name" defaultValue="Av. Ahmet Yılmaz" />
            </div>
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" defaultValue="ahmet@example.com" />
            </div>
            <Button className="w-fit">Kaydet</Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Büro Bilgileri</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="office">Büro Adı</Label>
              <Input id="office" defaultValue="Yılmaz Hukuk Bürosu" />
            </div>
            <div>
              <Label htmlFor="address">Adres</Label>
              <Input id="address" defaultValue="İstanbul, Türkiye" />
            </div>
            <Button className="w-fit">Kaydet</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
