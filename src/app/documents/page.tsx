'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Plus } from 'lucide-react';

const templates = [
  { id: 1, name: 'Vekâletname', type: 'legal' },
  { id: 2, name: 'Dava Dilekçesi', type: 'legal' },
  { id: 3, name: 'İcra Takip Talebi', type: 'legal' },
  { id: 4, name: 'Ücret Sözleşmesi', type: 'contract' },
];

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Belge Yönetimi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="p-6">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{template.name}</h3>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Önizle
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                İndir
              </Button>
            </div>
          </Card>
        ))}
        
        <Card className="p-6 border-dashed">
          <Button className="w-full h-full" variant="ghost">
            <Plus className="h-12 w-12" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
