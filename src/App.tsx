// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
