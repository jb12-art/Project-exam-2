// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter basename="/Project-exam-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
