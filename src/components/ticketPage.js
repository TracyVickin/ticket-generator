import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0D2149;
`;

const Ticket = styled.div`
  background-color: #6A6262;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: center;
  color: white;
`;

const TicketPage = () => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const savedTicket = localStorage.getItem('ticketData');
    if (savedTicket) setTicket(JSON.parse(savedTicket));
  }, []);

  return (
    <Container>
      {ticket ? (
        <Ticket>
          <h2>{ticket.ticketType} Ticket</h2>
          <img src={ticket.avatar} alt="User Avatar" />
          <h3>{ticket.fullName}</h3>
          <p>{ticket.email}</p>
        </Ticket>
      ) : (
        <p>No ticket data available.</p>
      )}
    </Container>
  );
};

export default TicketPage;
    