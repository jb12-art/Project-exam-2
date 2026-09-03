// src/api/venues.ts

import type { Booking } from '../types/bookings';
import type { Venue } from '../types/venues';
import { getAuthHeaders } from './authHeaders';

const API_URL = 'https://v2.api.noroff.dev';

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(
    `${API_URL}/holidaze/venues?sort=created&sortOrder=desc&limit=100`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  const json = await response.json();
  return json.data;
}

export async function fetchVenueBookings(venueId: string): Promise<Booking[]> {
  const response = await fetch(
    `${API_URL}/holidaze/venues/${venueId}?_bookings=true`,
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

export async function createVenue(
  venue: Omit<Venue, 'id' | 'created' | 'updated'>,
): Promise<Venue> {
  const response = await fetch(`${API_URL}/holidaze/venues`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(venue),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to create venue');
  }

  return json.data;
}

export async function updateVenue(
  venueId: string,
  venue: Partial<Venue>,
): Promise<Venue> {
  const response = await fetch(`${API_URL}/holidaze/venues/${venueId}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(venue),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to update venue');
  }

  return json.data;
}

export async function deleteVenue(venueId: string) {
  const response = await fetch(`${API_URL}/holidaze/venues/${venueId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const json = await response.json();

    throw new Error(json.errors?.[0]?.message || 'Failed to delete venue');
  }
}
