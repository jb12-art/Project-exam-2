// src/api/venues.ts

import type { Booking } from '../types/bookings';
import type { Venue } from '../types/venues';
import { getAuthHeaders } from './authHeaders';

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  const json = await response.json();
  return json.data;
}

export async function fetchVenueBookings(venueId: string): Promise<Booking[]> {
  const response = await fetch(
    `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
    {
      headers: getAuthHeaders(),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || 'Failed to fetch venue bookings',
    );
  }

  return json.data.bookings || [];
}
