// src/components/CustomerBookings.tsx

import { useEffect, useState } from 'react';
import { fetchMyBookings } from '../api/profiles';
import type { Booking } from '../types/bookings';
import styles from './CustomerBookings.module.css';

export default function CustomerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (!userName) {
      return;
    }

    fetchMyBookings(userName)
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load bookings.');
        setLoading(false);
      });
  }, [userName]);

  const upcomingBookings = bookings.filter((booking) => {
    return new Date(booking.dateTo) >= new Date();
  });

  if (!userName) {
    return <p>Please log in.</p>;
  }

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.h2UpcomingBookings}>My upcoming bookings</h2>

      {upcomingBookings.length === 0 ? (
        <p>You have no upcoming bookings.</p>
      ) : (
        upcomingBookings.map((booking) => (
          // background div
          <div className={styles.backgroundDiv}>
            <div className={styles.divUpcomingBookings} key={booking.id}>
              <img
                src={booking.venue?.media?.[0]?.url || '/placeholder.jpg'}
                alt={
                  booking.venue?.media?.[0]?.alt ||
                  booking.venue?.name ||
                  'Venue'
                }
                className={styles.venueImage}
              />

              <h3>{booking.venue?.name}</h3>

              <p>
                <strong>From:</strong>{' '}
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>

              <p>
                <strong>To:</strong>{' '}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>

              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
