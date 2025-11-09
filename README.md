# AvukatAjanda - Frontend

> 🚨 **CRITICAL: Before making ANY changes, read [PRODUCTION_INFO.md](../PRODUCTION_INFO.md) in the parent directory!**

This is the **PRODUCTION** Next.js project for AvukatAjanda (https://avukatajanda.com).

## ⚠️ Important Notes

- **Current Version:** v2.2.0 (Kullanıcı Yönetimi + Kayıt Sistemi)
- **Previous Deployment:** dpl_BaPTfi58d (commit: 06e0fee)
- **Live Site:** https://avukatajanda.com
- **Vercel Project:** https://vercel.com/serhat-topaloglus-projects/avukat-frontend

**NEVER make changes without reading [PRODUCTION_INFO.md](../PRODUCTION_INFO.md) first!**

## 📋 Recent Updates

### Version 2.2.0 (9 Kasım 2025)
- ✅ **Register Modal**: Kayıt formu artık modal olarak açılıyor
- ✅ **LocalStorage Entegrasyonu**: Kullanıcı kayıtları localStorage'da tutuluyor
- ✅ **Türkçeleştirme**: Tüm placeholder'lar Türkçe ("Ahmet Yılmaz")
- ✅ **Email Kontrolü**: Tekrar kayıt engelleme
- ✅ **Şifre Validasyonu**: Minimum 6 karakter + eşleşme kontrolü
- ✅ **Admin Users Panel**: Kayıtlı kullanıcıları görüntüleme sayfası (/admin/users)
- ✅ **Login İyileştirmesi**: Kayıtlı kullanıcılar giriş yapabiliyor

📖 Detaylı bilgi için: [RELEASE_NOTES_v2.2.md](./RELEASE_NOTES_v2.2.md)

### Version 2.1.0 (9 Kasım 2025)
- ✅ **Logo Güncellemesi**: Responsive logo scaling (Desktop 2.5x, Tablet 1.8x, Mobile 1.2x)
- ✅ **Fixed Header**: 72px sabit yükseklikte header tasarımı
- ✅ **Renk Şeması**: Ana renk #2ECC71 (parlak zümrüt yeşili) ile güncellendi
- ✅ **Mobile Responsive**: Tüm ekran boyutları için optimize edilmiş tasarım
- ✅ **Favicon Refresh**: Yeni branding ile favicon ve PWA icon güncellemeleri

📖 Detaylı bilgi için: [RELEASE_NOTES_v2.1.md](./RELEASE_NOTES_v2.1.md)

### Version 2.0.0 (1 Kasım 2025)
- ✅ **Dinamik Dashboard**: Gerçek zamanlı istatistikler ve otomatik güncelleme
- ✅ **Emsal Dava Sorgulama**: 28 detaylı emsal dava ile kapsamlı arama sistemi
- ✅ **Gelişmiş Filtreleme**: Dava türü, mahkeme, tarih aralığı filtreleri
- ✅ **Detaylı Karar Metinleri**: Her dava için yasal açıdan doğru tam metin

📖 Detaylı bilgi için: [RELEASE_NOTES_v2.0.md](./RELEASE_NOTES_v2.0.md)

## Analytics Setup

### Environment Variables

Google Analytics için:

- Vercel Dashboard'a gidin
- Settings > Environment Variables
- NEXT_PUBLIC_GA_ID ekleyin
- Değer: G-1RTWPD8X79

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Search Console Doğrulama

1. Google Search Console'a gidin: https://search.google.com/search-console
2. Mülk ekle → URL öneki → https://avukatajanda.com
3. HTML dosyası doğrulama yöntemini seçin
4. İndirilen dosyayı public/ klasörüne koyun
5. Deploy edin ve doğrulayın

## Analytics Kurulumu

Environment variable'ları Vercel'de ayarlayın:

- NEXT_PUBLIC_GA_ID: Google Analytics ID (G-XXXXXXXXX)
- NEXT_PUBLIC_PLAUSIBLE_DOMAIN: (Opsiyonel) Plausible domain

vercel env add NEXT_PUBLIC_GA_ID production

# G-1RTWPD8X79 girin

## Analytics Events

### Tracked Events:

| Event          | Category   | Action | Label                 | Where                        |
| -------------- | ---------- | ------ | --------------------- | ---------------------------- |
| CTA Click      | cta        | click  | hero/pricing/features | All "Ücretsiz Başla" buttons |
| Contact Submit | contact    | submit | contact_page          | /iletisim form               |
| Nav Click      | navigation | click  | [page_name]           | Header navigation            |
| Login Click    | auth       | click  | header                | "Giriş Yap" button           |

### Testing:

1. Open DevTools > Network
2. Filter: "gtag" or "plausible"
3. Trigger events
4. Verify requests with correct parameters
