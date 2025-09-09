import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/clients/', '/cases/'],
    },
    sitemap: 'https://avukatajanda.com/sitemap.xml',
  }
}
