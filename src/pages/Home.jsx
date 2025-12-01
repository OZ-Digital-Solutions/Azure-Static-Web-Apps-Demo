import { useEffect, useState } from 'react';
import { appInsights } from '@/telemetry/appInsights.js';

export default function Home() {
  const [status, setStatus] = useState('Idle');
  const [details, setDetails] = useState(null);

  async function callApi(type) {
    setStatus(`Requesting (${type})...`);
    setDetails(null);
    const start = performance.now();
    try {
      const res = await fetch(`/api/simulate?type=${type}`);
      const duration = Math.round(performance.now() - start);
      const contentType = res.headers.get('content-type') || '';
      let payload = null;
      if (contentType.includes('application/json')) {
        payload = await res.json();
      } else {
        payload = await res.text();
      }

      appInsights?.trackEvent({
        name: 'FrontendApiCall',
        properties: { type, status: res.status, ok: res.ok, duration }
      });

      setStatus(`${res.ok ? 'Success' : 'Error'} (HTTP ${res.status}) • ${duration} ms`);
      setDetails(payload);
    } catch (error) {
      const duration = Math.round(performance.now() - start);
      appInsights?.trackEvent({
        name: 'FrontendApiCall',
        properties: { type, status: 'NETWORK_ERROR', ok: false, duration }
      });
      appInsights?.trackException({ error, properties: { type, duration } });

      setStatus(`Network Error • ${duration} ms`);
      setDetails(String(error));
    }
  }

  useEffect(() => {
    appInsights?.trackPageView({ name: 'Home' });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Trigger simulated API requests:</p>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => callApi('ok')}>OK Request</button>
        <button className="btn btn-warning" onClick={() => callApi('slow')}>Slow Request</button>
        <button className="btn btn-danger" onClick={() => callApi('failed')}>Failed Request</button>
      </div>

      <div className="status-card">
        <div className="status-title">Status: {status}</div>
        {details !== null && (
          <pre className="status-content">
{typeof details === 'string' ? details : JSON.stringify(details, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}