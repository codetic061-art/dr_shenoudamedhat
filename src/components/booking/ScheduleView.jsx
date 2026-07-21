import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';

const toISODate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/**
 * ScheduleView — splits slot selection into Select Date -> Select Time.
 * @param {object} props
 * @param {Array<object>} props.slots
 * @param {object|null} props.selectedSlot
 * @param {(slot: object) => void} props.onSelectSlot
 */
export function ScheduleView({ slots, selectedSlot, onSelectSlot }) {
  const { lang, t } = useLang();
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  if (!slots || slots.length === 0) {
    return (
      <section aria-label={t.booking.selectSlotLabel}>
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">
          {t.booking.selectSlotLabel}
        </h2>
        <p className="text-center text-on-surface-variant py-12">{t.booking.noSlotsAvailable}</p>
      </section>
    );
  }

  // Group slots by date string YYYY-MM-DD
  const dateGroups = [];
  const dateMap = new Map();

  slots.forEach((slot) => {
    const dateStr = toISODate(slot.date);
    if (!dateMap.has(dateStr)) {
      dateMap.set(dateStr, []);
      dateGroups.push({
        dateStr,
        date: slot.date,
        dayOfWeek: slot.dayOfWeek,
        formattedDate: slot.formattedDate,
        slots: dateMap.get(dateStr)
      });
    }
    dateMap.get(dateStr).push(slot);
  });

  // If a slot is selected, ensure the corresponding date is selected
  if (selectedSlot && !selectedDateStr) {
    setSelectedDateStr(toISODate(selectedSlot.date));
  }

  const selectDateLabel = lang === 'ar' ? 'اختر تاريخ الموعد:' : 'Select appointment date:';
  const selectTimeLabel = lang === 'ar' ? 'اختر الساعة المناسبة:' : 'Select preferred time:';
  const backLabel = lang === 'ar' ? '← العودة للتواريخ' : '← Back to dates';

  if (!selectedDateStr) {
    // Step 1: Render unique dates
    return (
      <section aria-label={selectDateLabel}>
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">
          {selectDateLabel}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {dateGroups.map((group, index) => {
            const allBooked = group.slots.every((s) => s.isBooked);
            const dayLabel = group.dayOfWeek === 'saturday' ? t.booking.saturday : t.booking.wednesday;

            const cardClasses = allBooked
              ? 'bg-surface-dim text-on-surface-variant opacity-60 border border-outline-variant/40 cursor-not-allowed pointer-events-none'
              : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:border-primary';

            return (
              <motion.button
                key={group.dateStr}
                type="button"
                aria-disabled={allBooked}
                disabled={allBooked}
                onClick={() => setSelectedDateStr(group.dateStr)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.4), type: 'spring', stiffness: 300 }}
                whileHover={!allBooked ? { scale: 1.02 } : undefined}
                className={`p-4 rounded-2xl text-start flex flex-col gap-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${cardClasses}`}
              >
                <span className="font-headline-lg text-sm font-bold text-primary">{dayLabel}</span>
                <span className="text-xs font-semibold text-on-surface-variant">{group.formattedDate}</span>
                {allBooked ? (
                  <span className="text-[10px] font-bold uppercase mt-1 inline-block self-start bg-red-500/10 text-red-500 rounded-full px-2 py-0.5">
                    {t.booking.booked}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase mt-1 inline-block self-start bg-green-500/10 text-green-500 rounded-full px-2 py-0.5">
                    {lang === 'ar' ? 'متاح' : 'Available'}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>
    );
  }

  // Step 2: Render hours for the selected date
  const selectedGroup = dateGroups.find((g) => g.dateStr === selectedDateStr);
  const selectedDayLabel = selectedGroup.dayOfWeek === 'saturday' ? t.booking.saturday : t.booking.wednesday;

  return (
    <section aria-label={selectTimeLabel}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => {
            setSelectedDateStr(null);
            onSelectSlot(null);
          }}
          className="text-xs font-bold text-secondary hover:text-primary transition-colors focus:outline-none"
        >
          {backLabel}
        </button>
      </div>

      <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-2">
        {selectedDayLabel} {selectedGroup.formattedDate}
      </h2>
      <p className="text-xs text-on-surface-variant mb-6">{selectTimeLabel}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {selectedGroup.slots.map((slot, index) => {
          const isSelected = selectedSlot && selectedSlot.id === slot.id;
          const isBooked = slot.isBooked;

          const cardClasses = isBooked
            ? 'bg-surface-dim text-on-surface-variant opacity-60 border border-outline-variant/40 cursor-not-allowed pointer-events-none'
            : isSelected
            ? 'bg-primary text-on-primary border border-primary shadow-md scale-[1.02]'
            : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:border-primary';

          return (
            <motion.button
              key={slot.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isBooked}
              aria-label={`${slot.formattedTime} ${isBooked ? t.booking.booked : t.booking.available}`}
              tabIndex={isBooked ? -1 : 0}
              disabled={isBooked}
              onClick={() => { if (!isBooked) onSelectSlot(slot); }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.4), type: 'spring', stiffness: 300 }}
              whileHover={!isBooked ? { scale: 1.02 } : undefined}
              className={`p-3 rounded-2xl text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${cardClasses}`}
            >
              <span className={`text-sm font-bold ${isBooked ? 'line-through' : ''}`} dir="ltr">
                {slot.formattedTime}
              </span>
              {isBooked ? (
                <span className="text-[9px] font-bold bg-on-surface-variant/20 rounded-full px-2 py-0.5">
                  {t.booking.booked}
                </span>
              ) : (
                <span className="text-[9px] font-bold bg-primary/10 text-primary rounded-full px-2 py-0.5">
                  {lang === 'ar' ? 'متاح' : 'Available'}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default ScheduleView;
