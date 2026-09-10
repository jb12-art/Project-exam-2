// src/pages/venueDetails.tsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Venue } from '../types/venues';
import Layout from '../components/Layout';
import styles from './VenueDetails.module.css';
import BackToHome from '../components/BackToHome';
import type { Booking } from '../types/bookings';
import { fetchVenueBookings } from '../api/venues';
import BookingCalendar from '../components/BookingCalendar';
import { fetchProfile } from '../api/profiles';
import type { Profile as ProfileType } from '../api/profiles';
import UserInfo from '../components/UserInfo';

export default function VenueDetails() {
  const { id } = useParams(); // get URL id
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    document.title = 'Venue Details'; // browser tab text

    // get the venue
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
      });
  }, [id]);

  // get bookings for this venue
  useEffect(() => {
    if (!id) return;

    fetchVenueBookings(id)
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // get customer img, name, role
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const userName = localStorage.getItem('userName');

    if (!userName) {
      return;
    }

    fetchProfile(userName)
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn]);

  // get the latest bookings after a new booking
  async function refreshBookings() {
    if (!id) return;

    try {
      const data = await fetchVenueBookings(id);
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <Layout>Loading...</Layout>;
  if (!venue) return <Layout>Venues not found</Layout>;

  return (
    <Layout>
      {/* <BackToHome /> */}
      <BackToHome />

      {/* logged in user info */}
      {isLoggedIn && profile && <UserInfo profile={profile} />}

      <h1 className={styles.h1}>Venue details</h1>

      {/* background Div */}
      <div className={styles.backgroundDiv}>
        {/* page layout */}
        <div className={styles.page}>
          {/* image */}
          <div className={styles.imgWrapper}>
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
              <p className={styles.cityCountry}>
                {venue.location.city}, {venue.location.country}
              </p>
              <p className={styles.addressZip}>
                {venue.location.address}, {venue.location.zip}
              </p>
            </div>

            {/* name/title */}
            <h3 className={styles.title}>{venue.name}</h3>

            {/* description */}
            <p className={styles.description}>{venue.description}</p>

            {/* price */}
            <p>
              <strong>€{venue.price}</strong>/night
            </p>

            {/* max Guests */}
            <p>Max Guests {venue.maxGuests}</p>

            {/* rating */}
            <p>{'★'.repeat(venue.rating)}</p>

            {/* meta */}
            <div className={styles.venueMeta}>
              {venue.meta.wifi && <span>Wifi</span>}
              {venue.meta.parking && <span>Parking</span>}
              {venue.meta.breakfast && <span>Breakfast</span>}
              {venue.meta.pets && <span>Pets</span>}
            </div>

            {/* booking calendar */}
            <BookingCalendar
              venueId={venue.id}
              bookings={bookings}
              onBookingCreated={refreshBookings}
            />

            {/* created */}
            <p className={styles.created}>
              Created: {new Date(venue.created).toLocaleDateString()}
            </p>

            {/* updated */}
            <p className={styles.updated}>
              Updated: {new Date(venue.updated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
