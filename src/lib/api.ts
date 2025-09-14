// API Service Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  public baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_URL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth endpoints
  async register(data: { email: string; password: string; name?: string }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
    }
    
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
    }
    
    return response;
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async getMe() {
    return this.request('/me');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Stats
  async getStats() {
    return this.request('/api/stats');
  }

  // Dashboard
  async getDashboardSummary() {
    return this.request('/api/dashboard/summary');
  }

  // Clients
  async getClients() {
    return this.request('/api/clients');
  }

  async createClient(data: any) {
    return this.request('/api/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Cases
  async getCases() {
    return this.request('/api/cases');
  }

  async createCase(data: any) {
    return this.request('/api/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Events
  async getEvents() {
    return this.request('/api/events');
  }

  async createEvent(data: any) {
    return this.request('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
export default apiService;