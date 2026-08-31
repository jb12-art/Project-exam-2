// src/components/BookingCalendar.tsx

import { useState } from 'react';
import type { Booking } from '../types/bookings';
import { createBooking } from '../api/bookings';
import styles from './BookingCalendar.module.css';

interface Props {
  venueId: string;
  bookings: Booking[];
  onBookingCreated: () => void;
}

export default function BookingCalendar({
  venueId,
  bookings,
  onBookingCreated,
}: Props) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);

  const [message, setMessage] = useState('');

  // current month shown on the calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isVenueManager = localStorage.getItem('venueManager') === 'true';

  if (isVenueManager) {
    return (
      <div>
        <h2>Bookings</h2>
        <p>Venue managers cannot book venues.</p>
      </div>
    );
  }

  // change to previus month
  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }

  // change to next month
  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }

  // convert a date to YYY-MM-DD date string
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // convert an API booking date to YYYY-MM-DD
  function getBookingDate(date: string) {
    return date.slice(0, 10);
  }

  // function used for: hasBookedDate and hasConflict
  function datesOverlap(
    from: string,
    to: string,
    bookingFrom: string,
    bookingTo: string,
  ) {
    return from < bookingTo && to > bookingFrom;
  }

  // check if date is already booked
  function isDateBooked(date: string) {
    return bookings.some((booking) => {
      const bookingFrom = getBookingDate(booking.dateFrom);
      const bookingTo = getBookingDate(booking.dateTo);

      return date >= bookingFrom && date < bookingTo;
    });
  }

  // handle clicking a calendar date
  function handleDateClick(date: string) {
    setMessage('');

    // can't book dates if already booked
    if (isDateBooked(date)) {
      return;
    }

    // if the user clicks the selected start date again, cancel the current selection
    if (date === dateFrom && !dateTo) {
      setDateFrom('');
      setDateTo('');
      return;
    }

    // first click = check-in
    if (!dateFrom || dateTo) {
      setDateFrom(date);
      setDateTo('');
      return;
    }

    // second click = check-out
    if (date > dateFrom) {
      // check if any booked date exists between check-in and chekc-out
      const hasBookedDate = bookings.some((booking) => {
        const bookingFrom = getBookingDate(booking.dateFrom);
        const bookingTo = getBookingDate(booking.dateTo);

        return datesOverlap(dateFrom, date, bookingFrom, bookingTo);
      });

      if (hasBookedDate) {
        setMessage('Your selected dates include a booked date.');
        return;
      }

      setDateTo(date);
    } else {
      // if user clicks a date before the start date, use that date as the new start date
      setDateFrom(date);
      setDateTo('');
    }
  }

  // all days needed for the calendar
  function getCalendarDays() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    // sunday = 0, monday = 1, etc.
    // monday will be the first day.
    const startDay = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];

    // empty spaces before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // actual days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  async function handleBooking() {
    setMessage('');

    if (!dateFrom || !dateTo) {
      setMessage('Please choose a start and end date.');
      return;
    }

    if (dateTo <= dateFrom) {
      setMessage('End date must be after start date.');
      return;
    }

    const hasConflict = bookings.some((booking) => {
      const bookingFrom = getBookingDate(booking.dateFrom);
      const bookingTo = getBookingDate(booking.dateTo);

      return datesOverlap(dateFrom, dateTo, bookingFrom, bookingTo);
    });

    if (hasConflict) {
      setMessage('These dates are already booked.');
      return;
    }

    try {
      await createBooking(dateFrom, dateTo, guests, venueId);

      setMessage('Booking successful!');

      setDateFrom('');
      setDateTo('');
      setGuests(1);
      onBookingCreated();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Booking failed.');
      }
    }
  }

  const calendarDays = getCalendarDays();

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.calendar}>
      <h2>Book this venue</h2>

      {/* calendar header */}
      <div className={styles.calendarHeader}>
        <button type="button" onClick={previousMonth}>
          &larr;
        </button>

        <h3>{monthName}</h3>

        <button type="button" onClick={nextMonth}>
          &rarr;
        </button>
      </div>

      {/* calendar grid */}
      <div className={styles.calendarGrid}>
        {/* weekday names */}
        <div className={styles.weekday}>Mon</div>
        <div className={styles.weekday}>Tue</div>
        <div className={styles.weekday}>Wed</div>
        <div className={styles.weekday}>Thu</div>
        <div className={styles.weekday}>Fri</div>
        <div className={styles.weekday}>Sat</div>
        <div className={styles.weekday}>Sun</div>

        {/* calendar dates */}
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className={styles.emptyDay} />;
          }

          const date = formatDate(day);

          // is this date already booked?
          const booked = isDateBooked(date);

          // is this date in the past?
          const past = date < formatDate(new Date());

          // is this date the selected start date?
          const selectedFrom = date === dateFrom;

          // is this date the selcted end date?
          const selectedTo = date === dateTo;

          // is this date between the start and end date?
          const selectedBetween =
            dateFrom && dateTo && date > dateFrom && date < dateTo;

          let dayClass = styles.availableDay;

          if (past) {
            dayClass = styles.pastDay;
          } else if (booked) {
            dayClass = styles.bookedDay;
          } else if (selectedFrom || selectedTo || selectedBetween) {
            dayClass = styles.selectedDay;
          }

          return (
            <button
              key={date}
              type="button"
              className={dayClass}
              disabled={booked || past}
              onClick={() => handleDateClick(date)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* selected dates */}
      <div className={styles.selectedDates}>
        <p>
          <strong>Check-in:</strong>
          {dateFrom || 'Not selected'}
        </p>

        <p>
          <strong>Check-out:</strong>
          {dateTo || 'Not selected'}
        </p>
      </div>

      {/* guests */}
      <label htmlFor="guests">
        <strong>Guests</strong>
      </label>

      <input
        id="guests"
        type="number"
        min={1}
        value={guests}
        onChange={(event) => setGuests(Number(event.target.value))}
      />

      {/* book venue button */}
      <button
        type="button"
        onClick={handleBooking}
        disabled={!dateFrom || !dateTo}
      >
        Book venue
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
