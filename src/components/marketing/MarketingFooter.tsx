'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  product: {
    title: 'Ürün',
    links: [
      { name: 'Özellikler', href: '/ozellikler' },
      { name: 'Fiyatlandırma', href: '/fiyatlandirma' },
      { name: 'Demo', href: '/demo' },
    ]
  },
  company: {
    title: 'Şirket',
    links: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Blog', href: '/blog' },
      { name: 'İletişim', href: '/iletisim' },
    ]
  },
  legal: {
    title: 'Yasal',
    links: [
      { name: 'KVKK Aydınlatma', href: '/aydinlatma-metni' },
      { name: 'Kullanım Koşulları', href: '/uyelik-sozlesmesi' },
      { name: 'Gizlilik Politikası', href: '/kvkk' },
    ]
  }
};

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/brand/avukatajanda-logo-dark.svg"
                alt="AvukatAjanda"
                width={240}
                height={80}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Hukuk bürolarının dijital dönüşümü için tasarlanmış, 
              KVKK uyumlu, güvenli ve kullanımı kolay yazılım çözümü.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 bg-green-900/30 text-green-400 px-3 py-1 rounded-full">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                KVKK Uyumlu
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SSL Güvenli
              </span>
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} AvukatAjanda. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="https://twitter.com/avukatajanda" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link 
                href="https://linkedin.com/company/avukatajanda" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
