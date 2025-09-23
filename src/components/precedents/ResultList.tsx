'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  Building, 
  ExternalLink,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PrecedentResult {
  id: string;
  title: string;
  court: string;
  date: string;
  caseNumber: string;
  relevance: number;
  summary: string;
  keywords: string[];
  link?: string;
}

interface ResultListProps {
  results: PrecedentResult[];
  loading?: boolean;
  searchQuery?: string;
}

const allMockResults: PrecedentResult[] = [
  {
    id: '1',
    title: 'KVKK Aydınlatma Metni Eksikliği Davası',
    court: 'Yargıtay 11. Hukuk Dairesi',
    date: '2023-05-15',
    caseNumber: 'E.2023/1234 K.2023/5678',
    relevance: 95,
    summary: 'Veri sorumlusunun aydınlatma yükümlülüğünü yerine getirmemesi nedeniyle tazminat davası. KVKK kapsamında kişisel verilerin korunması.',
    keywords: ['KVKK', 'Aydınlatma Metni', 'Veri Sorumlusu', 'Tazminat'],
    link: 'https://karararama.yargitay.gov.tr'
  },
  {
    id: '2',
    title: 'Kira Sözleşmesi Tahliye Davası',
    court: 'Yargıtay 6. Hukuk Dairesi',
    date: '2023-03-20',
    caseNumber: 'E.2023/987 K.2023/654',
    relevance: 88,
    summary: 'Kira bedelinin ödenmemesi nedeniyle açılan tahliye davası. Kira sözleşmesi hükümleri.',
    keywords: ['Kira', 'Tahliye', 'Kira Sözleşmesi', 'TBK'],
    link: 'https://karararama.yargitay.gov.tr'
  },
  {
    id: '3',
    title: 'Boşanma ve Nafaka Davası',
    court: 'Yargıtay 2. Hukuk Dairesi',
    date: '2023-07-10',
    caseNumber: 'E.2023/456 K.2023/789',
    relevance: 75,
    summary: 'Evlilik birliğinin temelinden sarsılması nedeniyle boşanma. Yoksulluk nafakası talebi.',
    keywords: ['Boşanma', 'Nafaka', 'TMK', 'Evlilik'],
    link: 'https://karararama.yargitay.gov.tr'
  },
  {
    id: '4',
    title: 'İş Kazası Tazminat Davası',
    court: 'Yargıtay 21. Hukuk Dairesi',
    date: '2023-06-15',
    caseNumber: 'E.2023/111 K.2023/222',
    relevance: 82,
    summary: 'İş kazası sonucu maddi ve manevi tazminat talebi. İşveren sorumluluğu.',
    keywords: ['İş Kazası', 'Tazminat', 'İş Güvenliği', 'Manevi Tazminat'],
    link: 'https://karararama.yargitay.gov.tr'
  },
  {
    id: '5',
    title: 'Miras Paylaşımı Davası',
    court: 'Yargıtay 1. Hukuk Dairesi',
    date: '2023-04-20',
    caseNumber: 'E.2023/333 K.2023/444',
    relevance: 70,
    summary: 'Miras paylaşımında anlaşmazlık. Saklı pay ihlali iddiası.',
    keywords: ['Miras', 'Veraset', 'Saklı Pay', 'TMK'],
    link: 'https://karararama.yargitay.gov.tr'
  }
];

export function ResultList({ results, loading = false, searchQuery = '' }: ResultListProps) {
  const [selectedCase, setSelectedCase] = useState<PrecedentResult | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [displayResults, setDisplayResults] = useState<PrecedentResult[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setDisplayResults([]);
      return;
    }

    // Arama sorgusuna göre filtrele
    const query = searchQuery.toLowerCase();
    const filtered = allMockResults.filter(result => {
      return result.title.toLowerCase().includes(query) ||
             result.summary.toLowerCase().includes(query) ||
             result.keywords.some(k => k.toLowerCase().includes(query)) ||
             result.court.toLowerCase().includes(query);
    });

    // Relevance'a göre sırala
    const sorted = filtered.sort((a, b) => {
      // Başlıkta geçiyorsa öncelik ver
      const aInTitle = a.title.toLowerCase().includes(query);
      const bInTitle = b.title.toLowerCase().includes(query);
      if (aInTitle && !bInTitle) return -1;
      if (!aInTitle && bInTitle) return 1;
      
      return b.relevance - a.relevance;
    });

    setDisplayResults(sorted);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Henüz bir arama yapmadınız veya sonuç bulunamadı.</p>
        </CardContent>
      </Card>
    );
  }

  if (displayResults.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">"{searchQuery}" için sonuç bulunamadı.</p>
          <p className="text-sm text-gray-400 mt-2">Farklı anahtar kelimelerle tekrar deneyin.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          "{searchQuery}" için {displayResults.length} sonuç bulundu
        </p>
      </div>
      
      <div className="space-y-4">
        {displayResults.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{result.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{result.court}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(result.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{result.caseNumber}</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={result.relevance > 80 ? 'default' : result.relevance > 60 ? 'secondary' : 'outline'}
                  className="ml-2"
                >
                  %{result.relevance} Uyumlu
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm mb-3">
                {expandedId === result.id ? result.summary : `${result.summary.substring(0, 150)}...`}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {result.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
                >
                  {expandedId === result.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Daha Az
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Daha Fazla
                    </>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCase(result)}
                  >
                    Detay
                  </Button>
                  {result.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(result.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCase?.title}</DialogTitle>
            <DialogDescription>
              {selectedCase?.court} - {selectedCase?.caseNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCase && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Karar Özeti</h4>
                <p className="text-gray-700">{selectedCase.summary}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Anahtar Kelimeler</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Tarih: {new Date(selectedCase.date).toLocaleDateString('tr-TR')}
                </div>
                {selectedCase.link && (
                  <Button
                    onClick={() => window.open(selectedCase.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Kararın Tam Metnini Görüntüle
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
