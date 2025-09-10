import Link from 'next/link';
import { getAllPosts } from '@/data/blog-posts';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">AvukatAjanda</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-gray-900">Hakkımızda</Link>
              <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">İletişim</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">AvukatAjanda Blog</h1>
          <p className="text-xl text-primary-foreground/90">
            Hukuk teknolojileri, dijital dönüşüm ve sektörel gelişmeler
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-xl transition-shadow p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Tag className="w-4 h-4" />
                  <span>{post.category}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('tr-TR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
