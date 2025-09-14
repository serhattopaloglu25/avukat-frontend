// Global store for mock data persistence across components
class MockDataStore {
  private static instance: MockDataStore;
  
  public clients: any[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-0101', address: 'İstanbul' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-0102', address: 'Ankara' }
  ];
  
  public cases: any[] = [
    { id: 1, case_number: 'CASE-2024-001', title: 'Boşanma Davası', client_id: 1, status: 'active' },
    { id: 2, case_number: 'CASE-2024-002', title: 'Kira Davası', client_id: 2, status: 'pending' }
  ];
  
  public events: any[] = [
    { id: 1, title: 'Duruşma', event_date: '2024-01-15', event_type: 'hearing' },
    { id: 2, title: 'Müvekkil Görüşmesi', event_date: '2024-01-16', event_type: 'meeting' }
  ];
  
  public invoices: any[] = [];
  
  private constructor() {
    // Private constructor for singleton
  }
  
  public static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore();
    }
    return MockDataStore.instance;
  }
}

// Mock API Service using global store
export class MockApiService {
  private store = MockDataStore.getInstance();

  async getClients(params?: any) {
    console.log('Mock API: Getting clients, count:', this.store.clients.length);
    return Promise.resolve([...this.store.clients]);
  }

  async getClient(id: number) {
    const client = this.store.clients.find(c => c.id === id);
    if (client) return Promise.resolve(client);
    throw new Error('Client not found');
  }

  async createClient(data: any) {
    const newClient = { 
      id: this.store.clients.length + 1, 
      ...data,
      created_at: new Date().toISOString()
    };
    this.store.clients.push(newClient);
    console.log('Mock API: Created client, total clients:', this.store.clients.length);
    return Promise.resolve(newClient);
  }

  async updateClient(id: number, data: any) {
    const index = this.store.clients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.store.clients[index] = { ...this.store.clients[index], ...data };
      return Promise.resolve(this.store.clients[index]);
    }
    throw new Error('Client not found');
  }

  async deleteClient(id: number) {
    const index = this.store.clients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.store.clients.splice(index, 1);
      return Promise.resolve({ success: true });
    }
    throw new Error('Client not found');
  }

  async getCases(params?: any) {
    console.log('Mock API: Getting cases, count:', this.store.cases.length);
    if (params?.status) {
      return Promise.resolve(this.store.cases.filter(c => c.status === params.status));
    }
    return Promise.resolve([...this.store.cases]);
  }

  async getCase(id: number) {
    const caseItem = this.store.cases.find(c => c.id === id);
    if (caseItem) return Promise.resolve(caseItem);
    throw new Error('Case not found');
  }

  async createCase(data: any) {
    const newCase = { 
      id: this.store.cases.length + 1, 
      case_number: `CASE-${new Date().getFullYear()}-${String(this.store.cases.length + 1).padStart(3, '0')}`,
      ...data,
      created_at: new Date().toISOString()
    };
    this.store.cases.push(newCase);
    console.log('Mock API: Created case, total cases:', this.store.cases.length);
    return Promise.resolve(newCase);
  }

  async deleteCase(id: number) {
    const index = this.store.cases.findIndex(c => c.id === id);
    if (index !== -1) {
      this.store.cases.splice(index, 1);
      return Promise.resolve({ success: true });
    }
    throw new Error('Case not found');
  }

  async updateCase(id: number, data: any) {
    const index = this.store.cases.findIndex(c => c.id === id);
    if (index !== -1) {
      this.store.cases[index] = { ...this.store.cases[index], ...data };
      return Promise.resolve(this.store.cases[index]);
    }
    throw new Error('Case not found');
  }

  async searchCases(query: string) {
    const filtered = this.store.cases.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.case_number.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered);
  }

  async getEvents() {
    return Promise.resolve([...this.store.events]);
  }

  async createEvent(data: any) {
    const newEvent = { id: this.store.events.length + 1, ...data };
    this.store.events.push(newEvent);
    return Promise.resolve(newEvent);
  }

  async getInvoices() {
    return Promise.resolve([...this.store.invoices]);
  }

  async createInvoice(data: any) {
    const newInvoice = { id: this.store.invoices.length + 1, ...data };
    this.store.invoices.push(newInvoice);
    return Promise.resolve(newInvoice);
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
      total_clients: this.store.clients.length,
      total_cases: this.store.cases.length,
      active_cases: this.store.cases.filter(c => c.status === 'active').length,
      closed_cases: this.store.cases.filter(c => c.status === 'closed').length,
      upcoming_events: this.store.events.length
    });
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}

// Export singleton instance
export const apiService = new MockApiService();
