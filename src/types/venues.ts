// src/types/venues.ts

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: VenueMedia[];
  price: 0;
  maxGuests: 0;
  rating: 0;
  created: string;
  updated: string;
  meta: {
    wifi: true;
    parking: true;
    breakfast: true;
    pets: true;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: 0;
    lng: 0;
  };
}

export interface VenueMedia {
  url: string;
  alt: string;
}
