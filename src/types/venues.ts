// src/types/venues.ts

import type { Booking } from './bookings';

export interface VenueOwner {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
}

export interface Venue {
  id: string;
  name: string;
  description: string;

  media: VenueMedia[];

  price: number;
  maxGuests: number;
  rating: number;

  created: string;
  updated: string;

  meta: VenueMeta;

  location: VenueLocation;

  owner?: VenueOwner;

  bookings?: Booking[];
}

export interface VenueMedia {
  url: string;
  alt: string;
}

export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface VenueLocation {
  city: string;
  country: string;
  address: string;
  zip: string;
}
