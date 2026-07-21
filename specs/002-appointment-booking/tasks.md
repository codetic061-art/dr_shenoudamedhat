---
description: "Tasks for feature 002-appointment-booking"
---

# Tasks: Appointment Booking Page

**Input**: Design documents from `/specs/002-appointment-booking/`

**Prerequisites**: plan.md (✅), spec.md (✅), research.md (✅), data-model.md (✅), contracts/ui-contracts.md (✅), quickstart.md (✅)

**Tests**: Not requested in the feature specification. No test tasks are generated. Verification is performed manually against the acceptance scenarios in `spec.md` and the `Testing Locally` section of `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact absolute-relative file paths in descriptions

## Path Convention

- Project root: `D:\vabi voding\docter web`
- All source paths below are relative to project root
- New files created under `src/pages/`, `src/components/booking/`, `src/config/`, `src/services/`
- Modified files: `src/App.jsx`, `src/main.jsx`, `src/i18n/en.js`, `src/i18n/ar.js`, `src/utils/validation.js`, `vite.config.js`, `package.json`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install the new routing dependency and create the folder scaffolding for booking-page files.

- [X] T001 Install the `react-router-dom` v6 dependency by running `npm install react-router-dom` in the project root (`D:\vabi voding\docter web`). After the command completes, verify `react-router-dom` appears in the `dependencies` block of `package.json` at version `^6.x`. Do not modify any other dependency. Do not modify `package-lock.json` manually — let npm write it.

- [X] T002 [P] Create the new source subdirectories that Phase 2+ tasks will populate: `src/pages/`, `src/components/booking/`, `src/config/`, `src/services/`. These directories should be empty (git will not track them until files are added — that is expected).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities, configuration, i18n keys, and routing wiring that ALL user stories depend on.

**⚠️ CRITICAL**: Every task in this phase must complete before any Phase 3+ task can begin. After this phase the landing page continues to work at `/` and `/book` resolves to a still-empty route.

- [X] T003 [P] Create the booking data-source configuration file at `src/config/booking.js` exporting a single `BOOKING_CONFIG` constant with three properties per `data-model.md` DataSourceConfig: `dataSource: 'localStorage'`, `endpoint: null`, `localStorageKey: 'dr-shenouda-bookings'`. Include a top-of-file JSDoc block explaining that changing `dataSource` to `'externalFeed'` and setting `endpoint` to a URL swaps the read source without touching any component (per FR-013).

- [X] T004 [P] Create the slot-generation utility at `src/utils/slotGenerator.js` exporting a pure function `generateSlots()` that returns an array of TimeSlot objects for the next 8 weeks. Algorithm per `research.md` §3: forward-scan from today for 56 days, keep days where `getDay()` is 3 (Wednesday) or 6 (Saturday), set hours to 16 / minutes 0, skip today if the local clock is already past 16:00, and skip any date whose full datetime is in the past. Each slot object must match the shape in `contracts/ui-contracts.md`: `{ id: string (ISO datetime), date: Date, dayOfWeek: 'saturday'|'wednesday', formattedDate: string (DD/MM/YYYY), formattedTime: '4:00 PM', isBooked: false }`. Return the array sorted ascending by date. Export named: `export function generateSlots() { ... }`.

- [X] T005 [P] Create the booking service at `src/services/bookingService.js`. Import `BOOKING_CONFIG` from `../config/booking.js`. Export three named functions:
  1. `getBookings()` — reads `localStorage.getItem(BOOKING_CONFIG.localStorageKey)`, `JSON.parse`s it, and returns the array. Wrap in try/catch; on any error (missing key, corrupt JSON, storage unavailable) return `[]`.
  2. `saveBooking(booking)` — calls `getBookings()`, throws `new Error('SLOT_TAKEN')` if any existing booking has the same `slotDate`, otherwise pushes and writes back with `localStorage.setItem`. Wrap the write in try/catch; on `QuotaExceededError` throw `new Error('STORAGE_FULL')`. Returns the saved booking.
  3. `isSlotBooked(slotDateISO)` — takes a `YYYY-MM-DD` string, returns `true` if any booking in `getBookings()` matches `slotDate`. Also export `isLocalStorageAvailable()` per `research.md` §2 that does a test write/remove and returns a boolean.

- [X] T006 [P] Extend `src/utils/validation.js`. Change `validatePhone`'s regex from `/^01[0125][0-9]{8}$/` to `/^\+?[0-9]{7,15}$/` per FR-004 (accepts Egyptian and international formats). Add a new named export `validateEmailRequired(email)` that returns `false` when the trimmed email is empty and otherwise uses the same email regex — do NOT change the existing `validateEmail` (the landing page contact form treats email as optional). Preserve all existing exports; keep JSDoc comment at the top of the file.

- [X] T007 [P] Add the `booking` namespace to `src/i18n/en.js`. Insert the new `booking` object immediately before the closing `};` of the exported translations. Include every key listed under `## i18n Keys Required` in `contracts/ui-contracts.md`: `pageTitle`, `metaDescription`, `backToHome`, `selectSlotLabel`, `saturday`, `wednesday`, `booked`, `available`, `nameLabel`, `namePlaceholder`, `nameError`, `phoneLabel`, `phonePlaceholder`, `phoneError`, `emailLabel`, `emailPlaceholder`, `emailError`, `submitButton`, `submittingButton`, `confirmationTitle`, `errorTitle`, `slotTakenError`, `storageError`, `bookAnother`, `tryAgain`, `cancellationNote`, `noSlotsAvailable`, `localTimeNote`, `selectedSlot`, `date`, `time`, `name`, `phone`, `email`. Use natural English copy consistent with the landing-page tone.

- [X] T008 [P] Add the identical `booking` namespace with Arabic translations to `src/i18n/ar.js`. Every key added to `en.js` in T007 must have an equivalent Arabic string here (e.g., `pageTitle: 'احجز موعد'`, `saturday: 'السبت'`, `booked: 'محجوز'`). Preserve the surrounding RTL-safe punctuation used elsewhere in `ar.js`.

- [X] T009 Modify `src/App.jsx` to add client-side routing. (1) Add `import { Routes, Route } from 'react-router-dom';` and `import BookingPage from './pages/BookingPage';` at the top. (2) Rename the existing `MainAppContent` function to `LandingPage` — keep its JSX body unchanged so the landing page still renders every existing section. (3) Inside the `App` default export, replace the `<MainAppContent />` render with `<Routes><Route path="/" element={<LandingPage />} /><Route path="/book" element={<BookingPage />} /></Routes>`. (4) Leave `<ThemeProvider>` and `<LangProvider>` wrapping the `<Routes>` block — do not touch context ordering. Do NOT add `<BrowserRouter>` here; it belongs in `main.jsx` (T010).

- [X] T010 Modify `src/main.jsx` to wrap the app with `BrowserRouter`. Add `import { BrowserRouter } from 'react-router-dom';` and place `<BrowserRouter>` as the outermost child of `<React.StrictMode>`, wrapping `<App />`. Keep every existing import (`React`, `ReactDOM`, `./App`, CSS imports) unchanged.

- [X] T011 [P] Modify `vite.config.js` to explicitly enable SPA fallback so that a direct browser hit to `/book` (or a refresh on that route) serves `index.html`. Add a `server: { historyApiFallback: true }` block inside `defineConfig({...})`, preserving the existing `plugins: [react()]` and `publicDir: './photos'` entries. Add a same-effect comment to remind future maintainers to configure `_redirects` / `vercel.json` / `.htaccess` on static hosts (see `research.md` §1 "Deployment Consideration").

- [X] T012 [P] Create a temporary stub `src/pages/BookingPage.jsx` exporting a default function that renders `<div>Booking page — under construction</div>`. This stub is required so that T009's import of `BookingPage` resolves and `/book` returns a page instead of a runtime error. T015 will replace this stub with the full implementation. Verify by running `npm run dev` and confirming `/` renders the landing page unchanged and `/book` renders the placeholder text.

**Checkpoint**: `npm run dev` boots. `/` renders the landing page identically to before. `/book` renders the placeholder stub. `localStorage` inspection shows no booking key yet. All Phase 3+ tasks can now begin.

---

## Phase 3: User Story 1 — Book an Appointment (Priority: P1) 🎯 MVP

**Goal**: A visitor loads `/book`, sees 16 upcoming Saturday/Wednesday 4:00 PM slots, selects one, fills name + phone + email, submits, and gets a stored booking with the slot marked booked in the schedule.

**Independent Test**: Open `http://localhost:5173/book` in a fresh browser (or clear `dr-shenouda-bookings` from localStorage). Pick any available slot, fill name = "Test User", phone = "01012345678", email = "test@test.com", submit. The confirmation summary shows the booking details and the slot in the schedule now appears disabled. Refresh the page and the slot must still show as booked (US2 verifies this side of the persistence).

### Implementation for User Story 1

- [X] T013 [P] [US1] Create the `ScheduleView` component at `src/components/booking/ScheduleView.jsx`. Named export `ScheduleView({ slots, selectedSlot, onSelectSlot })`. Imports: `React`, `{ motion }` from `framer-motion`, `{ useLang }` from `../../hooks/useLang`. Render an accessible slot grid per `contracts/ui-contracts.md` § ScheduleView: `<section>` wrapper with a `<h2>` from `t.booking.selectSlotLabel`, and a `role="radiogroup"` grid with Tailwind classes `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`. Map `slots` to `<motion.button>` cards with `role="radio"`, `aria-checked`, `tabIndex`, `aria-disabled` reflecting `isSelected`/`isBooked` state. Apply the three visual states from the contract (Available / Selected / Booked) using the design-token Tailwind classes listed there (`bg-surface-container-lowest`, `bg-primary`, `bg-surface-dim`, etc.). Include Framer Motion mount animation `initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}` and a `whileHover={!isBooked ? { scale: 1.02 } : undefined}`. Card content: localized day label, `slot.formattedDate`, `slot.formattedTime`, and a "Booked" badge when `isBooked`. If `slots.length === 0`, render a centered `<p>` with `t.booking.noSlotsAvailable`.

- [X] T014 [P] [US1] Create the `BookingForm` component at `src/components/booking/BookingForm.jsx`. Named export `BookingForm({ selectedSlot, onSubmit, isSubmitting, disabled })`. Imports: `React, { useState }`, `{ motion, AnimatePresence }` from `framer-motion`, `{ useLang }` from `../../hooks/useLang`, `{ validateName, validatePhone, validateEmailRequired }` from `../../utils/validation`. State: `name`, `phone`, `email` (all default `''`), `errors` (`{ name: '', phone: '', email: '' }`). Render (per `contracts/ui-contracts.md` § BookingForm): (1) when `selectedSlot` exists, a rounded chip showing `t.booking.selectedSlot: {formattedDate} — {formattedTime}` using `bg-primary-container` / `text-on-primary-container`; (2) a `<form>` with three labeled inputs — text/tel/email — each with `aria-required`, `aria-invalid` when errored, `aria-describedby` pointing at the error `<motion.span id="{field}-error">`. Wire `onBlur` per-field validation and `onSubmit` all-field validation using the imported validators. Submit button is `disabled` when any of: `!selectedSlot`, `isSubmitting`, `disabled`. During submission show the `submittingButton` label. On valid submit call `onSubmit({ patientName: name.trim(), patientPhone: phone.trim(), patientEmail: email.trim() })`. When `disabled` is true (all slots booked), render `<p>{t.booking.noSlotsAvailable}</p>` in place of the form.

- [X] T015 [P] [US1] Create the `BookingSummary` component at `src/components/booking/BookingSummary.jsx`. Named export `BookingSummary({ booking, error, onReset })`. Imports: `React`, `{ motion, AnimatePresence }` from `framer-motion`, `{ useLang }`. Success state (when `booking && !error`): a centered `<motion.div role="status" aria-live="polite">` with a bouncing checkmark (`task_alt` material symbol, `animate={{ scale: [0, 1.2, 1] }}`), the `confirmationTitle`, a details card listing Date (format `booking.slotDate` from `YYYY-MM-DD` back to `DD/MM/YYYY` via a small helper), Time, Name, Phone (`dir="ltr"`), and Email; a "Book Another" button firing `onReset`; and a small `cancellationNote` under the button. Error state (when `error`): a `role="alert" aria-live="assertive"` variant with a warning icon in `text-error`, `errorTitle` heading, a `bg-error-container` card showing the localized error message, and a "Try Again" button. Wrap the entire component in `<AnimatePresence mode="wait">` for enter/exit transitions per the contract (`opacity 0→1`, `scale 0.95→1`, 0.3s).

- [X] T016 [US1] Replace the stub at `src/pages/BookingPage.jsx` with the full orchestrator. Default export `BookingPage`. Imports: `React, { useState, useEffect, useCallback, useMemo }`, `{ Link }` from `react-router-dom`, `{ useLang }` from `../hooks/useLang`, `{ generateSlots }` from `../utils/slotGenerator`, `{ getBookings, saveBooking, isLocalStorageAvailable }` from `../services/bookingService`, `{ ScheduleView }`, `{ BookingForm }`, `{ BookingSummary }` from `../components/booking/*`. State per `contracts/ui-contracts.md` § BookingPage: `slots`, `bookings`, `selectedSlot`, `bookingStatus` (`'idle'|'submitting'|'success'|'error'`), `lastBooking`, `lastError`, plus `storageOk` (boolean from `isLocalStorageAvailable()`). On mount: compute `generateSlots()`, read `getBookings()`, derive each slot's `isBooked` by comparing the slot's ISO date (`slot.date.toISOString().split('T')[0]`) against each `booking.slotDate`, and set state. Also set `document.title = t.booking.pageTitle` and update the `<meta name="description">` tag via `document.querySelector`. `handleSubmit(formData)`: build the Booking object per `data-model.md` (id = `${Date.now()}-${randomSuffix}`, `slotDate` = ISO YYYY-MM-DD, `slotTime` = `'16:00'`, `createdAt` = `new Date().toISOString()`, `lang`), set status to `'submitting'`, call `saveBooking(booking)`, on success append to `bookings`/mark slot booked/set `lastBooking`/status = `'success'`, on catch map `SLOT_TAKEN`→`t.booking.slotTakenError` and `STORAGE_FULL`→`t.booking.storageError`, re-read bookings to refresh availability, status = `'error'`. `handleReset()`: set status `'idle'`, clear `selectedSlot`, `lastBooking`, `lastError`, re-derive slot availability from localStorage. Layout: `<div className="min-h-screen bg-surface text-on-surface">` → header with a `<Link to="/">` back button (arrow direction based on `lang === 'ar'`) and the `<h1>` `pageTitle`; `<main className="max-w-5xl mx-auto px-4 pb-16">`; conditional render — `idle` or `submitting` shows a `grid grid-cols-1 lg:grid-cols-12 gap-8` with `<ScheduleView>` in `lg:col-span-7` and `<BookingForm>` in `lg:col-span-5`; `success` or `error` shows `<BookingSummary>`; append a small `localTimeNote` footer paragraph. If `!storageOk`, render a `bg-error-container text-on-error-container` warning banner above the grid with the `storageError` message.

**Checkpoint** — US1 complete: A first-time visitor at `/book` sees 16 slots (or fewer if past-today slots got filtered), can pick one, fill valid contact details, submit, and receive a confirmation. DevTools → Application → localStorage shows a `dr-shenouda-bookings` key containing the new booking JSON. This is the shippable MVP.

---

## Phase 4: User Story 2 — Retain Bookings Across Page Reloads (Priority: P1)

**Goal**: All bookings written to localStorage in the current browser survive full-page reloads and remain reflected as unavailable in the schedule.

**Independent Test**: After US1's flow completes, hard-reload the page (`Ctrl+F5`). The previously booked slot must still render as booked (`bg-surface-dim`, "Booked" badge). Manually clear `dr-shenouda-bookings` from DevTools and reload — all 16 slots must now show as available.

### Implementation for User Story 2

- [X] T017 [US2] Harden the persistence layer in `src/pages/BookingPage.jsx`. Confirm the mount `useEffect` calls `getBookings()` before deriving slot availability and that the derived list — not the raw generated list — is what gets stored in state. Add a guard: if `isLocalStorageAvailable()` returned `false`, skip reads/writes and set `bookingStatus` remain `'idle'` but disable the submit button by passing an extra `disabled` prop to `<BookingForm>` (or reuse the existing `disabled` = `allSlotsBooked || !storageOk`). Verify by: (1) booking a slot, (2) reloading, (3) confirming the slot is still marked booked. Then (4) manually add a `slotDate: '2027-01-01'` entry via DevTools localStorage editor, (5) reload, (6) confirm no crash (unknown future slots are just ignored because they don't match any generated slot within the 8-week window).

**Checkpoint** — US2 complete: Zero data loss across sessions in the same browser. All localStorage failure modes gracefully surface a user-visible banner instead of crashing.

---

## Phase 5: User Story 3 — View Booking Confirmation or Error (Priority: P2)

**Goal**: Both the success confirmation and the two error paths (slot taken, storage unavailable) render clear, accessible, localized feedback.

**Independent Test**: (Success) submit a valid booking — the confirmation card shows the exact date, time, name, phone, email. (Error) manually inject a duplicate booking for a future slot into localStorage via DevTools, then try to book that same slot — the `slotTakenError` message appears in an `alert`-role card, and clicking "Try Again" returns to a schedule with the now-taken slot marked booked.

### Implementation for User Story 3

- [X] T018 [US3] Polish the summary details rendering in `src/components/booking/BookingSummary.jsx`. Add a top-of-file helper `const formatSlotDate = (iso) => { const [y, m, d] = iso.split('-'); return \`${d}/${m}/${y}\`; };` and use it in the Date row of the success details card so the localized display always matches FR-017's DD/MM/YYYY format. Ensure the phone row uses `dir="ltr"` so `+20` prefixes render correctly under Arabic. Verify the error state has `role="alert"` and `aria-live="assertive"` (already added in T015) and that the "Try Again" button has an explicit `aria-label` from `t.booking.tryAgain`.

- [X] T019 [US3] Refine error handling in `src/pages/BookingPage.jsx`'s `handleSubmit` catch block so that a `SLOT_TAKEN` error additionally: (1) re-reads bookings from `getBookings()`, (2) re-derives every slot's `isBooked` flag (specifically the slot the user attempted), and (3) updates the `slots` state so that when the user clicks "Try Again", the schedule visibly reflects the now-taken slot. Also clear `selectedSlot` after a `SLOT_TAKEN` failure so the user must actively pick a different slot before re-submitting.

**Checkpoint** — US3 complete: Both success and error surfaces meet WCAG live-region requirements. Manual QA against the acceptance scenarios in `spec.md` §User Story 3 passes.

---

## Phase 6: User Story 4 — Switch Data Source (Priority: P3)

**Goal**: A single-line edit to `src/config/booking.js` swaps the read source from localStorage to an external JSON feed URL without touching any component or service consumer.

**Independent Test**: Set `BOOKING_CONFIG.dataSource = 'externalFeed'` and `endpoint = 'https://example.com/slots.json'` (or a mock served locally). Reload `/book`. The app must attempt to fetch that URL, use its response to mark slot availability, and still write new bookings to localStorage (external source is read-only per FR-013). Revert the config → behavior returns to localStorage-only.

### Implementation for User Story 4

- [X] T020 [P] [US4] Extend `src/services/bookingService.js` with a new exported async function `getExternalSlots(endpoint)`. It must `fetch(endpoint)`, parse the JSON body, and return an array of booked-date strings in `YYYY-MM-DD` format. Accept two response shapes for forward-compat: either a bare array of ISO date strings, or an object `{ bookedDates: string[] }`. Wrap the whole body in try/catch — on any failure (network, parse, unexpected shape) log a `console.warn` and return `[]` so the UI degrades to "all slots available" instead of crashing. Do NOT change `getBookings`, `saveBooking`, or `isSlotBooked` — they continue to operate on localStorage regardless of the config.

- [X] T021 [US4] Update the mount effect in `src/pages/BookingPage.jsx` to branch on `BOOKING_CONFIG.dataSource`. Import `BOOKING_CONFIG` from `../config/booking.js` and `getExternalSlots` from the service. Convert the mount `useEffect` to an inner async pattern (`useEffect(() => { const init = async () => { ... }; init(); }, []);`). When `dataSource === 'externalFeed'` and `endpoint` is truthy, `await getExternalSlots(BOOKING_CONFIG.endpoint)` and merge those booked dates with `getBookings()` output when computing each slot's `isBooked`. When `dataSource === 'localStorage'`, preserve today's synchronous-feeling behavior (`await` an already-resolved Promise so the code path stays uniform). Writes always go to localStorage via `saveBooking` — do not change that.

**Checkpoint** — US4 complete: Toggle the config value and the page picks up the new source with a single reload. No component code was edited. The behavior with default config remains byte-for-byte identical to Phase 5 output.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass — responsive audit, double-submit protection, accessibility & SEO verification, production build smoke test.

- [X] T022 [P] Responsive polish in `src/components/booking/ScheduleView.jsx`. Verify the grid renders 2/3/4 columns at `<sm`/`sm–lg`/`≥lg`. Add slightly reduced padding on mobile (`p-3 sm:p-4`) to prevent horizontal overflow at 320 px. Confirm every color class references design tokens from `src/styles/tokens.css` (no hex literals). Resize the browser through 320 → 1920 px and confirm no overflow, no clipped text, and legible "Booked" badges in both languages.

- [X] T023 [P] Double-submit protection in `src/components/booking/BookingForm.jsx`. Confirm the submit button is `disabled` while `isSubmitting`. Replace the static `check_circle` icon during submission with a spinning `progress_activity` material symbol (`className="animate-spin material-symbols-outlined text-[18px]"`). Manual test: rapid triple-click on submit produces exactly one booking in localStorage.

- [X] T024 [P] SEO + a11y verification in `src/pages/BookingPage.jsx`. Confirm the mount effect sets `document.title = t.booking.pageTitle`. If `<meta name="description">` exists, update its `content` attribute to `t.booking.metaDescription`; if it does not exist, `document.createElement('meta')` with name/content and append to `<head>`. Verify exactly one `<h1>` on the page. Tab-navigate the entire flow (slot → form fields → submit → success card → "Book Another") with keyboard only and confirm focus rings remain visible and no element is skipped. Confirm every input has matching `htmlFor`/`id`, `aria-required`, `aria-invalid`, and `aria-describedby` when errored.

- [X] T025 Production build & preview smoke test in the project root. Run `npm run build` and verify a clean exit with no errors or warnings that reference booking files. Then run `npm run preview` and manually verify: (1) `http://localhost:4173/` still renders the full landing page, (2) `http://localhost:4173/book` renders the booking page including a full booking round-trip, (3) navigating directly to `http://localhost:4173/book` in a new tab does NOT 404, and (4) toggling the language (Arabic ↔ English) on `/book` updates every label and preserves DD/MM/YYYY dates.

---

## Dependencies & Execution Order

### Phase dependencies

- **Phase 1 (Setup)**: no dependencies — start immediately.
- **Phase 2 (Foundational)**: depends on Phase 1. **Blocks all user-story phases.**
- **Phase 3 (US1 — MVP)**: depends on Phase 2.
- **Phase 4 (US2)**: depends on Phase 3 (refines the persistence path built in T016).
- **Phase 5 (US3)**: depends on Phase 3 (enhances the summary component built in T015 and error branch in T016).
- **Phase 6 (US4)**: depends on Phase 3 (extends `bookingService` and `BookingPage`'s mount effect). Independent of Phase 4/5.
- **Phase 7 (Polish)**: depends on Phases 3–6.

### User-story dependencies

- **US1 (P1)**: starts after Phase 2 — no cross-story dependencies.
- **US2 (P1)**: depends on US1 (refines T016's mount effect and persistence flow).
- **US3 (P2)**: depends on US1 (enhances T015's summary and T016's error branch).
- **US4 (P3)**: depends on US1 (extends T005 and T016's mount effect).

### Within a phase

- Tasks with `[P]` touch different files and can run in parallel.
- Non-`[P]` tasks in the same phase must run in listed order.
- The Setup and Foundational tasks that modify orchestration files (T009, T010, T012) run sequentially after the parallel utility/config/i18n tasks (T003–T008, T011) complete.

### Parallel opportunities

- **Phase 1**: T002 in parallel with T001 (npm install is I/O; folder creation is filesystem).
- **Phase 2 parallel batch A**: T003, T004, T005, T006, T007, T008, T011 all touch distinct files.
- **Phase 2 parallel batch B (after A)**: T009, T010 touch different files; T012 (stub) is also independent.
- **Phase 3 parallel batch**: T013, T014, T015 (three separate component files) can run concurrently. T016 must run last as it imports all three.
- **Phase 6**: T020 must precede T021 (T021 imports from T020).
- **Phase 7**: T022, T023, T024 in parallel; T025 last.

---

## Parallel Example: Phase 2 (Foundational)

```text
# Batch A — all touch distinct files, no ordering constraint:
T003 src/config/booking.js
T004 src/utils/slotGenerator.js
T005 src/services/bookingService.js
T006 src/utils/validation.js
T007 src/i18n/en.js
T008 src/i18n/ar.js
T011 vite.config.js

# Batch B — after A finishes (imports from A must resolve):
T009 src/App.jsx
T010 src/main.jsx
T012 src/pages/BookingPage.jsx (stub)
```

## Parallel Example: Phase 3 (User Story 1)

```text
# Three sibling components — no cross-imports until T016:
T013 src/components/booking/ScheduleView.jsx
T014 src/components/booking/BookingForm.jsx
T015 src/components/booking/BookingSummary.jsx

# Then, sequential:
T016 src/pages/BookingPage.jsx (imports all three)
```

---

## Implementation Strategy

### MVP first (User Story 1 only)

1. Complete Phase 1 (T001–T002).
2. Complete Phase 2 (T003–T012).
3. Complete Phase 3 (T013–T016).
4. **STOP and validate** against `spec.md` §User Story 1 acceptance scenarios and `quickstart.md` §Testing Locally.
5. Deploy if ready — this is the shippable MVP (16 tasks, US1 + implicit US2 persistence).

### Incremental delivery

1. Setup + Foundational → foundation ready (12 tasks).
2. Add US1 → validate booking flow → demo/deploy (MVP).
3. Add US2 → validate persistence edge cases → deploy.
4. Add US3 → validate error paths → deploy.
5. Add US4 → validate data-source swap → deploy.
6. Polish → final production build → deploy.

### Parallel team strategy

- Dev A owns Phase 2 batch A (T003, T004, T005, T006).
- Dev B owns Phase 2 i18n + config edges (T007, T008, T011).
- Once Phase 2 is done, Dev A implements US1 components (T013–T016) while Dev B queues US4 work (T020, T021).
- US2 and US3 are small enough for a single developer to close after US1.

---

## Notes

- **Total tasks**: 25 (T001–T025)
- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 10 tasks
- **Phase 3 (US1 — MVP)**: 4 tasks
- **Phase 4 (US2)**: 1 task
- **Phase 5 (US3)**: 2 tasks
- **Phase 6 (US4)**: 2 tasks
- **Phase 7 (Polish)**: 4 tasks
- Every task specifies an exact file path.
- Every task is self-contained — an LLM or engineer can execute it without needing to re-read the spec.
- No test tasks are generated because tests were not requested in the feature specification.
- Commit after each task or logical group; stop at any checkpoint to validate.
