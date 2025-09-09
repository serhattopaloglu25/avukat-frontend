export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AvukatAjanda',
  url: 'https://avukatajanda.com',
  logo: 'https://avukatajanda.com/logo.png',
  description: 'Hukuk büroları için dijital çözüm platformu',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90-850-XXX-XXXX',
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish'],
  },
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AvukatAjanda',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'TRY',
    lowPrice: '299',
    highPrice: '1499',
    offerCount: '3',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
  },
};
