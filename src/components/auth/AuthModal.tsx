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
import { trackEvent } from '@/components/Analytics';

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
  const previousPathRef = useRef<string>('/');
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });
  
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

  // Client-side mount check for SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle URL parameters and modal state
  useEffect(() => {
    if (!mounted) return;

    const auth = searchParams.get('auth');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    
    // Check for auth query param or dedicated auth routes
    const shouldOpenModal = 
      auth === 'login' || 
      auth === 'register' || 
      pathname === '/login' || 
      pathname === '/register';
    
    if (shouldOpenModal) {
      // Store previous path for navigation after close
      if (!open && pathname !== '/login' && pathname !== '/register') {
        previousPathRef.current = pathname;
      }
      
      setOpen(true);
      setTab(auth === 'register' || pathname === '/register' ? 'register' : 'login');
      setError(''); // Clear any previous errors
      
      // Pre-fill data if provided
      if (email) {
        setRegisterData(prev => ({ ...prev, email }));
        setLoginData(prev => ({ ...prev, email }));
      }
      if (name) {
        setRegisterData(prev => ({ ...prev, name }));
      }
      
      // Track modal open event
      trackEvent('Auth', 'modal_open', tab);
    } else {
      setOpen(false);
    }
  }, [searchParams, pathname, mounted, open, tab]);

  // Handle body scroll lock
  useEffect(() => {
    if (!mounted) return;
    
    if (open) {
      // Save current overflow style
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Set focus to modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open, mounted]);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (loading) return; // Prevent closing while loading
    
    setOpen(false);
    setError('');
    
    // Track modal close event
    trackEvent('Auth', 'modal_close', tab);
    
    // Clean URL without page reload
    const params = new URLSearchParams(searchParams.toString());
    params.delete('auth');
    params.delete('email');
    params.delete('name');
    
    // Handle route-based modals
    if (pathname === '/login' || pathname === '/register') {
      router.push(previousPathRef.current || '/');
    } else {
      const newUrl = params.toString() 
        ? `${pathname}?${params.toString()}` 
        : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [loading, searchParams, pathname, router, tab]);

  // Handle ESC key
  const handleEscapeKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !loading) {
      handleClose();
    }
  }, [handleClose, loading]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(loginData.email)) {
      setError('Geçerli bir e-posta adresi giriniz');
      return;
    }

    if (!loginData.password) {
      setError('Şifre alanı zorunludur');
      return;
    }

    setLoading(true);
    trackEvent('Auth', 'login_attempt', 'form');

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Giriş başarısız');
      }

      // Store token and redirect
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      trackEvent('Auth', 'login_success', 'form');
      handleClose();
      router.push('/dashboard');
      router.refresh(); // Refresh to update auth state
    } catch (err: any) {
      trackEvent('Auth', 'login_error', err.message);
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!registerData.name || registerData.name.length < 2) {
      setError('Ad Soyad en az 2 karakter olmalıdır');
      return;
    }

    if (!validateEmail(registerData.email)) {
      setError('Geçerli bir e-posta adresi giriniz');
      return;
    }

    if (!validatePassword(registerData.password)) {
      setError('Şifre en az 8 karakter olmalıdır');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (!registerData.consents.kvkk || !registerData.consents.aydinlatma || !registerData.consents.uyelik) {
      setError('Tüm sözleşmeleri kabul etmelisiniz');
      return;
    }

    setLoading(true);
    trackEvent('Auth', 'register_attempt', 'form');

    try {
      const res = await fetch('https://avukat-ajanda-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Kayıt başarısız');
      }

      // Store token and redirect
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      trackEvent('Auth', 'register_success', 'form');
      handleClose();
      router.push('/dashboard');
      router.refresh(); // Refresh to update auth state
    } catch (err: any) {
      trackEvent('Auth', 'register_error', err.message);
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Check if all consents are given
  const allConsentsGiven = registerData.consents.kvkk && 
                           registerData.consents.aydinlatma && 
                           registerData.consents.uyelik;

  // Don't render on server
  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        ref={modalRef}
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto focus:outline-none"
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking outside if loading
          if (loading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          // Prevent closing with ESC if loading
          if (loading) e.preventDefault();
        }}
        onKeyDown={handleEscapeKey}
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        role="dialog"
      >
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">AA</span>
            </div>
          </div>
          <DialogTitle id="auth-modal-title" className="text-center text-2xl font-semibold">
            AvukatAjanda
          </DialogTitle>
          <DialogDescription id="auth-modal-description" className="text-center text-muted-foreground text-sm mt-2">
            Hukuk büronuz için akıllı yönetim sistemi
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" disabled={loading}>Giriş Yap</TabsTrigger>
            <TabsTrigger value="register" disabled={loading}>Kayıt Ol</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">
                  <Mail className="inline-block w-4 h-4 mr-1" />
                  E-posta
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">
                  <Lock className="inline-block w-4 h-4 mr-1" />
                  Şifre
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="current-password"
                  aria-required="true"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/forgot-password" 
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  onClick={handleClose}
                  tabIndex={0}
                >
                  Şifremi unuttum
                </Link>
              </div>

              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Hesabınız yok mu?
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setTab('register')}
                disabled={loading}
              >
                Ücretsiz Kayıt Ol
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">
                  <User className="inline-block w-4 h-4 mr-1" />
                  Ad Soyad
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="name"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">
                  <Mail className="inline-block w-4 h-4 mr-1" />
                  E-posta
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">
                  <Lock className="inline-block w-4 h-4 mr-1" />
                  Şifre
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="En az 8 karakter"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">
                  <Lock className="inline-block w-4 h-4 mr-1" />
                  Şifre Tekrar
                </Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  aria-required="true"
                />
              </div>

              <div className="space-y-3 border-t pt-4" role="group" aria-labelledby="consent-group">
                <p id="consent-group" className="text-sm font-medium text-muted-foreground">
                  Yasal Onaylar (Zorunlu)
                </p>
                
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
                    disabled={loading}
                    aria-required="true"
                    aria-describedby="kvkk-text"
                  />
                  <label 
                    id="kvkk-text"
                    htmlFor="kvkk" 
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <Link 
                      href="/kvkk" 
                      target="_blank" 
                      className="text-primary hover:underline"
                      tabIndex={0}
                    >
                      KVKK Metni
                    </Link>
                    'ni okudum ve kabul ediyorum
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
                    disabled={loading}
                    aria-required="true"
                    aria-describedby="aydinlatma-text"
                  />
                  <label 
                    id="aydinlatma-text"
                    htmlFor="aydinlatma" 
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <Link 
                      href="/aydinlatma-metni" 
                      target="_blank" 
                      className="text-primary hover:underline"
                      tabIndex={0}
                    >
                      Aydınlatma Metni
                    </Link>
                    'ni okudum ve kabul ediyorum
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
                    disabled={loading}
                    aria-required="true"
                    aria-describedby="uyelik-text"
                  />
                  <label 
                    id="uyelik-text"
                    htmlFor="uyelik" 
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <Link 
                      href="/uyelik-sozlesmesi" 
                      target="_blank" 
                      className="text-primary hover:underline"
                      tabIndex={0}
                    >
                      Üyelik Sözleşmesi
                    </Link>
                    'ni okudum ve kabul ediyorum
                  </label>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !allConsentsGiven}
                aria-busy={loading}
                aria-disabled={!allConsentsGiven}
                title={!allConsentsGiven ? 'Tüm yasal onayları vermelisiniz' : ''}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kayıt yapılıyor...
                  </>
                ) : (
                  'Kayıt Ol'
                )}
              </Button>

              {!allConsentsGiven && (
                <p className="text-xs text-center text-destructive">
                  * Kayıt olmak için tüm yasal metinleri kabul etmelisiniz
                </p>
              )}

              <p className="text-xs text-center text-muted-foreground">
                Kayıt olarak, hizmet şartlarımızı kabul etmiş olursunuz.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
