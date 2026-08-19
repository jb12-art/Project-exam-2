// src/pages/venueDetails.tsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Venue } from '../types/venues';
import Layout from '../components/Layout';
import styles from './VenueDetails.module.css';

export default function VenueDetails() {
  const { id } = useParams(); // get URL id
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Venue Details'; // browser tab text
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((Response) => Response.json())
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Layout>Loading...</Layout>;
  if (!venue) return <Layout>Venues not found</Layout>;

  return (
    <Layout>
      {/* <BackToHome /> */}
      <h1>Venue details</h1>

      {/* page layout */}
      <div className={styles.page}>
        {/* image */}
        <div>
          <img
            src={venue.media[0]?.url || '/placeholder.jpg'}
            alt={venue.media[0]?.alt || venue.name}
            className={styles.img}
          />
        </div>

        {/* content */}
        <div className={styles.content}>
          {/* name/title */}
          <h3 className={styles.title}>{venue.name}</h3>
          {/* description */}
          <p className={styles.description}>{venue.description}</p>
          {/* price */}
          <h3>€{venue.price}</h3>

          {/* max Guests */}
          <h3>Max Guests: {venue.maxGuests}</h3>

          {/* rating */}
          <h3>{venue.rating}</h3>

          {/* created */}
          <h3>Created: {venue.created}</h3>

          {/* updated */}
          <h3>Updated: {venue.updated}</h3>

          {/* meta */}
          <div className={styles.venueMeta}>
            {venue.meta.wifi && <span>Wifi</span>}
            {venue.meta.parking && <span>Parking</span>}
            {venue.meta.breakfast && <span>Breakfast</span>}
            {venue.meta.pets && <span>Pets</span>}
          </div>

          {/* location */}
          <div className={styles.venueLocation}>
            {venue.location.address}
            {venue.location.city}
            {venue.location.zip}
            {venue.location.country}
            {venue.location.continent}
            {venue.location.lat}
            {venue.location.lng}
          </div>
        </div>
      </div>
    </Layout>
  );
}
