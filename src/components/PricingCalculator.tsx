'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, Users, FileText } from 'lucide-react';

export default function PricingCalculator() {
  const [inputs, setInputs] = useState({
    lawyers: 1,
    cases: 50,
    clients: 30,
    storage: 5,
    features: {
      sms: false,
      api: false,
      training: false,
      priority: false
    }
  });

  const [recommendedPlan, setRecommendedPlan] = useState('mini');
  const [monthlyPrice, setMonthlyPrice] = useState(99);
  const [savings, setSavings] = useState(0);

  const plans = {
    mini: { price: 99, lawyers: 1, cases: 100, clients: 50, storage: 5 },
    orta: { price: 199, lawyers: 5, cases: 500, clients: 200, storage: 50 },
    buyuk: { price: 399, lawyers: 999, cases: 9999, clients: 9999, storage: 999 }
  };

  useEffect(() => {
    // Plan önerisi hesaplama
    let recommended = 'mini';
    
    if (inputs.lawyers > 1 || inputs.cases > 100 || inputs.clients > 50) {
      recommended = 'orta';
    }
    
    if (inputs.lawyers > 5 || inputs.cases > 500 || inputs.clients > 200 || 
        inputs.features.api || inputs.features.training) {
      recommended = 'buyuk';
    }

    setRecommendedPlan(recommended);
    
    // Fiyat hesaplama
    let basePrice = plans[recommended as keyof typeof plans].price;
    
    // Ekstra özellikler için ek ücret
    if (inputs.features.sms) basePrice += 20;
    if (inputs.features.priority) basePrice += 30;
    
    setMonthlyPrice(basePrice);

    // Tasarruf hesaplama (manuel yönetim maliyeti tahmini)
    const manualCost = (inputs.lawyers * 500) + (inputs.cases * 2) + (inputs.clients * 3);
    setSavings(Math.max(0, manualCost - basePrice));
  }, [inputs]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <Calculator className="w-8 h-8 inline mr-2 text-primary" />
          Fiyat Hesaplama Aracı
        </h2>
        <p className="text-gray-600">
          İhtiyaçlarınıza göre size en uygun planı bulalım
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sol: Inputs */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg mb-4">Büro Bilgileriniz</h3>
          
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                Avukat Sayısı
              </span>
              <span className="font-bold text-primary">{inputs.lawyers}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={inputs.lawyers}
              onChange={(e) => setInputs({...inputs, lawyers: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Aylık Dava Sayısı
              </span>
              <span className="font-bold text-primary">{inputs.cases}</span>
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={inputs.cases}
              onChange={(e) => setInputs({...inputs, cases: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                Müvekkil Sayısı
              </span>
              <span className="font-bold text-primary">{inputs.clients}</span>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={inputs.clients}
              onChange={(e) => setInputs({...inputs, clients: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>

          <div>
            <h4 className="font-medium mb-3">Ek Özellikler</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.features.sms}
                  onChange={(e) => setInputs({
                    ...inputs,
                    features: {...inputs.features, sms: e.target.checked}
                  })}
                  className="mr-2"
                />
                <span>SMS Bildirimleri (+₺20/ay)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.features.api}
                  onChange={(e) => setInputs({
                    ...inputs,
                    features: {...inputs.features, api: e.target.checked}
                  })}
                  className="mr-2"
                />
                <span>API Erişimi (Kurumsal)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.features.training}
                  onChange={(e) => setInputs({
                    ...inputs,
                    features: {...inputs.features, training: e.target.checked}
                  })}
                  className="mr-2"
                />
                <span>Özel Eğitim (Kurumsal)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.features.priority}
                  onChange={(e) => setInputs({
                    ...inputs,
                    features: {...inputs.features, priority: e.target.checked}
                  })}
                  className="mr-2"
                />
                <span>Öncelikli Destek (+₺30/ay)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sağ: Sonuçlar */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Önerilen Plan</h3>
          
          <div className="bg-white p-6 rounded-lg mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Size önerdiğimiz plan:</p>
              <h4 className="text-3xl font-bold text-primary capitalize mb-2">
                {recommendedPlan === 'mini' ? 'Mini' : recommendedPlan === 'orta' ? 'Orta' : 'Büyük'} Ofis
              </h4>
              <div className="text-5xl font-bold text-gray-900 mb-4">
                ₺{monthlyPrice}
                <span className="text-lg text-gray-600">/ay</span>
              </div>
              
              {savings > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Aylık ₺{savings.toLocaleString('tr-TR')} tasarruf!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h4 className="font-medium">Planınıza Dahil:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {recommendedPlan === 'mini' ? '1 Kullanıcı' : 
                 recommendedPlan === 'orta' ? '5 Kullanıcı' : 'Sınırsız Kullanıcı'}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {recommendedPlan === 'mini' ? '100 Dava' : 
                 recommendedPlan === 'orta' ? '500 Dava' : 'Sınırsız Dava'}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {recommendedPlan === 'mini' ? '5 GB Depolama' : 
                 recommendedPlan === 'orta' ? '50 GB Depolama' : 'Sınırsız Depolama'}
              </li>
              {inputs.features.sms && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  SMS Bildirimleri
                </li>
              )}
              {inputs.features.priority && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Öncelikli Destek
                </li>
              )}
            </ul>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90">
            Hemen Başla - 14 Gün Ücretsiz
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <p className="text-center text-blue-800">
          <Clock className="w-5 h-5 inline mr-2" />
          Dijital dönüşüm ile ayda ortalama <strong>20 saat</strong> tasarruf edin!
        </p>
      </div>
    </div>
  );
}
