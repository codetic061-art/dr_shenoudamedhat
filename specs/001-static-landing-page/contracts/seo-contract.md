# SEO Contract: Static Landing Page

**Feature**: `001-static-landing-page`
**Generated**: 2026-05-26

This document defines the mandatory SEO elements for the landing page, serving as the contract between the implementation and the requirements in FR-009, SC-005, SC-006, and Constitution §I.

---

## 1. HTML Head — Required Meta Tags

All of the following MUST be present in `index.html`:

| Tag | Required Value | Notes |
|-----|---------------|-------|
| `<title>` | `د. شنودة \| عيادة أسنان تجميلية متخصصة في مصر` | Primary keyword in title |
| `<meta name="description">` | ≥ 120 chars, includes "تبييض", "حشوات", "زراعة" keywords | Compelling click-through copy |
| `<meta name="keywords">` | Comma-separated Arabic keywords | Min 5 keywords |
| `<meta name="robots">` | `index, follow` | Allow full indexing |
| `<meta property="og:title">` | Short compelling title | Open Graph for social sharing |
| `<meta property="og:description">` | Short CTA description | Open Graph |
| `<meta property="og:image">` | Absolute URL to hero image | Open Graph image (min 1200×630px recommended) |
| `<meta property="og:type">` | `website` | Open Graph type |
| `<meta property="og:locale">` | `ar_EG` | Egyptian Arabic locale |

---

## 2. Semantic HTML Structure

| Element | Required Usage |
|---------|---------------|
| `<header>` | Wraps `<Navbar>` — must be a single `<header>` |
| `<main>` | Wraps all content sections (Hero through Footer); excludes Navbar and WhatsAppFloat |
| `<section>` | Each of the 10 content sections (Hero, About, Philosophy, Services, BeforeAfter, Reviews, ConsultationCTA, Booking, FAQ) |
| `<footer>` | Wraps `<Footer>` component |
| `<nav>` | Navigation links inside Navbar; `role="navigation"` |
| `<article>` | Each review card inside Reviews section |
| `<h1>` | **Exactly one** per page — in the Hero section; contains primary SEO keyword |
| `<h2>` | One per section heading (About, Services, Before/After, Reviews, FAQ, Booking) |
| No generic `<div>` wrappers | Replace with semantic elements wherever structurally appropriate |

---

## 3. Image Alt Attributes

Every `<img>` element MUST have a non-empty `alt` attribute in the **active language**. Alt text must be switched dynamically when the language toggles.

| Image | AR Alt (required) | EN Alt (required) |
|-------|------------------|------------------|
| Hero photo | `صورة مريض سعيد في عيادة د. شنودة للأسنان التجميلية` | `Happy patient at Dr. Shenouda cosmetic dental clinic` |
| Doctor portrait (About) | `صورة الدكتور شنودة، طبيب أسنان تجميلي` | `Dr. Shenouda, cosmetic dentist` |
| Doctor portrait (Philosophy) | `الدكتور شنودة — طبيب أسنان تجميلي متخصص` | `Dr. Shenouda — specialist cosmetic dentist` |
| Case 1 Before | `أسنان قبل العلاج التجميلي — حالة زبون في عيادة د. شنودة` | `Teeth before cosmetic treatment — patient case at Dr. Shenouda` |
| Case 1 After | `أسنان بعد العلاج التجميلي — نتيجة مذهلة في عيادة د. شنودة` | `Teeth after cosmetic treatment — stunning result at Dr. Shenouda` |
| Case 2 Before | `حشوات أسنان قبل العلاج` | `Teeth before filling treatment` |
| Case 2 After | `حشوات أسنان تجميلية — بعد العلاج` | `Cosmetic fillings — after treatment` |
| Case 3 Before | `أسنان قبل التبييض` | `Teeth before whitening` |
| Case 3 After | `أسنان بعد التبييض — نتيجة واضحة` | `Teeth after whitening — clear result` |

---

## 4. Heading Hierarchy

```
h1: Hero — "ابتسامتك.. تستحق أفضل دكتور أسنان تجميلي"  (EXACTLY ONE)
  h2: About — "عن الدكتور شنودة"
  h2: Services — "خدمات طب الأسنان التجميلي"
  h2: Before/After — "نتائج حقيقية لمرضانا"
  h2: Reviews — "آراء مرضانا في عيادة د. شنودة"
  h2: ConsultationCTA — "احجز استشارتك المجانية اليوم"
  h2: Booking — "احجز موعدك"
  h2: FAQ — "أسئلة شائعة عن طب الأسنان التجميلي"
    h3: [FAQ question items — rendered as button text, not headings]
```

No heading levels may be skipped (h1 → h2 → h3, never h1 → h3).

---

## 5. JSON-LD Structured Data

### 5a. Dentist Schema (with AggregateRating)

```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "عيادة د. شنودة للأسنان التجميلية",
  "description": "تبييض، حشوات، زراعة، وتقويم أسنان بأحدث التقنيات",
  "telephone": "+20XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EG",
    "addressLocality": "Alexandria"
  },
  "openingHours": "Sa-Th 09:00-20:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "520"
  }
}
```

**Validation**: Must pass [Google Rich Results Test](https://search.google.com/test/rich-results) with zero errors.

### 5b. FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "<question>", "acceptedAnswer": { "@type": "Answer", "text": "<answer>" } }
    // × 6 items — MUST match t.faq.items exactly (same text)
  ]
}
```

**Contract**: The FAQ questions and answers in the JSON-LD MUST be identical to those in `i18n/ar.js → t.faq.items`. Any content update to FAQ items MUST also update the JSON-LD.

---

## 6. Core Web Vitals Targets

| Metric | Target | Implementation |
|--------|--------|----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Hero image pre-loaded (`<link rel="preload">`); fonts via Google CDN with `display=swap` |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Images have explicit `width`/`height` attributes or `aspect-ratio` CSS; no font flash from incorrect fallback metrics |
| **FID/INP** (Interaction to Next Paint) | < 200ms | No blocking scripts; all JS deferred via Vite's module bundling |

---

## 7. Section Anchor IDs

Each major section MUST have a stable `id` attribute for smooth-scroll navigation:

| Section | Required `id` |
|---------|-------------|
| Hero | `home` |
| About Me | `about` |
| Philosophy | `philosophy` |
| Services | `services` |
| Before/After | `work` |
| Reviews | `reviews` |
| Consultation CTA | `cta` |
| Booking | `book` |
| FAQ | `faq` |
