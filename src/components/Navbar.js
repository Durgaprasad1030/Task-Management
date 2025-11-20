// frontend/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detects URL changes
  
  const [user, setUser] = useState({ token: null, role: null, name: null });

  // Run this every time the URL changes (Login -> Dashboard)
  useEffect(() => {
    setUser({
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name')
    });
  }, [location]);

  const handleLogout = () => {
    localStorage.clear(); // Wipes token, role, and name
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">TaskMaster</Link>
      
      <div className="nav-links">
        {user.token ? (
          <>
            {/* Display User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '15px' }}>
              <span style={{ fontWeight: 'bold', color: '#1F2937' }}>{user.name}</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.5px' }}>
                {user.role}
              </span>
            </div>

            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;