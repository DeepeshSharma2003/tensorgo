/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import '../components_css/admincard.css';

const AdminCard = ({ title, details, children }) => {
  return (
    <div className="admin-card" style={styles.card}>
      <h4>{title}</h4>
      <div className="details" style={styles.details}>
        {Object.keys(details).map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {details[key]}
          </p>
        ))}
      </div>
      
      <div className="children" style={styles.children}>
        {children}
      </div>
    </div>
  );
};

AdminCard.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    marginTop: '30px', // Added margin-top for spacing
    width: '320px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    textAlign: 'center', // Center content inside the card
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  details: {
    marginBottom: '16px',
  },
  children: {
    marginTop: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  buttonFocus: {
    outline: 'none',
  },
};

export default AdminCard;
