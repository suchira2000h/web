import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookSession = ({ counselorId }) => {
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/sessions',
        { counselorId, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Session booked successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to book session.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book a Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Book Session
        </button>
      </form>
    </div>
  );
};

export default BookSession;