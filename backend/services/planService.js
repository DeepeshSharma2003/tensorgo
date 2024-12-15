const Plan = require('../models/plan');


const createPlan = async (planData) => {
    return await Plan.create(planData);
};


const getPlans = async () => {
    return await Plan.findAll();
};


const getPlanwithid = async (id) => {
    try {
     
        const plan = await Plan.findOne({ where: { plan_id: id } });
        return plan;
    } catch (error) {
        console.error('Error fetching plan:', error.message);
        throw error;
    }
};


const updatePlan = async (id, updateData) => {
    try {
        const plan = await Plan.findOne({ where: { plan_id: id } }); 
        if (!plan) {
            throw new Error('Plan not found'); 
        }
        await plan.update(updateData); 
        return plan;
    } catch (error) {
        throw new Error('Error updating plan: ' + error.message); 
    }
};


const deletePlan = async (id) => {
    try {
        const plan = await Plan.findOne({ where: { plan_id: id } }); 
        if (!plan) {
            throw new Error('Plan not found'); 
        }
        await plan.destroy();
        return { message: 'Plan deleted successfully' }; 
    } catch (error) {
        throw new Error('Error deleting plan: ' + error.message); 
    }
};

module.exports = { createPlan, getPlans, getPlanwithid, updatePlan, deletePlan };
