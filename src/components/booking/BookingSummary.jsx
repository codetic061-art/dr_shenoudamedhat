import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../hooks/useLang';

const formatSlotDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

/**
 * BookingSummary — success confirmation or error display after submission.
 * @see specs/002-appointment-booking/contracts/ui-contracts.md BookingSummary
 * @param {object} props
 * @param {object|null} props.booking
 * @param {string|null} props.error
 * @param {() => void} props.onReset
 */
export function BookingSummary({ booking, error, onReset }) {
  const { t } = useLang();

  return (
    <AnimatePresence mode="wait">
      {booking && !error ? (
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <motion.span
            className="material-symbols-outlined text-primary text-5xl mb-4"
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            task_alt
          </motion.span>
          <h3 className="font-headline-lg text-xl font-bold text-primary mb-4">
            {t.booking.confirmationTitle}
          </h3>

          <div className="bg-surface-container rounded-2xl p-6 shadow-sm w-full max-w-sm text-start flex flex-col gap-3 text-sm">
            <p className="flex justify-between gap-4">
              <span className="text-on-surface-variant font-semibold">{t.booking.date}</span>
              <span className="text-primary font-bold">{formatSlotDate(booking.slotDate)}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-on-surface-variant font-semibold">{t.booking.time}</span>
              <span className="text-primary font-bold" dir="ltr">4:00 PM</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-on-surface-variant font-semibold">{t.booking.name}</span>
              <span className="text-primary font-bold">{booking.patientName}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-on-surface-variant font-semibold">{t.booking.phone}</span>
              <span className="text-primary font-bold" dir="ltr">{booking.patientPhone}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-on-surface-variant font-semibold">{t.booking.email}</span>
              <span className="text-primary font-bold" dir="ltr">{booking.patientEmail}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            aria-label={t.booking.bookAnother}
            className="mt-6 bg-secondary text-on-secondary rounded-lg px-6 py-3 font-semibold text-sm"
          >
            {t.booking.bookAnother}
          </button>

          <p className="text-on-surface-variant text-sm mt-3 max-w-xs">{t.booking.cancellationNote}</p>
        </motion.div>
      ) : error ? (
        <motion.div
          key="error"
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <span className="material-symbols-outlined text-error text-5xl mb-4">warning</span>
          <h3 className="font-headline-lg text-xl font-bold text-error mb-4">{t.booking.errorTitle}</h3>
          <div className="bg-error-container text-on-error-container rounded-lg p-4 max-w-sm w-full">
            {error}
          </div>
          <button
            type="button"
            onClick={onReset}
            aria-label={t.booking.tryAgain}
            className="mt-6 bg-primary text-on-primary rounded-lg px-6 py-3 font-semibold text-sm"
          >
            {t.booking.tryAgain}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default BookingSummary;
