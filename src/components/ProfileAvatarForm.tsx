// src/components/ProfileAvatarForm.tsx

import { useState } from 'react';
import { updateAvatar } from '../api/profiles';
import type { Profile } from '../api/profiles';

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

      setMessage('Profile picture updated.');
    } catch {
      setMessage('Failed to update profile picture.');
    }
  }

  return (
    <section>
      <h2>Update profile picture</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Image URL
          <input
            type="url"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </label>

        <label>
          Image Description
          <input
            type="text"
            value={avatarAlt}
            onChange={(event) => setAvatarAlt(event.target.value)}
            placeholder="example: My profile picture"
            required
          />
        </label>

        <button type="submit">Update profile picture</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}
