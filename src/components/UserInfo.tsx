// src/components/UserInfo.tsx

import styles from './UserInfo.module.css';
import type { Profile } from '../api/profiles';

interface Props {
  profile: Profile;
}

export default function UserInfo({ profile }: Props) {
  return (
    <div className={styles.profileHeader}>
      <img
        src={profile.avatar?.url || '/placeholder.jpg'}
        alt={profile.avatar?.alt || profile.name}
        className={styles.avatar}
      />

      <div>
        <h3 className={styles.name}>{profile.name}</h3>

        <p className={styles.role}>
          {profile.venueManager ? 'Venue Manager' : 'Customer'}
        </p>
      </div>
    </div>
  );
}
