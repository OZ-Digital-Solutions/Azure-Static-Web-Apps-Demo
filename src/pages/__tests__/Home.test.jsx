import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock telemetry to avoid side effects
vi.mock('@/telemetry/appInsights.js', () => ({
  appInsights: {
    trackEvent: vi.fn(),
    trackException: vi.fn(),
    trackPageView: vi.fn()
  }
}));

import Home from '@/pages/Home.jsx';

describe('Home page', () => {
  it('renders three buttons with labels', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /OK Request/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Slow Request/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Failed Request/i })).toBeInTheDocument();
  });

  it('calls API and updates status card on success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ status: 'ok' })
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse);

    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: /OK Request/i }));

    // Wait for status to reflect success; duration is variable so match partial text
    const statusEl = await screen.findByText(/Status: Success \(HTTP 200\)/i);
    expect(statusEl).toBeInTheDocument();

    // Ensure fetch was called with the correct URL
    expect(fetchSpy).toHaveBeenCalledWith('/api/simulate?type=ok');
  });

  it('handles fetch rejection and shows error message', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network down'));

    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: /OK Request/i }));

    const statusEl = await screen.findByText(/Status: Network Error/i);
    expect(statusEl).toBeInTheDocument();
  });
});