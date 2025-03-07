import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CounselorDashboard from './pages/CounselorDashboard';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import RoleBasedRoute from './components/RoleBasedRoute'; // Import the RoleBasedRoute component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['client', 'counselor']}>
                <Dashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/counselor-dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['counselor']}>
                <CounselorDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;