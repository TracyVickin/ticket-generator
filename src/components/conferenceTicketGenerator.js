import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0D2149;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const ConferenceTicketGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatar: '',
    ticketType: 'Regular',
  });
  const [errors, setErrors] = useState({});
  const [cloudinaryLoaded, setCloudinaryLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.onload = () => setCloudinaryLoaded(true);
    document.head.appendChild(script);
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Valid Email is required';
    }
    if (!formData.avatar) tempErrors.avatar = 'Avatar is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = () => {
    if (cloudinaryLoaded && window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: 'digxuu1px',
          uploadPreset: 'tracy-upload-present',
          sources: ['local', 'url'],
          cropping: true,
          multiple: false,
          maxFileSize: 2000000,
        },
        (error, result) => {
          if (result && result.event === 'success') {
            setFormData({ ...formData, avatar: result.info.secure_url });
          }
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('ticketData', JSON.stringify(formData));
      navigate('/ticket');
    }
  };

  return (
    <Container>
      <Title>Conference Ticketing</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <Error>{errors.fullName}</Error>}

        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Error>{errors.email}</Error>}

        <label>Ticket Type</label>
        <select name="ticketType" value={formData.ticketType} onChange={handleChange}>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
        </select>

        <Button type="button" onClick={handleAvatarUpload}>
          Upload Avatar
        </Button>
        {errors.avatar && <Error>{errors.avatar}</Error>}

        <Button type="submit">Generate Ticket</Button>
      </Form>
    </Container>
  );
};

export default ConferenceTicketGenerator;
