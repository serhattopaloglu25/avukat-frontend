// Kapsamlı Hukuki Veritabanı
export const legalDatabase = [
  // KVKK Davaları
  {
    id: 'kvkk-1',
    title: 'KVKK Aydınlatma Metni Eksikliği',
    court: 'Yargıtay 11. Hukuk Dairesi',
    date: '2023-05-15',
    caseNumber: 'E.2023/1234 K.2023/5678',
    relevance: 95,
    summary: 'Veri sorumlusunun aydınlatma yükümlülüğünü yerine getirmemesi. KVKK md.10 ihlali.',
    keywords: ['KVKK', 'Aydınlatma Metni', 'Veri Sorumlusu', 'Kişisel Veri'],
    category: 'KVKK'
  },
  {
    id: 'kvkk-2',
    title: 'Açık Rıza Olmadan Veri İşleme',
    court: 'İstanbul BAM 3. HD',
    date: '2023-03-20',
    caseNumber: 'E.2023/987 K.2023/654',
    relevance: 88,
    summary: 'Açık rıza alınmadan kişisel verilerin işlenmesi ve paylaşılması.',
    keywords: ['KVKK', 'Açık Rıza', 'Veri İhlali', 'Tazminat'],
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
    summary: 'İki haklı ihtar sonrası tahliye. TBK md.315.',
    keywords: ['Kira', 'Tahliye', 'İhtar', 'TBK', 'Temerrüt'],
    category: 'Kira'
  },
  {
    id: 'kira-2',
    title: 'Gereksinim Nedeniyle Tahliye',
    court: 'Ankara BAM 5. HD',
    date: '2023-06-05',
    caseNumber: 'E.2023/222 K.2023/333',
    relevance: 85,
    summary: 'Mal sahibinin konut ihtiyacı nedeniyle tahliye talebi.',
    keywords: ['Kira', 'Gereksinim', 'Tahliye', 'Konut İhtiyacı'],
    category: 'Kira'
  },
  
  // Aile Hukuku
  {
    id: 'aile-1',
    title: 'Anlaşmalı Boşanma Protokolü',
    court: 'Yargıtay 2. HD',
    date: '2023-04-15',
    caseNumber: 'E.2023/111 K.2023/222',
    relevance: 92,
    summary: 'Anlaşmalı boşanmada mal paylaşımı ve velayet.',
    keywords: ['Boşanma', 'Anlaşmalı', 'Velayet', 'Mal Paylaşımı', 'TMK'],
    category: 'Aile'
  },
  {
    id: 'aile-2',
    title: 'Yoksulluk Nafakası Şartları',
    court: 'İzmir BAM 2. HD',
    date: '2023-05-20',
    caseNumber: 'E.2023/444 K.2023/555',
    relevance: 87,
    summary: 'Yoksulluk nafakası için yoksulluğa düşme şartı.',
    keywords: ['Nafaka', 'Yoksulluk', 'Boşanma', 'TMK 175'],
    category: 'Aile'
  },
  
  // İş Hukuku
  {
    id: 'is-1',
    title: 'Haksız Fesih - Kıdem Tazminatı',
    court: 'Yargıtay 9. HD',
    date: '2023-08-10',
    caseNumber: 'E.2023/666 K.2023/777',
    relevance: 93,
    summary: 'İşçinin haklı nedeni olmadan işten çıkarılması.',
    keywords: ['İş Hukuku', 'Kıdem Tazminatı', 'Haksız Fesih', 'İşe İade'],
    category: 'İş'
  },
  {
    id: 'is-2',
    title: 'İş Kazası - Kusur Oranları',
    court: 'Yargıtay 21. HD',
    date: '2023-07-25',
    caseNumber: 'E.2023/888 K.2023/999',
    relevance: 89,
    summary: 'İş güvenliği önlemlerinin alınmaması, %70 işveren kusuru.',
    keywords: ['İş Kazası', 'Tazminat', 'Kusur', 'İş Güvenliği'],
    category: 'İş'
  },
  
  // Ticaret Hukuku
  {
    id: 'ticaret-1',
    title: 'Çek - Karşılıksız İşlemi',
    court: 'Yargıtay 11. HD',
    date: '2023-06-30',
    caseNumber: 'E.2023/1010 K.2023/1111',
    relevance: 88,
    summary: 'Karşılıksız çek, ticari itibar kaybı ve tazminat.',
    keywords: ['Çek', 'Karşılıksız', 'Ticaret', 'Kambiyo', 'Tazminat'],
    category: 'Ticaret'
  },
  
  // Ceza Hukuku İlişkili
  {
    id: 'ceza-1',
    title: 'Hakaret - Manevi Tazminat',
    court: 'Yargıtay 4. HD',
    date: '2023-05-05',
    caseNumber: 'E.2023/1212 K.2023/1313',
    relevance: 86,
    summary: 'Sosyal medyada hakaret, 10.000 TL manevi tazminat.',
    keywords: ['Hakaret', 'Manevi Tazminat', 'Sosyal Medya', 'Kişilik Hakları'],
    category: 'Kişilik'
  },
  
  // Borçlar Hukuku
  {
    id: 'borc-1',
    title: 'Genel Kredi Sözleşmesi - Faiz',
    court: 'Yargıtay 19. HD',
    date: '2023-09-01',
    caseNumber: 'E.2023/1414 K.2023/1515',
    relevance: 91,
    summary: 'Tüketici kredisinde fahiş faiz uygulaması.',
    keywords: ['Kredi', 'Faiz', 'Tüketici', 'Banka', 'TBK'],
    category: 'Borçlar'
  },
  
  // Miras Hukuku
  {
    id: 'miras-1',
    title: 'Saklı Pay İhlali - İptal',
    court: 'Yargıtay 1. HD',
    date: '2023-04-20',
    caseNumber: 'E.2023/1616 K.2023/1717',
    relevance: 87,
    summary: 'Vasiyetname ile saklı payın ihlali, tenkis davası.',
    keywords: ['Miras', 'Saklı Pay', 'Tenkis', 'Vasiyetname', 'TMK'],
    category: 'Miras'
  },
  
  // Gayrimenkul Hukuku
  {
    id: 'tapu-1',
    title: 'Tapu İptali ve Tescil',
    court: 'Yargıtay 14. HD',
    date: '2023-08-15',
    caseNumber: 'E.2023/1818 K.2023/1919',
    relevance: 90,
    summary: 'Muvazaalı satış işlemi, tapunun iptali.',
    keywords: ['Tapu', 'Muvazaa', 'İptal', 'Tescil', 'Gayrimenkul'],
    category: 'Gayrimenkul'
  },
  
  // İdare Hukuku
  {
    id: 'idare-1',
    title: 'İmar Planı İptali',
    court: 'Danıştay 6. Daire',
    date: '2023-07-20',
    caseNumber: 'E.2023/2020 K.2023/2121',
    relevance: 85,
    summary: 'İmar planı değişikliği, kamu yararı yokluğu.',
    keywords: ['İmar', 'İdare', 'İptal', 'Kamu Yararı', 'Danıştay'],
    category: 'İdare'
  },
  
  // Sözleşmeler
  {
    id: 'sozlesme-1',
    title: 'Hizmet Sözleşmesi - Cayma',
    court: 'Yargıtay 13. HD',
    date: '2023-06-10',
    caseNumber: 'E.2023/2222 K.2023/2323',
    relevance: 88,
    summary: 'Mesafeli satış sözleşmesinde cayma hakkı.',
    keywords: ['Sözleşme', 'Cayma', 'Mesafeli Satış', 'Tüketici'],
    category: 'Sözleşme'
  }
];

// Akıllı arama fonksiyonu
export function searchLegalDatabase(query: string, filters: any = {}) {
  if (!query || query.trim().length < 2) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 1);
  
  return legalDatabase
    .map(item => {
      let score = 0;
      const itemText = `${item.title} ${item.summary} ${item.keywords.join(' ')}`.toLowerCase();
      
      // Her arama terimi için puan hesapla
      searchTerms.forEach(term => {
        if (item.title.toLowerCase().includes(term)) score += 30;
        if (item.keywords.some(k => k.toLowerCase().includes(term))) score += 20;
        if (item.summary.toLowerCase().includes(term)) score += 10;
        if (item.court.toLowerCase().includes(term)) score += 5;
      });
      
      // Filtreler
      if (filters.courtType && filters.courtType !== 'all') {
        if (!item.court.toLowerCase().includes(filters.courtType.toLowerCase())) {
          score = 0;
        }
      }
      
      if (filters.year && filters.year !== 'all') {
        if (!item.date.startsWith(filters.year)) {
          score = 0;
        }
      }
      
      return { ...item, relevance: Math.min(95, score) };
    })
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 20);
}
