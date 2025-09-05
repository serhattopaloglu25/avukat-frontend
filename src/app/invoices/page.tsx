'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    tax: 18
  });

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Failed to fetch invoices');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clients');
      setClients(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch clients');
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0
    );
    const taxAmount = subtotal * (formData.tax / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, taxAmount, total } = calculateTotals();
    
    try {
      await api.post('/api/invoices', {
        ...formData,
        clientId: parseInt(formData.clientId),
        subtotal,
        tax: taxAmount,
        total,
        status: 'draft'
      });
      
      setShowForm(false);
      fetchInvoices();
    } catch (error) {
      console.error('Failed to create invoice');
    }
  };

  const markAsPaid = async (id: number) => {
    try {
      await api.post(`/api/invoices/${id}/mark-paid`);
      fetchInvoices();
    } catch (error) {
      console.error('Failed to mark as paid');
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const items = [...formData.items];
    items[index] = { ...items[index], [field]: value };
    setFormData({ ...formData, items });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-sm ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Faturalar</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Yeni Fatura
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Müvekkil</label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Seçin</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">KDV %</label>
                <input
                  type="number"
                  value={formData.tax}
                  onChange={(e) => setFormData({...formData, tax: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Düzenlenme Tarihi</label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vade Tarihi</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Kalemler</label>
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Açıklama"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Miktar"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Birim Fiyat"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                    className="w-32 px-3 py-2 border rounded"
                  />
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-blue-600">
                + Kalem Ekle
              </button>
            </div>

            <div className="border-t pt-4">
              <div className="text-right">
                <p>Ara Toplam: ₺{calculateTotals().subtotal.toFixed(2)}</p>
                <p>KDV: ₺{calculateTotals().taxAmount.toFixed(2)}</p>
                <p className="font-bold">Toplam: ₺{calculateTotals().total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Oluştur
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
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">No</th>
                <th className="text-left p-4">Müvekkil</th>
                <th className="text-left p-4">Toplam</th>
                <th className="text-left p-4">Durum</th>
                <th className="text-left p-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id} className="border-b">
                  <td className="p-4">{invoice.number}</td>
                  <td className="p-4">{invoice.client?.name}</td>
                  <td className="p-4">₺{invoice.total?.toFixed(2)}</td>
                  <td className="p-4">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4">
                    {invoice.status !== 'paid' && (
                      <button
                        onClick={() => markAsPaid(invoice.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Ödendi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
