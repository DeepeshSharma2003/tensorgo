const express = require('express');
const router = express.Router();
const {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription
} = require('../services/subscriptionService');


router.post('/addsub', async (req, res) => {
    try {
        const subscription = await createSubscription(req.body);

        const { sub_id, org_id, plan_id, start_date, end_date, is_active, users_allowed, users_added } = subscription;

        res.status(201).json({
            message: 'Subscription created successfully',
            sub_id, 
            org_id,
            plan_id,
            start_date,
            end_date,
            is_active,
            users_allowed,
            users_added,
            data: subscription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.get('/getallsub', async (req, res) => {
    try {
        const subscriptions = await getSubscriptions();
        res.status(200).json({
            message: 'Subscriptions retrieved successfully',
            data: subscriptions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getsubbyid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await getSubscriptionById(id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({
            message: 'Subscription retrieved successfully',
            data: subscription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedSubscription = await updateSubscription(id, updateData);
        res.status(200).json({
            message: 'Subscription updated successfully',
            data: updatedSubscription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/deletebyid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteSubscription(id);
        res.status(200).json({
            message: response.message
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
