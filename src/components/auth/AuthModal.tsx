'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export function AuthModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    consents: {
      kvkk: false,
      aydinlatma: false,
      uyelik: false,
    }
  });

  useEffect(() => {
    const auth = searchParams.get('auth');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    
    if (auth === 'login' || auth === 'register') {
      setOpen(true);
      setTab(auth);
      
      if (email) {
        setRegisterData(prev => ({ ...prev, email }));
        setLoginData(prev => ({ ...prev, email }));
      }
      if (name) {
        setRegisterData(prev => ({ ...prev, name }));
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('auth');
    params.delete('email');
    params.delete('name');
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newUrl);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        throw new Error('Giriş başarısız');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!registerData.consents.kvkk || !registerData.consents.aydinlatma || !registerData.consents.uyelik) {
      setError('Tüm sözleşmeleri kabul etmelisiniz');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          consents: registerData.consents,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Kayıt başarısız');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      setLoading(false);
    }
  };

  const allConsentsAccepted = registerData.consents.kvkk && 
                               registerData.consents.aydinlatma && 
                               registerData.consents.uyelik;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>
          <DialogTitle className="text-center">AvukatAjanda</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Şifre</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Şifre</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="En az 8 karakter"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Şifre Tekrar</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="kvkk"
                    checked={registerData.consents.kvkk}
                    onCheckedChange={(checked) => 
                      setRegisterData(prev => ({
                        ...prev,
                        consents: { ...prev.consents, kvkk: checked as boolean }
                      }))
                    }
                  />
                  <label htmlFor="kvkk" className="text-sm">
                    <Link href="/kvkk" target="_blank" className="text-primary underline">
                      KVKK Metni
                    </Link>'ni okudum ve kabul ediyorum
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="aydinlatma"
                    checked={registerData.consents.aydinlatma}
                    onCheckedChange={(checked) => 
                      setRegisterData(prev => ({
                        ...prev,
                        consents: { ...prev.consents, aydinlatma: checked as boolean }
                      }))
                    }
                  />
                  <label htmlFor="aydinlatma" className="text-sm">
                    <Link href="/aydinlatma-metni" target="_blank" className="text-primary underline">
                      Aydınlatma Metni
                    </Link>'ni okudum ve kabul ediyorum
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="uyelik"
                    checked={registerData.consents.uyelik}
                    onCheckedChange={(checked) => 
                      setRegisterData(prev => ({
                        ...prev,
                        consents: { ...prev.consents, uyelik: checked as boolean }
                      }))
                    }
                  />
                  <label htmlFor="uyelik" className="text-sm">
                    <Link href="/uyelik-sozlesmesi" target="_blank" className="text-primary underline">
                      Üyelik Sözleşmesi
                    </Link>'ni okudum ve kabul ediyorum
                  </label>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !allConsentsAccepted}
              >
                {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
