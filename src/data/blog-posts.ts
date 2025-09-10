export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'dijital-donusum-hukuk-burolari',
    title: 'Hukuk Bürolarında Dijital Dönüşümün Önemi',
    excerpt: 'Teknolojinin hızla geliştiği günümüzde, hukuk büroları için dijital dönüşüm artık bir tercih değil, zorunluluk haline gelmiştir.',
    date: '2025-01-10',
    author: 'AvukatAjanda Ekibi',
    category: 'Dijital Dönüşüm',
    readTime: '5 dk okuma',
    content: `
      <h2>Hukuk Sektöründe Dijital Dönüşüm</h2>
      <p>Hukuk sektörü, geleneksel yapısıyla bilinen ancak son yıllarda teknolojik dönüşümün etkilerini yoğun şekilde hisseden bir alan haline geldi.</p>
      
      <h3>Neden Dijital Dönüşüm?</h3>
      <p>Müvekkil beklentilerinin değişmesi, rekabetin artması ve verimliliğin önem kazanması, hukuk bürolarını dijital çözümlere yönlendiriyor.</p>
      
      <h3>Zaman Yönetimi ve Verimlilik</h3>
      <ul>
        <li>Dosya arama süreleri %80 oranında azalıyor</li>
        <li>Müvekkil bilgilerine anında erişim sağlanıyor</li>
        <li>Otomatik hatırlatmalar ile duruşma kaçırma riski ortadan kalkıyor</li>
      </ul>
      
      <h3>Müvekkil Memnuniyeti</h3>
      <p>Modern müvekkiller, avukatlarından hızlı iletişim, şeffaflık ve profesyonel hizmet bekliyor.</p>
      
      <h3>Başarı Hikayeleri</h3>
      <p>İstanbul'da faaliyet gösteren orta ölçekli bir hukuk bürosu, dijital dönüşüm sonrası:</p>
      <ul>
        <li>Aylık yönetilen dava sayısını %40 artırdı</li>
        <li>Dosya hazırlık sürelerini %60 kısalttı</li>
        <li>Müvekkil memnuniyet oranını %95'e çıkardı</li>
      </ul>
    `
  },
  {
    slug: 'kvkk-hukuk-burolari-rehber',
    title: 'Hukuk Büroları İçin KVKK Uyum Rehberi',
    excerpt: 'KVKK kapsamında hukuk bürolarının yükümlülükleri ve uyum süreçleri hakkında kapsamlı rehber.',
    date: '2025-01-08',
    author: 'Hukuk Ekibi',
    category: 'Mevzuat',
    readTime: '7 dk okuma',
    content: `
      <h2>KVKK ve Hukuk Büroları</h2>
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu, hukuk büroları için özel önem taşıyor.</p>
      
      <h3>İşlenen Veri Kategorileri</h3>
      <ul>
        <li>Kimlik bilgileri (TC No, ad-soyad)</li>
        <li>İletişim bilgileri</li>
        <li>Mali bilgiler</li>
        <li>Sağlık verileri (tazminat davalarında)</li>
        <li>Aile bilgileri (boşanma davalarında)</li>
      </ul>
      
      <h3>KVKK Uyum Adımları</h3>
      <ol>
        <li>Veri envanteri oluşturma</li>
        <li>Aydınlatma metni hazırlama</li>
        <li>Açık rıza formları</li>
        <li>Veri güvenliği tedbirleri</li>
        <li>Veri saklama ve imha politikası</li>
      </ol>
      
      <h3>Veri İhlali Durumunda</h3>
      <p>Veri ihlali tespit edildiğinde:</p>
      <ul>
        <li>72 saat içinde Kurul'a bildirim</li>
        <li>Etkilenen kişilere bilgilendirme</li>
        <li>İhlal kayıtlarını tutma</li>
        <li>Önleyici tedbirleri alma</li>
      </ul>
    `
  },
  {
    slug: 'yapay-zeka-hukuk-sektorunde',
    title: 'Yapay Zeka Hukuk Sektörünü Nasıl Dönüştürüyor?',
    excerpt: 'Yapay zeka teknolojilerinin hukuk sektöründeki uygulamaları ve avukatlık mesleğinin geleceği.',
    date: '2025-01-05',
    author: 'Teknoloji Ekibi',
    category: 'Teknoloji',
    readTime: '6 dk okuma',
    content: `
      <h2>Hukuk ve Yapay Zeka</h2>
      <p>Yapay zeka (AI), hukuk sektöründe köklü değişimlere yol açıyor.</p>
      
      <h3>AI Uygulamaları</h3>
      <ul>
        <li>Doküman analizi ve inceleme</li>
        <li>Hukuki araştırma</li>
        <li>Risk değerlendirmesi</li>
        <li>Tahmine dayalı analitik</li>
      </ul>
      
      <h3>Avukatların Değişen Rolü</h3>
      <p>AI rutin görevleri otomatikleştirirken, avukatlar stratejik ve yaratıcı işlere odaklanıyor:</p>
      <ul>
        <li>Müvekkil ilişkileri ve empati</li>
        <li>Stratejik karar verme</li>
        <li>Mahkeme savunması</li>
        <li>Etik değerlendirmeler</li>
      </ul>
      
      <h3>Türkiye'de AI ve Hukuk</h3>
      <p>UYAP sistemi ve dijital dönüşüm ile başlayan süreç, AI entegrasyonu ile devam ediyor.</p>
      
      <h3>Geleceğe Hazırlık</h3>
      <ol>
        <li>Teknoloji okuryazarlığını artırın</li>
        <li>Yeni araçları takip edin</li>
        <li>İnsan becerilerini geliştirin</li>
        <li>AI'yı yardımcı olarak kullanın</li>
      </ol>
    `
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find(post => post.slug === slug) || null;
}
