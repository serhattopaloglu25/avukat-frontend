'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string;
  memberships: any[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  currentOrgId: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchOrg: (orgId: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentOrgId, setCurrentOrgId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(token);
        if (data.user.memberships.length > 0) {
          setCurrentOrgId(data.user.memberships[0].orgId);
        }
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    if (data.user.memberships.length > 0) {
      setCurrentOrgId(data.user.memberships[0].orgId);
    }
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCurrentOrgId(null);
    router.push('/');
  };

  const switchOrg = (orgId: number) => {
    setCurrentOrgId(orgId);
  };

  return (
    <AuthContext.Provider value={{ user, token, currentOrgId, login, logout, switchOrg }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
