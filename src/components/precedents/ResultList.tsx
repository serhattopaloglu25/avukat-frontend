'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Calendar, 
  Building, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { searchYargitay } from '@/lib/precedents/yargitayScraper';

interface PrecedentResult {
  id: string;
  title: string;
  court: string;
  date: string;
  caseNumber: string;
  relevance?: number;
  summary: string;
  keywords: string[];
  link?: string;
}

interface ResultListProps {
  results: PrecedentResult[];
  loading?: boolean;
  searchQuery?: string;
}

export function ResultList({ results, loading = false, searchQuery = '' }: ResultListProps) {
  const [selectedCase, setSelectedCase] = useState<PrecedentResult | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [displayResults, setDisplayResults] = useState<PrecedentResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadResults = async () => {
      if (searchQuery && searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const yargitayResults = await searchYargitay(searchQuery);
          setDisplayResults(yargitayResults);
        } catch (error) {
          console.error('Yargıtay arama hatası:', error);
          setDisplayResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setDisplayResults([]);
      }
    };
    
    loadResults();
  }, [searchQuery]);

  if (loading || isSearching) {
    return (
      <div className="space-y-4">
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin mr-2 inline" />
          <AlertDescription className="inline">
            Yargıtay kararları aranıyor...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Arama yaparak Yargıtay kararlarına ulaşabilirsiniz.</p>
        </CardContent>
      </Card>
    );
  }

  if (displayResults.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{searchQuery} için sonuç bulunamadı.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {searchQuery} için {displayResults.length} Yargıtay kararı bulundu
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open('https://karararama.yargitay.gov.tr', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Yargıtay Karar Arama
        </Button>
      </div>
      
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
              {result.relevance && (
                <Badge 
                  variant={result.relevance > 80 ? 'default' : result.relevance > 60 ? 'secondary' : 'outline'}
                  className="ml-2"
                >
                  %{result.relevance} Uyumlu
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm mb-3">
              {expandedId === result.id ? result.summary : `${result.summary.substring(0, 200)}...`}
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://karararama.yargitay.gov.tr', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

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
                <Button
                  onClick={() => window.open('https://karararama.yargitay.gov.tr', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Yargıtay Karar Arama
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
