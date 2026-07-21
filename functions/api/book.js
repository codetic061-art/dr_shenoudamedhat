import { getGoogleAccessToken } from './_googleAuth.js';

export async function onRequestPost(context) {
  try {
    const clientEmail = context.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = context.env.GOOGLE_PRIVATE_KEY;
    const calendarId = context.env.GOOGLE_CALENDAR_ID || 'primary';

    if (!clientEmail || !privateKey) {
      return new Response(
        JSON.stringify({ error: "Server Configuration Error: Missing Google credentials." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Parse request body
    const body = await context.request.json();
    const { slotDate, patientName, patientPhone, patientEmail, lang } = body;

    if (!slotDate || !patientName || !patientPhone || !patientEmail) {
      return new Response(
        JSON.stringify({ error: "Missing required booking details (date, name, phone, email)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Get access token
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    // 3. Create Google Calendar Event
    // Slot time is always 16:00 (4:00 PM) in Egypt (Africa/Cairo timezone)
    const event = {
      summary: lang === 'ar' 
        ? `حجز موعد أسنان: ${patientName}` 
        : `Dental Booking: ${patientName}`,
      description: `Name: ${patientName}\nPhone: ${patientPhone}\nEmail: ${patientEmail}\nLanguage: ${lang || 'ar'}`,
      start: {
        dateTime: `${slotDate}T16:00:00`,
        timeZone: 'Africa/Cairo'
      },
      end: {
        dateTime: `${slotDate}T17:00:00`,
        timeZone: 'Africa/Cairo'
      },
      reminders: {
        useDefault: true
      }
    };

    // Google Calendar API insert endpoint
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: `Failed to create calendar event: ${errText}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const createdEvent = await response.json();

    return new Response(JSON.stringify({ success: true, eventId: createdEvent.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
