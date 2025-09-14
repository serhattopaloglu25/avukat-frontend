module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Apostrof ve tırnak işaretlerini kabul et
    'react/no-unescaped-entities': 'off',
    
    // useEffect dependency uyarılarını sadece uyarı yap
    'react-hooks/exhaustive-deps': 'warn',
    
    // Development için yararlı ama production'da sorun çıkarmayan kurallar
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // Image alt text - accessibility için önemli ama zorunlu değil
    'jsx-a11y/alt-text': 'warn',
  },
};