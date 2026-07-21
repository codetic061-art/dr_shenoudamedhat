import React, { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { validateName, validatePhone, validateEmail } from '../utils/validation';
import { motion, AnimatePresence } from 'framer-motion';

export const BookingSection = () => {
  const { lang, t } = useLang();
  
  // Selection states
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  // Form input states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [prefLang, setPrefLang] = useState(lang);

  // Error/Submission states
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ name: '', phone: '', email: '' });

    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    let newErrors = {};
    if (!isNameValid) {
      newErrors.name = t.booking.errors.name;
    }
    if (!isPhoneValid) {
      newErrors.phone = t.booking.errors.phone;
    }
    if (!isEmailValid) {
      newErrors.email = lang === 'ar' ? 'البريد الإلكتروني غير صالح.' : 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success state trigger
    setIsSubmitted(true);
  };

  return (
    <section
      id="book"
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap scroll-mt-24"
    >
      {/* Heading */}
      <div className="text-center mb-16 flex flex-col items-center gap-3">
        <h2 className="font-display-lg text-headline-xl text-primary font-bold">
          {t.booking.h2}
        </h2>
        <div className="w-10 h-[2px] bg-secondary/35 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Day & Time Selectors */}
        <div className="lg:col-span-6 bg-white dark:bg-[var(--booking-card-bg)] p-6 sm:p-8 rounded-3xl border border-[var(--border-outline-20)] flex flex-col gap-6 text-start">
          
          {/* Day Selector */}
          <div>
            <h3 className="font-headline-lg text-lg font-bold text-primary mb-4">
              {lang === 'ar' ? 'اختر اليوم المناسب:' : 'Select Day:'}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {t.booking.days.map((day, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDayIndex(index)}
                    className={`py-3.5 px-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm scale-102'
                        : 'bg-surface-container/50 dark:bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selector */}
          <div>
            <h3 className="font-headline-lg text-lg font-bold text-primary mb-4">
              {lang === 'ar' ? 'اختر الساعة المناسبة:' : 'Select Time:'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {t.booking.times.map((time, index) => {
                const isSelected = selectedTimeIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedTimeIndex(index)}
                    className={`py-3 px-1 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm scale-102'
                        : 'bg-surface-container/50 dark:bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Appointment Details Form */}
        <div className="lg:col-span-6 bg-white dark:bg-[var(--booking-card-bg)] p-6 sm:p-8 rounded-3xl border border-[var(--border-outline-20)] flex flex-col justify-center text-start">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-full"
              >
                {/* Full Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-name" className="font-body-md text-xs font-bold text-primary">
                    {t.booking.fields.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder={t.booking.fields.name}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`px-4 py-3 rounded-xl border bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm ${
                      errors.name ? 'border-red-500' : 'border-outline-variant'
                    }`}
                  />
                  {errors.name && (
                    <span id="name-error" className="text-xs text-red-500 font-semibold mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-phone" className="font-body-md text-xs font-bold text-primary">
                    {t.booking.fields.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    aria-required="true"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    dir="ltr"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`px-4 py-3 rounded-xl border bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm text-left ${
                      errors.phone ? 'border-red-500' : 'border-outline-variant'
                    }`}
                  />
                  {errors.phone && (
                    <span id="phone-error" className="text-xs text-red-500 font-semibold mt-1">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Email Address Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-email" className="font-body-md text-xs font-bold text-primary">
                    {t.booking.fields.email}
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`px-4 py-3 rounded-xl border bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm border-outline-variant`}
                  />
                  {errors.email && (
                    <span id="email-error" className="text-xs text-red-500 font-semibold mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Notes Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-notes" className="font-body-md text-xs font-bold text-primary">
                    {t.booking.fields.note}
                  </label>
                  <textarea
                    id="booking-notes"
                    rows="2"
                    placeholder={t.booking.fields.note}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
                  />
                </div>

                {/* Language Preference Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-lang" className="font-body-md text-xs font-bold text-primary">
                    {t.booking.fields.lang}
                  </label>
                  <select
                    id="booking-lang"
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-[var(--booking-input-bg)] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option value="ar">العربية (RTL)</option>
                    <option value="en">English (LTR)</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-cta text-sm uppercase py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-102 hover:bg-primary-container transition-all duration-300 font-bold"
                  >
                    <span>{t.booking.submit}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                  </button>
                  <p className="text-[10px] text-on-surface-variant text-center mt-3 font-semibold">
                    {t.booking.confirm}
                  </p>
                </div>
              </motion.form>
            ) : (
              // Success feedback panel
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center p-8 bg-[var(--hero-badge-bg)] rounded-2xl border border-[var(--border-primary-20)]"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary animate-[bounce_1.5s_infinite]">
                  <span className="material-symbols-outlined text-[36px] font-bold">
                    task_alt
                  </span>
                </div>
                <h3 className="font-headline-lg text-xl font-bold text-primary mb-3">
                  {lang === 'ar' ? 'تم استلام طلبك!' : 'Booking Confirmed!'}
                </h3>
                <p className="font-body-md text-sm text-on-surface leading-relaxed max-w-[360px] mb-6">
                  {t.booking.success}
                </p>

                {/* Confirmation Details Card */}
                <div className="bg-white dark:bg-surface-container-high p-5 rounded-2xl border border-[var(--border-outline-20)] text-start w-full max-w-[340px] text-xs flex flex-col gap-3 font-semibold text-on-surface-variant">
                  <p className="flex justify-between">
                    <span>{lang === 'ar' ? 'الاسم:' : 'Name:'}</span>
                    <span className="text-primary font-bold">{name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</span>
                    <span className="text-primary font-bold dir-ltr">{phone}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{lang === 'ar' ? 'اليوم المحجوز:' : 'Selected Day:'}</span>
                    <span className="text-primary font-bold">{t.booking.days[selectedDayIndex]}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{lang === 'ar' ? 'الساعة المحجوزة:' : 'Selected Time:'}</span>
                    <span className="text-primary font-bold">{t.booking.times[selectedTimeIndex]}</span>
                  </p>
                </div>

                {/* Reset form button */}
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setPhone('');
                    setEmail('');
                    setNote('');
                    setIsSubmitted(false);
                  }}
                  className="mt-8 text-xs text-secondary font-bold underline hover:text-primary transition-colors"
                >
                  {lang === 'ar' ? 'احجز موعداً آخر' : 'Book another appointment'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
