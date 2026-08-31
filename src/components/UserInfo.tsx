// src/components/UserInfo.tsx

import styles from './UserInfo.module.css';

export default function UserInfo() {
  const userName = localStorage.getItem('userName');
  const venueManager = localStorage.getItem('venueManager') === 'true';

  if (!userName) {
    return null;
  }

  return (
    <div className={styles.UserInfo}>
      <strong>{userName}</strong>

      <span className={styles.role}>
        {venueManager ? 'Venue Manager' : 'Customer'}
      </span>
    </div>
  );
}
