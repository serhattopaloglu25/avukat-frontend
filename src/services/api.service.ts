// Gerçek API Servisi
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
      const error = await response.json().catch(() => ({ detail: 'Bir hata oluştu' }));
      throw new Error(error.detail || 'API isteği başarısız');
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
      const error = await response.json().catch(() => ({ detail: 'Giriş başarısız' }));
      throw new Error(error.detail);
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    return data;
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async logout() {
    localStorage.removeItem('auth_token');
  }

  // Client endpoints
  async getClients(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/clients${query}`);
  }

  async getClient(id: number) {
    return this.request(`/clients/${id}`);
  }

  async createClient(data: any) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateClient(id: number, data: any) {
    return this.request(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteClient(id: number) {
    return this.request(`/clients/${id}`, {
      method: 'DELETE'
    });
  }

  // Case endpoints
  async getCases(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/cases${query}`);
  }

  async getCase(id: number) {
    return this.request(`/cases/${id}`);
  }

  async createCase(data: any) {
    return this.request('/cases', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateCase(id: number, data: any) {
    return this.request(`/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteCase(id: number) {
    return this.request(`/cases/${id}`, {
      method: 'DELETE'
    });
  }

  async searchCases(query: string) {
    return this.request(`/cases/search?q=${encodeURIComponent(query)}`);
  }

  // Event endpoints
  async getEvents() {
    return this.request('/events');
  }

  async createEvent(data: any) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/events/${id}`, {
      method: 'DELETE'
    });
  }

  // Invoice endpoints
  async getInvoices() {
    return this.request('/invoices');
  }

  async createInvoice(data: any) {
    return this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton
export const apiService = new ApiService();

// Mock servisini de export edelim (geçiş için)
export { MockApiService } from './mock-api.service';
