---
name: Serene Smile Collective
colors:
  surface: '#f6faff'
  surface-dim: '#ccdcea'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf5ff'
  surface-container: '#e0f0fe'
  surface-container-high: '#daeaf8'
  surface-container-highest: '#d4e5f2'
  on-surface: '#0e1d27'
  on-surface-variant: '#414848'
  inverse-surface: '#23323c'
  inverse-on-surface: '#e4f3ff'
  outline: '#717978'
  outline-variant: '#c0c8c7'
  surface-tint: '#3f6565'
  primary: '#063131'
  on-primary: '#ffffff'
  primary-container: '#214747'
  on-primary-container: '#8eb4b4'
  inverse-primary: '#a6cecd'
  secondary: '#336575'
  on-secondary: '#ffffff'
  secondary-container: '#b8eafe'
  on-secondary-container: '#396b7b'
  tertiary: '#003037'
  on-tertiary: '#ffffff'
  tertiary-container: '#004851'
  on-tertiary-container: '#4ebbcd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c2eae9'
  primary-fixed-dim: '#a6cecd'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#274d4d'
  secondary-fixed: '#b8eafe'
  secondary-fixed-dim: '#9ccee1'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#164d5d'
  tertiary-fixed: '#9cefff'
  tertiary-fixed-dim: '#6cd5e7'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f58'
  background: '#f6faff'
  on-background: '#0e1d27'
  surface-variant: '#d4e5f2'
typography:
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Cormorant Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-xl:
    fontFamily: Cormorant Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-lg:
    fontFamily: Cormorant Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-ar:
    fontFamily: Cairo
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  cta:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is engineered to evoke a sense of clinical excellence fused with high-end hospitality. The brand personality is authoritative yet tranquil, targeting a discerning clientele that values precision and aesthetic refinement. 

The visual style is a sophisticated blend of **Minimalism** and **Glassmorphism**. It leverages expansive whitespace to denote cleanliness and "breathing room," while frosted glass layers provide a modern, high-tech depth that mirrors the transparency of modern dentistry. The interaction of high-contrast serif typography against a cool-toned teal palette creates a distinctive editorial feel, moving away from generic medical aesthetics into a territory of luxury wellness.

## Colors

The palette is anchored in a spectrum of teals, ranging from a deep, commanding Dark Teal for primary actions to a refreshing Light Teal for accents. Dark Slate is reserved for high-impact typography and deep-tone sections to provide visual weight and grounding.

- **Primary (#214747):** Used for main CTAs, active states, and brand-critical iconography.
- **Secondary (#4A7B8C):** Used for hover states and secondary information blocks.
- **Tertiary (#5DC8DA):** Used sparingly for interactive cues and decorative accents.
- **Neutral/Headings (#1C2B35):** The primary color for all text headings to ensure maximum legibility and a premium feel.
- **Surface:** A combination of pure white for main content areas and Light Gray (#F4F6F7) for section backgrounds to create a subtle layered effect.

## Typography

The typography strategy is a bilingual dialogue between classic European serif elegance and modern Arabic geometric precision. 

**Cormorant Garamond** is utilized for all major headlines to establish a literary, high-luxury tone. **DM Sans** provides a highly legible, low-contrast companion for body copy, ensuring clinical information is easily digestible. For the primary Arabic interface, **Cairo** is used to maintain a professional and contemporary aesthetic that matches the weight of the Latin counterparts.

Line heights are generous to prevent visual clutter, and tight letter spacing is applied to display headers to increase their impact.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain a curated, editorial layout, transitioning to a fluid model for mobile devices. 

- **Desktop:** 12-column grid with a 1280px max-width. Margins are intentionally wide (80px) to frame content as if in a premium magazine.
- **Tablet:** 8-column grid with 40px margins.
- **Mobile:** 4-column grid with 20px margins. 

Vertical spacing (Section Gap) is aggressive (120px+) to ensure each service or testimonial feels like a distinct, significant moment in the user journey.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional heavy shadows.

- **Surface Layers:** The base is #FFFFFF. Secondary containers use #F4F6F7 with no borders to create a soft "recessed" look.
- **Glass Effects:** Floating elements (navigation bars, stat cards, language toggles) use a backdrop blur of 20px with a 60% opaque white fill and a 1px border of #FFFFFF (20% opacity).
- **Shadows:** When necessary for functional elevation (e.g., active dropdowns), use a "Clinical Glow"—a very soft, ultra-diffused shadow tinted with the primary teal color (#214747) at 5% opacity.

## Shapes

The shape language is "Sophisticated Softness." We avoid sharp clinical corners in favor of a `rounded-md` (0.5rem) base. 

- **Interactive Elements:** Buttons and input fields use `rounded-lg` (1rem) to feel approachable.
- **Cards:** Major containers and glassmorphic panels use `rounded-xl` (1.5rem).
- **Media:** Images of clinic interiors or dental results should have the same 1.5rem radius to maintain a consistent visual flow.

## Components

### Buttons
- **Primary:** Solid #214747 background, #FFFFFF DM Sans text (uppercase). No shadow, but a slight scale-up (1.02x) on hover.
- **Secondary:** Ghost style with a 1.5px border of #4A7B8C.
- **CTA with Icon:** Use a trailing arrow icon within a circular container for "Book Appointment" actions.

### Cards
- Use the glassmorphism treatment for floating cards.
- Internal padding should be a minimum of 32px to maintain luxury proportions.

### Input Fields
- Underlined style or very soft-filled (#F4F6F7). 
- Use Cairo for Arabic placeholders to ensure the font weight matches the visual importance of the Latin labels.

### Language Toggle
- A pill-shaped glassmorphic floating element in the top corner. 
- The active language should be highlighted with a #214747 circle background.

### Lists
- Use custom iconography (Teal checkmarks or minimalist dental icons) instead of standard bullets.
- Vertical spacing between list items should be 16px.