// src/components/LogoutBtn.tsx

import { useNavigate } from 'react-router-dom';

interface Props {
  onLogout: () => void;
}

export default function LogoutBtn({ onLogout }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('apiKey');
    localStorage.removeItem('userName');
    localStorage.removeItem('venueManager');

    onLogout();

    navigate('/');
  }

  return <button onClick={handleLogout}>Logout</button>;
}
