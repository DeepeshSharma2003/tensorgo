/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import '../components_css/plancard.css';

const PlanCard = ({ plan_id, plan_name, min_users, max_users, price, trial_days, onDelete }) => {
  return (
    <div className="plan-card">
      <h2 className="plan-name">{plan_name}</h2>
      <p className="plan-id">Plan ID: {plan_id}</p>
      <p className="user-range">Users: {min_users} - {max_users}</p>
      <p className="price">Price: ₹{price}</p>
      <p className="trial">Trial Period: {trial_days} days</p>
      <button className="delete-btn" onClick={() => onDelete(plan_id)}>
        Delete
      </button>
    </div>
  );
};

PlanCard.propTypes = {
  plan_id: PropTypes.number.isRequired,
  plan_name: PropTypes.string.isRequired,
  min_users: PropTypes.number.isRequired,
  max_users: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  trial_days: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlanCard;

