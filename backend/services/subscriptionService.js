const Subscription = require('../models/subscription');


const createSubscription = async (subscriptionData) => {
    return await Subscription.create(subscriptionData);
};


const getSubscriptions = async () => {
    return await Subscription.findAll();
};


const getSubscriptionById = async (id) => {
    try {
        const subscription = await Subscription.findOne({ where: { sub_id: id } });
        return subscription;
    } catch (error) {
        console.error('Error fetching subscription:', error.message);
        throw error;
    }
};


const updateSubscription = async (id, updateData) => {
    try {
        const subscription = await Subscription.findOne({ where: { sub_id: id } });
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        await subscription.update(updateData);
        return subscription;
    } catch (error) {
        throw new Error('Error updating subscription: ' + error.message);
    }
};


const deleteSubscription = async (id) => {
    try {
        const subscription = await Subscription.findOne({ where: { sub_id: id } });
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        await subscription.destroy();
        return { message: 'Subscription deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting subscription: ' + error.message);
    }
};

module.exports = { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription };
