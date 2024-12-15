/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
       
        if (matchedUser.role === 'super admin') {
          alert('Welcome super admin!');
          navigate('/super-admin-dashboard'); 
        } else if (matchedUser.role === 'admin') {
          alert('Welcome admin!');
          navigate('/admin-dashboard');
        } else {
          alert('Welcome user!');
          navigate('/user-page');
        }
      } else {
        alert('No user exists with this email and password. Please create an account.');
      }
    } catch (error) {
      alert(`Error logging in: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
