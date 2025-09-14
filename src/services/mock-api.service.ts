// Mock API Service - Temporary solution while backend is being fixed
export class MockApiService {
  private mockClients: any[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-0101', address: 'İstanbul' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-0102', address: 'Ankara' }
  ];

  private mockCases: any[] = [
    { id: 1, case_number: 'CASE-2024-001', title: 'Boşanma Davası', client_id: 1, status: 'active' },
    { id: 2, case_number: 'CASE-2024-002', title: 'Kira Davası', client_id: 2, status: 'pending' }
  ];

  async getClients(params?: any) {
    return Promise.resolve(this.mockClients);
  }

  async getClient(id: number) {
    const client = this.mockClients.find(c => c.id === id);
    if (client) return Promise.resolve(client);
    throw new Error('Client not found');
  }

  async createClient(data: any) {
    const newClient = { 
      id: this.mockClients.length + 1, 
      ...data,
      created_at: new Date().toISOString()
    };
    this.mockClients.push(newClient);
    return Promise.resolve(newClient);
  }

  async updateClient(id: number, data: any) {
    const index = this.mockClients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockClients[index] = { ...this.mockClients[index], ...data };
      return Promise.resolve(this.mockClients[index]);
    }
    throw new Error('Client not found');
  }

  async deleteClient(id: number) {
    const index = this.mockClients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockClients.splice(index, 1);
      return Promise.resolve({ success: true });
    }
    throw new Error('Client not found');
  }

  async getCases(params?: any) {
    // Filter cases if params provided
    if (params?.status) {
      return Promise.resolve(this.mockCases.filter(c => c.status === params.status));
    }
    return Promise.resolve(this.mockCases);
  }

  async getCase(id: number) {
    const caseItem = this.mockCases.find(c => c.id === id);
    if (caseItem) return Promise.resolve(caseItem);
    throw new Error('Case not found');
  }

  async createCase(data: any) {
    const newCase = { 
      id: this.mockCases.length + 1, 
      ...data,
      created_at: new Date().toISOString()
    };
    this.mockCases.push(newCase);
    return Promise.resolve(newCase);
  }

  async deleteCase(id: number) {
    const index = this.mockCases.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCases.splice(index, 1);
      return Promise.resolve({ success: true });
    }
    throw new Error('Case not found');
  }

  async updateCase(id: number, data: any) {
    const index = this.mockCases.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCases[index] = { ...this.mockCases[index], ...data };
      return Promise.resolve(this.mockCases[index]);
    }
    throw new Error('Case not found');
  }

  async searchCases(query: string) {
    const filtered = this.mockCases.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.case_number.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered);
  }

  async getInvoices() {
    return Promise.resolve([]);
  }

  async createInvoice(data: any) {
    return Promise.resolve({ id: Date.now(), ...data });
  }

  async login(email: string, password: string) {
    if (email === 'demo@avukatajanda.com' && password === 'demo123') {
      return Promise.resolve({
        access_token: 'mock-token-123',
        token_type: 'bearer',
        user: { 
          id: 1, 
          email, 
          name: 'Demo User',
          is_active: true,
          created_at: '2024-01-01'
        }
      });
    }
    throw new Error('Geçersiz email veya şifre');
  }

  async register(data: any) {
    return Promise.resolve({
      access_token: 'mock-token-456',
      token_type: 'bearer',
      user: { 
        id: Date.now(), 
        ...data,
        is_active: true,
        created_at: new Date().toISOString()
      }
    });
  }

  async getDashboardStats() {
    return Promise.resolve({
      total_clients: this.mockClients.length,
      total_cases: this.mockCases.length,
      active_cases: this.mockCases.filter(c => c.status === 'active').length,
      closed_cases: this.mockCases.filter(c => c.status === 'closed').length,
      upcoming_events: 5
    });
  }

  async getEvents() {
    return Promise.resolve([
      { id: 1, title: 'Duruşma', event_date: '2024-01-15', event_type: 'hearing' },
      { id: 2, title: 'Müvekkil Görüşmesi', event_date: '2024-01-16', event_type: 'meeting' }
    ]);
  }

  async createEvent(data: any) {
    return Promise.resolve({ id: Date.now(), ...data });
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    localStorage.removeItem('auth_token');
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
}

// Export as singleton
export const apiService = new MockApiService();
