import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  ogImage = '/og-image.svg',
  noindex = false,
}: PageSEOProps): Metadata {
  const siteName = 'AvukatAjanda';
  const siteUrl = 'https://avukatajanda.com';
  
  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords || 'avukat, hukuk bürosu, dava takibi, müvekkil yönetimi',
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: siteUrl,
      siteName,
      images: [{ url: ogImage }],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}
