import Head from 'next/head';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function Meta({
  title = 'AvukatAjanda - Hukuk Büroları için Dijital Çözüm',
  description = 'Müvekkil yönetimi, dava takibi ve randevu hatırlatmaları tek platformda. Hukuk büronuzun dijital dönüşümü için modern çözüm.',
  image = 'https://avukatajanda.com/og-image.png',
  url = 'https://avukatajanda.com',
  type = 'website',
}: MetaProps) {
  const fullTitle = title.includes('AvukatAjanda') ? title : `${title} | AvukatAjanda`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="AvukatAjanda" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Other */}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563EB" />
    </Head>
  );
}
