'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Özellikler', href: '/ozellikler' },
  { name: 'Fiyatlandırma', href: '/fiyatlandirma' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTryFree = () => {
    // This will open the login/register modal
    window.location.href = '/register';
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm"
    )}
    style={{ height: '72px', display: 'flex', alignItems: 'center' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-full flex items-center py-1">
              <Image
                src="/brand/avukatajanda-logo.png"
                alt="AvukatAjanda"
                width={1400}
                height={280}
                priority
                className="w-auto header-logo-responsive"
                style={{
                  height: '70px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary">
              Giriş Yap
            </Link>
            <Button 
              onClick={handleTryFree}
              className="bg-primary hover:bg-primary/90"
            >
              Ücretsiz Dene
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-lg transition-colors",
                    pathname === item.href 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t flex flex-col gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-center py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Giriş Yap
                </Link>
                <Button 
                  onClick={handleTryFree}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Ücretsiz Dene
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
