'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import apiService from '@/lib/api';

interface AuthModalProps {
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ defaultTab = 'login' }: AuthModalProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });
  
  const [registerData, setRegisterData] = useState({
    fullName: '',
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
    setMounted(true);
    const auth = searchParams?.get('auth');
    if (auth === 'login' || auth === 'register') {
      setOpen(true);
      setTab(auth as 'login' | 'register');
    }
  }, [searchParams]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setError('');
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('auth');
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl || '/');
  }, [pathname, searchParams, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.login(loginData.email, loginData.password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        handleClose();
        router.push('/dashboard');
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err: any) {
      setError(err.message || 'Giriş yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!registerData.fullName || !registerData.email || !registerData.password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (!registerData.consents.kvkk || !registerData.consents.aydinlatma || !registerData.consents.uyelik) {
      setError('Lütfen tüm sözleşmeleri onaylayın.');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.register({
        name: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      });

      if (response.success || response.token) {
        // If token is provided, auto-login
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          handleClose();
          router.push('/dashboard');
        } else {
          // Show success and switch to login
          setError('');
          alert('Kayıt başarılı! Giriş yapabilirsiniz.');
          setTab('login');
          setLoginData({ email: registerData.email, password: '' });
        }
      } else {
        setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/brand/avukatajanda-logo.svg"
              alt="AvukatAjanda"
              width={240}
              height={80}
              priority
              className="h-14 w-auto"
            />
          </div>
          <DialogDescription>
            Hukuk büronuzun dijital asistanı
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Ad Soyad"
                    className="pl-10"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Şifre Tekrar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="kvkk"
                    checked={registerData.consents.kvkk}
                    onCheckedChange={(checked) =>
                      setRegisterData({
                        ...registerData,
                        consents: { ...registerData.consents, kvkk: checked as boolean }
                      })
                    }
                    disabled={loading}
                  />
                  <Label htmlFor="kvkk" className="text-sm">
                    <Link href="/kvkk" className="underline">KVKK Aydınlatma Metni</Link>ni okudum, onaylıyorum
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aydinlatma"
                    checked={registerData.consents.aydinlatma}
                    onCheckedChange={(checked) =>
                      setRegisterData({
                        ...registerData,
                        consents: { ...registerData.consents, aydinlatma: checked as boolean }
                      })
                    }
                    disabled={loading}
                  />
                  <Label htmlFor="aydinlatma" className="text-sm">
                    <Link href="/gizlilik" className="underline">Gizlilik Politikası</Link>nı okudum, onaylıyorum
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uyelik"
                    checked={registerData.consents.uyelik}
                    onCheckedChange={(checked) =>
                      setRegisterData({
                        ...registerData,
                        consents: { ...registerData.consents, uyelik: checked as boolean }
                      })
                    }
                    disabled={loading}
                  />
                  <Label htmlFor="uyelik" className="text-sm">
                    <Link href="/kullanim-kosullari" className="underline">Üyelik Sözleşmesi</Link>ni okudum, onaylıyorum
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kayıt olunuyor...
                  </>
                ) : (
                  'Kayıt Ol'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}