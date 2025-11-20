import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-tracker-app-backend1-3.onrender.com/api',
});

// Add a request interceptor to add the token to headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;