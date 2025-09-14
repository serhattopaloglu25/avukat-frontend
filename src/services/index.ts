// Centralized API export
// Switch between mock and real API here

// FOR PRODUCTION: Using real backend API
export { apiService } from './real-api.service';

// For testing with mock data, uncomment this:
// export { apiService } from './mock-api.service';

// Export types
export type { Client, Case, Event, Invoice, Stats } from './api.service';
