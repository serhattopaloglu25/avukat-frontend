import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Add org header to all requests
api.interceptors.request.use((config) => {
  const orgId = localStorage.getItem('currentOrgId');
  if (orgId) {
    config.headers['X-Org-Id'] = orgId;
  }
  return config;
});
