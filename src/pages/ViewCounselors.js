import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewCounselors = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/availability', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailability(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Counselors and Availability</h2>
      {availability.length > 0 ? (
        <ul className="list-group">
          {availability.map((slot) => (
            <li key={slot._id} className="list-group-item">
              <p>Counselor: {slot.counselor.name}</p>
              <p>Date: {new Date(slot.date).toLocaleDateString()}</p>
              <p>Available from: {slot.startTime} to {slot.endTime}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/book-session/${slot.counselor._id}`)}
              >
                Book Session
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No availability found.</p>
      )}
    </div>
  );
};

export default ViewCounselors;