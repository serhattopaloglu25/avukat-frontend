// Real API Service for AvukatAjanda
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Bir hata oluştu' }));
      throw new Error(error.error || error.detail || 'API isteği başarısız');
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Giriş başarısız' }));
      throw new Error(error.error || error.detail || 'Giriş başarısız');
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    return data;
  }

  async register(userData: any) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.access_token) {
      localStorage.setItem('auth_token', response.access_token);
    }
    return response;
  }

  async logout() {
    localStorage.removeItem('auth_token');
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Client endpoints
  async getClients(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/api/clients${query}`);
  }

  async getClient(id: number) {
    return this.request(`/api/clients/${id}`);
  }

  async createClient(data: any) {
    return this.request('/api/clients', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateClient(id: number, data: any) {
    return this.request(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteClient(id: number) {
    return this.request(`/api/clients/${id}`, {
      method: 'DELETE'
    });
  }

  // Case endpoints
  async getCases(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/api/cases${query}`);
  }

  async getCase(id: number) {
    return this.request(`/api/cases/${id}`);
  }

  async createCase(data: any) {
    return this.request('/api/cases', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateCase(id: number, data: any) {
    return this.request(`/api/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteCase(id: number) {
    return this.request(`/api/cases/${id}`, {
      method: 'DELETE'
    });
  }

  async searchCases(query: string) {
    return this.request(`/api/cases?q=${encodeURIComponent(query)}`);
  }

  // Event endpoints
  async getEvents(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/api/events${query}`);
  }

  async createEvent(data: any) {
    return this.request('/api/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateEvent(id: number, data: any) {
    return this.request(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/api/events/${id}`, {
      method: 'DELETE'
    });
  }

  // Invoice endpoints (keeping for compatibility)
  async getInvoices() {
    // Mock for now - can be implemented later
    return Promise.resolve([]);
  }

  async createInvoice(data: any) {
    // Mock for now - can be implemented later
    return Promise.resolve({ id: Date.now(), ...data });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/api/stats');
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return response.json();
  }

  async ping() {
    const response = await fetch(`${this.baseURL}/ping`);
    return response.json();
  }
}

// Export singleton
export const apiService = new ApiService();
