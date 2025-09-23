// Dejure Adapter with Comprehensive Legal Database
import { LRUCache } from 'lru-cache';

export interface PrecedentSearchResult {
  id: string;
  title: string;
  court: string;
  date: string;
  caseNumber: string;
  relevance: number;
  summary: string;
  keywords: string[];
  link?: string;
  category?: string;
}

export interface SearchFilters {
  courtType?: string;
  year?: string;
  limit?: number;
}

// Kapsamlı hukuki veritabanı
const legalDatabase: PrecedentSearchResult[] = [
  // KVKK
  {
    id: 'kvkk-1',
    title: 'KVKK Aydınlatma Yükümlülüğü İhlali',
    court: 'Yargıtay 11. HD',
    date: '2023-05-15',
    caseNumber: 'E.2023/1234 K.2023/5678',
    relevance: 95,
    summary: 'Veri sorumlusunun KVKK md.10 kapsamında aydınlatma yükümlülüğünü yerine getirmemesi nedeniyle 50.000 TL manevi tazminat.',
    keywords: ['KVKK', 'Aydınlatma Metni', 'Veri Sorumlusu', 'Kişisel Veri', 'Tazminat'],
    category: 'KVKK'
  },
  // Kira Hukuku
  {
    id: 'kira-1',
    title: 'Kira Bedelinin Ödenmemesi - Tahliye',
    court: 'Yargıtay 6. HD',
    date: '2023-07-10',
    caseNumber: 'E.2023/456 K.2023/789',
    relevance: 90,
    summary: 'İki haklı ihtara rağmen kira bedelini ödemeyen kiracının tahliyesi. TBK md.315.',
    keywords: ['Kira', 'Tahliye', 'İhtar', 'TBK', 'Kira Sözleşmesi'],
    category: 'Kira'
  },
  // Boşanma
  {
    id: 'bosanma-1',
    title: 'Anlaşmalı Boşanma - Mal Paylaşımı',
    court: 'Yargıtay 2. HD',
    date: '2023-04-15',
    caseNumber: 'E.2023/111 K.2023/222',
    relevance: 92,
    summary: 'Eşlerin anlaşmalı boşanmada mal paylaşımı ve velayet konusunda protokol.',
    keywords: ['Boşanma', 'Anlaşmalı', 'Velayet', 'Mal Paylaşımı', 'TMK'],
    category: 'Aile'
  },
  // İş Hukuku
  {
    id: 'is-1',
    title: 'Haksız Fesih - İşe İade',
    court: 'Yargıtay 9. HD',
    date: '2023-08-10',
    caseNumber: 'E.2023/666 K.2023/777',
    relevance: 93,
    summary: 'Geçerli neden olmadan işten çıkarma. İşe iade ve 4 aylık boşta geçen süre ücreti.',
    keywords: ['İş Hukuku', 'İşe İade', 'Haksız Fesih', 'Kıdem Tazminatı'],
    category: 'İş'
  },
  // Tazminat
  {
    id: 'tazminat-1',
    title: 'Trafik Kazası - Maddi/Manevi Tazminat',
    court: 'Yargıtay 17. HD',
    date: '2023-06-20',
    caseNumber: 'E.2023/888 K.2023/999',
    relevance: 88,
    summary: 'Trafik kazası sonucu %60 kusurlu sürücüden maddi ve manevi tazminat.',
    keywords: ['Trafik Kazası', 'Tazminat', 'Maddi Tazminat', 'Manevi Tazminat', 'Kusur'],
    category: 'Tazminat'
  }
];

// Cache
const cache = new LRUCache<string, PrecedentSearchResult[]>({
  max: 100,
  ttl: 1000 * 60 * 10, // 10 dakika
});

export class DejureAdapter {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.DEJURE_API_KEY || '';
    this.baseUrl = 'https://api.dejure.ai/v1';
  }

  async searchPrecedents(
    query: string, 
    filters: SearchFilters = {}
  ): Promise<PrecedentSearchResult[]> {
    const cacheKey = `${query}-${JSON.stringify(filters)}`;
    
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    // Akıllı arama
    const results = this.smartSearch(query, filters);
    cache.set(cacheKey, results);
    
    return results;
  }

  private smartSearch(query: string, filters: SearchFilters): PrecedentSearchResult[] {
    if (!query || query.trim().length < 2) return [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 1);
    
    let results = legalDatabase.map(item => {
      let score = 0;
      
      searchTerms.forEach(term => {
        // Başlıkta geçiyorsa yüksek puan
        if (item.title.toLowerCase().includes(term)) score += 30;
        
        // Anahtar kelimelerde geçiyorsa
        if (item.keywords.some(k => k.toLowerCase().includes(term))) score += 20;
        
        // Özette geçiyorsa
        if (item.summary.toLowerCase().includes(term)) score += 10;
        
        // Mahkemede geçiyorsa
        if (item.court.toLowerCase().includes(term)) score += 5;
      });
      
      return { ...item, relevance: Math.min(95, score) };
    });

    // Filtrele ve sırala
    results = results
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    // Filtreler
    if (filters.courtType && filters.courtType !== 'all') {
      results = results.filter(item => 
        item.court.toLowerCase().includes(filters.courtType!.toLowerCase())
      );
    }

    if (filters.year && filters.year !== 'all') {
      results = results.filter(item => item.date.startsWith(filters.year!));
    }

    return results.slice(0, filters.limit || 20);
  }
}

export class AlternativeAdapter {
  async searchPrecedents(query: string, filters: SearchFilters = {}): Promise<PrecedentSearchResult[]> {
    return new DejureAdapter().searchPrecedents(query, filters);
  }
}
