import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from '@/lib/sitemap';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(generateSitemap());
}
