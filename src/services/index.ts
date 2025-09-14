// Centralized API export
// Switch between mock and real API here

// FOR NOW: Using mock API because backend is not working
export { apiService } from './mock-api.service';

// When backend is ready, uncomment this line and comment the above:
// export { apiService } from './api.service';

// Export types
export type { Client, Case, Event, Invoice, Stats } from './api.service';
