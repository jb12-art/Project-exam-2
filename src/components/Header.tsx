// src/components/Header.tsx

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import LoginBtn from '../components/LoginBtn';
import RegisterBtn from '../components/RegisterBtn';
import LogoutBtn from '../components/LogoutBtn';
import UserInfo from '../components/UserInfo';
import { fetchProfile, type Profile as ProfileType } from '../api/profiles';

export default function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const isManager = localStorage.getItem('venueManager') === 'true';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isProfilePage = location.pathname === '/profile';
  const isManagerPage = location.pathname === '/manager';

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const userName = localStorage.getItem('userName');

    if (!userName) {
      return;
    }

    fetchProfile(userName)
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn]);

  function handleLogout() {
    setIsLoggedIn(false);
    setProfile(null);
  }

  return (
    <header className={styles.header}>
      {/* logo */}
      <h1 className={styles.logo}>Holidaze</h1>

      {/* login/register */}
      <nav className={styles.nav}>
        {/* logged out */}
        {!isLoggedIn && (
          <>
            {!isLoginPage && <LoginBtn />}
            {!isRegisterPage && <RegisterBtn />}
          </>
        )}

        {/* logged in */}
        {isLoggedIn && (
          <>
            {/* manager */}
            {isManager && !isManagerPage && (
              <Link to="/manager" className={styles.link}>
                Manager Dashboard
              </Link>
            )}

            {/* customer */}
            {!isManager && !isProfilePage && (
              <Link to="/profile" className={styles.link}>
                My Profile
              </Link>
            )}

            {/* user avatar/name/title */}
            {profile && <UserInfo profile={profile} />}

            {/* logout */}
            <LogoutBtn onLogout={handleLogout} />
          </>
        )}
      </nav>
    </header>
  );
}
