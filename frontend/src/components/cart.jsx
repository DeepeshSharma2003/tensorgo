import axios from 'axios';
import AdminCard from './admincard';
import PropTypes from 'prop-types';
import '../components_css/cart.css';

const Cart = ({ cart, setCart, handlePurchase }) => {
  const handleCancelSubscription = async (subId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/subscriptions/deletebyid/${subId}`);
      if (response.status === 200) {
        alert(`Subscription with ID: ${subId} has been canceled.`);
        setCart((prevCart) => prevCart.filter((item) => item.sub_id !== subId));
      } else {
        alert('Error canceling subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Error canceling subscription');
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleDateString();
  };

  return (
    <div className="cart-container">
      <h3 className="cart-title">Cart</h3>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((subscription, index) => (
            <AdminCard
              key={index}
              title={`Subscription for Plan ID: ${subscription.plan_id || 'N/A'}`}
              details={{
                'Subscription ID': subscription.sub_id || 'N/A',
                'Organization ID': subscription.org_id || 'N/A',
                'Start Date': formatDate(subscription.start_date),
                'End Date': formatDate(subscription.end_date),
                'Status': subscription.is_active ? 'Active' : 'Inactive',
                'Users Allowed': subscription.users_allowed || 'N/A',
              }}
            >
              <div className="card-buttons">
                <button
                  className="purchase-btn"
                  onClick={() => handlePurchase(subscription)}
                >
                  Purchase
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelSubscription(subscription.sub_id)}
                >
                  Cancel
                </button>
              </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      plan_id: PropTypes.number.isRequired,
      sub_id: PropTypes.number.isRequired,
      org_id: PropTypes.number, // org_id is optional
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
      users_allowed: PropTypes.number.isRequired,
      users_added: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCart: PropTypes.func.isRequired,
  handlePurchase: PropTypes.func.isRequired,
};

export default Cart;
