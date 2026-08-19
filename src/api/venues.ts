// src/api/venues.ts

import type { Venue } from '../types/venues';

/**
 * Fetches all venues from holidaze API.
 *
 * @returns Array of venues
 * @throws Error if the request fails.
 */

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  const json = await response.json();
  return json.data;
}
