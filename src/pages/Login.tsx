// src/pages/Login.tsx

import { useEffect } from 'react';
import styles from './Login.module.css';
import BackToHome from '../components/BackToHome';
import Layout from '../components/Layout';

export default function Login() {
  useEffect(() => {
    document.title = 'Login'; // browser tab text
  });

  return (
    <Layout>
      {/* Back to home btn */}
      <BackToHome />

      <h1 className={styles.header}>Login</h1>

      <form></form>
    </Layout>
  );
}
