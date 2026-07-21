# Research: Appointment Booking Page

**Feature**: 002-appointment-booking | **Date**: 2026-07-14 | **Phase**: 0 (Research)

**Scope**: Frontend-only appointment booking page at `/book` for Dr. Shenouda Dental Clinic. React 18 + Vite 5 + Tailwind CSS 3.4 + Framer Motion 11. No backend — localStorage persistence only for MVP.

---

## 1. Client-Side Routing for Vite+React SPA

### Problem

The project currently renders a single landing page from `App.jsx` with no routing at all. The `package.json` has zero router dependencies — only `react`, `react-dom`, and `framer-motion`. We need to add a `/book` route as a separate page while keeping the existing landing page at `/`.

### Decision

**Use `react-router-dom` v6 (BrowserRouter).**

### Rationale

- **Industry standard**: react-router-dom v6 is the most widely adopted routing solution for React SPAs, with 15M+ weekly npm downloads. Documentation, community support, and ecosystem tooling are unmatched.
- **Future scalability**: The clinic site will likely grow beyond two pages (e.g., patient portal, admin dashboard). react-router-dom's nested routes, loaders, and lazy loading support this growth without re-architecture.
- **Data APIs**: v6 introduces `createBrowserRouter` with loaders/actions, but we can start with the simpler `<BrowserRouter>` + `<Routes>` component API and upgrade incrementally.
- **Vite dev server compatibility**: Vite already handles SPA fallback in dev mode (serves `index.html` for all routes by default). No additional Vite configuration needed for development.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **react-router-dom v6** | Standard, rich API, lazy routes, large ecosystem | ~14 KB gzipped, heavier than minimal options | ✅ Selected |
| **wouter** | Tiny (~1.5 KB), hook-based, zero config | Small community, no built-in lazy loading, less documentation | ❌ Overkill simplicity — project will grow |
| **Hash-based routing (manual)** | Zero dependencies, trivial implementation | No clean URLs (`/#/book`), poor SEO signal, reinvents the wheel | ❌ Unprofessional URLs, maintenance burden |
| **TanStack Router** | Type-safe, file-based routing | Larger learning curve, TypeScript-first (project uses JS), newer/less stable | ❌ Over-engineered for current needs |

### Integration Plan with Existing `App.jsx`

The current `App.jsx` wraps all sections inside `<ThemeProvider>` → `<LangProvider>` → `<MainAppContent>`. The integration approach:

1. **Install**: `npm install react-router-dom`
2. **Wrap at root level**: Place `<BrowserRouter>` outside the providers in `App.jsx` (or in `main.jsx`) so the router context is available to all components.
3. **Define routes**: Use `<Routes>` with two `<Route>` elements:
   - `/` → existing `<MainAppContent>` (landing page, unchanged)
   - `/book` → new `<BookingPage>` component
4. **Shared layout**: Both routes share `<ThemeProvider>`, `<LangProvider>`, `<Navbar>`, `<Footer>`, and `<WhatsAppFloat>` via a layout route or direct wrapping.
5. **Lazy loading**: Use `React.lazy()` + `<Suspense>` for the `/book` route so the booking page bundle is only loaded when navigated to. This keeps the landing page initial load unchanged.

```jsx
// Conceptual structure (not final implementation)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const BookingPage = lazy(() => import('./pages/BookingPage'));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <Routes>
            <Route path="/" element={<MainAppContent />} />
            <Route path="/book" element={
              <Suspense fallback={<div>...</div>}>
                <BookingPage />
              </Suspense>
            } />
          </Routes>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

### Deployment Consideration

For production builds, the hosting server must be configured to serve `index.html` for all routes (SPA fallback). Vite's dev server does this automatically, but static hosting (Netlify, Vercel, GitHub Pages) each have their own configuration:

- **Netlify**: Add `_redirects` file with `/* /index.html 200`
- **Vercel**: Add `vercel.json` with `rewrites` rule
- **Apache**: `.htaccess` with `FallbackResource /index.html`
- **Nginx**: `try_files $uri /index.html`

---

## 2. localStorage Slot Management Pattern

### Problem

Bookings need to persist across page refreshes with no backend. localStorage is the only persistence layer for MVP. We need a clean schema for storing bookings, safe read/write patterns, and awareness of storage limitations.

### Decision

**Store all bookings as a JSON array under a single `dsc_bookings` key.**

### Rationale

- **Single key simplicity**: One key (`dsc_bookings`) avoids key proliferation and makes it trivial to enumerate, export, or clear all booking data. No need for key iteration or pattern matching.
- **Atomic reads**: Reading the full bookings list is a single `getItem` + `JSON.parse` call — no need to assemble data from multiple keys.
- **Prefixed key**: The `dsc_` prefix (Dr. Shenouda Clinic) avoids collisions with other apps on the same origin and with the existing `lang` and `theme` keys already in localStorage.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Single array key** | Simple read/write, atomic, easy to clear | Must parse entire array for any operation | ✅ Selected — array will be tiny (< 100 bookings) |
| **One key per booking** (`dsc_booking_<id>`) | Granular access, no full-array parsing | Key enumeration required, harder to list all, key pollution | ❌ Over-engineered |
| **IndexedDB** | Larger storage (250MB+), async, structured queries | Overkill complexity for < 100 records, async API adds boilerplate | ❌ Unnecessary for MVP scale |
| **SessionStorage** | Same API as localStorage | Data lost on tab close — unacceptable for bookings | ❌ Wrong persistence model |

### JSON Schema Design

```json
{
  "dsc_bookings": [
    {
      "id": "b_1720958400000",
      "patientName": "أحمد محمد",
      "patientPhone": "+201234567890",
      "slotDate": "2026-07-19",
      "slotTime": "16:00",
      "service": "teeth-whitening",
      "status": "confirmed",
      "createdAt": "2026-07-14T10:30:00.000Z",
      "lang": "ar"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique ID: `b_` + `Date.now()` at creation time |
| `patientName` | `string` | Full name (supports Arabic and English characters) |
| `patientPhone` | `string` | Phone number with country code |
| `slotDate` | `string` | ISO date (`YYYY-MM-DD`) of the appointment |
| `slotTime` | `string` | 24h time (`HH:MM`) of the appointment |
| `service` | `string` | Service slug from the services catalog |
| `status` | `string` | One of: `confirmed`, `cancelled` |
| `createdAt` | `string` | ISO 8601 timestamp of booking creation |
| `lang` | `string` | Language at time of booking (`ar` or `en`) |

### Read/Write Patterns

```javascript
// --- Read ---
function getBookings() {
  try {
    const raw = localStorage.getItem('dsc_bookings');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // Corrupted data fallback
  }
}

// --- Write (append) ---
function addBooking(booking) {
  const bookings = getBookings();
  bookings.push({ ...booking, id: `b_${Date.now()}`, createdAt: new Date().toISOString() });
  localStorage.setItem('dsc_bookings', JSON.stringify(bookings));
  return bookings;
}

// --- Write (update status) ---
function cancelBooking(id) {
  const bookings = getBookings().map(b =>
    b.id === id ? { ...b, status: 'cancelled' } : b
  );
  localStorage.setItem('dsc_bookings', JSON.stringify(bookings));
  return bookings;
}
```

### Storage Quota Handling

- **5 MB limit**: localStorage typically allows ~5 MB per origin. A single booking JSON object is ~200 bytes. At 200 bytes/booking, we can store ~25,000 bookings before hitting the limit — far beyond any realistic MVP usage.
- **Quota exceeded detection**: Wrap `setItem` in a try/catch to handle the `QuotaExceededError` (or `DOMException` with code 22). Surface a user-friendly error message if triggered.
- **Private/incognito browsing**: Safari in Private mode historically threw `QuotaExceededError` on any `setItem` call (storage quota set to 0). Modern Safari (15+) now allows 5 MB in private mode. For older browsers, the same try/catch handles this gracefully. We detect this on page load by attempting a test write and show a warning banner if localStorage is unavailable.

```javascript
function isLocalStorageAvailable() {
  try {
    const testKey = '__dsc_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
```

---

## 3. Date Generation for Recurring Weekday Slots

### Problem

The clinic operates on **Saturdays** (day 6) and **Wednesdays** (day 3) at **4:00 PM local time**. We need to generate the next 8 weeks of available appointment slots using native JavaScript — no external date library.

### Decision

**Use native `Date` API with a forward-scanning loop from today, collecting the next 8 Saturdays and next 8 Wednesdays, each at 16:00 local time.**

### Rationale

- **Zero dependencies**: The project constitution emphasizes simplicity and minimal bundle size. Native `Date` is sufficient for this predictable, non-complex date logic.
- **Local time is correct**: The clinic and its patients are in the same timezone (Egypt, UTC+2). Using local time via `new Date(year, month, day, 16, 0)` produces the correct wall-clock time without timezone conversion.
- **Predictable output**: The clinic schedule is fixed — no dynamic availability, no exceptions, no holidays (MVP). A simple generation algorithm is appropriate.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Native Date API** | Zero deps, sufficient for fixed schedule, small code | Verbose API, no built-in formatting | ✅ Selected |
| **date-fns** | Tree-shakeable, immutable, clean API | New dependency (~7 KB for used functions), unnecessary for this scope | ❌ Overkill |
| **dayjs** | Lightweight (~2 KB), Moment-like API | Still an extra dependency for simple logic | ❌ Unnecessary |
| **Temporal API** | Modern, correct, built-in | Not yet available in all target browsers (Stage 3 proposal) | ❌ Not production-ready |

### Generation Algorithm

```javascript
/**
 * Generate upcoming appointment slots for the next `weeks` weeks.
 * @param {number} weeks - Number of weeks to generate (default: 8)
 * @returns {Array<{date: string, time: string, dayOfWeek: number, iso: string}>}
 */
function generateSlots(weeks = 8) {
  const slots = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0);

  // Scan forward up to weeks * 7 days
  for (let d = 0; d <= weeks * 7; d++) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + d);
    const dow = candidate.getDay(); // 0=Sun, 3=Wed, 6=Sat

    if (dow === 3 || dow === 6) {
      // Skip if the slot is today but already past 4 PM
      if (d === 0 && now.getHours() >= 16) continue;

      slots.push({
        date: formatDate(candidate),   // "2026-07-19"
        time: '16:00',
        dayOfWeek: dow,
        iso: candidate.toISOString(),
      });
    }
  }
  return slots;
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
```

### Timezone Considerations

- **Egypt Standard Time (EET, UTC+2)**: No daylight saving time changes (Egypt abolished DST in 2014). The offset is stable year-round.
- **`new Date(y, m, d, 16, 0)`** creates the date in the **browser's local timezone**, which is correct since both the clinic and patients are local.
- **`toISOString()`** converts to UTC for storage consistency (the `iso` field). The `date` and `time` fields remain in local representation for display.
- **Edge case**: If a user books from a different timezone (e.g., traveling), the slot times will display in their local time. This is acceptable for MVP — the clinic is local-only.

### Past-Date Filtering

Slots are filtered at generation time:
1. The loop starts from day 0 (today), so past dates are never generated.
2. If today is a clinic day (Wed or Sat) but it's already past 4 PM, that slot is skipped via the `now.getHours() >= 16` guard.
3. Already-booked slots are filtered at the UI layer by cross-referencing the generated slots with the `dsc_bookings` array from localStorage.

---

## 4. Optimistic UI Pattern for Booking

### Problem

The booking interface needs to feel instant and responsive. In a typical client-server app, optimistic UI means showing the result before the server confirms. But our context is localStorage-only — what does "optimistic" mean when there's no network?

### Decision

**Immediate state update → synchronous localStorage write → error boundary rollback. The pattern is inherently "optimistic" because localStorage is synchronous and local.**

### Rationale

- **localStorage is synchronous**: `setItem` and `getItem` are blocking calls that complete in microseconds. There is no network latency, no pending state, no retry logic needed.
- **Optimistic by default**: Since the write always succeeds (barring quota errors), the React state update and the persistence happen in the same synchronous tick. The UI never shows a stale or pending state.
- **Error handling is minimal**: The only failure mode is `QuotaExceededError`, which is astronomically unlikely given the data size (~200 bytes/booking vs 5 MB limit). A simple try/catch with rollback covers this edge case.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Sync state + sync write (selected)** | Simplest, no async complexity, instant | No loading states (not needed) | ✅ Selected |
| **Async wrapper with `useTransition`** | Simulates network-like flow, reusable pattern | Unnecessary complexity, adds fake latency, confusing for localStorage | ❌ Over-engineered |
| **Event-sourcing pattern** | Undo/redo support, audit trail | Massive overkill for a booking form | ❌ Way too complex |

### Implementation Pattern

```javascript
function useBookings() {
  const [bookings, setBookings] = useState(() => getBookings());

  const addBooking = useCallback((bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `b_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // 1. Optimistic state update
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    // 2. Persist to localStorage
    try {
      localStorage.setItem('dsc_bookings', JSON.stringify(updatedBookings));
      return { success: true, booking: newBooking };
    } catch (err) {
      // 3. Rollback on failure (quota exceeded)
      setBookings(bookings);
      return { success: false, error: 'storage_full' };
    }
  }, [bookings]);

  const cancelBooking = useCallback((id) => {
    const updatedBookings = bookings.map(b =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    );
    setBookings(updatedBookings);
    try {
      localStorage.setItem('dsc_bookings', JSON.stringify(updatedBookings));
      return { success: true };
    } catch {
      setBookings(bookings);
      return { success: false, error: 'storage_full' };
    }
  }, [bookings]);

  return { bookings, addBooking, cancelBooking };
}
```

### UX Flow

1. User fills the booking form and clicks "Book Appointment"
2. Form validates inputs (name, phone, selected slot)
3. `addBooking()` fires → state updates instantly → slot disappears from available list
4. Success confirmation animates in (Framer Motion)
5. If localStorage write fails (try/catch), state rolls back, error toast appears
6. No loading spinners, no skeleton states — everything is instant

---

## 5. Data Source Abstraction Pattern

### Problem

The MVP uses localStorage exclusively, but the clinic may eventually want to connect to an external system (Google Sheets, Supabase, a REST API) to manage real availability. We need an abstraction layer that makes the data source swappable without rewriting components.

### Decision

**Create a `BookingDataSource` adapter interface with a localStorage implementation as the default. Use React Context to inject the data source into the component tree.**

### Rationale

- **Decoupling**: Components never call `localStorage` directly — they call `dataSource.getBookings()` and `dataSource.createBooking()`. Swapping to a network-backed source requires only a new adapter implementation.
- **React Context injection**: The existing codebase already uses the Context pattern (`LangContext`, `ThemeContext`). A `BookingContext` fits naturally alongside them.
- **No premature abstraction**: The adapter is a thin interface (3 methods). It doesn't introduce dependency injection frameworks, service locators, or abstract factory patterns. It's just a plain object with functions.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Context-based adapter (selected)** | Familiar pattern, matches existing architecture, simple | One more context provider | ✅ Selected |
| **Module-level import swap** | No Context overhead | Requires build-time config or env vars, harder to test | ❌ Less flexible |
| **Full repository pattern** | Clean architecture, testable | Too much abstraction for 3 methods, Java-style verbosity | ❌ Over-engineered |
| **Direct localStorage calls in components** | Simplest, no abstraction | Impossible to swap without rewriting every component | ❌ No future flexibility |

### Interface Design

```javascript
/**
 * @typedef {Object} BookingDataSource
 * @property {() => Array} getBookings - Returns all bookings
 * @property {(booking: Object) => Object} createBooking - Creates a new booking, returns it
 * @property {(id: string) => Object} cancelBooking - Cancels a booking by ID, returns updated booking
 */

// --- localStorage implementation (default) ---
const localStorageDataSource = {
  getBookings() {
    try {
      const raw = localStorage.getItem('dsc_bookings');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  createBooking(bookingData) {
    const booking = {
      ...bookingData,
      id: `b_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    const bookings = [...this.getBookings(), booking];
    localStorage.setItem('dsc_bookings', JSON.stringify(bookings));
    return booking;
  },

  cancelBooking(id) {
    const bookings = this.getBookings().map(b =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('dsc_bookings', JSON.stringify(bookings));
    return bookings.find(b => b.id === id);
  },
};
```

### Context Integration

```jsx
import { createContext, useContext } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ dataSource = localStorageDataSource, children }) {
  return (
    <BookingContext.Provider value={dataSource}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingDataSource() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookingDataSource must be used within BookingProvider');
  return ctx;
}
```

### Future Swap Example

When the clinic is ready to connect to an external API, the swap is a single-line change at the provider level:

```jsx
// Before (localStorage)
<BookingProvider>
  <BookingPage />
</BookingProvider>

// After (API-backed)
import { apiDataSource } from './data-sources/api';

<BookingProvider dataSource={apiDataSource}>
  <BookingPage />
</BookingProvider>
```

No component code changes. The `useBookingDataSource()` hook continues to work identically.

---

## Summary of Decisions

| # | Topic | Decision | Key Dependency |
|---|-------|----------|----------------|
| 1 | Client-side routing | react-router-dom v6 (`BrowserRouter`) | `react-router-dom@^6` (new install) |
| 2 | Booking persistence | Single `dsc_bookings` key in localStorage | None (native API) |
| 3 | Slot date generation | Native `Date` API, forward-scan loop | None (native API) |
| 4 | Optimistic UI | Synchronous state + localStorage write with try/catch rollback | None (inherent to localStorage) |
| 5 | Data source abstraction | `BookingDataSource` adapter via React Context | None (pattern only) |

**Total new dependencies**: 1 (`react-router-dom`)
