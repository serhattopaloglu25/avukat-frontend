'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/precedents/SearchBar';
import { ResultList } from '@/components/precedents/ResultList';
import { isFeatureEnabled } from '@/lib/feature_flags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, AlertCircle } from 'lucide-react';

export default function PrecedentsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isFeatureEnabled('dejure')) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Bu özellik henüz aktif değil</h3>
          <p className="text-sm text-gray-500 mt-2">Emsal dava arama özelliği yakında kullanıma açılacak.</p>
        </div>
      </div>
    );
  }

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    
    try {
      const response = await fetch('/api/precedents/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, filters })
      });

      if (!response.ok) throw new Error('Arama başarısız');
      
      const data = await response.json();
      const results = data.results || [];
      console.log("API results:", results);
      setSearchResults(results);
    } catch (err) {
      setError('Emsal davalar yüklenirken bir hata oluştu.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emsal Davalar</h1>
        <p className="text-gray-500 mt-1">Benzer davaları ve kararları arayın</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Emsal Dava Arama
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <ResultList results={searchResults} loading={loading} searchQuery={searchQuery} />
    </div>
  );
}
