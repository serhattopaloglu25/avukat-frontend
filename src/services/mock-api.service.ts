// Mock API with localStorage persistence
export class MockApiService {
  private getStorageKey(key: string): string {
    return `avukatajanda_mock_${key}`;
  }

  private activities: any[] = [];

  private addActivity(action: string, entityType: string, entityId: string | number) {
    const activity = {
      id: Date.now().toString(),
      action,
      entityType,
      entityId: entityId.toString(),
      createdAt: new Date().toISOString(),
      user: { name: 'Demo User', email: 'demo@avukatajanda.com' }
    };
    this.activities.unshift(activity);
    if (this.activities.length > 10) {
      this.activities = this.activities.slice(0, 10);
    }
    this.saveData('activities', this.activities);
  }

  private loadData(key: string, defaultValue: any[] = []): any[] {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const stored = localStorage.getItem(this.getStorageKey(key));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return defaultValue;
  }

  private saveData(key: string, data: any[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  private getClients_internal(): any[] {
    return this.loadData('clients', [
      { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-0101', address: 'İstanbul' },
      { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-0102', address: 'Ankara' }
    ]);
  }

  private getCases_internal(): any[] {
    return this.loadData('cases', [
      { id: 1, case_number: 'CASE-2024-001', title: 'Boşanma Davası', client_id: 1, status: 'active' },
      { id: 2, case_number: 'CASE-2024-002', title: 'Kira Davası', client_id: 2, status: 'pending' }
    ]);
  }

  async getClients(params?: any) {
    const clients = this.getClients_internal();
    console.log('Getting clients from localStorage:', clients.length);
    return Promise.resolve(clients);
  }

  async getClient(id: number) {
    const clients = this.getClients_internal();
    const client = clients.find(c => c.id === id);
    if (client) return Promise.resolve(client);
    throw new Error('Client not found');
  }

  async createClient(data: any) {
    const clients = this.getClients_internal();
    const newClient = { 
      id: Math.max(0, ...clients.map(c => c.id || 0)) + 1,
      ...data,
      created_at: new Date().toISOString()
    };
    clients.push(newClient);
    this.saveData('clients', clients);
    this.addActivity('Yeni müvekkil eklendi: ' + newClient.name, 'client', newClient.id);
    console.log('Created client, total:', clients.length);
    return Promise.resolve(newClient);
  }

  async updateClient(id: number, data: any) {
    const clients = this.getClients_internal();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...data };
      this.saveData('clients', clients);
      return Promise.resolve(clients[index]);
    }
    throw new Error('Client not found');
  }

  async deleteClient(id: number) {
    const clients = this.getClients_internal();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients.splice(index, 1);
      this.saveData('clients', clients);
      return Promise.resolve({ success: true });
    }
    throw new Error('Client not found');
  }

  async getCases(params?: any) {
    const cases = this.getCases_internal();
    console.log('Getting cases from localStorage:', cases.length);
    
    if (params?.status) {
      return Promise.resolve(cases.filter(c => c.status === params.status));
    }
    return Promise.resolve(cases);
  }

  async getCase(id: number) {
    const cases = this.getCases_internal();
    const caseItem = cases.find(c => c.id === id);
    if (caseItem) return Promise.resolve(caseItem);
    throw new Error('Case not found');
  }

  async createCase(data: any) {
    const cases = this.getCases_internal();
    const newCase = { 
      id: Math.max(0, ...cases.map(c => c.id || 0)) + 1,
      case_number: `CASE-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, '0')}`,
      ...data,
      created_at: new Date().toISOString()
    };
    cases.push(newCase);
    this.saveData('cases', cases);
    this.addActivity('Yeni dava eklendi: ' + newCase.title, 'case', newCase.id);
    console.log('Created case, total:', cases.length);
    return Promise.resolve(newCase);
  }

  async deleteCase(id: number) {
    const cases = this.getCases_internal();
    const index = cases.findIndex(c => c.id === id);
    if (index !== -1) {
      cases.splice(index, 1);
      this.saveData('cases', cases);
      return Promise.resolve({ success: true });
    }
    throw new Error('Case not found');
  }

  async updateCase(id: number, data: any) {
    const cases = this.getCases_internal();
    const index = cases.findIndex(c => c.id === id);
    if (index !== -1) {
      cases[index] = { ...cases[index], ...data };
      this.saveData('cases', cases);
      return Promise.resolve(cases[index]);
    }
    throw new Error('Case not found');
  }

  async searchCases(query: string) {
    const cases = this.getCases_internal();
    const filtered = cases.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.case_number.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered);
  }

  async getEvents() {
    const events = this.loadData('events', [
      { id: 1, title: 'Duruşma', event_date: '2024-01-15', event_type: 'hearing' },
      { id: 2, title: 'Müvekkil Görüşmesi', event_date: '2024-01-16', event_type: 'meeting' }
    ]);
    return Promise.resolve(events);
  }

  async createEvent(data: any) {
    const events = this.loadData('events', []);
    const newEvent = { 
      id: Math.max(0, ...events.map(e => e.id || 0)) + 1,
      ...data 
    };
    events.push(newEvent);
    this.saveData('events', events);
    return Promise.resolve(newEvent);
  }

  async deleteEvent(id: number) {
    const events = this.loadData('events', []);
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events.splice(index, 1);
      this.saveData('events', events);
      return Promise.resolve({ success: true });
    }
    throw new Error('Event not found');
  }

  async getInvoices() {
    const invoices = this.loadData('invoices', []);
    return Promise.resolve(invoices);
  }

  async createInvoice(data: any) {
    const invoices = this.loadData('invoices', []);
    const newInvoice = { 
      id: Math.max(0, ...invoices.map(i => i.id || 0)) + 1,
      ...data 
    };
    invoices.push(newInvoice);
    this.saveData('invoices', invoices);
    return Promise.resolve(newInvoice);
  }

  async login(email: string, password: string) {
    // Check demo account
    if (email === 'demo@avukatajanda.com' && password === 'demo123') {
      const token = 'mock-token-' + Date.now();
      this.setToken(token);
      return Promise.resolve({
        access_token: token,
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

    // Check registered users
    const users = this.loadData('users', []);
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const token = 'mock-token-' + Date.now();
      this.setToken(token);
      return Promise.resolve({
        access_token: token,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          is_active: user.is_active,
          created_at: user.created_at
        }
      });
    }

    throw new Error('Geçersiz email veya şifre');
  }

  async register(data: any) {
    // Save user to localStorage
    const users = this.loadData('users', []);

    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === data.email);
    if (existingUser) {
      throw new Error('Bu e-posta adresi zaten kayıtlı!');
    }

    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password, // In real app, this would be hashed
      is_active: true,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    this.saveData('users', users);

    const token = 'mock-token-' + Date.now();
    this.setToken(token);

    this.addActivity('Yeni kullanıcı kaydı: ' + newUser.name, 'user', newUser.id);

    return Promise.resolve({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        is_active: true,
        created_at: newUser.created_at
      }
    });
  }

  async getDashboardStats() {
    const clients = this.getClients_internal();
    const cases = this.getCases_internal();
    const events = this.loadData('events', []);
    const invoices = this.loadData('invoices', []);
    this.activities = this.loadData('activities', []);
    
    return Promise.resolve({
      total_clients: clients.length,
      total_cases: cases.length,
      active_cases: cases.filter(c => c.status === 'active').length,
      closed_cases: cases.filter(c => c.status === 'closed').length,
      upcoming_events: events.length,
      total_invoices: invoices.length,
      recent_activities: this.activities.slice(0, 5)
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

  // Get all users (for admin panel)
  async getUsers() {
    const users = this.loadData('users', []);
    // Remove passwords from response for security
    return Promise.resolve(users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      is_active: u.is_active,
      created_at: u.created_at
    })));
  }

  // Clear all mock data
  clearAllData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.getStorageKey('clients'));
      localStorage.removeItem(this.getStorageKey('cases'));
      localStorage.removeItem(this.getStorageKey('events'));
      localStorage.removeItem(this.getStorageKey('invoices'));
      localStorage.removeItem(this.getStorageKey('users'));
      localStorage.removeItem(this.getStorageKey('activities'));
    }
  }
}

// Export singleton
export const apiService = new MockApiService();
