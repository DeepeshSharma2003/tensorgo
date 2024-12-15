
const express = require('express');
const router = express.Router();
const { 
    createOrganisation, 
    getOrganisations, 
    getOrganisationById, 
    updateOrganisation, 
    deleteOrganisation 
} = require('../services/organisationService');


router.post('/addorg', async (req, res) => {
    try {
        const organisation = await createOrganisation(req.body);
        res.status(201).json(organisation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getallorg', async (req, res) => {
    try {
        const organisations = await getOrganisations();
        res.status(200).json(organisations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const organisation = await getOrganisationById(id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.status(200).json(organisation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedOrganisation = await updateOrganisation(id, updateData);
        res.status(200).json({
            message: 'Organisation updated successfully',
            data: updatedOrganisation,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteOrganisation(id);
        res.status(200).json({ message: 'Organisation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
