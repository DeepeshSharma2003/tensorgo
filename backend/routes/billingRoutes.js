const express = require('express');
const router = express.Router();
const { createBilling, getBillings, getBillingById, updateBilling, deleteBilling } = require('../services/billingService');


router.post('/addbill', async (req, res) => {
    try {
        const billing = await createBilling(req.body);
        res.status(201).json(billing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getallbill', async (req, res) => {
    try {
        const billings = await getBillings();
        res.status(200).json(billings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const billing = await getBillingById(id);
        if (!billing) {
            return res.status(404).json({ message: 'Billing record not found' });
        }
        res.status(200).json(billing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBilling = await updateBilling(id, req.body);
        res.status(200).json({
            message: 'Billing record updated successfully',
            data: updatedBilling
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteBilling(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
