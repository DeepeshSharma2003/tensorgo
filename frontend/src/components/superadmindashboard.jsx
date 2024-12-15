/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanCard from './plancard'; 

const SuperAdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    plan_id: '',
    plan_name: '',
    min_users: '',
    max_users: '',
    price: '',
    trial_days: ''
  });
  const [updateData, setUpdateData] = useState({
    plan_id: '',
    plan_name: '',
    min_users: '',
    max_users: '',
    price: '',
    trial_days: ''
  });

  const [plans, setPlans] = useState([]); 

  
  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/plans/getall');
      setPlans(response.data); 
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchPlans(); 
  }, []);

  
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.plan_name || !formData.min_users || !formData.max_users || !formData.price || !formData.trial_days) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/plans/add', formData);
      console.log('Plan created successfully:', response.data);
      alert('Plan created successfully!');
      setShowForm(false);
      setPlans((prevPlans) => [...prevPlans, response.data]);

     
      setFormData({
        plan_id: '',
        plan_name: '',
        min_users: '',
        max_users: '',
        price: '',
        trial_days: ''
      });
    } catch (error) {
      console.error('Error posting plan:', error);
      alert('Error creating the plan. Please try again.');
    }
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!updateData.plan_id || !updateData.plan_name || !updateData.min_users || !updateData.max_users || !updateData.price || !updateData.trial_days) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/plans/update/${updateData.plan_id}`, updateData);
      console.log('Plan updated successfully:', response.data);
      alert('Plan updated successfully!');
      setShowUpdateForm(false);

    
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.plan_id === updateData.plan_id ? { ...plan, ...updateData } : plan
        )
      );

   
      setUpdateData({
        plan_id: '',
        plan_name: '',
        min_users: '',
        max_users: '',
        price: '',
        trial_days: ''
      });
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Error updating the plan. Please try again.');
    }
  };

 
  const handleDelete = async (plan_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/plans/delete/${plan_id}`);
      console.log('Plan deleted successfully:', response.data);
      alert('Plan deleted successfully!');

    
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.plan_id !== plan_id));
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Error deleting the plan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <p>Welcome to the Super Admin Dashboard!</p>

     
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Plan'}
      </button>

   
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? 'Cancel Update' : 'Update Plan'}
      </button>

    
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Plan ID:</label>
            <input
              type="text"
              name="plan_id"
              value={formData.plan_id}
              onChange={(e) => handleInputChange(e, setFormData)}
              required
            />
          </div>
          <div>
            <label>Plan Name:</label>
            <input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={(e) => handleInputChange(e, setFormData)}
              required
            />
          </div>
          <div>
            <label>Min Users:</label>
            <input
              type="number"
              name="min_users"
              value={formData.min_users}
              onChange={(e) => handleInputChange(e, setFormData)}
              required
            />
          </div>
          <div>
            <label>Max Users:</label>
            <input
              type="number"
              name="max_users"
              value={formData.max_users}
              onChange={(e) => handleInputChange(e, setFormData)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) => handleInputChange(e, setFormData)}
              required
            />
          </div>
          <div>
            <label>Trial Days:</label>
            <input
              type="number"
              name="trial_days"
              value={formData.trial_days}
              onChange={(e) => handleInputChange(e, setFormData)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

     
      {showUpdateForm && (
        <form onSubmit={handleUpdateSubmit}>
          <div>
            <label>Plan ID:</label>
            <input
              type="text"
              name="plan_id"
              value={updateData.plan_id}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              required
            />
          </div>
          <div>
            <label>Plan Name:</label>
            <input
              type="text"
              name="plan_name"
              value={updateData.plan_name}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              required
            />
          </div>
          <div>
            <label>Min Users:</label>
            <input
              type="number"
              name="min_users"
              value={updateData.min_users}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              required
            />
          </div>
          <div>
            <label>Max Users:</label>
            <input
              type="number"
              name="max_users"
              value={updateData.max_users}
              onChange={(e) => handleInputChange(e, setUpdateData)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={updateData.price}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              required
            />
          </div>
          <div>
            <label>Trial Days:</label>
            <input
              type="number"
              name="trial_days"
              value={updateData.trial_days}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              required
            />
          </div>
          <button type="submit">Update Plan</button>
        </form>
      )}

    
      <h3>Existing Plans</h3>
      <div className="plans-container">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan.plan_id}
              plan_id={plan.plan_id}
              plan_name={plan.plan_name}
              min_users={plan.min_users}
              max_users={plan.max_users}
              price={plan.price}
              trial_days={plan.trial_days}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No plans available</p>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
