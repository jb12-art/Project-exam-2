// src/components/RegisterBtn.tsx

import { Link } from 'react-router-dom';
import styles from './RegisterBtn.module.css';

export default function RegisterBtn() {
  return (
    <Link to="/register" className={styles.registerBtn}>
      Register
    </Link>
  );
}
