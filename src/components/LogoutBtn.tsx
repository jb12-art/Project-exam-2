// src/components/LogoutBtn.tsx

import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('venueManager');

    navigate('/');
  }

  return <button onClick={handleLogout}>Logout</button>;
}
