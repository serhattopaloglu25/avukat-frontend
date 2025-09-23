// SearchBar component for Precedents
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  onSearch: (query: string, filters: any) => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [courtType, setCourtType] = useState('all');
  const [year, setYear] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { courtType, year });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="KVKK, kira sözleşmesi, boşanma, tazminat..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? 'Aranıyor...' : 'Ara'}
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Filtreler:</span>
        </div>
        
        <Select value={courtType} onValueChange={setCourtType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mahkeme Türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="yargitay">Yargıtay</SelectItem>
            <SelectItem value="danistay">Danıştay</SelectItem>
            <SelectItem value="anayasa">Anayasa Mahkemesi</SelectItem>
            <SelectItem value="bolge">Bölge Adliye</SelectItem>
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Yıl" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Yıllar</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}