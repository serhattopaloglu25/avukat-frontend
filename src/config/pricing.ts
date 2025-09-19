export const PRICING_PLANS = [
  { id: 'mini',  title: 'Mini',  priceTRY: 4999 },
  { id: 'orta',  title: 'Orta',  priceTRY: 6999 },
  { id: 'buyuk', title: 'Büyük', priceTRY: 9999 },
] as const;

export const formatTRY = (n:number) => 
  new Intl.NumberFormat('tr-TR', {
    style:'currency',
    currency:'TRY',
    maximumFractionDigits:0
  }).format(n);
