export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">KİŞİSEL VERİLERİN KORUNMASI POLİTİKASI</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. VERİ SORUMLUSU</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
              veri sorumlusu olarak AvukatAjanda tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. İŞLENEN KİŞİSEL VERİLER</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kimlik Bilgileri (Ad, soyad, TC kimlik no)</li>
              <li>İletişim Bilgileri (E-posta, telefon, adres)</li>
              <li>Müvekkil Bilgileri (Dava detayları, dosya içerikleri)</li>
              <li>Mali Bilgiler (Fatura bilgileri, ödeme kayıtları)</li>
              <li>İşlem Güvenliği Bilgileri (IP adresi, log kayıtları)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hizmetlerimizin sunulması ve yönetimi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Sözleşme süreçlerinin yürütülmesi</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Bilgi güvenliği süreçlerinin yönetimi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. KİŞİSEL VERİLERİN AKTARILMASI</h2>
            <p>
              Toplanan kişisel verileriniz; KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri 
              işleme şartları ve amaçları çerçevesinde, hizmet alınan üçüncü kişilere, iş ortaklarımıza, 
              hissedarlarımıza, kanunen yetkili kamu kurumlarına ve özel kişilere aktarılabilecektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. KİŞİSEL VERİLERİN SAKLANMA SÜRESİ</h2>
            <p>
              Kişisel verileriniz, ilgili mevzuatta belirtilen sürelere uygun olarak ve işlendikleri 
              amaç için gerekli olan süre kadar muhafaza edilecektir. Bu sürenin bitimi veya ilgili 
              mevzuatta belirtilen azami sürenin dolması durumunda kişisel veriler silinecek, yok 
              edilecek veya anonim hale getirilecektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. HAKLARINIZ</h2>
            <p>KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme veya silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. İLETİŞİM</h2>
            <p>
              Başvurularınızı, destek@avukatajanda.com adresine e-posta yoluyla veya kayıtlı 
              elektronik posta (KEP) adresi ile iletebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
