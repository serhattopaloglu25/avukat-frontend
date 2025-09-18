'use client';

import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';

// Blog posts data
const blogPosts = [
  {
    slug: 'kvkk-uyumlu-hukuk-burosu',
    title: 'KVKK Uyumlu Hukuk Bürosu Yönetimi: Temel İlkeler',
    excerpt: 'Hukuk bürolarında kişisel veri güvenliği ve KVKK uyumluluğu için dikkat edilmesi gereken temel noktalar.',
    date: '2024-01-15',
    author: 'AvukatAjanda Ekibi',
    category: 'KVKK',
    tags: ['KVKK', 'Veri Güvenliği', 'Hukuk Bürosu'],
    readingTime: '5 dakika',
    image: '/blog/kvkk-compliance.jpg'
  },
  {
    slug: 'dijital-donusum-dava-yonetimi',
    title: 'Dava Yönetiminde Dijital Dönüşüm: Verimlilik Artırma Stratejileri',
    excerpt: 'Hukuk bürolarında dava takibi ve yönetimini dijitalleştirerek verimliliği nasıl artırabileceğinizi keşfedin.',
    date: '2024-01-22',
    author: 'AvukatAjanda Ekibi',
    category: 'Dijital Dönüşüm',
    tags: ['Verimlilik', 'Dava Yönetimi', 'Dijitalleşme'],
    readingTime: '7 dakika',
    image: '/blog/digital-transformation.jpg'
  },
  {
    slug: 'guvenli-dosya-paylasimi',
    title: 'Hukuk Bürolarında Güvenli Dosya Paylaşımı: En İyi Uygulamalar',
    excerpt: 'Müvekkil belgelerini güvenli şekilde saklamak ve paylaşmak için modern yöntemler ve güvenlik protokolleri.',
    date: '2024-02-05',
    author: 'AvukatAjanda Ekibi',
    category: 'Güvenlik',
    tags: ['Dosya Yönetimi', 'Güvenlik', 'Veri Koruma'],
    readingTime: '6 dakika',
    image: '/blog/secure-file-sharing.jpg'
  },
  {
    slug: 'verimlilik-zaman-yonetimi',
    title: 'Hukuk Bürolarında Verimlilik: Zaman Yönetimi İpuçları',
    excerpt: 'Yoğun iş temposunda verimliliği artırmak için pratik zaman yönetimi teknikleri ve dijital araçların kullanımı.',
    date: '2024-02-12',
    author: 'AvukatAjanda Ekibi',
    category: 'Verimlilik',
    tags: ['Zaman Yönetimi', 'Verimlilik', 'İş Akışı'],
    readingTime: '5 dakika',
    image: '/blog/time-management.jpg'
  }
];

const categories = [
  { id: 'all', name: 'Tümü', count: 8 },
  { id: 'kvkk', name: 'KVKK', count: 2 },
  { id: 'dijital-donusum', name: 'Dijital Dönüşüm', count: 3 },
  { id: 'guvenlik', name: 'Güvenlik', count: 1 },
  { id: 'verimlilik', name: 'Verimlilik', count: 2 },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => 
        post.category.toLowerCase().replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ı/g, 'i')
          .replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ğ/g, 'g').replace(/ /g, '-')
          .includes(selectedCategory)
      );
  
  const visiblePosts = filteredPosts.slice(0, displayCount);
  const hasMore = filteredPosts.length > displayCount;
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Hukuk Teknolojileri Blog
              </h1>
              <p className="text-xl text-gray-600">
                Hukuk sektöründe dijital dönüşüm, verimlilik artırma ve 
                KVKK uyumluluğu hakkında güncel bilgiler.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Placeholder Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <Tag className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    
                    {/* Title */}
                    <h2 className="mt-2 text-xl font-bold text-gray-900 mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            
            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mt-12"
              >
                <button 
                  onClick={handleLoadMore}
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Daha Fazla Yükle
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Güncel Kalın
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Hukuk teknolojileri ve dijital dönüşüm hakkındaki en son 
                yazılarımızdan haberdar olmak için bültenimize kaydolun.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Abone Ol
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                Gönderdiğiniz veriler KVKK kapsamında korunur.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
