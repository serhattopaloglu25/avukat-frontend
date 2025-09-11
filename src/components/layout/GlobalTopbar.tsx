'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Menu, X, Users, FileText, Calendar, Files, Receipt, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function GlobalTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleAuthClick = () => {
    router.push('/?auth=login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/');
  };

  const publicLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/ozellikler', label: 'Özellikler' },
    { href: '/fiyatlandirma', label: 'Fiyatlandırma' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/blog', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  const appLinks = [
    { href: '/dashboard', label: 'Panel', icon: Users },
    { href: '/clients', label: 'Müvekkiller', icon: Users },
    { href: '/cases', label: 'Davalar', icon: FileText },
    { href: '/events', label: 'Ajanda', icon: Calendar },
    { href: '/files', label: 'Dosyalar', icon: Files },
    { href: '/invoices', label: 'Faturalar', icon: Receipt },
  ];

  const isAppRoute = pathname.startsWith('/dashboard') || 
                     pathname.startsWith('/clients') || 
                     pathname.startsWith('/cases') || 
                     pathname.startsWith('/events') || 
                     pathname.startsWith('/files') || 
                     pathname.startsWith('/invoices') ||
                     pathname.startsWith('/reports') ||
                     pathname.startsWith('/settings');

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key for mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus first menu item when opened
      const firstLink = mobileMenuRef.current?.querySelector('a');
      firstLink?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="md" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {isAppRoute && isAuthenticated ? (
                <>
                  {appLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pathname === link.href 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* More dropdown for additional items */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Daha Fazla
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/reports">Raporlar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Ayarlar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/hakkimizda">Hakkımızda</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === link.href 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      Hesabım
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {!isAppRoute && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard">Panel</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Ayarlar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button onClick={handleAuthClick} variant="ghost" size="sm">
                    Giriş Yap
                  </Button>
                  <Link href="/?auth=register">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Ücretsiz Dene
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Overlay and Menu Container */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white z-50 md:hidden shadow-xl ${
              !prefersReducedMotion ? 'animate-in slide-in-from-right duration-200' : ''
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon menüsü"
          >
            <nav className="h-full overflow-y-auto">
              <div className="px-4 py-4 space-y-1">
                {(isAppRoute && isAuthenticated ? appLinks : publicLinks).map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 mt-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <>
                      {!isAppRoute && (
                        <Link 
                          href="/dashboard" 
                          className="block"
                          onClick={() => setMobileMenuOpen(false)}
                          tabIndex={mobileMenuOpen ? 0 : -1}
                          role="menuitem"
                        >
                          <Button variant="outline" className="w-full justify-start">
                            Panel
                          </Button>
                        </Link>
                      )}
                      <Link 
                        href="/settings" 
                        className="block"
                        onClick={() => setMobileMenuOpen(false)}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        role="menuitem"
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          Ayarlar
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }} 
                        className="w-full justify-start" 
                        variant="ghost"
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        role="menuitem"
                      >
                        Çıkış Yap
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => {
                          handleAuthClick();
                          setMobileMenuOpen(false);
                        }} 
                        variant="outline" 
                        className="w-full"
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        role="menuitem"
                      >
                        Giriş Yap
                      </Button>
                      <Link 
                        href="/?auth=register" 
                        className="block"
                        onClick={() => setMobileMenuOpen(false)}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        role="menuitem"
                      >
                        <Button className="w-full">
                          Ücretsiz Dene
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
