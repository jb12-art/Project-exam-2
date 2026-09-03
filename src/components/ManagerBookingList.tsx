// src/components/ManagerBookingList.tsx

import { useEffect, useState } from 'react';
import type { Booking } from '../types/bookings';
import { fetchVenueBookings } from '../api/venues';
import styles from './ManagerBookingList.module.css';

interface Props {
  venueId: string;
}

export default function ManagerBookingList({ venueId }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenueBookings(venueId)
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [venueId]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  const today = new Date();

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today,
  );

  if (upcomingBookings.length === 0) {
    return <p>No upcoming bookings.</p>;
  }

  return (
    <div className={styles.bookingsContainer}>
      <h4>Upcoming bookings</h4>

      {upcomingBookings.map((booking) => (
        //  booking calendar for your created venues
        // if no one booked the venue, text say: No upcoming bookings.
        <div className={styles.booking} key={booking.id}>
          <p>
            <strong>From:</strong>
            {''}
            {new Date(booking.dateFrom).toLocaleDateString()}
          </p>

          <p>
            <strong>To:</strong>
            {''}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>

          <p>
            <strong>Guests:</strong>
            {''}
            {booking.guests}
          </p>
        </div>
      ))}
    </div>
  );
}
