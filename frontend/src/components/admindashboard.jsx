/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCard from './admincard'; 
import Cart from './cart'; 
import '../components_css/admindashboard.css';

const AdminDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [orgId, setOrgId] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [activePlans, setActivePlans] = useState([]); 
  const [cart, setCart] = useState([]); 

  const loggedInUserEmail = "robert@example.com"; 

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/plans/getall');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/getalluser');
      const users = response.data;

      const user = users.find((u) => u.email === loggedInUserEmail);

      if (user) {
        setLoggedInUser(user);
        setOrgId(user.org_id); 
        fetchActivePlans(user.org_id); 
      } else {
        console.error('Logged-in user not found in the user list.');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchActivePlans = async (orgId) => {
    try {
      const response = await axios.get('http://localhost:3000/subscriptions/getallsub');
      const subscriptions = response.data;

      const activeSubscriptions = subscriptions.filter(
        (sub) => sub.org_id === orgId && sub.is_active
      );

      setActivePlans(activeSubscriptions);
    } catch (error) {
      console.error('Error fetching active plans:', error);
    }
  };

  const fetchSubscriptionById = async (sub_id) => {
    try {
      if (!sub_id) {
        console.error("Subscription ID is undefined");
        return;
      }

      const response = await axios.get(`http://localhost:3000/subscriptions/getsubbyid/${sub_id}`);
      console.log('Subscription fetched:', response.data); 
    } catch (error) {
      console.error("Error fetching subscription by ID:", error);
      throw error;
    }
  };

  const handleCancel = async (sub_id) => {
    try {
      if (!sub_id) {
        console.error("Subscription ID is undefined");
        return;
      }

      const response = await axios.delete(`http://localhost:3000/subscriptions/deletebyid/${sub_id}`);
      if (response.status === 200) {
        alert('Subscription successfully cancelled!');
       
        setActivePlans((prevPlans) => prevPlans.filter((plan) => plan.sub_id !== sub_id));
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      alert('Error cancelling subscription!');
    }
  };

  useEffect(() => {
    fetchPlans(); 
    fetchUserInfo();
  }, []);

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
    const plan = plans.find((p) => p.plan_id === planId);
    setSelectedPlanDetails(plan);
  };

  const handleAddToCart = async () => {
    if (!orgId || !selectedPlanDetails) {
      alert('Organization ID or plan details not found. Please try again.');
      return;
    }
  
    try {
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1);
  
      const subscriptionData = {
        org_id: orgId,
        plan_id: selectedPlanDetails.plan_id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        is_active: true,
        users_allowed: selectedPlanDetails.max_users,
        users_added: 0,
      };
  
      const response = await axios.post('http://localhost:3000/subscriptions/addsub', subscriptionData);
  
      if (response.data.message === 'Subscription created successfully') {
        alert('Subscription successfully created!');
        setSelectedPlanDetails(null); 
  
        setCart((prevCart) => [
          ...prevCart,
          {
            ...response.data.subscription,
            sub_id: response.data.sub_id,
            org_id: orgId || 'N/A', 
            plan_id: selectedPlanDetails?.plan_id || 'N/A', 
            start_date: startDate.toISOString() || 'Invalid Date', 
            end_date: endDate.toISOString() || 'Invalid Date', 
            is_active: true, 
            users_allowed: selectedPlanDetails?.max_users || 'N/A', 
          },
        ]);
  
        const subId = response.data.sub_id; 
        if (subId) {
          fetchSubscriptionById(subId);  
        } else {
          console.error('No sub_id in response:', response.data);
        }
      } else {
        alert('Error creating subscription: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Error adding subscription!');
    }
  };

  const handlePurchase = (subscription) => {
    alert(`You have purchased the subscription for Plan ID: ${subscription.plan_id}`);
  };

  return (
    <div id="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Logged-in User Details</h3>
      {loggedInUser ? (
        <AdminCard title="Logged-in User Details" details={{ Email: loggedInUser.email, 'Organization ID': orgId }} />
      ) : (
        <p>Loading user details...</p>
      )}

      <h3>Existing Plans</h3>
      <div>
        {plans.map((plan) => (
          <AdminCard
            key={plan.plan_id}
            title={plan.plan_name}
            details={{
              'Plan ID': plan.plan_id,
              'Min Users': plan.min_users,
              'Max Users': plan.max_users,
              'Price': plan.price,
              'Trial Days': plan.trial_days,
            }}
          >
            <button className="select-plan-btn" onClick={() => handleSelectPlan(plan.plan_id)}>
              Select Plan
            </button>
          </AdminCard>
        ))}
      </div>

      <h3>Selected Plan will be shown here!</h3>
      <div>
        {activePlans.map((subscription) => (
          <AdminCard
            key={subscription.sub_id}
            title={`Subscription for Plan ID: ${subscription.plan_id}`}
            details={{
              'Subscription ID': subscription.sub_id,
              'Start Date': subscription.start_date,
              'End Date': subscription.end_date,
              'Users Allowed': subscription.users_allowed,
            }}
          >
            <button className="cancel-plan-btn" onClick={() => handleCancel(subscription.sub_id)}>
              Cancel
            </button>
          </AdminCard>
        ))}
      </div>

      {selectedPlanDetails && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h3>Selected Plan Details</h3>
          <p><strong>Plan Name:</strong> {selectedPlanDetails.plan_name}</p>
          <p><strong>Plan ID:</strong> {selectedPlanDetails.plan_id}</p>
          <p><strong>Price:</strong> {selectedPlanDetails.price}</p>
          <p><strong>Min Users:</strong> {selectedPlanDetails.min_users}</p>
          <p><strong>Max Users:</strong> {selectedPlanDetails.max_users}</p>
          <p><strong>Trial Days:</strong> {selectedPlanDetails.trial_days}</p>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}

      <div className="cart-section">
        {/* <h3>Shopping Cart</h3> */}
        <Cart 
          cart={cart} 
          setCart={setCart}
          handlePurchase={handlePurchase} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
