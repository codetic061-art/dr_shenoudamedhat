# Data Model: Appointment Booking

## Entities

### TimeSlot

- `date` (string, ISO 8601 date format `YYYY-MM-DD`) — the date of the appointment
- `time` (string, `HH:mm` 24-hour format) — always `16:00`
- `dayOfWeek` (number, 0-6) — 3 (Wednesday) or 6 (Saturday)
- `status` (enum: `available` | `booked`) — derived at runtime by checking bookings
- `displayDate` (string, `DD/MM/YYYY`) — formatted for UI display

> [!NOTE]
> TimeSlots are generated dynamically at runtime (not stored). The system computes the next 8 weeks of Sat/Wed dates and checks each against stored bookings.

### Booking

- `id` (string, UUID v4 or timestamp-based) — unique booking identifier
- `slotDate` (string, ISO 8601 `YYYY-MM-DD`) — the booked date
- `slotTime` (string, `HH:mm`) — always `16:00`
- `patientName` (string, 2-100 chars) — full name
- `patientPhone` (string, 7-15 chars) — validated phone number
- `patientEmail` (string) — validated email address
- `createdAt` (string, ISO 8601 datetime) — when the booking was created
- `lang` (string, `ar` | `en`) — language at time of booking

### DataSourceConfig

- `type` (enum: `localStorage` | `externalFeed`) — active data source
- `endpoint` (string | null) — URL for external feed (null for localStorage)
- Stored in: `src/config/booking.js` as a simple JS export

## Storage Schema

localStorage key: `dr-shenouda-bookings`

Value: JSON stringified array of Booking objects:

```json
[
  {
    "id": "1720969200000-abc",
    "slotDate": "2026-07-18",
    "slotTime": "16:00",
    "patientName": "أحمد محمد",
    "patientPhone": "01012345678",
    "patientEmail": "ahmed@example.com",
    "createdAt": "2026-07-14T13:00:00.000Z",
    "lang": "ar"
  }
]
```

## Validation Rules

| Field | Rule | Error Message (EN) | Error Message (AR) |
|-------|------|--------------------|--------------------|
| patientName | Required, 2-100 chars, trimmed | Name must be at least 2 characters | الاسم يجب أن يكون حرفين على الأقل |
| patientPhone | Required, digits + optional leading `+`, 7-15 chars | Please enter a valid phone number | الرجاء إدخال رقم هاتف صحيح |
| patientEmail | Required, must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` | Please enter a valid email address | الرجاء إدخال بريد إلكتروني صحيح |
| slotDate | Must be a future Sat or Wed, within next 8 weeks | Selected date is not available | التاريخ المحدد غير متاح |
| Slot availability | slotDate must not exist in bookings array | This slot is already booked | هذا الموعد محجوز بالفعل |

## State Transitions

Slots have no stored state — status is computed:

```
[Page Load] → Generate 8 weeks of Sat/Wed dates
           → Read bookings from localStorage
           → For each generated date:
               if date in bookings → status = 'booked'
               else                → status = 'available'
           → Filter out past dates
           → Render schedule
```

Booking flow:

```
[User selects slot] → status: available → selected (UI only)
[User submits form] → validate inputs
                    → check slot still available in localStorage
                    → if available: create Booking, save to localStorage, optimistic UI update
                    → if taken: show error, refresh schedule
```

## Relationships

- A TimeSlot can have 0 or 1 Booking (capacity = 1)
- A Booking references exactly 1 TimeSlot via `slotDate` + `slotTime`
- Uniqueness constraint: no two Bookings can share the same `slotDate` value
