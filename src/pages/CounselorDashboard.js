import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CounselorDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch booked sessions for the counselor
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/sessions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchSessions();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h1>Counselor Dashboard</h1>
      <h3>Booked Sessions</h3>
      {sessions.length > 0 ? (
        <ul className="list-group">
          {sessions.map((session) => (
            <li key={session._id} className="list-group-item">
              <p>Client: {session.client.name}</p>
              <p>Date: {new Date(session.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions booked yet.</p>
      )}
    </div>
  );
};

export default CounselorDashboard;