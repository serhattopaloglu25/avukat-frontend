// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://avukat-ajanda-backend.onrender.com';

class ApiService {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.access_token) {
      this.token = data.access_token;
      localStorage.setItem('auth_token', data.access_token);
    }
    
    return data;
  }

  async register(userData: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Client methods
  async getClients(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/api/clients${queryString}`);
  }

  async getClient(id: number) {
    return this.request(`/api/clients/${id}`);
  }

  async createClient(data: any) {
    return this.request('/api/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: number, data: any) {
    return this.request(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: number) {
    return this.request(`/api/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Case methods
  async getCases(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/api/cases${queryString}`);
  }

  async getCase(id: number) {
    return this.request(`/api/cases/${id}`);
  }

  async createCase(data: any) {
    return this.request('/api/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCase(id: number, data: any) {
    return this.request(`/api/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCase(id: number) {
    return this.request(`/api/cases/${id}`, {
      method: 'DELETE',
    });
  }

  // Event methods
  async getEvents() {
    return this.request('/api/events');
  }

  async createEvent(data: any) {
    return this.request('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/api/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Invoice methods
  async getInvoices() {
    return this.request('/api/invoices');
  }

  async createInvoice(data: any) {
    return this.request('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/api/dashboard/stats');
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
}

export const apiService = new ApiService();
export default apiService;
