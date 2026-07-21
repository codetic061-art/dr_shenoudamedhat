# Feature Specification: Appointment Booking Page

**Feature Branch**: `002-appointment-booking`

**Created**: 2026-07-14

**Status**: Draft

**Input**: User description: "Frontend-only appointment booking page — phone, email, date selection for Saturdays and Wednesdays at 4:00 PM; localStorage persistence; responsive UI with BookingForm, ScheduleView, BookingSummary; extensible to Google Calendar/Excel feeds."

## Clarifications

### Session 2026-07-14

- Q: How should the new appointment booking system relate to the existing BookingSection on the landing page? → A: The new booking system is a separate page/route (`/book`); the existing landing page BookingSection remains as-is and links to the new page.
- Q: Should the booking page support the same bilingual Arabic/English toggle as the landing page? → A: Yes — full bilingual support (Arabic RTL + English LTR), reusing the existing LangContext and i18n system.
- Q: Can a patient cancel or modify their own booking from the booking page? → A: No — bookings are final in the MVP; patients contact the clinic via WhatsApp/phone to cancel.
- Q: How should dates be displayed in the schedule view? → A: Numeric only — language-neutral `DD/MM/YYYY` format in both Arabic and English modes.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Book an Appointment (Priority: P1)

A visitor opens the booking page, sees the next 8 weeks of available time slots (Saturdays and Wednesdays at 4:00 PM local time), selects an open slot, enters their name, phone number, and email, then submits the form. The system validates the inputs, reserves the slot, stores the booking in the browser, and displays a confirmation message.

**Why this priority**: This is the core value proposition — enabling a patient to book a specific appointment without calling the clinic. Everything else extends from this flow.

**Independent Test**: Open the page in a fresh browser, pick any available slot, fill in valid contact details, and submit. The confirmation message appears and the slot becomes disabled in the schedule.

**Acceptance Scenarios**:

1. **Given** the page loads for the first time, **When** the user views the schedule, **Then** all 16 slots (8 weeks × 2 days) for Saturdays and Wednesdays at 4:00 PM are displayed with their availability status.
2. **Given** an available slot is selected, **When** the user fills in a valid name, phone, and email and submits, **Then** the system stores the booking, marks the slot as booked, and shows a confirmation summary with the booking details.
3. **Given** the user submits the form with an invalid phone number or email, **When** validation runs, **Then** inline error messages appear next to the invalid fields and no booking is created.
4. **Given** a slot is already booked, **When** the user views the schedule, **Then** that slot appears visually disabled and cannot be selected.

---

### User Story 2 — Retain Bookings Across Page Reloads (Priority: P1)

A visitor who previously booked an appointment closes the browser, returns later, and sees that all bookings (including their own and any others made in this browser) are still reflected in the schedule and not lost.

**Why this priority**: Without persistence the booking system is useless — every page refresh would reset all data. This is tied to core functionality.

**Independent Test**: Book a slot, reload the page, and confirm the slot still appears as booked and the schedule reflects the stored data.

**Acceptance Scenarios**:

1. **Given** a booking exists in browser storage, **When** the page is reloaded, **Then** the stored bookings are read and the schedule correctly shows those slots as unavailable.
2. **Given** the browser storage is empty, **When** the page loads, **Then** all slots appear as available.

---

### User Story 3 — View Booking Confirmation or Error (Priority: P2)

After submitting a booking attempt, the user sees a clear confirmation panel (date, time, name, phone, email) on success, or a clear error message on failure (e.g., slot was just taken, validation failed).

**Why this priority**: User feedback is essential for trust and usability, but the underlying booking logic must work first.

**Independent Test**: Submit a valid booking and verify the confirmation panel displays the correct details. Then attempt to book an already-taken slot and verify an appropriate error message appears.

**Acceptance Scenarios**:

1. **Given** a booking is successfully created, **When** the confirmation appears, **Then** it displays the booked date, time, patient name, phone, and email.
2. **Given** a slot was taken between the time the user opened the form and submitted, **When** the system checks availability, **Then** an error message informs the user the slot is no longer available and suggests selecting another slot.

---

### User Story 4 — Switch Data Source (Priority: P3)

A clinic administrator or developer can switch the data source from browser-local storage to a read-only external feed (such as a public Google Calendar or Excel/CSV file) by changing a single configuration value, without modifying core booking logic.

**Why this priority**: Extensibility is a future enhancement; the MVP works entirely offline with browser storage. This story ensures the architecture supports it.

**Independent Test**: Change the data source configuration from localStorage to a mock external JSON endpoint, reload the page, and verify the schedule renders slots from the external source.

**Acceptance Scenarios**:

1. **Given** the data source is configured as "localStorage", **When** the page loads, **Then** all availability and booking data is read from and written to browser localStorage.
2. **Given** the data source is configured as an external feed URL, **When** the page loads, **Then** available slots are populated from the external feed and new bookings are stored locally (read-only external source).

---

### Edge Cases

- What happens when the user tries to book a slot for a date that has already passed?
  - Past dates must not appear as bookable in the schedule.
- What happens when localStorage is full or unavailable (private browsing)?
  - The system should gracefully inform the user that bookings cannot be saved and suggest using a regular browser window.
- What happens when the user submits the form multiple times rapidly (double-click)?
  - The submit button must be disabled after the first click until processing completes, preventing duplicate bookings.
- What happens when the browser clock is significantly wrong?
  - The system relies on the user's local clock; a note in the UI states appointment times are based on local device time.
- What happens when all 16 slots are booked?
  - The schedule shows all slots as unavailable and the booking form is disabled with a message stating no appointments are available in the displayed period.
- What happens when a patient wants to cancel or change their booking?
  - The MVP does not support self-service cancellation. The UI displays a note directing the patient to contact the clinic via WhatsApp or phone to cancel or modify.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display available appointment slots for the next 8 weeks, limited to every Saturday and Wednesday at 4:00 PM local time.
- **FR-002**: System MUST allow a maximum of 1 booking per time slot (capacity of 1).
- **FR-003**: System MUST collect the patient's full name, phone number, and email address before creating a booking.
- **FR-004**: System MUST validate phone numbers against a reasonable format (digits, optional country code, 7–15 characters) and display inline errors for invalid input.
- **FR-005**: System MUST validate email addresses against standard format (contains `@` and a domain with at least one `.`) and display inline errors for invalid input.
- **FR-006**: System MUST persist all bookings in browser localStorage so they survive page reloads.
- **FR-007**: System MUST mark booked slots as visually disabled and prevent selection.
- **FR-008**: System MUST display a confirmation summary (date, time, name, phone, email) after a successful booking.
- **FR-009**: System MUST display a clear error message when a booking fails (slot taken, validation error, storage unavailable).
- **FR-010**: System MUST exclude past dates from the available slots display.
- **FR-011**: System MUST prevent double-submission of the booking form (disable submit button during processing).
- **FR-012**: System MUST provide a responsive layout that works on mobile (≥ 320 px), tablet, and desktop viewports.
- **FR-013**: System MUST support swapping the data source via a single configuration value (localStorage vs. external feed URL) without changing component logic.
- **FR-014**: System MUST operate entirely in the browser with no server-side processing or API calls for the MVP data source (localStorage).
- **FR-015**: System MUST use optimistic UI updates — immediately reflect the booking in the schedule upon form submission, before confirming storage success.
- **FR-016**: System MUST support full bilingual operation (Arabic RTL + English LTR) on the booking page, reusing the existing language context and i18n translation files, with all labels, messages, and date formatting localized.
- **FR-017**: System MUST display all dates in the schedule using a language-neutral numeric format (`DD/MM/YYYY`) in both Arabic and English modes.

### Key Entities

- **TimeSlot**: Represents a specific bookable date and time (Saturday or Wednesday at 4:00 PM). Attributes: date, time, availability status (available / booked).
- **Booking**: A confirmed reservation linking a patient to a time slot. Attributes: booking ID, patient name, phone, email, slot date/time, created-at timestamp.
- **DataSource**: The configured origin for slot availability data. Attributes: type (localStorage | externalFeed), endpoint URL (if external).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can complete a booking (view schedule → select slot → fill form → receive confirmation) in under 60 seconds.
- **SC-002**: All booked slots remain visible as unavailable after page reload, with zero data loss across sessions in the same browser.
- **SC-003**: 100% of invalid phone or email submissions are caught before a booking is created, with user-visible inline error messages.
- **SC-004**: The booking page renders correctly and is fully usable on viewports from 320 px to 1920 px wide.
- **SC-005**: Switching the data source configuration from localStorage to an external feed requires changing no more than 1 configuration value and no component code.
- **SC-006**: The schedule displays exactly 16 upcoming slots (8 weeks × 2 days per week) with no past dates shown.

## Assumptions

- The booking page is used by individual patients in their own browser; there is no multi-user concurrency across different browsers or devices (localStorage is per-browser).
- The clinic operates in a single timezone; appointment times are displayed and calculated using the visitor's local device time.
- Phase 1 (MVP) uses localStorage exclusively; integration with Google Calendar or Excel feeds is a documented extension, not a launch requirement.
- The existing project uses React 18, Vite 5, and Tailwind CSS (consistent with the 001 landing page spec). The booking page will share the same technology stack and project structure.
- No authentication is required; any visitor can book any available slot.
- The booking page is a separate route (`/book`) within the existing Vite/React app. The landing page's existing BookingSection remains unchanged and links to `/book` for full appointment scheduling.
- Phone validation accepts international formats (digits, optional `+` prefix, 7–15 characters) without verifying carrier validity.
- No SMS or email confirmation is sent (no backend); the in-browser confirmation summary is the only acknowledgment.
- Booking cancellation and modification are not supported in the MVP. Patients must contact the clinic directly (WhatsApp/phone) to cancel or reschedule.
