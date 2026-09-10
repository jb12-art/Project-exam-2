// src/components/LogoutBtn.tsx

import { useNavigate } from 'react-router-dom';
import styles from './LogoutBtn.module.css';

interface Props {
  onLogout: () => void;
}

export default function LogoutBtn({ onLogout }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (!confirmed) {
      return;
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('apiKey');
    localStorage.removeItem('userName');
    localStorage.removeItem('venueManager');

    onLogout();

    navigate('/');
  }

  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      Logout
    </button>
  );
}
