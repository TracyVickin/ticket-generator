// src/components/Ticket.js
import styled from 'styled-components';

const Ticket = styled.div`
background: #6A6262;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin-top: 20px;
text-align: center;
max-width: 500px; 
margin: 0 auto;    
`;



const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export { Ticket, Avatar };
