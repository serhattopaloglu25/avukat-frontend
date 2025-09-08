import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /clients/
Disallow: /cases/

Sitemap: https://avukatajanda.com/sitemap.xml`);
}
