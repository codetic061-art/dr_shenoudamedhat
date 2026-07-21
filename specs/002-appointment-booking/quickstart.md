# Quickstart: Appointment Booking Page

## Prerequisites

- Node.js 18+ and npm
- Existing project cloned and `npm install` run

## New Dependency

The booking feature requires `react-router-dom` for client-side routing:

```bash
npm install react-router-dom
```

## Development

```bash
npm run dev
```

Then open:
- Landing page: `http://localhost:5173/`
- Booking page: `http://localhost:5173/book`

## Key Files (new)

| File | Purpose |
|------|---------|
| `src/pages/BookingPage.jsx` | Main booking page component |
| `src/components/booking/ScheduleView.jsx` | Slot grid display |
| `src/components/booking/BookingForm.jsx` | Patient info form |
| `src/components/booking/BookingSummary.jsx` | Confirmation/error display |
| `src/config/booking.js` | Data source configuration |
| `src/services/bookingService.js` | localStorage read/write logic |
| `src/utils/slotGenerator.js` | Date generation for Sat/Wed slots |

## Key Files (modified)

| File | Change |
|------|--------|
| `src/main.jsx` | Wrap App with BrowserRouter |
| `src/App.jsx` | Add Routes: `/` for landing, `/book` for booking |
| `src/i18n/ar.js` | Add booking page translation keys |
| `src/i18n/en.js` | Add booking page translation keys |
| `src/utils/validation.js` | Extend phone validation to accept international format |
| `vite.config.js` | Add SPA fallback for client-side routing |

## Data Source Configuration

Edit `src/config/booking.js` to switch data sources:

```js
// MVP: localStorage (default)
export const BOOKING_CONFIG = {
  dataSource: 'localStorage',
  endpoint: null,
};

// Future: external feed
// export const BOOKING_CONFIG = {
//   dataSource: 'externalFeed',
//   endpoint: 'https://your-calendar-feed-url.com/slots.json',
// };
```

## Testing Locally

1. Open `http://localhost:5173/book`
2. Select an available slot from the schedule
3. Fill in name, phone, and email
4. Submit — confirmation should appear
5. Reload the page — the booked slot should still show as unavailable
6. Open DevTools → Application → localStorage → verify `dr-shenouda-bookings` key exists

## Build & Deploy

```bash
npm run build
```

The `dist/` folder contains the static build. Deploy to any static host (Netlify, Vercel, GitHub Pages). Ensure the hosting provider is configured to redirect all routes to `index.html` for SPA routing.

## Clearing Test Data

To reset all bookings during development:
```js
localStorage.removeItem('dr-shenouda-bookings');
```
Then reload the page.
