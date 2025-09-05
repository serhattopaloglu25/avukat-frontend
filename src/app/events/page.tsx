'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting',
    dateTime: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/api/events');
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch events');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/events', formData);
      setShowForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Emin misiniz?')) {
      await api.delete(`/api/events/${id}`);
      fetchEvents();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Takvim</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Etkinlik Ekle
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
            <input
              type="text"
              placeholder="Başlık"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border rounded mb-3"
            >
              <option value="meeting">Görüşme</option>
              <option value="hearing">Duruşma</option>
              <option value="deadline">Son Tarih</option>
            </select>
            <input
              type="datetime-local"
              required
              value={formData.dateTime}
              onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Konum (opsiyonel)"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <textarea
              placeholder="Notlar (opsiyonel)"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border rounded mb-3"
              rows={3}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                İptal
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded shadow">
          {events.length === 0 ? (
            <p className="p-8 text-center text-gray-500">Henüz etkinlik yok</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="p-4 border-b flex justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.type === 'meeting' ? 'Görüşme' : 
                     event.type === 'hearing' ? 'Duruşma' : 'Son Tarih'} - 
                    {new Date(event.dateTime).toLocaleString('tr-TR')}
                  </p>
                  {event.location && <p className="text-sm">📍 {event.location}</p>}
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
