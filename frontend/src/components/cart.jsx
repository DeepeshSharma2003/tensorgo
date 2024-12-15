import axios from 'axios';
import AdminCard from './admincard';
import PropTypes from 'prop-types';



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
  
    return (
      <div>
        <h3>Cart</h3>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((subscription, index) => (
              <AdminCard
                key={index}
                title={`Subscription for Plan ID: ${subscription.plan_id}`}
                details={{
                  'Subscription ID': subscription.sub_id,
                  'Organization ID': subscription.org_id,
                  'Start Date': new Date(subscription.start_date).toLocaleDateString(),
                  'End Date': new Date(subscription.end_date).toLocaleDateString(),
                  'Users Allowed': subscription.users_allowed,
                  'Users Added': subscription.users_added,
                }}
              >
             
                <button
                  style={{ marginTop: '10px', padding: '10px', background: 'blue', color: 'white' }}
                  onClick={() => handlePurchase(subscription)}
                >
                  Purchase
                </button>
  
             
                <button
                  style={{ marginTop: '10px', padding: '10px', background: 'red', color: 'white' }}
                  onClick={() => handleCancelSubscription(subscription.sub_id)}
                >
                  Cancel
                </button>
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
        plan_id: PropTypes.string.isRequired,
        sub_id: PropTypes.string.isRequired,
        org_id: PropTypes.string.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        users_allowed: PropTypes.number.isRequired,
        users_added: PropTypes.number.isRequired,
      })
    ).isRequired,
    setCart: PropTypes.func.isRequired, 
    handlePurchase: PropTypes.func.isRequired,
  };
  
  export default Cart;
  