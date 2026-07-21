# i18n Contract: Static Landing Page

**Feature**: `001-static-landing-page`
**Generated**: 2026-05-26

This document defines the complete key structure that MUST be present in both `i18n/ar.js` and `i18n/en.js`. Missing keys in either file are a violation of Constitution §II.

---

## Rules

1. Both files MUST export a default object with **identical key structure**
2. Every key present in `ar.js` MUST exist in `en.js` and vice versa
3. Values are always strings or arrays of objects (never nested functions)
4. Hardcoded text in components is forbidden — all user-facing strings go here
5. Keys beginning with `_` are reserved for metadata and are not rendered

---

## Complete Key Schema

```js
// Both ar.js and en.js must implement this exact schema
export default {
  nav: {
    services: String,    // Navigation label for Services section
    about:    String,    // Navigation label for About section
    work:     String,    // Navigation label for Before/After section
    reviews:  String,    // Navigation label for Reviews section
    faq:      String,    // Navigation label for FAQ section
    book:     String,    // CTA button label in Navbar
  },

  hero: {
    badge:   String,     // Top badge pill text (e.g. "⭐ أكثر من 500 مريض سعيد")
    h1:      String,     // Primary h1 heading — MUST contain primary SEO keyword
    sub:     String,     // Subheadline — secondary keywords
    cta1:    String,     // Primary CTA button (filled)
    cta2:    String,     // Secondary CTA button (outlined)
    imgAlt:  String,     // Alt text for hero image (descriptive, SEO keyword-rich)
    stats: {
      years:        String,   // Label under years stat
      patients:     String,   // Label under patients stat
      rating:       String,   // Label under rating stat
      satisfaction: String,   // Label under satisfaction stat
    }
  },

  about: {
    h2:     String,      // Section heading
    sub:    String,      // Section subheading
    imgAlt: String,      // Alt text for doctor portrait photo
    badges: {
      experience:   String,  // Achievement badge 1
      patients:     String,  // Achievement badge 2
      certified:    String,  // Achievement badge 3
    }
  },

  philosophy: {
    quote:     String,   // Large italic serif quote
    name:      String,   // Doctor's name below quote
    specialty: String,   // Doctor's specialty below name
    imgAlt:    String,   // Alt text for circular photo
  },

  services: {
    h2:    String,       // Section heading (SEO keyword)
    sub:   String,       // Section subheading
    items: [             // Array of exactly 7 items
      {
        title:   String, // Service name
        benefit: String, // One-line benefit description
      }
      // × 7
    ]
  },

  beforeafter: {
    h2:     String,      // Section heading
    sub:    String,      // Instruction text (e.g. "drag to compare")
    chips:  String[],    // Array of 4 filter chip labels ["All", "Aesthetic", "Fillings", "Whitening"]
    labels: {
      before: String,    // "Before" overlay label
      after:  String,    // "After" overlay label
    },
    cases: [             // Array of exactly 3 items
      {
        beforeAlt: String,  // Alt text for before image
        afterAlt:  String,  // Alt text for after image
      }
      // × 3
    ]
  },

  reviews: {
    h2:    String,       // Section heading
    items: [             // Array of exactly 3 items
      {
        text: String,    // Review body text
        name: String,    // Patient name/initial (e.g. "أ. محمد")
        date: String,    // Relative date string
      }
      // × 3
    ]
  },

  cta: {
    h2:   String,        // CTA section heading
    sub:  String,        // CTA subtitle
    btn1: String,        // Primary button label (links to #book)
    btn2: String,        // WhatsApp button label
  },

  booking: {
    h2:    String,       // Section heading
    days:  String[],     // Array of 6 day labels (Sat–Thu)
    times: String[],     // Array of 8 time slot labels
    fields: {
      name:  String,     // Name field placeholder/label
      phone: String,     // Phone field placeholder/label
      email: String,     // Email field placeholder/label
      note:  String,     // Notes textarea placeholder/label
      lang:  String,     // Language preference field label
    },
    submit:  String,     // Submit button label
    confirm: String,     // Note below button (e.g. "confirmation via WhatsApp")
    success: String,     // Inline success message after valid submit
    errors: {
      name:  String,     // Inline error for missing name
      phone: String,     // Inline error for missing phone
    }
  },

  faq: {
    h2:    String,       // Section heading
    items: [             // Array of exactly 6 items
      {
        q: String,       // Question text (MUST match JSON-LD in index.html)
        a: String,       // Answer text (MUST match JSON-LD in index.html)
      }
      // × 6
    ]
  },

  footer: {
    tagline:     String,    // One-line specialty tagline
    description: String,    // Short clinic description
    links:       String[],  // Array of 4 quick-link labels
    contact: {
      whatsapp: String,     // "Chat on WhatsApp" label
      address:  String,     // Address placeholder
    },
    copyright: String,      // Copyright line
  },

  whatsapp: {
    tooltip: String,        // Tooltip text on hover
    message: String,        // Pre-filled WhatsApp message text
  }
}
```

---

## Validation Checklist

Run before each `npm run build`:

- [ ] `ar.js` and `en.js` export default objects
- [ ] Key count matches between both files
- [ ] `services.items` has exactly 7 entries in both files
- [ ] `beforeafter.chips` has exactly 4 entries in both files
- [ ] `beforeafter.cases` has exactly 3 entries in both files
- [ ] `reviews.items` has exactly 3 entries in both files
- [ ] `booking.days` has exactly 6 entries in both files
- [ ] `booking.times` has exactly 8 entries in both files
- [ ] `faq.items` has exactly 6 entries in both files — and each q/a MATCHES the JSON-LD in `index.html`
- [ ] All alt text keys (`imgAlt`, `beforeAlt`, `afterAlt`) are non-empty and descriptive
