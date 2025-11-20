import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate, Link } from 'react-router-dom'; // Imported Link

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', formData);
      
      // Save Data (Auto-login logic)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);

      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
        </form>

        {/* --- NEW LINK BELOW --- */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4F46E5', fontWeight: 'bold' }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;