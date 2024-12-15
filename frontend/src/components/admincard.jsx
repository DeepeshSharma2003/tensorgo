/* eslint-disable no-unused-vars */
// admincard.js
import React from 'react';
import PropTypes from 'prop-types';

const AdminCard = ({ title, details, children }) => {
  return (
    <div className="admin-card" style={styles.card}>
      <h4>{title}</h4>
      <div style={styles.details}>
        {Object.keys(details).map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {details[key]}
          </p>
        ))}
      </div>
      
      <div>{children}</div>
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
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  details: {
    marginBottom: '10px',
  },
};

export default AdminCard;
