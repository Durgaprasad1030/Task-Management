import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    status: 'pending' 
  });
  
  // New state for UI feedback
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      setFormData({ 
        title: state.title, 
        description: state.description, 
        status: state.status 
      });
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Disable button

    try {
      if (state) {
        await API.put(`/tasks/${state._id}`, formData);
      } else {
        await API.post('/tasks', formData);
      }
      // On success, go back
      navigate('/dashboard');
    } catch (err) {
      // Show the actual error message from backend, or a default one
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
      setLoading(false); // Re-enable button so they can try again
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <h2>{state ? 'Edit Task' : 'Create New Task'}</h2>
        </div>

        {/* --- NEW: Error Message Box --- */}
        {error && (
          <div className="alert-box alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              placeholder="e.g., Review Monthly Budget" 
              value={formData.title} 
              required 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              rows="4"
              placeholder="Enter task details..." 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading} // Disable if saving
              style={{ flex: 1, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Saving...' : (state ? 'Update Task' : 'Create Task')}
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ flex: 1 }} 
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;