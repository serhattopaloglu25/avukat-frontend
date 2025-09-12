'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Get API URL from environment
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    setApiUrl(url);

    // Test API connection
    fetch(`${url}/health`)
      .then(res => res.json())
      .then(data => {
        setApiStatus(`✅ API Connected: ${JSON.stringify(data)}`);
      })
      .catch(err => {
        setApiStatus(`❌ API Error: ${err.message}`);
      });
  }, []);

  return (
    <div style={{ padding: '50px', fontFamily: 'monospace' }}>
      <h1>API Connection Test</h1>
      <hr />
      <p><strong>API URL:</strong> {apiUrl}</p>
      <p><strong>Status:</strong> {apiStatus}</p>
      <hr />
      <h2>Manual Test:</h2>
      <button 
        onClick={() => {
          fetch(`${apiUrl}/health`)
            .then(res => res.text())
            .then(text => alert(text))
            .catch(err => alert('Error: ' + err.message));
        }}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Test Health Endpoint
      </button>
    </div>
  );
}