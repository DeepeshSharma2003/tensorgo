/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    org_id: '',
    email: '',
    password: '',
    role: '',
  });

  const [superAdminCount, setSuperAdminCount] = useState(0); // State to hold count of super admins

  // Fetch the current super admin count on mount
  useEffect(() => {
    const fetchSuperAdminCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/getalluser');
        // Count the number of users with org_id 123456789 and role 'super admin'
        const count = response.data.filter(user => user.org_id === 123456789 && user.role === 'super admin').length;
        setSuperAdminCount(count);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchSuperAdminCount();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (formData.role === 'super admin') {
      if (superAdminCount >= 2) {
        alert('Please Login as Admin or User !');
        return;
      }
      formData.org_id = 123456789; 
    }

    try {
      const response = await axios.post('http://localhost:3000/users/adduser', formData);
      alert(`User created successfully! User ID: ${response.data.user_id}`); 
    } catch (error) {
      alert(`Error creating user: ${error.response?.data?.error || error.message}`); 
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        
        {formData.role !== 'super admin' && (
          <div>
            <label>Org ID:</label>
            <input
              type="number"
              name="org_id"
              value={formData.org_id}
              onChange={handleChange}
              required
            />
          </div>
        )}

      
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

       
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="Enter role (user/admin/super admin)"
          />
        </div>

       
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
