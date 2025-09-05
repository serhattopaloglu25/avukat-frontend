'use client';

const features = [
  {
    icon: '📁',
    title: 'Dava Takibi',
    description: 'Tüm davalarınızı tek yerden yönetin. Duruşma tarihleri, belgeler ve notlar her zaman elinizin altında.'
  },
  {
    icon: '👥',
    title: 'Müvekkil Yönetimi',
    description: 'Müvekkil bilgilerini güvenle saklayın. İletişim geçmişi ve dava durumlarına anında erişin.'
  },
  {
    icon: '📅',
    title: 'Takvim & Hatırlatmalar',
    description: 'Önemli tarihleri asla kaçırmayın. Otomatik hatırlatmalar ile her zaman hazırlıklı olun.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Her İhtiyacınız Düşünüldü
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hukuk büronuzun dijital dönüşümü için gereken tüm araçlar tek platformda
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
