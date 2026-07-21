# Data Model: Static Landing Page — Dr. Shenouda Dental Clinic

## Entities

### Section
A top-level page block with an anchor ID for smooth-scroll navigation.

| Field | Type | Description |
|-------|------|-------------|
| id | string | DOM/anchor ID (e.g., `hero`, `about`, `services`) |
| component | React.ComponentType | Section React component |
| labelKey | string | i18n key for navbar label |

---

### ServiceCard
A dental service offering displayed in the Services grid.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (`implants`, `veneers`, etc.) |
| icon | string | Material Symbols icon name |
| titleKey | string | i18n key for service title |
| benefitKey | string | i18n key for benefit description |

---

### BeforeAfterCase
A treatment comparison case used in the Before/After slider.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique case ID (`case-1`, `case-2`, `case-3`) |
| category | `'aesthetic'` \| `'fillings'` \| `'whitening'` | Filter category |
| categoryKey | string | i18n key for chip label (e.g., `categories.aesthetic`) |
| beforeImage | string | Image path (`/case 1 before.png`) |
| afterImage | string | Image path (`/case 1 after.jpg`) |
| beforeAltKey | string | i18n key for before alt text |
| afterAltKey | string | i18n key for after alt text |

---

### PatientReview
A patient testimonial displayed in the Reviews section.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique review ID (`review-1`, `review-2`, `review-3`) |
| initials | string | Patient initials (e.g., "A.B.") |
| nameKey | string | i18n key for full name |
| rating | number (1–5) | Star rating |
| textKey | string | i18n key for review text |
| date | string | ISO date string (`YYYY-MM-DD`) |

---

### BookingSlot
A selectable appointment slot in the booking form.

| Field | Type | Description |
|-------|------|-------------|
| day | string | Day name key (`saturday`, `sunday`, ..., `thursday`) |
| time | string | Time label (`10:00 AM`, `11:00 AM`, etc.) |
| available | boolean | Whether the slot is selectable (all `true` in Phase 1) |

---

### FAQItem
A question-answer pair for the FAQ accordion and JSON-LD structured data.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique FAQ ID (`faq-1` ... `faq-6`) |
| questionKey | string | i18n key for question text |
| answerKey | string | i18n key for answer text |

---

## Validation Rules

- **Booking form**: `name` is required (min 2 chars). `phone` is required (Egyptian mobile format validation, e.g., `01XXXXXXXX`). `email` is optional but must match email regex if provided.
- **Slider position**: clamped between `0` and `100` percent.
- **Language keys**: every key present in `ar.js` MUST exist in `en.js` and vice versa.

## State Transitions

### Booking Form State Machine
```
idle → validating → success   (on valid submit)
idle → validating → error     (on validation failure)
error → idle                   (on input change)
```

### Language State (LangContext)
```
ar ↔ en   (toggle updates <html dir> and <html lang>)
```

### Theme State (ThemeContext)
```
light ↔ dark   (toggle updates <html class="dark">; persists to localStorage key "theme")
```

### Before/After Slider State
```
position: number (0–100)   updated continuously during drag
dragging: boolean          true while mouse/touch is active
activeCaseId: string       updated when filter chip clicked
```

## Relationships

- `FAQItem` entities populate both the UI accordion AND the `FAQPage` JSON-LD schema in `<head>`.
- `PatientReview` entities populate the Reviews section AND the `AggregateRating` JSON-LD schema.
- `ServiceCard` entities are rendered from a static data array (`src/data/services.js`), not an API.
- `BeforeAfterCase` entities are rendered from a static data array; images are referenced by path string.
- `BookingSlot` entities are generated from static day/time configuration; no dynamic availability in Phase 1.
