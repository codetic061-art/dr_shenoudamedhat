import { getGoogleAccessToken } from './_googleAuth.js';

export async function onRequestGet(context) {
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

    // 1. Get access token
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    // 2. Fetch events from Google Calendar (next 8 weeks)
    const timeMin = new Date();
    // Start from midnight today to capture all slots today
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + 60); // approx 8 weeks

    const params = new URLSearchParams({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      fields: 'items(start)'
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: `Failed to fetch calendar events: ${errText}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // 3. Extract booked date-times (YYYY-MM-DDT[hour]:[minute]) or dates (YYYY-MM-DD)
    const bookedDates = [];
    if (data.items) {
      for (const event of data.items) {
        if (event.start) {
          if (event.start.dateTime) {
            const startStr = event.start.dateTime; // e.g. "2026-07-25T16:00:00+03:00"
            const match = startStr.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
            if (match) {
              const key = match[1]; // "2026-07-25T16:00"
              if (!bookedDates.includes(key)) {
                bookedDates.push(key);
              }
            }
          } else if (event.start.date) {
            const dateOnly = event.start.date; // "2026-07-25"
            if (!bookedDates.includes(dateOnly)) {
              bookedDates.push(dateOnly);
            }
          }
        }
      }
    }

    return new Response(JSON.stringify(bookedDates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60" // cache for 1 minute
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
