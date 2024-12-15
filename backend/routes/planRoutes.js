const express = require('express');
const router = express.Router();
const { createPlan, getPlans, getPlanwithid, updatePlan, deletePlan } = require('../services/planService');


router.post('/add', async (req, res) => {
    try {
        const plan = await createPlan(req.body);
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getall', async (req, res) => {
    try {
        const plans = await getPlans();
        console.log(plans)
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const plan = await getPlanwithid(id); 
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' }); 
        }
        res.status(200).json(plan); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 

      
        const updatedPlan = await updatePlan(id, updateData);

        res.status(200).json({
            message: 'Plan updated successfully',
            data: updatedPlan,
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const result = await deletePlan(id); 
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

module.exports = router;
