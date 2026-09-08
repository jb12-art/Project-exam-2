// src/pages/Profile.tsx

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProfileAvatarForm from '../components/ProfileAvatarForm';
import CustomerBookings from '../components/CustomerBookings';
import { fetchProfile } from '../api/profiles';
import type { Profile as ProfileType } from '../api/profiles';
import BackToHome from '../components/BackToHome';
import UserInfo from '../components/UserInfo';

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userName = localStorage.getItem('userName');

  useEffect(() => {
    document.title = 'My profile';

    if (!userName) {
      return;
    }

    fetchProfile(userName)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, [userName]);

  function handleAvatarUpdated(updatedProfile: ProfileType) {
    setProfile(updatedProfile);
  }

  if (!userName) {
    return (
      <Layout>
        <p>Please log in.</p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <p>Loading profile...</p>
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

  if (!profile) {
    return null;
  }

  return (
    <Layout>
      {/* Back to home btn */}
      <BackToHome />

      <section>
        {/* logged in user info */}
        <UserInfo profile={profile} />

        <ProfileAvatarForm
          profile={profile}
          onAvatarUpdated={handleAvatarUpdated}
        />

        <CustomerBookings />
      </section>
    </Layout>
  );
}
