// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Helper to get badge class
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'badge status-completed';
      case 'in-progress': return 'badge status-in-progress';
      default: return 'badge status-pending';
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks?search=${search}&status=${filterStatus}`);
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
     // eslint-disable-next-line
  }, [search, filterStatus]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ marginBottom: '30px' }}>
        <h1>My Tasks</h1>
        <p style={{ color: '#6B7280' }}>Manage your daily goals and projects.</p>
      </div>

      {/* Controls Section */}
      <div className="controls">
        <div className="filters">
          <input 
            placeholder="🔍 Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="btn btn-create" onClick={() => navigate('/task/new')}>+ New Task</button>
      </div>

      {/* Beautiful Table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Details</th>
            <th>Status</th>
            {role === 'admin' && <th>User</th>}
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? tasks.map((task) => (
            <tr key={task._id}>
              <td>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>{task.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>{task.description}</div>
              </td>
              <td>
                <span className={getStatusClass(task.status)}>{task.status}</span>
              </td>
              {role === 'admin' && <td>{task.createdBy?.email}</td>}
              <td style={{ textAlign: 'right' }}>
                <button 
                  onClick={() => navigate('/task/new', { state: task })}
                  style={{ background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', marginRight: '10px', fontWeight: '600' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                No tasks found. Create one to get started!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;