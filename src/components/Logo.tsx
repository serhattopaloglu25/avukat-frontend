'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'full' | 'mark';
}

export function Logo({ 
  className = 'h-10 w-auto', 
  width = 240, 
  height = 48,
  variant = 'full'
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return (
      <Image
        src={variant === 'mark' ? '/brand/avukatajanda-mark.svg' : '/brand/avukatajanda-logo.svg'}
        alt="AvukatAjanda"
        width={variant === 'mark' ? 48 : width}
        height={variant === 'mark' ? 48 : height}
        className={className}
        priority
      />
    );
  }

  const isDark = theme === 'dark' || resolvedTheme === 'dark';
  
  let logoSrc = '/brand/avukatajanda-logo.svg';
  
  if (variant === 'mark') {
    logoSrc = '/brand/avukatajanda-mark.svg';
  } else if (isDark) {
    logoSrc = '/brand/avukatajanda-logo-dark.svg';
  }

  return (
    <Image
      src={logoSrc}
      alt="AvukatAjanda"
      width={variant === 'mark' ? 48 : width}
      height={variant === 'mark' ? 48 : height}
      className={className}
      priority
    />
  );
}

// Export for static contexts
export const logoSources = {
  light: '/brand/avukatajanda-logo.svg',
  dark: '/brand/avukatajanda-logo-dark.svg',
  mark: '/brand/avukatajanda-mark.svg',
  favicon: '/favicon.svg'
};
