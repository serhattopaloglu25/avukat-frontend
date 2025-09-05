'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface Organization {
  id: number;
  name: string;
  role: string;
}

interface OrgContextType {
  currentOrg: Organization | null;
  organizations: Organization[];
  switchOrg: (orgId: number) => void;
  loading: boolean;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await api.get('/api/orgs');
      const orgs = response.data.map((m: any) => ({
        id: m.org.id,
        name: m.org.name,
        role: m.role
      }));
      
      setOrganizations(orgs);
      if (orgs.length > 0) {
        setCurrentOrg(orgs[0]);
        localStorage.setItem('currentOrgId', orgs[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const switchOrg = (orgId: number) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      localStorage.setItem('currentOrgId', orgId.toString());
    }
  };

  return (
    <OrgContext.Provider value={{ currentOrg, organizations, switchOrg, loading }}>
      {children}
    </OrgContext.Provider>
  );
}

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useOrg must be used within OrgProvider');
  }
  return context;
};
