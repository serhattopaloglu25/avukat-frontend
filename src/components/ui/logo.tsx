import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 40, text: 'text-2xl' }
  };

  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Image
          src="/logo.svg"
          alt="AvukatAjanda Logo"
          width={sizes[size].icon}
          height={sizes[size].icon}
          className="rounded-lg"
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold ${sizes[size].text}`}>AvukatAjanda</span>
      )}
    </Link>
  );
}
