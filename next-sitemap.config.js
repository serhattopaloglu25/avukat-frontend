/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://avukatajanda.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/login', '/register', '/dashboard', '/clients', '/cases', '/events', '/invoices', '/settings', '/admin'],
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/clients/', '/cases/', '/admin/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : path === '/fiyatlandirma' ? 0.9 : 0.7,
    lastmod: new Date().toISOString(),
  }),
}
