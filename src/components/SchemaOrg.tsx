'use client';

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AvukatAjanda",
    "description": "Hukuk büroları için dijital yönetim sistemi",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "99",
      "highPrice": "399",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "provider": {
      "@type": "Organization",
      "name": "AvukatAjanda",
      "url": "https://avukatajanda.com",
      "logo": "https://avukatajanda.com/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-XXX-XXX-XX-XX",
        "contactType": "customer service",
        "availableLanguage": "Turkish"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
