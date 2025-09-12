export default function Home() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>AvukatAjanda Test</h1>
      <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
      <a href="/test" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to API Test Page
      </a>
    </div>
  );
}