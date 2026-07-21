# UI Component Contract: Static Landing Page

**Feature**: `001-static-landing-page`
**Generated**: 2026-05-26

This document defines the props interface and behavior contract for each React component in the landing page. Components receive content exclusively via the `useLang()` hook and must not contain hardcoded text (Constitution §V).

---

## Shared Hooks

All components may use these hooks:

```js
const { lang, t, toggle } = useLang();
// lang: "ar" | "en"
// t: translation object (ar.js or en.js)
// toggle: () => void

const { theme, toggle: toggleTheme } = useTheme();
// theme: "light" | "dark"
// toggleTheme: () => void
```

---

## 1. `<Navbar />`

**File**: `src/components/Navbar.jsx`

**Props**: None (all data from `useLang()` + `useTheme()`)

**Behavior contract**:
- Renders sticky at `top-0`, `z-50`, with `backdrop-blur-md`
- Background opacity increases on `scroll` (via `window.addEventListener('scroll', ...)`)
- Renders 6 `<a href="#section-id">` nav links from `t.nav`
- AR|EN pill toggle calls `toggle()` from LangContext
- Dark/light icon button calls `toggleTheme()` from ThemeContext
- "احجز موعد" CTA button links to `#book`
- Mobile (<768px): hides nav links; shows hamburger button
- Hamburger: toggles slide-in full-height drawer with all nav links
- Drawer closes on nav link click
- All interactive elements have unique `id` attributes

**State**: `isScrolled: Boolean`, `isDrawerOpen: Boolean`

**Accessibility**: `aria-label` on hamburger; `aria-expanded` reflects drawer state; `role="navigation"` on `<nav>`

---

## 2. `<Hero />`

**File**: `src/components/Hero.jsx`

**Props**: None

**Behavior contract**:
- Min-height: `100vh`; 2-column layout on desktop, stacked on mobile
- Left: badge pill, `<h1>` (single on page), subheadline, 2 CTA buttons, stats bar
- Right: hero image (`src/assets/preview/hero-photo.png`), glassmorphism card, floating pills
- Stats bar: 4 `<HeroStat>` sub-components, each triggering count-up on `whileInView`
- Image alt: `t.hero.imgAlt` (bilingual, SEO keyword-rich)
- CTA 1 (`t.hero.cta1`) links to `#book`
- CTA 2 (`t.hero.cta2`) — secondary styling (outlined button)

**Animation**: `motion.div` fade-up on section enter; count-up via `useInView` + `useEffect`

---

## 3. `<AboutMe />`

**File**: `src/components/AboutMe.jsx`

**Props**: None

**Behavior contract**:
- 2-column layout: left = doctor photo with blob, right = bio text
- Doctor photo: `src/assets/preview/about-me.png`, `alt={t.about.imgAlt}`
- Bio text: fetched from `/about.txt` via `fetch()` on mount; paragraphs split by `\n\n`
- Edge case: if fetch fails or content is empty → render empty `<div>` without breaking layout
- Blob: 3 absolutely-positioned divs behind photo, responding to `mousemove` on left column only
- Blob movement: `transform: translate(offsetX * factor, offsetY * factor)` with `transition: 0.4s ease`
- Achievement badges: 3 static pills ("10+ سنة خبرة", "500+ مريض", "معتمد دولياً")

**State**: `bioText: String`, `isLoading: Boolean`

---

## 4. `<Philosophy />`

**File**: `src/components/Philosophy.jsx`

**Props**: None

**Behavior contract**:
- Centered layout, `max-w-2xl mx-auto`, `text-center`
- Circular doctor photo: `src/assets/preview/about-me.png`, 100px diameter, accent border
- Large italic serif quote from `t.philosophy.quote`
- Doctor name + specialty below from `t.philosophy.name` + `t.philosophy.specialty`

**Animation**: `motion.div` fade-up on `whileInView`, `once: true`

---

## 5. `<Services />`

**File**: `src/components/Services.jsx`

**Props**: None

**Behavior contract**:
- Renders exactly 7 `<ServiceCard>` sub-components from `t.services.items`
- Grid: 2 columns mobile / 4 columns desktop (wraps at row 2 for 7th card)
- Card hover: `translateY(-4px)` + `box-shadow` + left border accent color
- Each card: Material Symbol icon + `t.services.items[n].title` + `t.services.items[n].benefit`

**Sub-component `<ServiceCard>`**:
- Props: `{ icon: String, title: String, benefit: String }`
- `icon`: Material Symbols name rendered as `<span className="material-symbols-outlined">{icon}</span>`

---

## 6. `<BeforeAfter />`

**File**: `src/components/BeforeAfter.jsx`

**Props**: None

**Behavior contract**:
- Filter chips: 4 chips (`t.beforeafter.chips`: الكل, تجميل, حشوات, تبييض)
- "الكل" shows the active case regardless of category
- Category chips filter to matching case (if current case doesn't match, switch to first matching)
- Slider: `clip-path: inset(0 0 0 {sliderPos}%)` on "after" image container
- Handle: positioned at `left: {sliderPos}%`, `transform: translateX(-50%)`
- `onMouseDown`/`onTouchStart` → sets `isDragging = true`
- `onMouseMove`/`onTouchMove` on container → updates `sliderPos` if `isDragging`
- `onMouseUp`/`onTouchEnd`/`onMouseLeave` → sets `isDragging = false`
- `touch-action: none` on slider container
- Dot navigation: 3 dots, active = accent; clicking dot switches `activeCase`
- Before label: `t.beforeafter.labels.before`; After label: `t.beforeafter.labels.after`

**State**: `activeCase`, `activeFilter`, `sliderPos`, `isDragging` (see `data-model.md`)

---

## 7. `<Reviews />`

**File**: `src/components/Reviews.jsx`

**Props**: None

**Behavior contract**:
- Renders exactly 3 review cards from `t.reviews.items`
- Grid: 1 column mobile / 3 columns desktop
- Each card: 5 gold stars + review text + divider + initials circle + name + date
- Initials: derived from `t.reviews.items[n].name` (first letter of each word, max 2 chars)
- No interactive state

**Animation**: Cards fade-up on `whileInView`, staggered by `delay: index * 0.1`

---

## 8. `<ConsultationCTA />`

**File**: `src/components/ConsultationCTA.jsx`

**Props**: None

**Behavior contract**:
- Always-dark background (`var(--bg-dark)`) regardless of theme
- Centered layout; `<h2>` from `t.cta.h2`; sub from `t.cta.sub`
- Button 1 (`t.cta.btn1`): links to `#book` (white bg, dark text)
- Button 2 (`t.cta.btn2`): opens WhatsApp link (outlined, white text + WA icon)
- WhatsApp URL: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`

---

## 9. `<Booking />`

**File**: `src/components/Booking.jsx`

**Props**: None

**Behavior contract**:
- 2-column layout desktop / stacked mobile
- Left: day pills (6) + time grid (2×4)
- Right: form fields (name, phone, email, note, lang pref) + submit button
- `phone` input always `dir="ltr"` regardless of page direction
- `name` + `phone` are required; show inline error if empty on submit
- On valid submit: set `isSubmitted = true`; render `t.booking.success` message inline
- No network request — `event.preventDefault()` only
- `isSubmitted = true` hides form, shows success message

**State**: `BookingFormState` (see `data-model.md`)

**Accessibility**: All form fields have `<label>` elements; `aria-required="true"` on required fields; `aria-describedby` linking to error messages

---

## 10. `<FAQ />`

**File**: `src/components/FAQ.jsx`

**Props**: None

**Behavior contract**:
- Renders exactly 6 accordion items from `t.faq.items`
- `max-w-[720px] mx-auto`
- Accordion: only one item open at a time; clicking open item closes it (toggle)
- Open state: `border-inline-start: 4px solid var(--accent)` + answer slides in
- Answer animation: CSS `max-height` transition (from `0` to `max-height: 500px`)
- Arrow icon rotates `180deg` when item is open

**State**: `openIndex: Number | null`

**Accessibility**: Each item uses `<button>` for the header; `aria-expanded` on button; `role="region"` + `aria-labelledby` on the answer panel

---

## 11. `<Footer />`

**File**: `src/components/Footer.jsx`

**Props**: None

**Behavior contract**:
- Always-dark background (`var(--bg-dark)`) regardless of theme
- 4-column desktop / 2-column mobile / 1-column small mobile
- Col 1 (span 2): logo + tagline (`t.footer.tagline`) + short description
- Col 3: quick links from `t.footer.links` (anchor links to sections)
- Col 4: WhatsApp link + address placeholder
- Bottom bar: thin `border-t border-white/10` + copyright (`t.footer.copyright`)

---

## 12. `<WhatsAppFloat />`

**File**: `src/components/WhatsAppFloat.jsx`

**Props**: None

**Behavior contract**:
- `position: fixed`, `bottom: 24px`, `z-index: 9999`
- Position: `left: 24px` when `lang === 'ar'`; `right: 24px` when `lang === 'en'`
- Always-green background (`#25D366`)
- WhatsApp SVG icon (white, 28px)
- Animation: CSS `float-y` keyframe (translateY 0 → -6px → 0, 2s infinite)
- Hover: `scale(1.1)` + green glow shadow
- Tooltip (`t.whatsapp.tooltip`) appears above button on hover
- `href`: `https://wa.me/${VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`
- `target="_blank"` + `rel="noopener noreferrer"`

**Accessibility**: `aria-label={t.whatsapp.tooltip}`
