---
description: "Detailed task list for STATIC LANDING PAGE, Dr. Shenouda Dental Clinic (for precise LLM implementation)"
---

# Tasks: Static Landing Page — Dr. Shenouda Dental Clinic

**Input:** All design docs under `/specs/001-static-landing-page/`

**Prerequisites:** plan.md, spec.md, research.md, data-model.md, contracts/

**Tests:** ACCEPTANCE TESTS steps are described explicitly in each user story phase, but no standalone auto-test files (manual browser tests as per plan/spec are primary).

**Organization:** Tasks are grouped by user story; every task specifies exact file path and needed context, no task left ambiguous. Each phase is an independently verifiable increment.

## Phase 1: Setup (Project Initialization)

**Purpose:** Initialize project structure, install dependencies, and set up all shared config required for any work to begin.

- [x] T001 Create project folder structure as per plan.md (src/, contexts/, hooks/, i18n/, styles/, data/, utils/, photos/) at repo root
- [x] T002 Initialize Node.js project with React 18, Vite, and Tailwind CSS in package.json, as per plan.md
- [x] T003 [P] Copy all image and text assets from user-provided `photos/` directory at repo root as per spec (exact filenames, including spaces)
- [x] T004 [P] Create Tailwind config in tailwind.config.js, CSS tokens in src/styles/tokens.css, entry stylesheet in src/styles/index.css
- [x] T005 [P] Create Vite config vite.config.js with `publicDir` pointing to `./photos`
- [x] T006 [P] Create .env.example file with VITE_WHATSAPP_NUMBER placeholder in repo root
- [x] T007 [P] Create basic .gitignore, .eslintrc, and .prettierrc files as described in quickstart.md
- [x] T008 Install all required npm dependencies: react, react-dom, vite, tailwindcss, framer-motion, postcss
- [x] T009 [P] Write README.md to describe local development workflow, referencing quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose:** Create all context, hooks, and config that every user story depends on. Do not start user story work until complete.

- [x] T010 Create LangContext in src/contexts/LangContext.jsx with state for lang, toggle, and translation loading
- [x] T011 Create ThemeContext in src/contexts/ThemeContext.jsx with state for theme, toggle, and persistence to localStorage
- [x] T012 [P] Create useLang.js in src/hooks/useLang.js: hook returns lang, t, and toggle as per contracts
- [x] T013 [P] Create useTheme.js in src/hooks/useTheme.js: hook returns theme, toggleTheme as per plan
- [x] T014 Create i18n/ar.js and i18n/en.js in src/i18n/ with complete key structure (as in i18n-contract.md)
- [x] T015 [P] Implement static data arrays for all entities in src/data/:
    - src/data/services.js (7 service items)
    - src/data/cases.js (3 before/after cases)
    - src/data/reviews.js (3 reviews)
    - src/data/faq.js (6 FAQs)
- [x] T016 [P] Implement validation utility in src/utils/validation.js for booking form (name, phone, email regex, per data-model.md)
- [x] T017 Add global design tokens to src/styles/tokens.css (color system for light/dark, spacing, typography)
- [x] T018 [P] Create index.html at repo root with all SEO and Open Graph meta tags, referencing SEO contract and exact values from spec (title, description, keywords, OG tags, robots)
- [x] T019 [P] Add JSON-LD Dentist + FAQPage structured data to index.html, per SEO contract
- [x] T020 Create src/App.jsx root component; render sections in required order and wrap in React contexts
- [x] T021 [P] Add basic mobile-first responsive layout to App.jsx using Tailwind utilities
- [x] T022 [P] Create navbar anchor IDs for each section as required in spec/contracts

---

## Phase 3: User Story 1 — Patient Discovers Clinic via Google (Priority: P1) 🎯 MVP

**Goal:** Page loads fast, renders in Arabic, all meta/SEO content present, and hero section builds trust immediately.

**Independent Test:** Load page in browser. Validate manually:
- All SEO tags are present, page validates in Google's Rich Results Test
- Arabic text is first loaded; layout is right-to-left
- Hero section loads full-screen, with image and CTAs in under 3 seconds

### Implementation for User Story 1
- [x] T023 [US1] Create Navbar.jsx in src/components/Navbar.jsx; implement sticky top nav with smooth-scroll links, AR|EN toggle, theme toggle, and booking CTA per UI contract
- [x] T024 [P] [US1] Implement HeroSection.jsx in src/components/HeroSection.jsx; load all text from useLang, use hero image from /photos/hero photo.png, all elements per contract
- [x] T025 [US1] Add SEO meta, OG tags, JSON-LD Dentist/FAQ/Rating scripts to public/index.html per SEO contract
- [x] T026 [P] [US1] Add mobile-first responsive styling for Navbar and HeroSection following Success Criteria SC-002
- [x] T027 [US1] Ensure all AR strings, RTL direction, and layout adapt to language context
- [x] T028 [US1] Add fallback and validation for missing props/state in Navbar and HeroSection

---

## Phase 4: User Story 2 — Patient Browses Services and Reviews (Priority: P1)

**Goal:** User scrolls through page, sees About, Services, Before/After, Reviews, all assets and animations work, and trust is built by content.

**Independent Test:**
- Scroll through each section, verify content, images, interactions. Before/After slider is functional on both mouse/touch.

### Implementation for User Story 2
- [x] T029 [US2] Implement AboutSection.jsx in src/components/AboutSection.jsx with fetch for /photos/about-me.md and animated liquid blob
- [x] T030 [P] [US2] Implement PhilosophySection.jsx in src/components/PhilosophySection.jsx, including circular doctor photo and i18n text
- [x] T031 [P] [US2] Implement ServicesSection.jsx in src/components/ServicesSection.jsx with 7 service cards from data/services.js
- [x] T032 [US2] Implement BeforeAfterSection.jsx in src/components/BeforeAfterSection.jsx with slider logic, filter chips, 3 cases from data/cases.js
- [x] T033 [US2] Implement ReviewsSection.jsx in src/components/ReviewsSection.jsx with 3 review cards from data/reviews.js
- [x] T034 [US2] Add staggered scroll/fade-in animations via Framer Motion to About, Services, Work, Reviews sections
- [x] T035 [P] [US2] Add Alt attribute switching for all images in sections using i18n alt keys
- [x] T036 [US2] Integrate error state/fallback for missing assets or content (e.g., About bio missing)

---

## Phase 5: User Story 3 — Patient Books or WhatsApp (Priority: P1)

**Goal:** Booking form works locally, WhatsApp button links correctly, confirmation appears, no network request made.

**Independent Test:**
- Fill out booking, validate success message appears; click WhatsApp button, verify link opens correct phone/pre-filled text.

### Implementation for User Story 3
- [x] T037 [US3] Implement ConsultationCTASection.jsx in src/components/ConsultationCTASection.jsx with i18n CTAs, required section styles
- [x] T038 [P] [US3] Implement BookingSection.jsx in src/components/BookingSection.jsx with day, time, and all validation/integration fields per data model
- [x] T039 [P] [US3] Implement floating WhatsApp button in src/components/WhatsAppFloat.jsx with animation, tooltip, and correct .env injection
- [x] T040 [US3] Implement all validation UI and inline feedback/messages in BookingSection based on validation.js and i18n keys
- [x] T041 [US3] Add localStorage persistence (if needed) of contact form data

---

## Phase 6: User Story 4 — Language/Theme Toggle (Priority: P2)

**Goal:** Visitors can toggle language/theme; preference persists, UI seamlessly adapts bilingually and for light/dark mode.

**Independent Test:** Change language or theme, reload page, ensure settings persist and all visible elements update accordingly.

### Implementation for User Story 4
- [x] T042 [US4] Ensure AR|EN language toggle in Navbar.jsx updates context, re-renders all text and layout
- [x] T043 [P] [US4] Ensure light/dark theme toggle in Navbar.jsx and App.jsx, context drives theme at all view layers; persisted in localStorage
- [x] T044 [US4] Add automated validation of localStorage values for theme/lang on load in App.jsx
- [x] T045 [US4] Validate all body/heading font stacks, RTL/LTR layout, theme token application in styles/tokens.css

---

## Phase 7: User Story 5 — Patient Reads FAQ (Priority: P2)

**Goal:** FAQ accordion operates smoothly, one item open at a time, SEO markup for FAQ present, i18n for Q/A content is complete.

**Independent Test:**
- Click each FAQ, ensure opens, closes correctly. Check for FAQPage JSON-LD in index.html, verify against i18n.

### Implementation for User Story 5
- [x] T046 [US5] Implement FAQSection.jsx in src/components/FAQSection.jsx with animation, border accent, and single-item-open logic
- [x] T047 [P] [US5] Populate FAQSection with data/faq.js and i18n keys; add JSON-LD sync validation
- [x] T048 [P] [US5] Validate FAQ accordion AR/EN switching, correct alt text, and visual design
- [x] T049 [US5] Add fallback UI for missing FAQ answers, ensure no blank state

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose:** Any items that improve, optimize, or finalize the implementation, spanning all stories.

- [x] T050 [P] Run quickstart.md workflow, verify every section loads, all test scenarios pass (manual)
- [ ] T051 [P] Optimize all images below 200K using lossless compression (PNG/JPG) in photos/
- [ ] T052 [P] Profile bundle size and optimize Vite config for <200ms TTI
- [ ] T053 [P] Run ESLint and Prettier for all code in src/
- [x] T054 [P] Validate contrast ratios for light/dark, Arabic/English, and responsive layouts
- [x] T055 Refactor code for maintainability where needed (per review)
- [x] T056 [P] Document troubleshooting, edge cases, and known limitations in README.md

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Blocks all user stories
- **User Stories (Phase 3+)**: All depend on Foundational
- **Polish (Phase 8)**: Depends on all stories complete

### User Story Dependencies
- **US1–US3 (P1)**: Core features for MVP, can start after Foundational, can be developed in parallel
- **US4–US5 (P2)**: Can start after Foundational; should not block MVP

### Within Each User Story
- Models/data before section components
- Hook/context must precede component work
- Validate implementation per acceptance once each phase is complete

### Parallel Opportunities
- All [P] tasks in Setup, Foundational, Polish
- Within each story, [P] tasks are those creating distinct files/components, no dependencies
- All User Stories can be developed in parallel after Foundational (if staffed)

---

## MVP Scope
- **All of User Stories 1–3** constitute MVP (core conversion funnel: discover, trust, book/contact)
- After MVP: deliver User Stories 4–5 as increment, then Polish

---

## Format Validation
- All tasks use: `- [ ] T### [P?] [US?] Description with file path`
- File paths are explicit; Story labels present on all user story tasks
- No ambiguous or un-assignable work items
- Manual test cases described in each user story section; no auto-test scaffolds by default per project spec

(End of file)
