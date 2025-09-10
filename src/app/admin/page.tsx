'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, Edit, Save, Plus, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('hakkimizda');
  const [pageContent, setPageContent] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft'
  });

  useEffect(() => {
    checkAuth();
    loadContent();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // TODO: Verify admin role
  };

  const loadContent = async () => {
    try {
      // Load pages content
      const pagesData = [
        { slug: 'hakkimizda', title: 'Hakkımızda', content: 'İçerik yükleniyor...' },
        { slug: 'iletisim', title: 'İletişim', content: 'İçerik yükleniyor...' }
      ];
      setPages(pagesData);
      
      // Load blog posts
      const postsData = [
        { 
          id: 1,
          title: 'Dijital Dönüşüm', 
          status: 'published',
          date: '2025-01-10'
        }
      ];
      setPosts(postsData);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load content:', error);
      setLoading(false);
    }
  };

  const savePage = async () => {
    const token = localStorage.getItem('token');
    try {
      // TODO: API call to save page content
      alert('Sayfa içeriği kaydedildi!');
    } catch (error) {
      alert('Kayıt başarısız!');
    }
  };

  const savePost = async () => {
    const token = localStorage.getItem('token');
    try {
      // TODO: API call to save blog post
      alert('Blog yazısı kaydedildi!');
      setNewPost({ title: '', excerpt: '', content: '', status: 'draft' });
    } catch (error) {
      alert('Kayıt başarısız!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Site Yönetimi</h1>
          <p className="text-gray-600">İçerikleri buradan düzenleyebilirsiniz</p>
        </div>

        <Tabs defaultValue="pages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pages">Sayfalar</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="media">Medya</TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages">
            <Card className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Sayfa Seçin</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg"
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                >
                  {pages.map(page => (
                    <option key={page.slug} value={page.slug}>
                      {page.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">İçerik (Markdown)</label>
                <textarea
                  className="w-full h-96 px-3 py-2 border rounded-lg font-mono text-sm"
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                  placeholder="# Başlık&#10;&#10;İçerik..."
                />
              </div>

              <Button onClick={savePage}>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Yeni Blog Yazısı</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Başlık</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Özet</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">İçerik (Markdown)</label>
                    <textarea
                      className="w-full h-64 px-3 py-2 border rounded-lg font-mono text-sm"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Durum</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newPost.status}
                      onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayında</option>
                    </select>
                  </div>

                  <Button onClick={savePost}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yazı Ekle
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Mevcut Yazılar</h3>
                
                <div className="space-y-2">
                  {posts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500">
                          {post.status === 'published' ? 'Yayında' : 'Taslak'} • {post.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Medya Yönetimi</h3>
                <p className="text-sm text-gray-600">Görsel ve dosya yükleme</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Dosyaları sürükleyip bırakın</p>
                <p className="text-sm text-gray-500 mb-4">veya</p>
                <Button variant="outline">
                  Dosya Seç
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Yüklenen Dosyalar</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Media items will be listed here */}
                  <div className="border rounded-lg p-2 text-center">
                    <div className="bg-gray-100 h-24 rounded mb-2 flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-600 truncate">örnek.jpg</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
