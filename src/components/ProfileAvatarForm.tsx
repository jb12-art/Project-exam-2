// src/components/ProfileAvatarForm.tsx

import { useState } from 'react';
import { updateAvatar } from '../api/profiles';
import type { Profile } from '../api/profiles';
import styles from './ProfileAvatarForm.module.css';

interface Props {
  profile: Profile;
  onAvatarUpdated: (profile: Profile) => void;
}

export default function ProfileAvatarForm({ profile, onAvatarUpdated }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar?.url || '');
  const [avatarAlt, setAvatarAlt] = useState(profile.avatar?.alt || '');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const updatedProfile = await updateAvatar(
        profile.name,
        avatarUrl,
        avatarAlt,
      );

      onAvatarUpdated(updatedProfile);
    } catch {
      setMessage('Failed to update profile picture.');
    }
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>My profile</h1>

      {/* background div */}
      <div className={styles.backgroundDiv}>
        {message && <p>{message}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <p>You can change your profile picture</p>

          <label>Image URL</label>
          <input
            className={styles.inputUrl}
            type="url"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />

          <label>Image Description</label>
          <input
            className={styles.inputAlt}
            type="text"
            value={avatarAlt}
            onChange={(event) => setAvatarAlt(event.target.value)}
            placeholder="example: My profile picture"
            required
          />

          <button className={styles.profileImgBtn} type="submit">
            Update profile picture
          </button>
        </form>
      </div>
    </section>
  );
}
