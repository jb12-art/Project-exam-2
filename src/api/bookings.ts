// src/api/bookings.ts

import { getAuthHeaders } from './authHeaders';

export async function createBooking(
  dateFrom: string,
  dateTo: string,
  guests: number,
  venueId: string,
) {
  // convert YYYY-MM-DD to an UTC timestamp
  const dateFromISO = `${dateFrom}T00:00:00.000Z`;
  const dateToISO = `${dateTo}T00:00:00.000Z`;

  const bookingData = {
    dateFrom: dateFromISO,
    dateTo: dateToISO,
    guests,
    venueId,
  };

  const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to create booking');
  }

  return json.data;
}
