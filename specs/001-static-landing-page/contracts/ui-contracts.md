# UI Contracts — Dr. Shenouda Dental Clinic Landing Page

## Page Structure Contract

The landing page exports a single root component `App` that renders the following sections in order:

1. `<Navbar />` — sticky, contains smooth-scroll nav links + language toggle + theme toggle
2. `<HeroSection />` — full-screen hero with headline, subheadline, CTAs, stats bar, hero image
3. `<AboutSection />` — doctor bio text (loaded from `/about-me.md`) + doctor photo with liquid blob background
4. `<PhilosophySection />` — clinic values/mission with circular doctor photo
5. `<ServicesSection />` — 7 service cards in responsive grid
6. `<BeforeAfterSection />` — draggable comparison slider with 3 cases + filter chips + dot nav
7. `<ReviewsSection />` — 3 patient review cards with star ratings
8. `<ConsultationCTASection />` — banner with booking + WhatsApp CTAs
9. `<BookingSection />` — day selector, time slot grid, contact form, inline success
10. `<FAQSection />` — accordion with 6 questions, smooth expand/collapse, active accent border
11. `<Footer />` — links, contact info, social links, address
12. `<WhatsAppFloat />` — fixed floating button with tooltip and pre-filled message link

All section components MUST NOT contain hardcoded user-facing strings.

---

## i18n Contract

Translation files live in `src/i18n/ar.js` and `src/i18n/en.js`.

- Both files MUST export a single default object with identical key structures.
- Nested objects are allowed (e.g., `hero.title`, `services.items.0.title`).
- Components MUST consume translations via `useLang()` hook.
- Missing keys MUST fallback to the Arabic value to prevent blank UI.
- Key naming convention: `sectionName.elementName` (e.g., `hero.ctaPrimary`, `booking.formName`).

---

## Theme Contract

Themes are controlled by `ThemeContext`.

- Valid values: `'light' | 'dark'`
- `localStorage` key: `'theme'`
- Tailwind class strategy: `class` strategy with `<html class="dark">`
- CSS custom properties are defined in `src/styles/tokens.css`
- All color references in components MUST use Tailwind classes mapped to custom properties (e.g., `bg-primary`, `text-body`) — no raw hex values.

---

## Component Prop Contracts

### Section Components
All section components accept NO props. They pull state from context or inline data constants.

### `<ServiceCard icon title benefit />`
- `icon`: `string` — Material Symbols icon name
- `title`: `string`
- `benefit`: `string`

### `<ReviewCard initials name rating text date />`
- `initials`: `string`
- `name`: `string`
- `rating`: `number` (1–5)
- `text`: `string`
- `date`: `string` (displayed as-is)

### `<FAQItem question answer isOpen onToggle />`
- `question`: `string`
- `answer`: `string`
- `isOpen`: `boolean`
- `onToggle`: `() => void`

### `<BookingForm onSubmit />`
- `onSubmit`: `(formData: BookingFormData) => void`
- `BookingFormData` shape: `{ day: string, time: string, name: string, phone: string, email?: string, notes?: string, language?: 'ar' | 'en' }`
- Displays inline success state; performs no network request.

### `<BeforeAfterSlider beforeImage afterImage beforeAlt afterAlt />`
- `beforeImage`: `string` — image URL/path
- `afterImage`: `string` — image URL/path
- `beforeAlt`: `string`
- `afterAlt`: `string`
- Handles mouse drag and touch swipe internally.

---

## Navigation Contract

- Navbar links smooth-scroll to section IDs via `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.
- Mobile navbar uses a hamburger button that toggles a slide-in drawer overlay.
- Drawer closes on link click or outside tap.

---

## SEO Contract

- `<title>` and `<meta name="description">` rendered in `index.html` or injected via React Helmet (if used).
- JSON-LD scripts for `Dentist`, `FAQPage`, and `AggregateRating` MUST appear in `<head>`.
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`) MUST be present.
- Every `<img>` MUST have a descriptive `alt` attribute sourced from the active i18n file.
- Heading hierarchy: exactly one `<h1>` per page, followed by logical `<h2>`–`<h6>` nesting per section.
