'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Av. Mehmet Yılmaz',
    firm: 'Yılmaz Hukuk Bürosu',
    rating: 5,
    comment: 'AvukatAjanda sayesinde büromdaki tüm süreçleri dijitalleştirdim. Müvekkil takibi ve dava yönetimi çok kolaylaştı.',
    image: '/avatars/avatar1.svg'
  },
  {
    id: 2,
    name: 'Av. Ayşe Kaya',
    firm: 'Kaya & Ortakları',
    rating: 5,
    comment: 'Duruşma takvimi özelliği harika. Artık hiçbir duruşmayı kaçırmıyorum. Mobil uygulama da çok pratik.',
    image: '/avatars/avatar2.svg'
  },
  {
    id: 3,
    name: 'Av. Ali Demir',
    firm: 'Demir Avukatlık',
    rating: 5,
    comment: 'KVKK uyumlu olması büyük avantaj. Verilerimizin güvenliğinden eminiz. Tavsiye ederim.',
    image: '/avatars/avatar3.svg'
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-xl text-gray-600">500+ hukuk bürosu AvukatAjanda'yı tercih ediyor</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.firm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
