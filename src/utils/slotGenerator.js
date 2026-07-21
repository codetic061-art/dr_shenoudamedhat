/**
 * Slot generation utility for the booking page.
 *
 * Generates the next 8 weeks of appointment slots on Saturdays (getDay() === 6)
 * and Wednesdays (getDay() === 3) at 4:00 PM local time. Algorithm per
 * research.md §3.
 *
 * @see specs/002-appointment-booking/contracts/ui-contracts.md TimeSlot shape
 */

const pad2 = (n) => String(n).padStart(2, '0');

const formatDateISO = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const formatDisplayDate = (d) => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

const formatTime = (d) => {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${pad2(minutes)} ${meridiem}`;
};

/**
 * Generate upcoming appointment slots for the next 8 weeks.
 *
 * @returns {Array<{id: string, date: Date, dayOfWeek: 'saturday'|'wednesday', formattedDate: string, formattedTime: string, isBooked: boolean}>}
 */
export function generateSlots() {
  const weeks = 8;
  const slots = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (let d = 0; d <= weeks * 7; d++) {
    const candidateDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + d);
    const dow = candidateDay.getDay();

    if (dow !== 3 && dow !== 6) continue;

    // Generate hourly slots from 4:00 PM (16:00) to 10:00 PM (22:00) inclusive
    for (let h = 16; h <= 22; h++) {
      const candidate = new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), h, 0, 0, 0);

      // Skip any slot whose full datetime is already in the past
      if (candidate.getTime() <= now.getTime()) continue;

      slots.push({
        id: candidate.toISOString(),
        date: candidate,
        dayOfWeek: dow === 6 ? 'saturday' : 'wednesday',
        formattedDate: formatDisplayDate(candidate),
        formattedTime: formatTime(candidate),
        isBooked: false,
      });
    }
  }

  slots.sort((a, b) => a.date.getTime() - b.date.getTime());
  return slots;
}
