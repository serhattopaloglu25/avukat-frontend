export default function sitemap() {
  const baseUrl = 'https://avukatajanda.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/ozellikler',
    '/fiyatlandirma',
    '/hakkimizda',
    '/blog',
    '/iletisim',
    '/destek-merkezi',
    '/kvkk',
    '/aydinlatma-metni',
    '/uyelik-sozlesmesi',
    '/demo',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
