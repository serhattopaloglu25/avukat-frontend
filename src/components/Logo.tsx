'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtext?: boolean;
  variant?: 'default' | 'header';
  theme?: 'light' | 'dark';
}

export function Logo({ 
  className = '', 
  size = 'md', 
  showText = true, 
  showSubtext = false,
  variant = 'default',
  theme = 'light'
}: LogoProps) {
  
  // Header için özel boyutlandırma
  if (variant === 'header') {
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
    
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Sadece terazi ikonu */}
        <svg width="50" height="50" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(15,30)" stroke="#2ecc71" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Terazi Kirişi */}
            <path d="M0,0 L120,0" strokeWidth="5"/>
            
            {/* Pivot */}
            <circle cx="60" cy="0" r="4" fill="#2ecc71"/>
            
            {/* Zincirler */}
            <line x1="20" y1="0" x2="20" y2="40" strokeWidth="3.5"/>
            <line x1="100" y1="0" x2="100" y2="40" strokeWidth="3.5"/>
            
            {/* Kefeler (Gözler) */}
            <circle cx="20" cy="40" r="6" fill="#2ecc71" stroke="none"/>
            <circle cx="100" cy="40" r="6" fill="#2ecc71" stroke="none"/>
            
            {/* Gülümseme */}
            <path d="M10 50 Q60 85 110 50" stroke="#2ecc71" strokeWidth="4"/>
          </g>
        </svg>
        
        {/* Text - .com kaldırıldı */}
        <span className={`text-xl font-bold ${textColor}`} style={{ fontFamily: 'Nunito, sans-serif' }}>
          AvukatAjanda
        </span>
      </div>
    );
  }

  const sizes = {
    sm: { width: 250, height: 80, fontSize: 18, subFontSize: 10 },
    md: { width: 350, height: 100, fontSize: 28, subFontSize: 13 },
    lg: { width: 500, height: 150, fontSize: 36, subFontSize: 15 },
  };

  const currentSize = sizes[size];

  // Mobil versiyonu için kısa SVG
  if (size === 'sm') {
    return (
      <div className={`flex items-center ${className}`}>
        <svg width={currentSize.width} height={currentSize.height} viewBox="0 0 250 80" xmlns="http://www.w3.org/2000/svg">
          {/* Sembol kısaltılarak yeniden ölçeklenmiş */}
          <g transform="translate(20,18)" stroke="#2ecc71" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0,0 L60,0" strokeWidth="3"/>
            <circle cx="30" cy="0" r="2" fill="#2ecc71"/>
            <line x1="10" y1="0" x2="10" y2="20" strokeWidth="2"/>
            <line x1="50" y1="0" x2="50" y2="20" strokeWidth="2"/>
            <circle cx="10" cy="20" r="3" fill="#2ecc71" stroke="none"/>
            <circle cx="50" cy="20" r="3" fill="#2ecc71" stroke="none"/>
            <path d="M5 25 Q30 45 55 25" strokeWidth="2.5"/>
          </g>
          {showText && (
            <text x="95" y="45" fontFamily="Nunito, system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" fill="#2c3e50">
              AvukatAjanda
            </text>
          )}
        </svg>
      </div>
    );
  }

  // Normal ve büyük boyutlar için
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={currentSize.width} 
        height={currentSize.height} 
        viewBox="0 0 500 150" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arka Plan */}
        <rect width="100%" height="100%" fill="transparent"/>
        
        {/* Gülümseyen Terazi */}
        <g transform="translate(40,35)" stroke="#2ecc71" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Terazi Kirişi */}
          <path d="M0,0 L120,0" strokeWidth="5"/>
          
          {/* Pivot */}
          <circle cx="60" cy="0" r="4" fill="#2ecc71"/>
          
          {/* Zincirler */}
          <line x1="20" y1="0" x2="20" y2="40" strokeWidth="3.5"/>
          <line x1="100" y1="0" x2="100" y2="40" strokeWidth="3.5"/>
          
          {/* Kefeler (Gözler) */}
          <circle cx="20" cy="40" r="6" fill="#2ecc71" stroke="none"/>
          <circle cx="100" cy="40" r="6" fill="#2ecc71" stroke="none"/>
          
          {/* Gülümseme */}
          <path d="M10 50 Q60 85 110 50" stroke="#2ecc71" strokeWidth="4"/>
        </g>
        
        {/* Ana Metin - .com kaldırıldı */}
        {showText && (
          <text 
            x="180" 
            y="85" 
            fontFamily="Nunito, system-ui, -apple-system, sans-serif" 
            fontSize={currentSize.fontSize}
            fontWeight="700" 
            fill="#2c3e50"
          >
            AvukatAjanda
          </text>
        )}
        
        {/* Alt Metin (İsteğe Göre) */}
        {showSubtext && (
          <text 
            x="180" 
            y="115" 
            fontFamily="Nunito, system-ui, -apple-system, sans-serif" 
            fontSize={currentSize.subFontSize}
            fontWeight="600" 
            fill="#7f8c8d"
          >
            Profesyonel Avukat Ajanda Sistemi
          </text>
        )}
      </svg>
    </div>
  );
}

export default Logo;