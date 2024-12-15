

const Organisation = require('../models/organisation');


const createOrganisation = async (organisationData) => {
    return await Organisation.create(organisationData);
};


const getOrganisations = async () => {
    return await Organisation.findAll();
};


const getOrganisationById = async (id) => {
    try {
        const organisation = await Organisation.findOne({ where: { org_id: id } });
        return organisation;
    } catch (error) {
        console.error('Error fetching organisation:', error.message);
        throw error;
    }
};


const updateOrganisation = async (id, updateData) => {
    try {
        const organisation = await Organisation.findOne({ where: { org_id: id } });
        if (!organisation) {
            throw new Error('Organisation not found');
        }
        await organisation.update(updateData);
        return organisation;
    } catch (error) {
        throw new Error('Error updating organisation: ' + error.message);
    }
};


const deleteOrganisation = async (id) => {
    try {
        const organisation = await Organisation.findOne({ where: { org_id: id } });
        if (!organisation) {
            throw new Error('Organisation not found');
        }
        await organisation.destroy();
    } catch (error) {
        throw new Error('Error deleting organisation: ' + error.message);
    }
};

module.exports = { 
    createOrganisation, 
    getOrganisations, 
    getOrganisationById, 
    updateOrganisation, 
    deleteOrganisation 
};