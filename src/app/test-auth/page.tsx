'use client';

import { useState } from 'react';
import apiService from '@/lib/api';

export default function TestAuthPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (name: string, fn: () => Promise<any>) => {
    setLoading(true);
    setResponse(`Testing ${name}...`);
    
    try {
      const result = await fn();
      setResponse(`${name}: SUCCESS\n${JSON.stringify(result, null, 2)}`);
    } catch (error: any) {
      setResponse(`${name}: ERROR\n${error.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Test with Proxy</h1>
      <p>Using proxy for localhost to avoid CORS</p>
      <hr />
      
      <div style={{ marginTop: '20px' }}>
        <h2>Test Endpoints:</h2>
        
        <button 
          onClick={() => testEndpoint('Health', () => apiService.healthCheck())}
          style={{ margin: '5px', padding: '10px' }}
          disabled={loading}
        >
          Test Health
        </button>
        
        <button 
          onClick={() => testEndpoint('Register', () => 
            apiService.register({
              email: `test${Date.now()}@example.com`,
              password: 'Test1234!',
              name: 'Test User'
            })
          )}
          style={{ margin: '5px', padding: '10px' }}
          disabled={loading}
        >
          Test Register
        </button>
        
        <button 
          onClick={() => testEndpoint('Login', () => 
            apiService.login('test@example.com', 'Test1234!')
          )}
          style={{ margin: '5px', padding: '10px' }}
          disabled={loading}
        >
          Test Login
        </button>
        
        <button 
          onClick={() => testEndpoint('Stats', () => apiService.getStats())}
          style={{ margin: '5px', padding: '10px' }}
          disabled={loading}
        >
          Test Stats
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Response:</h3>
        <pre style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {response || 'Click a button to test'}
        </pre>
      </div>
    </div>
  );
}