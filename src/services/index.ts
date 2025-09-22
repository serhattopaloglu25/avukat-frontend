export { apiService } from './mock-api.service';

export interface Client {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  tcno?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Case {
  id?: number;
  case_number?: string;
  title: string;
  client_id: number;
  client?: Client; // İlişkili client objesi
  status?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  court?: string;
}

export interface Event {
  id?: number;
  title: string;
  event_date?: string;
  event_type?: string;
  date?: string;
  type?: 'hearing' | 'meeting' | 'reminder' | 'deadline' | string;
  description?: string;
  startAt?: string;
  reminders?: string[];
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
