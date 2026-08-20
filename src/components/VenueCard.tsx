// src/components/VenueCard.tsx

import { Link } from 'react-router-dom';
import type { Venue } from '../types/venues';
import styles from './VenueCard.module.css';

interface Props {
  venue: Venue;
}

export default function VenueCard({ venue }: Props) {
  return (
    <Link to={`/venue/${venue.id}`} className={styles.card}>
      {/* image */}
      <img
        src={venue.media[0]?.url || '/placeholder.jpg'}
        alt={venue.media[0]?.alt || venue.name}
        className={styles.img}
      />

      {/* location */}
      <div className={styles.venueLocation}>
        {venue.location.country}, {venue.location.city}
      </div>

      {/* name/title */}
      <h3>{venue.name}</h3>

      {/* price */}
      <h3>€{venue.price}</h3>

      {/* meta */}
      <div className={styles.venueMeta}>
        {venue.meta.wifi && <span>Wifi</span>}
        {venue.meta.parking && <span>Parking</span>}
        {venue.meta.breakfast && <span>Breakfast</span>}
        {venue.meta.pets && <span>Pets</span>}
      </div>
    </Link>
  );
}
