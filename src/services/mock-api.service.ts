// Mock API Service - Backend çalışana kadar kullanılacak

class MockApiService {
  private mockToken = 'mock_jwt_token_12345';
  private mockUser = {
    id: 1,
    email: 'demo@avukatajanda.com',
    name: 'Demo User',
    role: 'admin'
  };

  async login(email: string, password: string) {
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === 'demo@avukatajanda.com' && password === 'demo123') {
      return {
        access_token: this.mockToken,
        user: this.mockUser,
        token_type: 'bearer'
      };
    }
    throw new Error('Geçersiz kullanıcı adı veya şifre');
  }

  async register(userData: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      created_at: new Date().toISOString()
    };
  }

  async logout() {
    localStorage.removeItem('auth_token');
    return { success: true };
  }

  // Mock client data
  async getClients() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'Ahmet Yılmaz', phone: '555-0001', email: 'ahmet@example.com', tcno: '12345678901' },
      { id: 2, name: 'Ayşe Kaya', phone: '555-0002', email: 'ayse@example.com', tcno: '12345678902' },
      { id: 3, name: 'Mehmet Demir', phone: '555-0003', email: 'mehmet@example.com', tcno: '12345678903' }
    ];
  }

  async getClient(id: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id,
      name: 'Test Müvekkil',
      phone: '555-0000',
      email: 'test@example.com',
      tcno: '12345678900',
      address: 'Test Adres, İstanbul',
      notes: 'Test notları'
    };
  }

  async createClient(data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...data,
      created_at: new Date().toISOString()
    };
  }

  async updateClient(id: number, data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...data, updated_at: new Date().toISOString() };
  }

  async deleteClient(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }

  // Mock case data
  async getCases() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, title: 'Boşanma Davası', client_id: 1, status: 'active', court: 'İstanbul 1. Aile Mahkemesi' },
      { id: 2, title: 'Kira Davası', client_id: 2, status: 'pending', court: 'İstanbul 5. Sulh Hukuk' },
      { id: 3, title: 'İş Davası', client_id: 3, status: 'closed', court: 'İstanbul 10. İş Mahkemesi' }
    ];
  }

  async getCase(id: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id,
      title: 'Test Davası',
      client_id: 1,
      status: 'active',
      court: 'Test Mahkemesi',
      case_number: '2024/123',
      description: 'Test dava açıklaması'
    };
  }

  async createCase(data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...data,
      created_at: new Date().toISOString()
    };
  }

  async updateCase(id: number, data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...data, updated_at: new Date().toISOString() };
  }

  async deleteCase(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }

  // Mock events
  async getEvents() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const today = new Date();
    return [
      {
        id: 1,
        title: 'Duruşma',
        date: new Date(today.getTime() + 86400000).toISOString(),
        type: 'hearing',
        description: 'Boşanma davası duruşması'
      },
      {
        id: 2,
        title: 'Müvekkil Görüşmesi',
        date: new Date(today.getTime() + 172800000).toISOString(),
        type: 'meeting',
        description: 'Yeni dava görüşmesi'
      }
    ];
  }

  // Mock invoices
  async getInvoices() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, client_id: 1, amount: 5000, status: 'paid', date: '2024-01-15' },
      { id: 2, client_id: 2, amount: 3500, status: 'pending', date: '2024-01-20' },
      { id: 3, client_id: 3, amount: 7500, status: 'overdue', date: '2024-01-10' }
    ];
  }

  async createInvoice(data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...data,
      created_at: new Date().toISOString()
    };
  }

  // Mock documents
  async getDocuments() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'Dava Dilekçesi.pdf', size: 245000, type: 'application/pdf', created_at: '2024-01-15' },
      { id: 2, name: 'Vekaletname.docx', size: 34000, type: 'application/docx', created_at: '2024-01-18' }
    ];
  }

  async uploadDocument(file: any) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Math.floor(Math.random() * 1000),
      name: file.name,
      size: file.size,
      type: file.type,
      url: '/mock-url/' + file.name,
      created_at: new Date().toISOString()
    };
  }

  async deleteDocument(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }

  // Mock reports
  async getReports() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      monthly: {
        revenue: 45000,
        cases: 12,
        clients: 8,
        success_rate: 75
      },
      yearly: {
        revenue: 520000,
        cases: 145,
        clients: 89,
        success_rate: 78
      }
    };
  }

  // Mock stats
  async getStats() {
    return {
      totalClients: 150,
      activeCases: 45,
      upcomingEvents: 12,
      completedCases: 89,
      monthlyRevenue: 45000,
      pendingInvoices: 8
    };
  }

  // Mock events methods
  async createEvent(data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...data,
      created_at: new Date().toISOString()
    };
  }

  async updateEvent(id: number, data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...data, updated_at: new Date().toISOString() };
  }

  async deleteEvent(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }

  // Files
  async getFiles() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'Sözleşme.pdf', size: 1024000, type: 'pdf', created_at: '2024-01-15' },
      { id: 2, name: 'Dilekçe.docx', size: 512000, type: 'docx', created_at: '2024-01-16' }
    ];
  }

  async uploadFile(file: File) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Math.floor(Math.random() * 1000),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      created_at: new Date().toISOString()
    };
  }

  async deleteFile(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  }
}

// Export mock service
export const apiService = new MockApiService();
export default apiService;
