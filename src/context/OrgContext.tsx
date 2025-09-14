'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Organization {
  id: number;
  name: string;
  slug: string;
}

interface OrgContextType {
  currentOrg: Organization | null;
  organizations: Organization[];
  switchOrg: (orgId: number) => void;
  loading: boolean;
}

const OrgContext = createContext<OrgContextType | null>(null);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/orgs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
        if (data.length > 0) {
          setCurrentOrg(data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchOrg = (orgId: number) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
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
