<!--
  SYNC IMPACT REPORT
  ==================
  Version change: N/A (template) → 1.0.0 (initial)
  Modified principles:
    - [PRINCIPLE_1_NAME] → I. SEO-First Design
    - [PRINCIPLE_2_NAME] → II. Bilingual Accessibility
    - [PRINCIPLE_3_NAME] → III. Simplicity & Performance
    - [PRINCIPLE_4_NAME] → IV. Visual Excellence
    - [PRINCIPLE_5_NAME] → V. Component-Based Architecture
  Added sections:
    - Technology Constraints (Section 2)
    - Development Workflow (Section 3)
    - Governance (filled)
  Removed sections: None
  Templates requiring updates:
    ✅ .specify/templates/plan-template.md — no changes needed;
       Constitution Check placeholder is dynamic
    ✅ .specify/templates/spec-template.md — no changes needed;
       user stories and requirements structure is compatible
    ✅ .specify/templates/tasks-template.md — no changes needed;
       phase structure supports SEO/a11y/component tasks
  Follow-up TODOs: None
-->

# Dr. Shenouda Dental Clinic Constitution

## Core Principles

### I. SEO-First Design

Every page, component, and content decision MUST prioritize modern
search engine optimization:

- All pages MUST include proper `<title>`, `<meta description>`,
  Open Graph tags, and `robots` directives.
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`,
  `<article>`, `<nav>`, `<footer>`) MUST be used instead of
  generic `<div>` wrappers wherever structurally appropriate.
- Schema.org structured data (JSON-LD) MUST be embedded for
  `Dentist`, `FAQPage`, and `AggregateRating` entities.
- Every `<img>` MUST have a descriptive, keyword-rich `alt`
  attribute in the active language.
- Heading hierarchy MUST use a single `<h1>` per page with
  logically nested `<h2>`–`<h6>` subheadings.
- Core Web Vitals (LCP, FID, CLS) MUST be considered during
  development; no layout shifts from lazy-loaded content.

### II. Bilingual Accessibility

The site MUST fully support Arabic (RTL) and English (LTR)
with zero layout breakage:

- The `dir` and `lang` attributes on `<html>` MUST update
  dynamically when the user toggles language.
- All user-facing strings MUST be sourced from `i18n/ar.js`
  and `i18n/en.js` — no hardcoded text in components.
- Both translation files MUST have identical key structures;
  any key present in one MUST exist in the other.
- RTL-specific layout adjustments (margins, paddings, icon
  positions) MUST be handled via CSS logical properties or
  explicit `[dir=rtl]` selectors.

### III. Simplicity & Performance

This is a Phase 1 static landing page. The codebase MUST remain
simple, lightweight, and free of premature complexity:

- No backend, API calls, or database integrations in Phase 1.
  The booking form MUST show an inline success message only.
- YAGNI: features scoped for Phase 2 (FastAPI backend) and
  Phase 3 (Meta Pixel, Lighthouse polish) MUST NOT be
  implemented or scaffolded now.
- Dependencies MUST be limited to those listed in the tech
  stack: React 18, Tailwind CSS, Framer Motion, Google Fonts,
  Material Symbols. No additional libraries without explicit
  justification.
- Bundle size and initial load performance MUST be prioritized;
  images MUST use appropriate formats and lazy loading where
  below the fold.

### IV. Visual Excellence

The UI MUST deliver a premium, modern dental clinic experience
that inspires trust:

- Light and dark modes MUST both be fully functional using CSS
  custom properties defined in `tokens.css`.
- Smooth animations (fade-up on scroll, hover lifts, count-up
  stats) MUST be implemented via Framer Motion with
  `whileInView` and `once: true` to avoid re-triggering.
- Color palette MUST follow the defined design tokens — no
  ad-hoc color values in components.
- Typography MUST use the specified font stack: Cormorant
  Garamond (serif headings), DM Sans (body), Cairo (Arabic).
- Responsive design MUST work flawlessly across mobile
  (<768px), tablet, and desktop breakpoints.

### V. Component-Based Architecture

All UI elements MUST be built as focused, reusable React
components:

- Each section (Navbar, Hero, Services, FAQ, etc.) MUST be a
  standalone component in `src/components/`.
- Components MUST receive content via the `useLang()` hook
  and MUST NOT contain hardcoded copy.
- Theme-aware styling MUST be applied via Tailwind utility
  classes mapped to CSS custom properties — not inline styles
  with raw color values.
- State management MUST use React Context only (ThemeContext,
  LangContext). No external state libraries in Phase 1.

## Technology Constraints

- **Framework**: React 18 with Vite build tooling
- **Styling**: Tailwind CSS + CSS custom properties (tokens.css)
- **Animations**: Framer Motion only
- **Fonts**: Google Fonts — Cormorant Garamond, DM Sans, Cairo
- **Icons**: Material Symbols Outlined (via Google Fonts CDN)
- **i18n**: React Context with plain JS translation files
- **Deployment**: Static build output (`npm run build`);
  no server-side rendering required for Phase 1

## Development Workflow

- **Single-page app**: All sections render on one scrollable
  page with smooth-scroll anchor navigation.
- **Code quality**: Components MUST be lint-free and follow
  consistent formatting before committing.
- **Asset management**: All preview images reside in
  `src/assets/preview/`. The doctor's about text is loaded
  from `src/content/about.txt` at runtime.
- **Environment config**: Sensitive values (WhatsApp number)
  MUST be stored in `.env` and accessed via Vite env variables.

## Governance

- This constitution supersedes all ad-hoc coding decisions for
  the Dr. Shenouda Dental Clinic project.
- Amendments MUST be documented with a version bump, rationale,
  and updated date before implementation begins.
- Versioning follows semantic versioning: MAJOR for principle
  removals/redefinitions, MINOR for new principles or expanded
  guidance, PATCH for clarifications and typo fixes.
- All implementation work (specs, plans, tasks) MUST be
  validated against these principles before execution.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
