'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  Image as ImageIcon,
  Settings,
  Save,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Calendar,
  User,
  AlertCircle,
  Check,
  X,
  ChevronLeft
} from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  tags: string[];
  author?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('pages');
  const [message, setMessage] = useState('');
  
  // Pages state
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      slug: 'hakkimizda',
      title: 'Hakkımızda',
      content: '# Hakkımızda\n\nAvukatAjanda, hukuk büroları için özel olarak tasarlanmış dijital çözümler sunar.',
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'iletisim',
      title: 'İletişim',
      content: '# İletişim\n\nBizimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.\n\nE-posta: info@avukatajanda.com',
      updatedAt: new Date().toISOString()
    }
  ]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  
  // Blog posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft',
    tags: []
  });

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/?auth=login');
      return;
    }
    
    // Check if user is admin (simple check)
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // For now, all logged in users can access admin
      // In production, check userData.role === 'admin'
    }
    
    setLoading(false);
  }, [router]);

  const handleSavePage = async (page: Page) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedPages = pages.map(p => 
        p.id === page.id ? { ...page, updatedAt: new Date().toISOString() } : p
      );
      setPages(updatedPages);
      setEditingPage(null);
      setMessage('Sayfa başarıyla güncellendi');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      setMessage('Başlık ve içerik zorunludur');
      return;
    }
    
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const post: Post = {
        id: Date.now().toString(),
        slug: newPost.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        title: newPost.title!,
        excerpt: newPost.excerpt || '',
        content: newPost.content!,
        status: newPost.status as 'draft' | 'published',
        publishedAt: newPost.status === 'published' ? new Date().toISOString() : null,
        tags: newPost.tags || [],
        author: 'Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setPosts([...posts, post]);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        tags: []
      });
      setMessage('Blog yazısı oluşturuldu');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    
    setPosts(posts.filter(p => p.id !== postId));
    setMessage('Blog yazısı silindi');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePublishPost = async (postId: string) => {
    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { ...p, status: 'published' as const, publishedAt: new Date().toISOString() }
        : p
    );
    setPosts(updatedPosts);
    setMessage('Blog yazısı yayınlandı');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Site Yönetimi</h1>
          </div>
          {message && (
            <Alert className="w-auto">
              <Check className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>
        <p className="text-muted-foreground">
          Web sitesi içeriklerini buradan yönetebilirsiniz
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pages">Sayfalar</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="media">Medya</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-6">
          <div className="grid gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Statik Sayfalar</h2>
              <div className="space-y-4">
                {pages.map(page => (
                  <div key={page.id}>
                    {editingPage?.id === page.id ? (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div>
                          <Label htmlFor={`title-${page.id}`}>Başlık</Label>
                          <Input
                            id={`title-${page.id}`}
                            value={editingPage.title}
                            onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`content-${page.id}`}>İçerik (Markdown)</Label>
                          <Textarea
                            id={`content-${page.id}`}
                            value={editingPage.content}
                            onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                            rows={10}
                            className="font-mono text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSavePage(editingPage)}
                            disabled={saving}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Kaydet
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingPage(null)}
                          >
                            İptal
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`/${page.slug}`, '_blank')}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Önizle
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-semibold">{page.title}</h3>
                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Son güncelleme: {new Date(page.updatedAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPage(page)}
                        >
                          <Edit3 className="mr-2 h-4 w-4" />
                          Düzenle
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="mt-6">
          <div className="grid gap-6">
            {/* Create new post */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Yeni Blog Yazısı</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="post-title">Başlık</Label>
                  <Input
                    id="post-title"
                    placeholder="Blog yazısı başlığı"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="post-excerpt">Özet</Label>
                  <Textarea
                    id="post-excerpt"
                    placeholder="Kısa açıklama (opsiyonel)"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="post-content">İçerik (Markdown)</Label>
                  <Textarea
                    id="post-content"
                    placeholder="Blog içeriği..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="post-tags">Etiketler (virgülle ayırın)</Label>
                  <Input
                    id="post-tags"
                    placeholder="hukuk, dava, mahkeme"
                    value={newPost.tags?.join(', ')}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setNewPost({ ...newPost, status: 'published' });
                      handleCreatePost();
                    }}
                    disabled={saving || !newPost.title || !newPost.content}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Yayınla
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewPost({ ...newPost, status: 'draft' });
                      handleCreatePost();
                    }}
                    disabled={saving || !newPost.title || !newPost.content}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Taslak Olarak Kaydet
                  </Button>
                </div>
              </div>
            </Card>

            {/* Posts list */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Blog Yazıları</h2>
              {posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Henüz blog yazısı yok
                </p>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{post.title}</h3>
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                            {post.status === 'published' ? 'Yayında' : 'Taslak'}
                          </Badge>
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                          {post.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                              {post.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {post.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePublishPost(post.id)}
                          >
                            Yayınla
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Medya Yönetimi</h2>
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Dosyaları buraya sürükleyin veya seçin
              </p>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Dosya Seç
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Maksimum dosya boyutu: 5MB
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Yüklü Dosyalar</h3>
              <p className="text-muted-foreground text-center py-8">
                Henüz dosya yüklenmemiş
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
