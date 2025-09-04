'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { caseService, clientService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function CasesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    caseNo: '',
    title: '',
    clientId: 0,
    status: 'active'
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [casesData, clientsData] = await Promise.all([
        caseService.getAll(),
        clientService.getAll()
      ]);
      setCases(casesData.data || []);
      setClients(clientsData.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await caseService.create({
        ...formData,
        clientId: parseInt(formData.clientId as any)
      });
      setShowForm(false);
      setFormData({ caseNo: '', title: '', clientId: 0, status: 'active' });
      fetchData();
    } catch (error) {
      console.error('Failed to create case:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await caseService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete case:', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cases</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Case
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Case Number"
                required
                value={formData.caseNo}
                onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              />
              <select
                required
                value={formData.clientId}
                onChange={(e) => setFormData({...formData, clientId: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Case No</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Client</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-gray-500">
                    No cases found
                  </td>
                </tr>
              ) : (
                cases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{caseItem.caseNo}</td>
                    <td className="p-4">{caseItem.title}</td>
                    <td className="p-4">{caseItem.client?.name || '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        caseItem.status === 'active' ? 'bg-green-100 text-green-800' :
                        caseItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(caseItem.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
