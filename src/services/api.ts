import api from '@/lib/api';

export const clientService = {
  async getAll(page = 1, limit = 20) {
    const response = await api.get(`/api/clients?page=${page}&limit=${limit}`);
    return response.data;
  },
  async getById(id: number) {
    const response = await api.get(`/api/clients/${id}`);
    return response.data;
  },
  async create(data: any) {
    const response = await api.post('/api/clients', data);
    return response.data;
  },
  async update(id: number, data: any) {
    const response = await api.put(`/api/clients/${id}`, data);
    return response.data;
  },
  async delete(id: number) {
    const response = await api.delete(`/api/clients/${id}`);
    return response.data;
  }
};

export const caseService = {
  async getAll(page = 1, limit = 20, status?: string) {
    let url = `/api/cases?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    const response = await api.get(url);
    return response.data;
  },
  async getById(id: number) {
    const response = await api.get(`/api/cases/${id}`);
    return response.data;
  },
  async create(data: any) {
    const response = await api.post('/api/cases', data);
    return response.data;
  },
  async update(id: number, data: any) {
    const response = await api.put(`/api/cases/${id}`, data);
    return response.data;
  },
  async delete(id: number) {
    const response = await api.delete(`/api/cases/${id}`);
    return response.data;
  }
};
