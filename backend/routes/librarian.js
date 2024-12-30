// backend/routes/librarian.js

const express = require('express');
const router = express.Router();
const Request = require('../models/request');

// Route to get all book requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find()
            .populate('book', 'title')  // Populate book title
            .populate('student', 'name'); // Populate student name

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests' });
    }
});

// Route to issue a book based on request ID
router.put('/requests/:id/issue', async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        if (request.isIssued) {
            return res.status(400).json({ message: 'Book already issued' });
        }

        // Mark the request as issued
        request.isIssued = true;
        request.issuedAt = new Date();
        await request.save();

        res.json({ message: 'Book issued successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error issuing book' });
    }
});

module.exports = router;
