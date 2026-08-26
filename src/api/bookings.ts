// src/api/bookings.ts

import type { Booking } from '../types/bookings';
import { getAuthHeaders } from './authHeaders';

export async function fetchBookings(): Promise<Booking[]> {
  const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings`, {
    headers: getAuthHeaders(),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to fetch bookings');
  }

  return json.data;
}

export async function createBooking(
  id: string,
  dateFrom: string,
  dateTo: string,
  guests: number,
) {
  const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateFrom,
      dateTo,
      guests,
      id,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to create bookin');
  }

  return json.data;
}
