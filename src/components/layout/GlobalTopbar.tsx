'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Menu, X, Users, FileText, Calendar, Files, Receipt } from 'lucide-react';

export function GlobalTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleAuthClick = () => {
    router.push('/?auth=login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
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
                     pathname.startsWith('/invoices');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAppRoute && isAuthenticated ? (
              appLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {!isAppRoute && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      Panel
                    </Button>
                  </Link>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Çıkış
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleAuthClick} variant="ghost" size="sm">
                  Giriş Yap
                </Button>
                <Link href="/?auth=register">
                  <Button size="sm">
                    Ücretsiz Dene
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {(isAppRoute && isAuthenticated ? appLinks : publicLinks).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="px-4 pt-2 space-y-2 border-t">
                {isAuthenticated ? (
                  <>
                    {!isAppRoute && (
                      <Link href="/dashboard" className="block">
                        <Button variant="outline" className="w-full">
                          Panel
                        </Button>
                      </Link>
                    )}
                    <Button onClick={handleLogout} className="w-full" variant="outline">
                      Çıkış
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleAuthClick} variant="outline" className="w-full">
                      Giriş Yap
                    </Button>
                    <Link href="/?auth=register" className="block">
                      <Button className="w-full">
                        Ücretsiz Dene
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
