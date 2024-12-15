const Billing = require('../models/billing');


const createBilling = async (billingData) => {
    return await Billing.create(billingData);
};


const getBillings = async () => {
    return await Billing.findAll();
};


const getBillingById = async (id) => {
    return await Billing.findOne({ where: { bil_id: id } });
};


const updateBilling = async (id, updateData) => {
    const billing = await Billing.findOne({ where: { bil_id: id } });
    if (!billing) {
        throw new Error('Billing record not found');
    }
    await billing.update(updateData);
    return billing;
};


const deleteBilling = async (id) => {
    const billing = await Billing.findOne({ where: { bil_id: id } });
    if (!billing) {
        throw new Error('Billing record not found');
    }
    await billing.destroy();
    return { message: 'Billing record deleted successfully' };
};

module.exports = { createBilling, getBillings, getBillingById, updateBilling, deleteBilling };
