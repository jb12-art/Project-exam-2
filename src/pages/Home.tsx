// src/pages/Home.tsx

import Layout from '../components/Layout';
import styles from './Home.module.css';

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.header}>Find your destination at Holidaze</h1>

      <div className={styles.grid}></div>
    </Layout>
  );
}
