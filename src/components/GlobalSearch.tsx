'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Users, Briefcase, Receipt, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import apiService from '@/lib/api';

interface SearchResult {
  type: 'client' | 'case' | 'invoice' | 'document';
  id: number;
  title: string;
  subtitle: string;
  url: string;
}

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Search debounced
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiService.baseUrl}/api/search?q=${encodeURIComponent(query)}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Arama başarısız');

        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Arama hatası:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'client': return <Users className="h-4 w-4" />;
      case 'case': return <Briefcase className="h-4 w-4" />;
      case 'invoice': return <Receipt className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'client': return 'Müvekkil';
      case 'case': return 'Dava';
      case 'invoice': return 'Fatura';
      case 'document': return 'Belge';
      default: return type;
    }
  };

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Ara...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white rounded border">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="container flex items-start justify-center pt-20">
            <div
              ref={searchRef}
              className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Müvekkil, dava, fatura veya belge ara..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 text-lg border-0 focus:ring-0"
                />
                <button
                  onClick={() => {
                    setOpen(false);
                    setQuery('');
                  }}
                  className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Results */}
              {(loading || results.length > 0) && (
                <div className="border-t max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500">
                      Aranıyor...
                    </div>
                  ) : (
                    results.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSelect(result)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left"
                      >
                        <div className="p-2 bg-gray-100 rounded">
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-gray-500">
                            {getTypeLabel(result.type)} • {result.subtitle}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* No Results */}
              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="border-t p-8 text-center">
                  <p className="text-gray-500">
                    "{query}" için sonuç bulunamadı
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-100 rounded">↑↓</kbd>
                    Gezin
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-100 rounded">↵</kbd>
                    Seç
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-100 rounded">ESC</kbd>
                    Kapat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}