import { useEffect } from 'react';
import { appInsights } from '@/telemetry/appInsights.js';

export default function About() {
  useEffect(() => {
    appInsights?.trackPageView({ name: 'About' });
  }, []);

  return (
    <div>
      <h1>About</h1>
      <p>This demo uses React 18 with Vite 5 and react-router-dom.</p>
    </div>
  );
}