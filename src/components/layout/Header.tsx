'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">AvukatAjanda</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/ozellikler" className="text-sm font-medium hover:text-primary transition-colors">
              Özellikler
            </Link>
            <Link href="/cozumler" className="text-sm font-medium hover:text-primary transition-colors">
              Çözümler
            </Link>
            <Link href="/fiyatlandirma" className="text-sm font-medium hover:text-primary transition-colors">
              Fiyatlandırma
            </Link>
            <Link href="/iletisim" className="text-sm font-medium hover:text-primary transition-colors">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:inline-flex">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button>Ücretsiz Başla</Button>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link href="/ozellikler" className="block py-2 text-sm hover:text-primary">
              Özellikler
            </Link>
            <Link href="/cozumler" className="block py-2 text-sm hover:text-primary">
              Çözümler
            </Link>
            <Link href="/fiyatlandirma" className="block py-2 text-sm hover:text-primary">
              Fiyatlandırma
            </Link>
            <Link href="/iletisim" className="block py-2 text-sm hover:text-primary">
              İletişim
            </Link>
            <Link href="/login" className="block py-2 text-sm hover:text-primary">
              Giriş Yap
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
