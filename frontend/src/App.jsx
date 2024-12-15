/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SuperAdminDashboard from './components/superadmindashboard';
import AdminDashboard from './components/admindashboard';
import UserPage from './components/userpage';
import PlanCard from './components/plancard'; 
import axios from 'axios';

function App() {
  const [plans, setPlans] = useState([]);
  // const userId = 17; 

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

  const addPlan = async (newPlan) => {
    try {
      const response = await axios.post('http://localhost:3000/plans/add', newPlan);
      setPlans((prevPlans) => [...prevPlans, response.data]);
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  const updatePlan = async (updatedPlan) => {
    try {
      const response = await axios.put('http://localhost:3000/plans/update', updatedPlan);
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.plan_id === updatedPlan.plan_id ? updatedPlan : plan))
      );
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const deletePlan = async (planId) => {
    try {
      await axios.delete(`http://localhost:3000/plans/delete/${planId}`);
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.plan_id !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/super-admin-dashboard"
          element={
            <SuperAdminDashboard
              plans={plans}
              addPlan={addPlan}
              updatePlan={updatePlan}
              deletePlan={deletePlan}
              renderPlans={() =>
                plans.map((plan) => (
                  <PlanCard
                    key={plan.plan_id}
                    plan_id={plan.plan_id}
                    plan_name={plan.plan_name}
                    min_users={plan.min_users}
                    max_users={plan.max_users}
                    price={plan.price}
                    trial_days={plan.trial_days}
                  />
                ))
              }
            />
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;


