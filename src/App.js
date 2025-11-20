import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // Helper function to check if user is logged in
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Returns true if token exists
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* FIX: If user is logged in, redirect Login/Register to Dashboard */}
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />} 
        />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/task/new" element={
          <PrivateRoute>
            <TaskForm />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;