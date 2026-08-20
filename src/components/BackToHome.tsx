// src/components/BackToHome.tsx

import { Link } from 'react-router-dom';
import styles from './BackToHome.module.css';

export default function BackToHome() {
  return (
    <Link to="/" className={styles.link}>
      Back to Home
    </Link>
  );
}
