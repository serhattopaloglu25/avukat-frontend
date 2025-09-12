module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Apostrof ve tırnak işaretlerini kabul et
    'react/no-unescaped-entities': 'off',
    
    // useEffect dependency uyarılarını sadece uyarı yap
    'react-hooks/exhaustive-deps': 'warn',
    
    // Diğer önemli kurallar açık kalsın
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
  },
};