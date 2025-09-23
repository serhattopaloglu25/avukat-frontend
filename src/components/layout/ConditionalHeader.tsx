'use client';

import { usePathname } from 'next/navigation';
import { GlobalHeader as Header } from '@/components/layout/GlobalHeader';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Dashboard ve admin sayfalarında header gösterme
  const hiddenPaths = ['/dashboard', '/clients', '/cases', '/calendar', '/documents', '/invoices', '/admin', '/settings', '/profile'];
  const shouldHideHeader = hiddenPaths.some(path => pathname?.startsWith(path));

  if (shouldHideHeader) {
    return null;
  }

  return <Header />;
}