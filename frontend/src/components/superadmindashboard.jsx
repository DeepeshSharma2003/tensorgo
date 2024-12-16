/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanCard from './plancard'; 
import '../components_css/superadmindashboard.css';

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
    <div className="dashboard-container">
      <h2 id="dashboard-title">Super Admin Dashboard</h2>
      <p id="dashboard-welcome">Welcome to the Super Admin Dashboard!</p>

      <div className="buttons-container">
        <button id="add-plan-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Plan'}
        </button>

        <button id="update-plan-button" onClick={() => setShowUpdateForm(!showUpdateForm)}>
          {showUpdateForm ? 'Cancel Update' : 'Update Plan'}
        </button>
      </div>

      {showForm && (
        <form id="add-plan-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="plan_id">Plan ID:</label>
            <input
              type="text"
              name="plan_id"
              value={formData.plan_id}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="plan_id"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="plan_name">Plan Name:</label>
            <input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="plan_name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="min_users">Min Users:</label>
            <input
              type="number"
              name="min_users"
              value={formData.min_users}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="min_users"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="max_users">Max Users:</label>
            <input
              type="number"
              name="max_users"
              value={formData.max_users}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="max_users"
            />
          </div>
          <div className="form-field">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="price"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="trial_days">Trial Days:</label>
            <input
              type="number"
              name="trial_days"
              value={formData.trial_days}
              onChange={(e) => handleInputChange(e, setFormData)}
              id="trial_days"
              required
            />
          </div>
          <button type="submit" id="submit-plan-button">Submit</button>
        </form>
      )}

      {showUpdateForm && (
        <form id="update-plan-form" onSubmit={handleUpdateSubmit}>
          <div className="form-field">
            <label htmlFor="update-plan_id">Plan ID:</label>
            <input
              type="text"
              name="plan_id"
              value={updateData.plan_id}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-plan_id"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="update-plan_name">Plan Name:</label>
            <input
              type="text"
              name="plan_name"
              value={updateData.plan_name}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-plan_name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="update-min_users">Min Users:</label>
            <input
              type="number"
              name="min_users"
              value={updateData.min_users}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-min_users"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="update-max_users">Max Users:</label>
            <input
              type="number"
              name="max_users"
              value={updateData.max_users}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-max_users"
            />
          </div>
          <div className="form-field">
            <label htmlFor="update-price">Price:</label>
            <input
              type="text"
              name="price"
              value={updateData.price}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-price"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="update-trial_days">Trial Days:</label>
            <input
              type="number"
              name="trial_days"
              value={updateData.trial_days}
              onChange={(e) => handleInputChange(e, setUpdateData)}
              id="update-trial_days"
              required
            />
          </div>
          <button type="submit" id="update-submit-button">Submit Update</button>
        </form>
      )}

      <h3 id="plans-title">All Plans</h3>
      {plans.length === 0 ? (
        <p id="no-plans">No plans available.</p>
      ) : (
        <div className="plans-container">
       {plans.map((plan) => (
  <PlanCard
    key={plan.plan_id}
    {...plan}  
    onDelete={handleDelete}
  />
))}

        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
