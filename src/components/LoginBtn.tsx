// src/components/Login.tsx

import { Link } from 'react-router-dom';
import styles from './LoginBtn.module.css';

export default function LoginBtn() {
  return (
    <Link to="/login" className={styles.loginBtn}>
      Login
    </Link>
  );
}
