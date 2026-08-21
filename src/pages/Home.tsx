// src/pages/Home.tsx

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import { fetchVenues } from '../api/venues';
import type { Venue } from '../types/venues';
import VenueCard from '../components/VenueCard';
import Searchbar from '../components/Searchbar';
import LoginBtn from '../components/LoginBtn';

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]); // React Hook combined with TypeScript
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = 'Home'; // Browser tab text

    fetchVenues()
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load venues');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* login */}
      <LoginBtn />

      {/* header */}
      <h1 className={styles.header}>Find your destination</h1>

      {/* search bar */}
      <Searchbar onSearch={setSearch} />

      <h2>Venues</h2>

      <div className={styles.grid}>
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </Layout>
  );
}
