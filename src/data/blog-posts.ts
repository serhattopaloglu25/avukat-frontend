export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'E-Tebligat Sistemi: Avukatlar İçin Kapsamlı Rehber',
    excerpt: 'E-tebligat sisteminin avukatlar için önemi, kullanımı ve dikkat edilmesi gerekenler.',
    content: `E-tebligat sistemi, adli tebligatların elektronik ortamda yapılmasını sağlayan modern bir sistemdir...`,
    author: 'AvukatAjanda Ekibi',
    date: '2024-01-15',
    category: 'Teknoloji',
    readTime: '5 dk',
    tags: ['e-tebligat', 'dijitalleşme', 'hukuk teknolojisi']
  },
  {
    id: '2',
    title: 'KVKK ve Avukatların Sorumlulukları',
    excerpt: 'Kişisel verilerin korunması kanunu kapsamında avukatların dikkat etmesi gereken hususlar.',
    content: `KVKK, avukatlar için hem mesleki hem de etik sorumluluklar getirmektedir...`,
    author: 'Hukuk Departmanı',
    date: '2024-01-20',
    category: 'Mevzuat',
    readTime: '7 dk',
    tags: ['kvkk', 'veri güvenliği', 'hukuk']
  },
  {
    id: '3',
    title: 'Dijital Dönüşüm: Hukuk Bürolarının Geleceği',
    excerpt: 'Hukuk bürolarında dijital dönüşümün önemi ve uygulanabilir stratejiler.',
    content: `Dijital çağda hukuk büroları da dönüşüm geçirmektedir...`,
    author: 'AvukatAjanda',
    date: '2024-01-25',
    category: 'Dijital Dönüşüm',
    readTime: '6 dk',
    tags: ['dijitalleşme', 'büro yönetimi', 'teknoloji']
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}
