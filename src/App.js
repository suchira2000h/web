import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CounselorDashboard from './pages/CounselorDashboard';
import BookSession from './pages/BookSession';
import SetAvailability from './pages/SetAvailability';
import ViewCounselors from './pages/ViewCounselors';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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
        <Route
          path="/book-session/:counselorId"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['client']}>
                <BookSession />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-availability"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['counselor']}>
                <SetAvailability />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-counselors"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['client']}>
                <ViewCounselors />
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