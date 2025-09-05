'use client';

import { useState } from 'react';

export default function EventsPage() {
  const [events] = useState([
    { id: 1, title: 'Duruşma - Ahmet Yılmaz', type: 'hearing', date: '2024-01-15 10:00' },
    { id: 2, title: 'Müvekkil Görüşmesi', type: 'meeting', date: '2024-01-16 14:00' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Takvim</h1>
        
        <div className="bg-white rounded shadow">
          {events.map(event => (
            <div key={event.id} className="p-4 border-b">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.type} - {event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
