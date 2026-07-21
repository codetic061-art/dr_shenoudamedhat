# Feature Specification: Static Landing Page — Dr. Shenouda Dental Clinic

**Feature Branch**: `001-static-landing-page`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "make the phase 1 in plan.md file — static frontend dental clinic landing page with modern SEO. Photos folder has all photos needed."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Egyptian Patient Discovers Clinic via Google Search (Priority: P1)

A potential patient in Egypt searches Google for cosmetic dentistry services (e.g., "دكتور أسنان تجميلي مصر" or "dental clinic Egypt"). The clinic's landing page appears in search results with a compelling title, meta description, and rich snippet showing ratings, opening hours, and services. The patient clicks through and lands on a visually impressive, fast-loading Arabic page that immediately builds trust and guides them toward booking.

**Why this priority**: This is the core conversion funnel — the entire purpose of the site. Without discoverability and a strong first impression, no other feature matters.

**Independent Test**: Can be tested by loading the page in a browser, verifying all SEO meta tags render correctly, Schema.org structured data validates via Google's Rich Results Test, page loads within acceptable time, and the full Arabic content displays with proper RTL layout.

**Acceptance Scenarios**:

1. **Given** a user opens the landing page, **When** the page loads, **Then** the page displays a full-screen hero section with the clinic name, tagline, call-to-action buttons, and a professional hero image within 3 seconds.
2. **Given** a search engine crawls the page, **When** it reads the HTML, **Then** it finds a proper `<title>`, `<meta description>`, Open Graph tags, and JSON-LD structured data for Dentist and FAQPage schemas.
3. **Given** the page is viewed on mobile (<768px), **When** the user scrolls, **Then** all sections stack vertically with readable text, tappable buttons, and no horizontal overflow.

---

### User Story 2 - Patient Browses Services and Reviews Trust Signals (Priority: P1)

A visitor scrolls through the landing page to evaluate the clinic's credibility. They view the doctor's about section with credentials, browse the 7 dental services offered, examine before/after treatment photos with an interactive slider, and read patient reviews — all reinforcing trust before deciding to book.

**Why this priority**: Trust-building content is essential for medical services. Patients must see expertise, real results, and social proof before taking action.

**Independent Test**: Can be tested by scrolling through the page and verifying each content section (About, Services, Before/After, Reviews) renders with correct data, images load, the before/after slider is interactive, and animations trigger smoothly on scroll.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the About section, **When** it enters the viewport, **Then** the doctor's photo displays with a liquid blob background effect that subtly follows cursor movement, and the doctor's bio text loads from an external text file.
2. **Given** a visitor views the Services section, **When** all cards are visible, **Then** 7 service cards display with icons, titles, and benefit descriptions; each card lifts on hover with a left border accent.
3. **Given** a visitor interacts with the Before/After section, **When** they drag the slider handle, **Then** the comparison reveals the before and after images smoothly with filter chips to switch between cases (aesthetic, fillings, whitening).
4. **Given** a visitor views the Reviews section, **When** it renders, **Then** 3 patient review cards display with star ratings, review text, patient initials, name, and date.

---

### User Story 3 - Patient Books an Appointment or Contacts via WhatsApp (Priority: P1)

After evaluating the clinic, the patient decides to take action. They can either fill out the booking form (selecting a day, time slot, and providing contact details) or tap the floating WhatsApp button to message the doctor directly. Both paths lead to a clear confirmation that their intent was received.

**Why this priority**: This is the conversion action — the business goal of the entire landing page. Without a clear path to book or contact, the site fails its purpose.

**Independent Test**: Can be tested by filling out the booking form with valid data and verifying the success message appears, and by clicking the WhatsApp float button to verify it opens the correct WhatsApp link with a pre-filled message.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "احجز موعد" (Book Appointment), **When** they select a day, time slot, and fill in name + phone number, **Then** clicking submit shows an inline success message "✅ تم استلام طلبك! سنتواصل معك قريباً." without any network request.
2. **Given** a visitor sees the floating WhatsApp button, **When** they tap it, **Then** a new tab opens with `wa.me/{phone}?text={pre-filled message}` in the correct language.
3. **Given** a visitor views the Free Consultation CTA section, **When** they click "احجز الآن" or "تواصل واتساب", **Then** the buttons navigate to the booking section or open WhatsApp respectively.

---

### User Story 4 - Patient Switches Language or Theme (Priority: P2)

A bilingual visitor (or an English-speaking expat in Egypt) toggles the site from Arabic to English. The entire page re-renders in English with LTR layout. Separately, a visitor browsing at night switches to dark mode for comfortable reading. Both preferences persist across the session.

**Why this priority**: Bilingual support doubles the addressable audience. Dark mode improves accessibility and user comfort but is secondary to core content delivery.

**Independent Test**: Can be tested by toggling the language switch and verifying all text changes, the page direction flips, and layout remains intact. Similarly, toggling dark mode and verifying colors change according to dark theme tokens.

**Acceptance Scenarios**:

1. **Given** the page loads in Arabic (default), **When** the visitor clicks the AR|EN language toggle, **Then** all text switches to English, `<html dir>` changes to `ltr`, `<html lang>` changes to `en`, and navigation links update.
2. **Given** the page is in light mode, **When** the visitor clicks the theme toggle icon, **Then** all colors switch to dark mode tokens, the toggle icon changes from moon to sun, and the preference is saved to localStorage.
3. **Given** a visitor has selected English + dark mode, **When** they refresh the page, **Then** the page loads in the previously selected language and theme.

---

### User Story 5 - Patient Reads FAQ to Resolve Concerns (Priority: P2)

A hesitant patient has questions about dental procedures (safety, pain, timing, cost). They scroll to the FAQ section and expand individual questions to read concise, reassuring answers — reducing anxiety and moving them closer to booking.

**Why this priority**: FAQ content serves dual purpose — it reduces bounce rate by answering common objections, and it improves SEO through FAQ schema markup.

**Independent Test**: Can be tested by clicking each FAQ item and verifying it expands with a smooth animation to reveal the answer, and only one item is open at a time (accordion behavior).

**Acceptance Scenarios**:

1. **Given** a visitor views the FAQ section, **When** they click a question, **Then** the answer slides down smoothly with a max-height transition, and a left accent border appears on the active item.
2. **Given** a FAQ item is open, **When** the visitor clicks another question, **Then** the previously open item collapses and the new one opens.
3. **Given** a search engine crawls the page, **When** it reads the FAQ section, **Then** it finds FAQPage JSON-LD structured data with all 6 questions and answers.

---

### Edge Cases

- What happens when the about.txt content file is empty or missing? The About section displays gracefully with a fallback empty state — no broken UI.
- What happens when a visitor drags the before/after slider on a touch device? The slider responds to both mouse drag and touch swipe events without page scroll interference.
- What happens when a visitor submits the booking form with missing required fields? The form shows inline validation messages for required fields (name, phone) before allowing submission.
- What happens on extremely small screens (<320px)? The layout degrades gracefully with no horizontal overflow or overlapping elements.
- What happens when images fail to load? Alt text displays as fallback, and the layout does not break or shift.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The landing page MUST render as a single scrollable page with 12 distinct sections: Navbar, Hero, About Me, Philosophy, Services, Before/After, Reviews, Consultation CTA, Booking, FAQ, Footer, and WhatsApp Float.
- **FR-002**: The Navbar MUST be sticky at the top with smooth-scroll anchor links to each major section. On mobile, it MUST collapse into a hamburger menu with a slide-in drawer.
- **FR-003**: The Hero section MUST display a headline with the primary SEO keyword, subheadline, two CTA buttons, a stats bar with count-up animation on scroll, and a professional hero image (`photos/hero photo.png`).
- **FR-004**: The About Me section MUST load the doctor's bio text from `photos/about-me.md` (converted to plain text at build time or loaded at runtime) and display the doctor's photo (`photos/about me.png`) with an interactive liquid blob background that follows cursor movement.
- **FR-005**: The Services section MUST display 7 dental service cards in a responsive grid (2 columns mobile, 4 columns desktop) with icons, titles, and benefit text. Cards MUST lift on hover.
- **FR-006**: The Before/After section MUST implement a draggable comparison slider with 3 cases, filter chips to switch between cases, and dot navigation. The slider MUST support both mouse and touch input.
- **FR-007**: The Booking section MUST display a day selector (6 days), time slot grid (8 slots), and a contact form with name, phone, email, notes, and language preference fields. On submit, it MUST display an inline success message without making any network request.
- **FR-008**: A floating WhatsApp button MUST be fixed at the bottom-right corner (bottom-left in RTL), with a gentle floating animation and a tooltip on hover. It MUST link to WhatsApp with a pre-filled message.
- **FR-009**: The page MUST include complete SEO markup: title tag, meta description, keywords meta, robots meta, Open Graph tags, and JSON-LD structured data for Dentist, FAQPage, and AggregateRating schemas.
- **FR-010**: The FAQ section MUST implement an accordion pattern with 6 questions, smooth expand/collapse animation, and a visual accent border on the active item.
- **FR-011**: All images used in the site MUST be sourced from the `photos/` folder provided with the project.
- **FR-012**: The site MUST support full bilingual operation (Arabic RTL + English LTR) with a toggle in the navbar, dynamically updating `dir` and `lang` attributes on the document.
- **FR-013**: The site MUST support light and dark themes with a toggle in the navbar, persisting the choice in localStorage across sessions.
- **FR-014**: The complete photo asset inventory with exact filenames and their section assignments is:

  | # | Actual Filename | Format | Section | Usage |
  |---|----------------|--------|---------|-------|
  | 1 | `hero photo.png` | PNG | Hero (Section 2) | Right-column hero image — smiling patient/doctor in dental setting |
  | 2 | `about me.png` | PNG | About Me (Section 3) + Philosophy (Section 4) | Doctor portrait — rectangular photo with blob background in About; circular 100px photo in Philosophy |
  | 3 | `case 1 before.png` | PNG | Before/After (Section 6) | Case 1 "before" layer — Aesthetic category (chip: تجميل) |
  | 4 | `case 1 after.jpg` | JPG | Before/After (Section 6) | Case 1 "after" layer — Aesthetic category |
  | 5 | `case 2 before.jpg` | JPG | Before/After (Section 6) | Case 2 "before" layer — Fillings category (chip: حشوات) |
  | 6 | `case 2 after.jpg` | JPG | Before/After (Section 6) | Case 2 "after" layer — Fillings category |
  | 7 | `case 3 before.jpg` | JPG | Before/After (Section 6) | Case 3 "before" layer — Whitening category (chip: تبييض) |
  | 8 | `case 3 after.jpg` | JPG | Before/After (Section 6) | Case 3 "after" layer — Whitening category |
  | 9 | `about-me.md` | MD | About Me (Section 3) | Doctor's bio/credentials text — loaded as content source for the about section |

  **Note**: The file `gemini-3.1-flash-image-preview...png` in the photos folder is an unused AI-generated asset and is NOT required for the frontend. Total required assets: **8 images + 1 text file = 9 files**.

### Key Entities

- **Section**: A visually distinct content block on the landing page (Navbar, Hero, About, Services, etc.), each with an anchor ID for smooth scrolling.
- **Service Card**: A dental service offering with an icon, title, and benefit description displayed in the Services grid.
- **Before/After Case**: A treatment comparison consisting of a before image, an after image, and a category tag (aesthetic, fillings, whitening).
- **Patient Review**: A testimonial with star rating, review text, patient name/initials, and date.
- **Booking Slot**: A combination of day (Saturday–Thursday) and time (8 available slots) that a patient can select in the booking form.
- **FAQ Item**: A question-answer pair displayed in the accordion, also represented in FAQPage structured data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The landing page loads and becomes interactive within 3 seconds on a standard 4G mobile connection.
- **SC-002**: All 12 sections render correctly across 3 breakpoints: mobile (<768px), tablet (768–1024px), and desktop (>1024px) with zero horizontal overflow.
- **SC-003**: Toggling between Arabic and English results in a complete language switch (all visible text, direction, and layout) within 500 milliseconds with no layout breakage or missing translations.
- **SC-004**: The Before/After slider responds to user drag input with less than 100ms perceived latency on both desktop (mouse) and mobile (touch).
- **SC-005**: Search engine structured data validates successfully against Google's Rich Results Test with zero errors for both Dentist and FAQPage schemas.
- **SC-006**: Every image on the page has a descriptive alt attribute in the active language, and heading hierarchy uses exactly one h1 with proper nesting.
- **SC-007**: The booking form displays clear inline validation for required fields and shows a success confirmation upon valid submission, all without any network request.
- **SC-008**: Dark mode and light mode both display all content with readable contrast ratios (minimum 4.5:1 for body text) using the defined design tokens.

## Assumptions

- The `photos/` folder at the project root contains all 9 required assets for Phase 1: 1 hero image (`hero photo.png`), 1 doctor portrait (`about me.png`), 6 before/after case images (`case 1-3 before/after` in mixed PNG/JPG formats), and 1 bio text file (`about-me.md`). No additional photography or image generation is needed.
- **Important**: Actual filenames in `photos/` use spaces (e.g., `hero photo.png`, `about me.png`, `case 1 before.png`) and mixed extensions (PNG and JPG). The implementation MUST handle these exact filenames when copying/referencing assets.
- The doctor's about text is provided in `photos/about-me.md` as structured Markdown. It will be adapted into plain text paragraphs for the About Me section (either converted at build time or parsed at runtime).
- The WhatsApp phone number will be configured via environment variable before deployment; a placeholder is acceptable during development.
- The site targets modern evergreen browsers (Chrome, Firefox, Safari, Edge — latest 2 versions). IE11 support is not required.
- This is Phase 1 only — no backend API, no database, no analytics pixels. The booking form submits locally with a static success message.
- Default language is Arabic (RTL). English is the secondary toggle option.
- The site will be deployed as a static build; no server-side rendering is required.
