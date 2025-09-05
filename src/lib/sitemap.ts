export const generateSitemap = () => {
  const baseUrl = 'https://avukatajanda.com';
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/ozellikler', changefreq: 'monthly', priority: 0.8 },
    { url: '/cozumler', changefreq: 'monthly', priority: 0.8 },
    { url: '/fiyatlandirma', changefreq: 'weekly', priority: 0.9 },
    { url: '/iletisim', changefreq: 'monthly', priority: 0.7 },
    { url: '/kvkk', changefreq: 'yearly', priority: 0.5 },
    { url: '/gizlilik', changefreq: 'yearly', priority: 0.5 },
    { url: '/kullanim-sartlari', changefreq: 'yearly', priority: 0.5 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};
