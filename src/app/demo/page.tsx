'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Demo</Badge>
          <h1 className="text-4xl font-bold mb-4">
            AvukatAjanda'yı Keşfedin
          </h1>
          <p className="text-xl text-muted-foreground">
            5 dakikalık demo videomuzla tüm özellikleri görün
          </p>
        </div>

        <Card className="p-8">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg" />
            
            <Button
              size="lg"
              className="z-10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Duraklat
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Demo'yu Başlat
                </>
              )}
            </Button>

            {/* Video Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <Badge className="mb-2">01:23</Badge>
              <h3 className="font-semibold">Müvekkil Ekleme</h3>
              <p className="text-sm text-muted-foreground">
                Yeni müvekkil kaydı oluşturma
              </p>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <Badge className="mb-2">02:45</Badge>
              <h3 className="font-semibold">Dava Takibi</h3>
              <p className="text-sm text-muted-foreground">
                Dava dosyası açma ve yönetme
              </p>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <Badge className="mb-2">04:10</Badge>
              <h3 className="font-semibold">Takvim Kullanımı</h3>
              <p className="text-sm text-muted-foreground">
                Duruşma planlama ve hatırlatmalar
              </p>
            </Card>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Demo'yu İzlediniz mi?</h2>
          <p className="text-muted-foreground mb-6">
            Hemen ücretsiz deneme sürümünü başlatın
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = '/?auth=register'}>
              Ücretsiz Dene
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/iletisim'}>
              Soru Sorun
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
