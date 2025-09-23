'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { width: 200, height: 48, fontSize: 16 },
    md: { width: 280, height: 67, fontSize: 22 },
    lg: { width: 350, height: 84, fontSize: 28 },
  };

  const currentSize = sizes[size];
  const scale = currentSize.height / 120; // Original SVG height is 120

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={currentSize.width} 
        height={currentSize.height} 
        viewBox="0 0 500 120" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none"
      >
        {/* Gülümseyen Terazi Görseli */}
        <g transform="translate(40, 20)">
          {/* Terazi kolu (üst çizgi) */}
          <line x1="0" y1="15" x2="80" y2="15" stroke="#14B8A6" strokeWidth="3"/>
          
          {/* Sol zincir */}
          <line x1="0" y1="15" x2="0" y2="45" stroke="#14B8A6" strokeWidth="2"/>
          {/* Sağ zincir */}
          <line x1="80" y1="15" x2="80" y2="45" stroke="#14B8A6" strokeWidth="2"/>
          
          {/* Gözler (yuvarlak panlar) */}
          <circle cx="0" cy="45" r="6" fill="#14B8A6"/>
          <circle cx="80" cy="45" r="6" fill="#14B8A6"/>
          
          {/* Gülümseme (eğri ağız) */}
          <path d="M10 55 Q40 75 70 55" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
        </g>
        
        {/* Yazı: "avukatajanda.com" - sadece showText true ise */}
        {showText && (
          <text 
            x="130" 
            y="70" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontSize={currentSize.fontSize}
            fontWeight="700" 
            fill="#14B8A6" 
            dominantBaseline="middle"
          >
            avukatajanda.com
          </text>
        )}
      </svg>
    </div>
  );
}

export default Logo;