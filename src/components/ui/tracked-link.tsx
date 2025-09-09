'use client';

import Link from 'next/link';
import { trackEvent } from '@/components/Analytics';

interface TrackedLinkProps {
  href: string;
  category: string;
  action: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedLink({
  href,
  category,
  action,
  label,
  children,
  className,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(category, action, label);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
