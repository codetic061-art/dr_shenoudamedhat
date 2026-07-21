import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { generateSlots } from '../utils/slotGenerator';
import { getBookings, saveBooking, isLocalStorageAvailable, getExternalSlots } from '../services/bookingService';
import { BOOKING_CONFIG } from '../config/booking';
import { ScheduleView } from '../components/booking/ScheduleView';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingSummary } from '../components/booking/BookingSummary';

/**
 * Pure local-time helper: converts a Date to a `YYYY-MM-DD` string without
 * going through UTC (avoids midnight date-shift in some timezones).
 * Use this everywhere a slot date is compared against a stored `booking.slotDate`.
 * @param {Date} d
 * @returns {string}
 */
const toISODate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/**
 * Derive slot availability by cross-referencing generated slots against stored
 * (and optionally external-feed) bookings. Pure function so it can be re-run
 * from mount, handleSubmit, and handleReset alike.
 * @param {Array<object>} rawSlots
 * @param {Array<object>} bookings
 * @param {Array<string>} [externalBookedDates]
 * @returns {Array<object>}
 */
const deriveAvailability = (rawSlots, bookings, externalBookedDates) => {
  const bookedSet = new Set((bookings || []).map((b) => b.slotDate));
  if (externalBookedDates) {
    externalBookedDates.forEach((d) => bookedSet.add(d));
  }
  return rawSlots.map((s) => ({ ...s, isBooked: bookedSet.has(toISODate(s.date)) }));
};

/**
 * BookingPage — orchestrator for the `/book` route.
 * @see specs/002-appointment-booking/contracts/ui-contracts.md BookingPage
 */
export default function BookingPage() {
  const { lang, t } = useLang();

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle | submitting | success | error
  const [lastBooking, setLastBooking] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    document.title = t.booking.pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', t.booking.metaDescription);

    const init = async () => {
      const localStorageOk = isLocalStorageAvailable();
      setStorageOk(localStorageOk);

      const initialBookings = localStorageOk ? getBookings() : [];
      setBookings(initialBookings);

      let externalBookedDates = [];
      if (BOOKING_CONFIG.dataSource === 'externalFeed' && BOOKING_CONFIG.endpoint) {
        externalBookedDates = await getExternalSlots(BOOKING_CONFIG.endpoint);
      }
      // await a resolved Promise for the localStorage path to keep the code
      // path uniform with the external feed branch.
      await Promise.resolve();

      setSlots(deriveAvailability(generateSlots(), initialBookings, externalBookedDates));
    };

    init();
  }, [lang, t]);

  const handleSubmit = async (formData) => {
    if (!selectedSlot) return;

    setBookingStatus('submitting');
    setLastError(null);

    const booking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      slotDate: toISODate(selectedSlot.date),
      slotTime: '16:00',
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail,
      createdAt: new Date().toISOString(),
      lang,
    };

    try {
      // 1. Post event directly to Google Calendar API via our Cloudflare serverless function
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotDate: booking.slotDate,
          patientName: booking.patientName,
          patientPhone: booking.patientPhone,
          patientEmail: booking.patientEmail,
          lang: booking.lang,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || 'BOOKING_FAILED');
      }

      // 2. Save a local backup copy to localStorage
      try {
        saveBooking(booking);
      } catch (err) {
        console.warn('Could not save booking backup to localStorage:', err);
      }

      const newBookings = [...bookings, booking];
      setBookings(newBookings);
      setSlots((prev) =>
        prev.map((s) =>
          toISODate(s.date) === booking.slotDate ? { ...s, isBooked: true } : s
        )
      );
      setSelectedSlot(null); // <-- clears the highlight so the slot visibly becomes "booked"
      setLastBooking(booking);
      setBookingStatus('success');
    } catch (err) {
      console.error('Booking execution failed:', err);
      
      // Attempt to refresh slot availability from server to reflect latest status
      let externalBookedDates = [];
      if (BOOKING_CONFIG.dataSource === 'externalFeed' && BOOKING_CONFIG.endpoint) {
        externalBookedDates = await getExternalSlots(BOOKING_CONFIG.endpoint);
      }
      setSlots(deriveAvailability(generateSlots(), bookings, externalBookedDates));
      
      setLastError(t.booking.slotTakenError);
      setSelectedSlot(null);
      setBookingStatus('error');
    }
  };

  const handleReset = () => {
    const fresh = getBookings();
    setBookings(fresh);
    setSlots(deriveAvailability(generateSlots(), fresh));
    setSelectedSlot(null);
    setLastBooking(null);
    setLastError(null);
    setBookingStatus('idle');
  };

  const allSlotsBooked = slots.length > 0 && slots.every((slot) => slot.isBooked);
  const showForm = bookingStatus === 'idle' || bookingStatus === 'submitting';
  const formDisabled = allSlotsBooked || !storageOk;
  const backArrow = lang === 'ar' ? '→' : '←';

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-container transition-colors"
          aria-label={t.booking.backToHome}
        >
          <span aria-hidden="true">{backArrow}</span>
          <span>{t.booking.backToHome}</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-headline-lg text-headline-xl text-primary font-bold mb-8 text-center">
          {t.booking.pageTitle}
        </h1>

        {!storageOk && (
          <div role="alert" aria-live="assertive" className="mb-6 max-w-md mx-auto rounded-lg bg-error-container text-on-error-container p-4 text-center text-sm font-semibold">
            {t.booking.storageError}
          </div>
        )}

        {showForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <ScheduleView
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
            <div className="bg-white dark:bg-[var(--booking-card-bg)] p-6 sm:p-8 rounded-3xl border border-[var(--border-outline-20)]">
              <BookingForm
                selectedSlot={selectedSlot}
                onSubmit={handleSubmit}
                isSubmitting={bookingStatus === 'submitting'}
                disabled={formDisabled}
              />
            </div>
          </div>
        ) : (
          <BookingSummary
            booking={lastBooking}
            error={lastError}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
