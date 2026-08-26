// src/pages/venueDetails.tsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Venue } from '../types/venues';
import Layout from '../components/Layout';
import styles from './VenueDetails.module.css';
import BackToHome from '../components/BackToHome';
import type { Booking } from '../types/bookings';
import { fetchBookings } from '../api/bookings';
import BookingCalendar from '../components/BookingCalendar';

export default function VenueDetails() {
  const { id } = useParams(); // get URL id
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    document.title = 'Venue Details'; // browser tab text

    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) return <Layout>Loading...</Layout>;
  if (!venue) return <Layout>Venues not found</Layout>;

  return (
    <Layout>
      {/* <BackToHome /> */}
      <BackToHome />

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
          {/* location */}
          <div className={styles.venueLocation}>
            <p>
              {venue.location.city}, {venue.location.country}
            </p>
            <p>{venue.location.address}</p>
          </div>

          {/* name/title */}
          <p className={styles.title}>{venue.name}</p>

          {/* description */}
          <p className={styles.description}>{venue.description}</p>

          {/* price */}
          <div className={styles.price}>
            <span>€{venue.price}</span>
            <span className={styles.pricePerNight}>/night</span>
          </div>

          {/* max Guests */}
          <p>Max Guests: {venue.maxGuests}</p>

          {/* rating */}
          <p>&#9733;{venue.rating}</p>

          {/* meta */}
          <div className={styles.venueMeta}>
            {venue.meta.wifi && <span>Wifi</span>}
            {venue.meta.parking && <span>Parking</span>}
            {venue.meta.breakfast && <span>Breakfast</span>}
            {venue.meta.pets && <span>Pets</span>}
          </div>

          <BookingCalendar bookings={bookings} />

          {/* created */}
          <p>Created: {new Date(venue.created).toLocaleDateString()}</p>

          {/* updated */}
          <p>Updated: {new Date(venue.updated).toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  );
}
