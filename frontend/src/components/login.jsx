/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import '../components_css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users/getalluser');
      const users = response.data;

      const matchedUser = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (matchedUser) {
        login(matchedUser); 
        if (matchedUser.role === 'super admin') {
          navigate('/super-admin-dashboard');
        } else if (matchedUser.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-page');
        }
      } else {
        alert('No user exists with this email and password.');
      }
    } catch (error) {
      alert(`Error logging in: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div id="login-container">
      <h2 className="login-heading">Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
