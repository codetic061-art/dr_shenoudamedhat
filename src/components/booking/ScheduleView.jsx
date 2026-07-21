import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';

/**
 * ScheduleView — responsive grid of clinic slot cards (Sat & Wed at 4:00 PM).
 * @see specs/002-appointment-booking/contracts/ui-contracts.md ScheduleView
 * @param {object} props
 * @param {Array<object>} props.slots
 * @param {object|null} props.selectedSlot
 * @param {(slot: object) => void} props.onSelectSlot
 */
export function ScheduleView({ slots, selectedSlot, onSelectSlot }) {
  const { t } = useLang();

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

  return (
    <section aria-label={t.booking.selectSlotLabel}>
      <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">
        {t.booking.selectSlotLabel}
      </h2>

      <div
        role="radiogroup"
        aria-label={t.booking.selectSlotLabel}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {slots.map((slot, index) => {
          const isSelected = selectedSlot && selectedSlot.id === slot.id;
          const isBooked = slot.isBooked;

          const dayLabel = slot.dayOfWeek === 'saturday' ? t.booking.saturday : t.booking.wednesday;

          const cardClasses = isBooked
            ? 'bg-surface-dim text-on-surface-variant opacity-60 border border-outline-variant/40 cursor-not-allowed pointer-events-none'
            : isSelected
            ? 'bg-primary text-on-primary border border-primary shadow-md scale-[1.02]'
            : 'bg-surface-container-lowest text-on-surface border border-outline-variant';

          return (
            <motion.button
              key={slot.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isBooked}
              aria-label={`${dayLabel} ${slot.formattedDate} ${slot.formattedTime} ${isBooked ? t.booking.booked : t.booking.available}`}
              tabIndex={isBooked ? -1 : 0}
              disabled={isBooked}
              onClick={() => { if (!isBooked) onSelectSlot(slot); }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.6), type: 'spring', stiffness: 300 }}
              whileHover={!isBooked ? { scale: 1.02 } : undefined}
              className={`p-3 sm:p-4 rounded-2xl text-start flex flex-col gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${cardClasses}`}
            >
              <span className="font-headline-lg text-sm font-bold">{dayLabel}</span>
              <span className="text-xs font-semibold">{slot.formattedDate}</span>
              <span className={`text-xs font-semibold ${isBooked ? 'line-through' : ''}`} dir="ltr">{slot.formattedTime}</span>
              {isBooked && (
                <span className="text-[10px] font-bold uppercase mt-1 inline-block self-start bg-on-surface-variant/20 rounded-full px-2 py-0.5">
                  {t.booking.booked}
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
