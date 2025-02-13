import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConferenceTicketGenerator from './components/conferenceTicketGenerator';
import TicketPage from './components/ticketPage';

const App = () => {
  return (
    <BrowserRouter>  {/* Use BrowserRouter here */}
      <Routes>
        <Route path="/" element={<ConferenceTicketGenerator />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
