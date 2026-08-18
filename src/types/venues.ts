// src/types/venues.ts

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: VenueMedia[];
}

export interface VenueMedia {
  url: string;
  alt: string;
}
