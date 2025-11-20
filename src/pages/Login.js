import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate, Link } from 'react-router-dom'; // Imported Link

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      
      // Save Data
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);

      navigate('/dashboard');
    } catch (error) {
      alert('Login Failed. Check credentials.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
        </form>

        {/* --- NEW LINK BELOW --- */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#4F46E5', fontWeight: 'bold' }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;