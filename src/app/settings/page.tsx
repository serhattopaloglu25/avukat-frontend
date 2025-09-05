'use client';

import { useState, useEffect } from 'react';
import { useOrg } from '@/context/OrgContext';
import api from '@/lib/api';

export default function SettingsPage() {
  const { currentOrg } = useOrg();
  const [members, setMembers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('assistant');

  useEffect(() => {
    if (currentOrg) {
      fetchMembers();
    }
  }, [currentOrg]);

  const fetchMembers = async () => {
    try {
      const response = await api.get(`/api/orgs/${currentOrg?.id}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch members');
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/api/orgs/${currentOrg?.id}/invite`, {
        email: inviteEmail,
        role: inviteRole
      });
      setInviteEmail('');
      fetchMembers();
    } catch (error) {
      console.error('Failed to invite member');
    }
  };

  const updateRole = async (memberId: number, newRole: string) => {
    try {
      await api.put(`/api/orgs/${currentOrg?.id}/members/${memberId}`, {
        role: newRole
      });
      fetchMembers();
    } catch (error) {
      console.error('Failed to update role');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Organizasyon Ayarları</h1>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Organizasyon: {currentOrg?.name}</h2>
          <p className="text-gray-600">Rolünüz: {currentOrg?.role}</p>
        </div>

        {currentOrg?.role === 'admin' && (
          <div className="bg-white rounded shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Üye Davet Et</h2>
            <form onSubmit={handleInvite} className="flex gap-2">
              <input
                type="email"
                placeholder="E-posta"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 border rounded"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="lawyer">Avukat</option>
                <option value="assistant">Asistan</option>
              </select>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Davet Et
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Üyeler</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">İsim</th>
                <th className="text-left py-2">E-posta</th>
                <th className="text-left py-2">Rol</th>
                {currentOrg?.role === 'admin' && <th className="text-left py-2">İşlem</th>}
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b">
                  <td className="py-2">{member.user.name}</td>
                  <td className="py-2">{member.user.email}</td>
                  <td className="py-2">
                    {currentOrg?.role === 'admin' ? (
                      <select
                        value={member.role}
                        onChange={(e) => updateRole(member.id, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="admin">Admin</option>
                        <option value="lawyer">Avukat</option>
                        <option value="assistant">Asistan</option>
                      </select>
                    ) : (
                      member.role
                    )}
                  </td>
                  {currentOrg?.role === 'admin' && (
                    <td className="py-2">
                      <button className="text-red-600">Kaldır</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
