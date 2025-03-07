import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logout from '../components/Logout';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user details
        const userRes = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch sessions
        const sessionsRes = await axios.get('http://localhost:5000/api/sessions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(sessionsRes.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
          <Logout />
        </div>
      )}

      {/* Book Session Button (for clients) */}
      {user && user.role === 'client' && (
        <Link to="/book-session" className="btn btn-primary mt-3">
          Book a Session
        </Link>
      )}

      {/* Display Sessions */}
      <h3 className="mt-4">Your Sessions</h3>
      {sessions.length > 0 ? (
        <ul className="list-group">
          {sessions.map((session) => (
            <li key={session._id} className="list-group-item">
              <p>
                {user.role === 'client' ? 'Counselor' : 'Client'}:{' '}
                {user.role === 'client' ? session.counselor.name : session.client.name}
              </p>
              <p>Date: {new Date(session.date).toLocaleString()}</p>
              <p>Status: {session.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions booked yet.</p>
      )}
    </div>
  );
};

export default Dashboard;