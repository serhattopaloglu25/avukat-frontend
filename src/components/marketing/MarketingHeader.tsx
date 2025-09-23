'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/ozellikler', label: 'Özellikler' },
    { href: '/fiyatlandirma', label: 'Fiyatlandırma' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/blog', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
    { href: '/destek-merkezi', label: 'Destek Merkezi' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo variant="header" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button>Ücretsiz Başla</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 px-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">Giriş Yap</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Ücretsiz Başla</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
