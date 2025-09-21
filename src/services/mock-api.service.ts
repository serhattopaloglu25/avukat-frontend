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
}

// Export mock service
export const apiService = new MockApiService();
export default apiService;
