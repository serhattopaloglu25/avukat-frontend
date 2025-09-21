'use client';

export default function PricingPage() {
  const plans = [
    { name: 'Mini Ofis', price: '4.999', features: ['1 Kullanıcı', '50 Müvekkil', '5 GB Depolama'] },
    { name: 'Orta Ofis', price: '6.999', features: ['5 Kullanıcı', 'Sınırsız Müvekkil', '50 GB Depolama'], popular: true },
    { name: 'Büyük Ofis', price: '9.999', features: ['Sınırsız Kullanıcı', 'Sınırsız Müvekkil', 'Sınırsız Depolama'] }
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Fiyatlandırma</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map(plan => (
          <div key={plan.name} className={`border-2 ${plan.popular ? 'border-primary' : 'border-gray-200'} p-8 rounded-lg`}>
            {plan.popular && <div className="text-center mb-4 text-primary font-bold">EN POPÜLER</div>}
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">₺{plan.price}<span className="text-sm text-gray-600">/ay</span></p>
            <ul className="space-y-2 mb-8">
              {plan.features.map(f => <li key={f}>✓ {f}</li>)}
            </ul>
            <button className="w-full bg-primary text-white py-3 rounded hover:bg-primary/90">
              Ücretsiz Dene
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
