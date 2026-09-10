// src/pages/ManagerDashboard.tsx

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import VenueForm from '../components/VenueForm';
import type { Venue } from '../types/venues';
import { fetchMyVenues, fetchProfile, updateAvatar } from '../api/profiles';
import { deleteVenue } from '../api/venues';
import ManagerBookingList from '../components/ManagerBookingList';
import BackToHome from '../components/BackToHome';
import styles from './ManagerDashboard.module.css';
import UserInfo from '../components/UserInfo';
import type { Profile as ProfileType } from '../api/profiles';

export default function ManagerDashboard() {
  const userName = localStorage.getItem('userName');

  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');

  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    document.title = 'Manager Dashboard';
  }, []);

  // refresh the manager venues
  async function refreshVenues() {
    if (!userName) return;

    try {
      const data = await fetchMyVenues(userName);

      setVenues(data);
    } catch (error) {
      console.error(error);
    }
  }

  // get profile
  useEffect(() => {
    async function getProfile() {
      if (!userName) return;

      try {
        const data = await fetchProfile(userName);

        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }

    getProfile();
  }, [userName]);

  // load venues when page opens
  useEffect(() => {
    async function getVenues() {
      if (!userName) return;

      try {
        const data = await fetchMyVenues(userName);

        setVenues(data);
      } catch (error) {
        console.error(error);
      }
    }

    getVenues();
  }, [userName]);

  async function handleDelete(venueId: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this venue?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVenue(venueId);

      setSelectedVenue(null);
      setMessage('Venue deleted.');

      await refreshVenues();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  async function handleAvatarSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userName) return;

    try {
      await updateAvatar(userName, avatarUrl, avatarAlt);

      setMessage('Avatar updated.');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <Layout>
      {/* Back to home btn */}
      <BackToHome />

      {/* logged in user info */}
      {profile && <UserInfo profile={profile} />}

      <h1 className={styles.header}>Venue Manager Dashboard</h1>

      {/* profile section */}
      <section className={styles.sectionProfile}>
        <form className={styles.profileForm} onSubmit={handleAvatarSubmit}>
          <h2>My profile</h2>

          <label htmlFor="avatarUrl">Avatar URL</label>

          <input
            className={styles.inputUrl}
            id="avatarUrl"
            type="url"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            required
          />

          <label htmlFor="avatarAlt">Avatar alt text</label>

          <input
            className={styles.inputAlt}
            id="avatarAlt"
            type="text"
            value={avatarAlt}
            onChange={(event) => setAvatarAlt(event.target.value)}
            required
          />

          <button className={styles.updateAvatarBtn} type="submit">
            Update avatar
          </button>
          {message && <p>{message}</p>}
        </form>
      </section>

      {/* create venue */}
      {/* Rest of the elements are in VenueForm.tsx */}
      <section className={styles.sectionVenue}>
        <VenueForm onSaved={refreshVenues} />
      </section>

      {/* manager venues */}
      <section className={styles.sectionManagerVenues}>
        <h2 className={styles.h2ManagerVenues}>Manager venues</h2>

        {venues.length === 0 && <p>You have no venues yet.</p>}

        {/* show how many venues you have created */}
        <p>Number of venues: {venues.length}</p>

        {venues.map((venue) => (
          // manager venues you have created
          <div className={styles.managerVenue} key={venue.id}>
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
              {/* city/ country */}
              <div className={styles.venueLocation}>
                <p className={styles.cityCountry}>
                  {venue.location.city}, {venue.location.country}
                </p>

                {/* address/ zip */}
                <p className={styles.addressZip}>
                  {venue.location.address}, {venue.location.zip}
                </p>
              </div>

              {/* name */}
              <h3>{venue.name}</h3>

              {/* description */}
              <p>{venue.description}</p>

              {/* price */}
              <p>
                <strong>€{venue.price}</strong>
                /night
              </p>

              {/* maxguests */}
              <p>Max guests {venue.maxGuests}</p>

              {/* rating */}
              <p>{'★'.repeat(venue.rating)}</p>

              {/* meta */}
              <div className={styles.meta}>
                {venue.meta.wifi && <span>Wifi</span>}
                {venue.meta.parking && <span>Parking</span>}
                {venue.meta.breakfast && <span>Breakfast</span>}
                {venue.meta.pets && <span>Pets</span>}
              </div>

              <div className={styles.venueButtons}>
                <button
                  className={styles.editManagerVenueBtn}
                  type="button"
                  onClick={() => setSelectedVenue(venue)}
                >
                  Edit
                </button>

                <button
                  className={styles.deleteManagerVenueBtn}
                  type="button"
                  onClick={() => handleDelete(venue.id)}
                >
                  Delete
                </button>
              </div>

              {/* created/updated */}
              <p className={styles.created}>
                Created: {new Date(venue.created).toLocaleDateString()}
              </p>

              <p className={styles.updated}>
                Updated: {new Date(venue.updated).toLocaleDateString()}
              </p>
            </div>

            {/* booking calendar for your created venue */}
            {/* If no one has booked the venue, text will say: 'No upcoming bookings.' */}
            <ManagerBookingList venueId={venue.id} />

            {/* edit venues */}
            {selectedVenue?.id === venue.id && (
              <VenueForm
                venue={venue}
                onSaved={async () => {
                  setSelectedVenue(null);
                  await refreshVenues();
                }}
              />
            )}
          </div>
        ))}
      </section>
    </Layout>
  );
}
