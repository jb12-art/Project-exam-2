// src/api/profiles.ts

import { getAuthHeaders } from './authHeaders';
import type { Venue } from '../types/venues';

const API_URL = 'https://v2.api.noroff.dev';

export interface Profile {
  name: string;
  email: string;
  bio?: string;
  venueManager: boolean;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
}

export async function fetchProfile(name: string): Promise<Profile> {
  const response = await fetch(`${API_URL}/holidaze/profiles/${name}`, {
    headers: getAuthHeaders(),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to fetch profile');
  }

  return json.data;
}

export async function fetchMyVenues(name: string): Promise<Venue[]> {
  const response = await fetch(`${API_URL}/holidaze/profiles/${name}/venues`, {
    headers: getAuthHeaders(),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to fetch my venues');
  }

  return json.data;
}

export async function updateAvatar(
  name: string,
  avatarUrl: string,
  avatarAlt: string,
): Promise<Profile> {
  const response = await fetch(`${API_URL}/holidaze/profiles/${name}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to update avatar');
  }

  return json.data;
}
