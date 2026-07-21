import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { validateName, validatePhone, validateEmailRequired } from '../../utils/validation';

/**
 * BookingForm — patient info form for a selected slot.
 * @see specs/002-appointment-booking/contracts/ui-contracts.md BookingForm
 * @param {object} props
 * @param {object|null} props.selectedSlot
 * @param {(formData: object) => void} props.onSubmit
 * @param {boolean} props.isSubmitting
 * @param {boolean} props.disabled
 */
export function BookingForm({ selectedSlot, onSubmit, isSubmitting, disabled }) {
  const { t } = useLang();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const validateField = (field, value) => {
    let valid = true;
    if (field === 'name') valid = validateName(value);
    else if (field === 'phone') valid = validatePhone(value);
    else if (field === 'email') valid = validateEmailRequired(value);

    setErrors((prev) => ({
      ...prev,
      [field]: valid ? '' : t.booking[`${field}Error`],
    }));
    return valid;
  };

  const handleBlur = (field) => (e) => validateField(field, e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allValid =
      validateField('name', name) &&
      validateField('phone', phone) &&
      validateField('email', email);
    if (!allValid) return;

    onSubmit({
      patientName: name.trim(),
      patientPhone: phone.trim(),
      patientEmail: email.trim(),
    });
  };

  if (disabled) {
    return <p className="text-center text-on-surface-variant py-8">{t.booking.noSlotsAvailable}</p>;
  }

  const submitDisabled = !selectedSlot || isSubmitting;

  const inputClasses = (hasError) =>
    `px-4 py-3 rounded-xl border bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm ${
      hasError ? 'border-error' : 'border-outline-variant'
    }`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full"
      noValidate
    >
      {selectedSlot && (
        <div className="inline-flex items-center self-start bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 text-xs font-bold gap-2">
          <span className="material-symbols-outlined text-[16px]">event</span>
          <span>{t.booking.selectedSlot}: {selectedSlot.formattedDate} — {selectedSlot.formattedTime}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="booking-page-name" className="font-body-md text-xs font-bold text-primary">
          {t.booking.nameLabel} <span className="text-error">*</span>
        </label>
        <input
          id="booking-page-name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'booking-page-name-error' : undefined}
          placeholder={t.booking.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur('name')}
          className={inputClasses(errors.name)}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.span
              id="booking-page-name-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-error mt-1 font-semibold"
            >
              {errors.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="booking-page-phone" className="font-body-md text-xs font-bold text-primary">
          {t.booking.phoneLabel} <span className="text-error">*</span>
        </label>
        <input
          id="booking-page-phone"
          type="tel"
          dir="ltr"
          autoComplete="tel"
          required
          aria-required="true"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'booking-page-phone-error' : undefined}
          placeholder={t.booking.phonePlaceholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={handleBlur('phone')}
          className={`${inputClasses(errors.phone)} text-left`}
        />
        <AnimatePresence>
          {errors.phone && (
            <motion.span
              id="booking-page-phone-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-error mt-1 font-semibold"
            >
              {errors.phone}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="booking-page-email" className="font-body-md text-xs font-bold text-primary">
          {t.booking.emailLabel} <span className="text-error">*</span>
        </label>
        <input
          id="booking-page-email"
          type="email"
          dir="ltr"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'booking-page-email-error' : undefined}
          placeholder={t.booking.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur('email')}
          className={`${inputClasses(errors.email)} text-left`}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.span
              id="booking-page-email-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-error mt-1 font-semibold"
            >
              {errors.email}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={submitDisabled}
        aria-disabled={submitDisabled}
        className={`w-full bg-primary text-on-primary font-cta text-sm uppercase py-4 rounded-full flex items-center justify-center gap-2 shadow-md transition-all duration-300 font-bold ${
          submitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102 hover:bg-primary-container'
        }`}
      >
        <span>{isSubmitting ? t.booking.submittingButton : t.booking.submitButton}</span>
        <span className={`material-symbols-outlined text-[18px] ${isSubmitting ? 'animate-spin' : ''}`}>
          {isSubmitting ? 'progress_activity' : 'check_circle'}
        </span>
      </button>

      <p className="text-[10px] text-on-surface-variant/80 text-center mt-1">{t.booking.localTimeNote}</p>
    </motion.form>
  );
}

export default BookingForm;
