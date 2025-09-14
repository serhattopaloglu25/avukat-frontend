export { apiService } from './mock-api.service';

export interface Client {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Case {
  id?: number;
  case_number?: string;
  title: string;
  client_id: number;
  status?: string;
}

export interface Event {
  id?: number;
  title: string;
  event_date?: string;
  event_type?: string;
}

export interface Invoice {
  id?: number;
  invoice_number?: string;
  client_id: number;
  amount: number;
  status?: string;
}

export interface Stats {
  total_clients: number;
  total_cases: number;
  active_cases: number;
  upcoming_events: number;
}
