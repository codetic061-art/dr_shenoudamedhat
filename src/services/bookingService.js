/**
 * Booking service — localStorage read/write layer for appointment bookings.
 *
 * All operations target the single localStorage key configured in
 * `BOOKING_CONFIG.localStorageKey`. Writes are wrapped in try/catch so a
 * `QuotaExceededError` (private mode, full storage) surfaces as a typed
 * `STORAGE_FULL` error that the UI can present gracefully.
 *
 * @see specs/002-appointment-booking/data-model.md Booking entity
 */
import { BOOKING_CONFIG } from '../config/booking.js';

/**
 * Read all bookings from localStorage. Returns `[]` on any failure
 * (missing key, corrupt JSON, storage unavailable) so callers never crash.
 * @returns {Array<object>}
 */
export function getBookings() {
  try {
    const raw = localStorage.getItem(BOOKING_CONFIG.localStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist a new booking. Throws `new Error('SLOT_TAKEN')` if a booking for the
 * same `slotDate` already exists, or `new Error('STORAGE_FULL')` on a write
 * failure. Returns the saved booking on success.
 * @param {object} booking
 * @returns {object} the saved booking
 */
export function saveBooking(booking) {
  const bookings = getBookings();
  if (bookings.some((b) => b.slotDate === booking.slotDate)) {
    throw new Error('SLOT_TAKEN');
  }
  const updated = [...bookings, booking];
  try {
    localStorage.setItem(BOOKING_CONFIG.localStorageKey, JSON.stringify(updated));
  } catch (err) {
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
      throw new Error('STORAGE_FULL');
    }
    throw new Error('STORAGE_FULL');
  }
  return booking;
}

/**
 * Check whether a slot (by ISO date `YYYY-MM-DD`) already has a booking.
 * @param {string} slotDateISO
 * @returns {boolean}
 */
export function isSlotBooked(slotDateISO) {
  return getBookings().some((b) => b.slotDate === slotDateISO);
}

/**
 * Detect whether localStorage is usable (not disabled by privacy mode or full).
 * Performs a harmless test write/remove. Per research.md §2.
 * @returns {boolean}
 */
export function isLocalStorageAvailable() {
  try {
    const testKey = '__dr_shenouda_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch booked-date strings (YYYY-MM-DD) from an external feed (FR-013).
 * Accepts either a bare array of ISO date strings or `{ bookedDates: string[] }`.
 * On any failure (network, parse, unexpected shape) logs a warning and returns
 * `[]` so the UI degrades to "all slots available" instead of crashing.
 * @param {string} endpoint
 * @returns {Promise<string[]>}
 */
export async function getExternalSlots(endpoint) {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      console.warn(`[bookingService] external feed responded with ${res.status}`);
      return [];
    }
    const body = await res.json();
    if (Array.isArray(body)) {
      return body.filter((x) => typeof x === 'string');
    }
    if (body && Array.isArray(body.bookedDates)) {
      return body.bookedDates.filter((x) => typeof x === 'string');
    }
    console.warn('[bookingService] external feed returned an unexpected shape');
    return [];
  } catch (err) {
    console.warn('[bookingService] failed to fetch external slots:', err);
    return [];
  }
}
