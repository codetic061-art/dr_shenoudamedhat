# Quickstart — Dr. Shenouda Dental Clinic Landing Page

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start on `http://localhost:5173` (default Vite port).

## Project Structure

```text
src/
├── components/          # Section and shared components
├── contexts/            # LangContext, ThemeContext
├── hooks/               # useLang, useTheme
├── i18n/                # ar.js, en.js translation files
├── styles/              # tokens.css, Tailwind entry
├── data/                # Static data arrays (services, cases, reviews, faq)
├── utils/               # Validation helpers
└── App.jsx              # Root component

photos/                  # Asset folder (configured as Vite publicDir)
```

## Development Workflow

1. **Strings**: Add or modify copy in both `src/i18n/ar.js` and `src/i18n/en.js`. Keep key structures identical.
2. **Styles**: Update `src/styles/tokens.css` for design tokens. Use Tailwind utility classes in components; never hardcode raw colors.
3. **Images**: Place new images in `photos/` (project root). They are served at `/<filename>` in both dev and production because Vite's `publicDir` is set to `./photos`.
4. **About text**: Edit `photos/about-me.md`. The About section fetches this file at runtime and gracefully falls back to an empty state if the file is missing.
5. **Components**: Build each section as a standalone component under `src/components/`. Pull strings from `useLang()` and theme from `useTheme()`.

## Build

```bash
npm run build
```

Static output is written to `dist/`. The `photos/` folder is copied into `dist/` automatically by Vite.

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_WHATSAPP_NUMBER=+20XXXXXXXXXX
```

Access in code via `import.meta.env.VITE_WHATSAPP_NUMBER`.

## Linting & Formatting

```bash
# Run ESLint
npm run lint

# Run Prettier
npm run format
```

(Configure `eslint` and `prettier` in the project if not already present.)
