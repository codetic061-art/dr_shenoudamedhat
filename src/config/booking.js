/**
 * Booking data-source configuration (FR-013).
 *
 * Switching `dataSource` from 'localStorage' to 'externalFeed' and setting
 * `endpoint` to a feed URL swaps the *read* source used by BookingPage to
 * compute slot availability — without touching any component or service
 * consumer. New bookings are ALWAYS written to localStorage regardless of the
 * configured read source (the external feed is treated as read-only).
 *
 * @see specs/002-appointment-booking/data-model.md DataSourceConfig
 */
export const BOOKING_CONFIG = {
  dataSource: 'externalFeed',
  endpoint: '/api/bookings',
  localStorageKey: 'dr-shenouda-bookings',
};
