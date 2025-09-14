// src/services/api.service.ts
// Complete API Service with all backend endpoints

interface ApiConfig {
  baseUrl: string;
  timeout?: number;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface User {
  id: number;
  email: string;
  name?: string;
  is_active: boolean;
  created_at: string;
}

interface Client {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

interface Case {
  id?: number;
  case_number: string;
  title: string;
  client_id: number;
  status: 'active' | 'pending' | 'closed';
  description?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
  client?: Client;
}

interface Event {
  id?: number;
  title: string;
  description?: string;
  event_type: 'hearing' | 'meeting' | 'deadline' | 'other';
  event_date: string;
  event_time?: string;
  location?: string;
  case_id?: number;
  client_id?: number;
  reminder?: boolean;
  reminder_date?: string;
  created_at?: string;
  updated_at?: string;
  case?: Case;
  client?: Client;
}

interface Stats {
  total_clients: number;
  total_cases: number;
  active_cases: number;
  closed_cases: number;
  upcoming_events: number;
  recent_activities?: Activity[];
}

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

interface Document {
  id?: number;
  name: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  case_id?: number;
  client_id?: number;
  uploaded_by?: number;
  uploaded_at?: string;
}

interface Invoice {
  id?: number;
  invoice_number: string;
  client_id: number;
  case_id?: number;
  amount: number;
  tax?: number;
  total?: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  due_date?: string;
  paid_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

class ApiService {
  private config: ApiConfig;
  private token: string | null = null;

  constructor(config?: Partial<ApiConfig>) {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://avukat-ajanda-python-backend.onrender.com',
      timeout: 60000,
      ...config
    };
    
    // Disable timeout in development
    if (process.env.NODE_ENV === 'development') {
      this.config.timeout = 60000; // 60 seconds in dev
    }

    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  // Helper method for making requests
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    console.log('API Request:', url); // Debug log
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          this.clearToken();
          throw new Error('Authentication required');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  // Token management
  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // ============= Authentication Endpoints =============
  async register(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${this.config.baseUrl}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    
    if (data.access_token) {
      this.setToken(data.access_token);
    }
    
    return data;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<{ message: string }> {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============= Dashboard & Stats =============
  async getDashboardStats(): Promise<Stats> {
    return this.request<Stats>('/api/stats');
  }

  async getRecentActivities(): Promise<Activity[]> {
    return this.request<Activity[]>('/api/activities');
  }

  // ============= Clients Management =============
  async getClients(params?: {
    skip?: number;
    limit?: number;
    search?: string;
  }): Promise<Client[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const endpoint = `/api/clients${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Client[]>(endpoint);
  }

  async getClient(id: number): Promise<Client> {
    return this.request<Client>(`/api/clients/${id}`);
  }

  async createClient(data: Omit<Client, 'id'>): Promise<Client> {
    return this.request<Client>('/api/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: number, data: Partial<Client>): Promise<Client> {
    return this.request<Client>(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: number): Promise<{ message: string }> {
    return this.request(`/api/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // ============= Cases Management =============
  async getCases(params?: {
    skip?: number;
    limit?: number;
    status?: string;
    client_id?: number;
  }): Promise<Case[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.client_id) queryParams.append('client_id', params.client_id.toString());
    
    const endpoint = `/api/cases${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Case[]>(endpoint);
  }

  async getCase(id: number): Promise<Case> {
    return this.request<Case>(`/api/cases/${id}`);
  }

  async createCase(data: Omit<Case, 'id'>): Promise<Case> {
    return this.request<Case>('/api/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCase(id: number, data: Partial<Case>): Promise<Case> {
    return this.request<Case>(`/api/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCase(id: number): Promise<{ message: string }> {
    return this.request(`/api/cases/${id}`, {
      method: 'DELETE',
    });
  }

  // ============= Events Management =============
  async getEvents(params?: {
    skip?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
    event_type?: string;
  }): Promise<Event[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.event_type) queryParams.append('event_type', params.event_type);
    
    const endpoint = `/api/events${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Event[]>(endpoint);
  }

  async getEvent(id: number): Promise<Event> {
    return this.request<Event>(`/api/events/${id}`);
  }

  async createEvent(data: Omit<Event, 'id'>): Promise<Event> {
    return this.request<Event>('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: number, data: Partial<Event>): Promise<Event> {
    return this.request<Event>(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: number): Promise<{ message: string }> {
    return this.request(`/api/events/${id}`, {
      method: 'DELETE',
    });
  }

  async getUpcomingEvents(days: number = 7): Promise<Event[]> {
    return this.request<Event[]>(`/api/events/upcoming?days=${days}`);
  }

  // ============= Documents Management =============
  async getDocuments(params?: {
    case_id?: number;
    client_id?: number;
  }): Promise<Document[]> {
    const queryParams = new URLSearchParams();
    if (params?.case_id) queryParams.append('case_id', params.case_id.toString());
    if (params?.client_id) queryParams.append('client_id', params.client_id.toString());
    
    const endpoint = `/api/documents${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Document[]>(endpoint);
  }

  async uploadDocument(file: File, metadata: {
    case_id?: number;
    client_id?: number;
  }): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.case_id) formData.append('case_id', metadata.case_id.toString());
    if (metadata.client_id) formData.append('client_id', metadata.client_id.toString());

    const response = await fetch(`${this.config.baseUrl}/api/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Document upload failed');
    }

    return response.json();
  }

  async deleteDocument(id: number): Promise<{ message: string }> {
    return this.request(`/api/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // ============= Invoices Management =============
  async getInvoices(params?: {
    status?: string;
    client_id?: number;
  }): Promise<Invoice[]> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.client_id) queryParams.append('client_id', params.client_id.toString());
    
    const endpoint = `/api/invoices${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<Invoice[]>(endpoint);
  }

  async getInvoice(id: number): Promise<Invoice> {
    return this.request<Invoice>(`/api/invoices/${id}`);
  }

  async createInvoice(data: Omit<Invoice, 'id'>): Promise<Invoice> {
    return this.request<Invoice>('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvoice(id: number, data: Partial<Invoice>): Promise<Invoice> {
    return this.request<Invoice>(`/api/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInvoice(id: number): Promise<{ message: string }> {
    return this.request(`/api/invoices/${id}`, {
      method: 'DELETE',
    });
  }

  async markInvoiceAsPaid(id: number): Promise<Invoice> {
    return this.request<Invoice>(`/api/invoices/${id}/mark-paid`, {
      method: 'POST',
    });
  }

  // ============= Reports =============
  async getMonthlyReport(year: number, month: number): Promise<any> {
    return this.request(`/api/reports/monthly?year=${year}&month=${month}`);
  }

  async getCaseReport(caseId: number): Promise<any> {
    return this.request(`/api/reports/case/${caseId}`);
  }

  async getClientReport(clientId: number): Promise<any> {
    return this.request(`/api/reports/client/${clientId}`);
  }

  // ============= Search =============
  async search(query: string): Promise<{
    clients: Client[];
    cases: Case[];
    events: Event[];
  }> {
    return this.request(`/api/search?q=${encodeURIComponent(query)}`);
  }

  // ============= Health Check =============
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types
export type {
  User,
  Client,
  Case,
  Event,
  Stats,
  Activity,
  Document,
  Invoice,
  AuthResponse,
};

export default apiService;