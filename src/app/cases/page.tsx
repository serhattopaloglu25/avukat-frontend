'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    caseNo: '',
    title: '',
    clientId: '',
    status: 'active'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchCases();
    fetchClients();
  }, []);

  const fetchCases = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://avukat-ajanda-backend.onrender.com'}/api/cases`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCases(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch cases');
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://avukat-ajanda-backend.onrender.com'}/api/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setClients(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch clients');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://avukat-ajanda-backend.onrender.com'}/api/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          clientId: parseInt(formData.clientId)
        })
      });
      
      if (response.ok) {
        setShowForm(false);
        setFormData({ caseNo: '', title: '', clientId: '', status: 'active' });
        fetchCases();
      }
    } catch (error) {
      console.error('Failed to create case');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Davalarım</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Yeni Dava Ekle
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Dava No"
                required
                value={formData.caseNo}
                onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Dava Başlığı"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              />
              <select
                required
                value={formData.clientId}
                onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Müvekkil Seçin</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="active">Aktif</option>
                <option value="pending">Beklemede</option>
                <option value="closed">Kapalı</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Kaydet
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                İptal
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow">
          {cases.length === 0 ? (
            <p className="p-8 text-center text-gray-500">Henüz dava eklenmemiş</p>
          ) : (
            <div className="divide-y">
              {cases.map(caseItem => (
                <div key={caseItem.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{caseItem.title}</h3>
                      <p className="text-sm text-gray-600">No: {caseItem.caseNo}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        caseItem.status === 'active' ? 'bg-green-100 text-green-800' :
                        caseItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
