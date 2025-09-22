'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 150, height = 40 }: LogoProps) {
  return (
    <div className={className}>
      <span className="text-2xl font-bold text-primary">AvukatAjanda</span>
    </div>
  );
}
