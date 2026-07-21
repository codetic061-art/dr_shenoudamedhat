# Research: Static Landing Page — Dr. Shenouda Dental Clinic

## Technology Stack Decisions

### Decision: React 18 + Vite (JavaScript/JSX, no TypeScript)
**Rationale**: The project constitution mandates React 18 with Vite and emphasizes Phase 1 simplicity. TypeScript adds compile-time safety but also build complexity and extra dependencies. For a single-page static landing page with no backend, plain JavaScript with JSX is sufficient and aligns with the "Simplicity & Performance" principle. Translation files MUST remain `.js` per constitution.

**Alternatives considered**: TypeScript + Vite — rejected to keep build config minimal and avoid type overhead on a single-page static site.

---

### Decision: Tailwind CSS + CSS Custom Properties (tokens.css)
**Rationale**: Constitution mandates Tailwind CSS with CSS custom properties for theming. Tailwind's utility-first approach matches the component-based architecture requirement and makes RTL/LTR switching predictable via logical properties. Custom properties enable the light/dark mode toggling without JS style injection.

**Alternatives considered**: CSS Modules + Sass — rejected because Tailwind is explicitly required by the constitution.

---

### Decision: Framer Motion for Animations
**Rationale**: Constitution specifies Framer Motion as the sole animation library. It provides declarative `whileInView` animations needed for scroll-triggered fade-ups, count-up stats, and hover lift effects. Using a single animation library keeps bundle size predictable.

**Alternatives considered**: GSAP, vanilla CSS transitions — rejected because Framer Motion is constitution-mandated and integrates cleanly with React.

---

### Decision: i18n via React Context + Plain JS Translation Files (`i18n/ar.js`, `i18n/en.js`)
**Rationale**: Bilingual support is a core constitutional requirement. React Context avoids adding a dedicated i18n library like react-i18next, keeping bundle size down. JS files allow comments and simple object structures. Identical key structures in both files are enforced.

**Alternatives considered**: react-i18next, react-intl — rejected to avoid extra dependencies; Context is sufficient for two languages on a single page.

---

### Decision: `photos/` Directory Configured as Vite `publicDir`
**Rationale**: The project root contains a `photos/` folder with all required assets (8 images + 1 markdown file). Configuring Vite's `publicDir` to point to `./photos` ensures all assets are served at root path during development and copied as-is to `dist/` during build without import complexity. This avoids moving user files and handles dynamic image references (e.g., before/after slider) cleanly.

**Alternatives considered**: Copying images into `src/assets/` or `public/` — rejected to avoid duplicating the user's existing asset folder and breaking their existing workflow. A manual copy plugin — rejected for unnecessary complexity when `publicDir` solves it natively.

---

### Decision: `about-me.md` Loaded at Runtime via `fetch()` with Fallback
**Rationale**: The spec requires doctor bio text from `photos/about-me.md`. Since `photos/` is configured as Vite's public directory, the file is available at `/about-me.md` in both dev and production. A runtime `fetch()` allows content updates without rebuild, and the edge case requirement explicitly states the UI must gracefully handle missing or empty files. A fallback empty-state message is wired into the component.

**Alternatives considered**: `?raw` import — rejected because it breaks the graceful fallback requirement if the file is missing (build-time import would fail). Build-time MDX compilation — rejected as overkill for a single markdown file that contains only paragraphs.

---

### Decision: Custom Before/After Slider Component (no library)
**Rationale**: The spec requires a draggable comparison slider with mouse and touch support. A custom component using React state for slider position and CSS `clip-path` or `overflow:hidden` width is approximately 50 lines of code and avoids an extra dependency. Framer Motion can optionally animate the slider reset on case switch.

**Alternatives considered**: `react-compare-slider` npm package — rejected to respect the constitution's dependency constraint.

---

### Decision: Liquid Blob Background via CSS Variables + Mouse Event Listeners
**Rationale**: The spec requires a liquid blob background in the About section that follows the cursor. This can be implemented with a `border-radius` morphing CSS animation on a pseudo-element, with its position updated via CSS custom properties (`--blob-x`, `--blob-y`) on `mousemove`. This is performant and requires no canvas or WebGL.

**Alternatives considered**: Canvas 2D draw, WebGL shader — rejected for complexity and no meaningful visual improvement for this use case.

---

### Decision: Booking Form Submits Locally with Inline Success (no network)
**Rationale**: Explicit requirement from both spec (FR-007) and constitution (no backend in Phase 1). Form validation is handled with React state; on valid submission, a local success message is displayed.

**Alternatives considered**: Formspree, Netlify Forms — rejected to stay within Phase 1 scope.

---

### Decision: WhatsApp Link via Environment Variable
**Rationale**: The spec assumes the WhatsApp number is configured before deployment. Vite's `import.meta.env` provides a standard way to inject `.env` values at build time for the static output.

**Alternatives considered**: Hardcoded number — rejected so the repo remains portable and the number is not committed to source control.
