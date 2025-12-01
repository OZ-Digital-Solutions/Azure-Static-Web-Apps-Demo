# Azure Static Web Apps Demo

Vite + React 18 demo with routing and simple API calls.

## Scripts

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Notes

- Dev server runs on `http://localhost:5173`.
- Build outputs to `dist/`.
- Alias `@` resolves to `/src`.
- Home page calls `/api/simulate?type=ok|slow|failed` and displays status.