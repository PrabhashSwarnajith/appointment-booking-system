import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AvailableSlots from './pages/AvailableSlots';
import BookAppointment from './pages/BookAppointment';
import Home from './pages/Home';
import ViewAppointments from './pages/ViewAppointments';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthService from '../src/services/AuthServise';
import Navbar from './components/Navbar';

function App() {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />} {/* Show Navbar only if logged in */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/available-slots" element={isAuthenticated ? <AvailableSlots /> : <Navigate to="/login" />} />
        <Route path="/book" element={isAuthenticated ? <BookAppointment /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={isAuthenticated ? <ViewAppointments /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
