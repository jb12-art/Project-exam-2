// src/components/BookingCalendar.tsx

import type { Booking } from '../types/bookings';

interface Props {
  bookings: Booking[];
}

export default function BookingCalendar({ bookings }: Props) {
  return (
    <div>
      <h3>Booking</h3>

      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>

          <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>

          <p>Guests: {booking.guests}</p>
        </div>
      ))}
    </div>
  );
}
