export default function AydinlatmaMetniPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">AYDINLATMA METNİ</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <p className="mb-4">
              İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi 
              ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında 
              Tebliğ kapsamında hazırlanmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Veri Sorumlusunun Kimliği</h2>
            <p>
              AvukatAjanda olarak, veri sorumlusu sıfatıyla, hukuki büro yönetim yazılımı hizmetlerimiz 
              kapsamında elde ettiğimiz kişisel verilerinizi işlemekteyiz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Kişisel Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Üyelik işlemlerinin gerçekleştirilmesi ve yönetimi</li>
              <li>Hukuki büro yönetim hizmetlerinin sunulması</li>
              <li>Müvekkil ve dava takibi işlemlerinin yürütülmesi</li>
              <li>Ajanda ve hatırlatma hizmetlerinin sağlanması</li>
              <li>Faturalama ve muhasebe süreçlerinin yönetimi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İstatistik ve raporlama faaliyetlerinin yürütülmesi</li>
              <li>Bilgi güvenliği ve veri yedekleme süreçlerinin yönetimi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">İşlenen Kişisel Veri Kategorileri</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Kimlik Verileri:</strong> Ad, soyad, TC kimlik numarası, vergi kimlik numarası</li>
              <li><strong>İletişim Verileri:</strong> E-posta adresi, telefon numarası, adres bilgileri</li>
              <li><strong>Müvekkil Verileri:</strong> Müvekkil bilgileri, dava detayları, hukuki belgeler</li>
              <li><strong>Mali Veriler:</strong> Banka hesap bilgileri, fatura bilgileri, ödeme kayıtları</li>
              <li><strong>İşlem Güvenliği Verileri:</strong> Kullanıcı adı, şifre, IP adresi, log kayıtları</li>
              <li><strong>Hukuki İşlem Verileri:</strong> Dava dosyaları, mahkeme kararları, icra takipleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, web sitemiz, mobil uygulamalarımız, e-posta, telefon ve benzeri 
              iletişim kanalları aracılığıyla; KVKK'nın 5. ve 6. maddelerinde belirtilen:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Açık rızanızın bulunması</li>
              <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
              <li>Hukuki yükümlülüğün yerine getirilmesi</li>
              <li>Meşru menfaatlerimiz için veri işlemenin zorunlu olması</li>
            </ul>
            <p className="mt-4">hukuki sebeplerine dayanılarak toplanmaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Kişisel Verilerin Aktarıldığı Taraflar</h2>
            <p>Kişisel verileriniz:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Hosting ve altyapı hizmet sağlayıcılarına</li>
              <li>Ödeme ve finans kuruluşlarına</li>
              <li>Yasal zorunluluk halinde kamu kurum ve kuruluşlarına</li>
              <li>Hukuki danışmanlarımıza</li>
            </ul>
            <p className="mt-4">
              KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar dahilinde aktarılabilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Kişisel Veri Sahibinin Hakları</h2>
            <p>
              KVKK'nın 11. maddesi kapsamında sahip olduğunuz haklar için yukarıda belirtilen 
              KVKK politikamızı inceleyebilir, başvurularınızı destek@avukatajanda.com adresine 
              iletebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliği bizim için önceliklidir. Verileriniz, 256-bit SSL 
              şifreleme ile korunmakta, ISO 27001 standartlarına uygun olarak saklanmakta ve 
              düzenli olarak yedeklenmektedir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
