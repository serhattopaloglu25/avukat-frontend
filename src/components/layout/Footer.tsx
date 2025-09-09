import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AvukatAjanda</h3>
              <p className="text-sm text-gray-600">
                Hukuk büroları için modern ve güvenli dijital çözüm.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ozellikler" className="text-gray-600 hover:text-primary">Özellikler</Link></li>
                <li><Link href="/cozumler" className="text-gray-600 hover:text-primary">Çözümler</Link></li>
                <li><Link href="/fiyatlandirma" className="text-gray-600 hover:text-primary">Fiyatlandırma</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/iletisim" className="text-gray-600 hover:text-primary">İletişim</Link></li>
                <li><Link href="/sss" className="text-gray-600 hover:text-primary">Sıkça Sorulan Sorular</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/kvkk" className="text-gray-600 hover:text-primary">KVKK Aydınlatma</Link></li>
                <li><Link href="/kullanim-sartlari" className="text-gray-600 hover:text-primary">Kullanım Şartları</Link></li>
                <li><Link href="/gizlilik" className="text-gray-600 hover:text-primary">Gizlilik Politikası</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>© 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
