// backend/routes/requests.js
const express = require('express');
const Request = require('../models/request');
const Book = require('../models/book');
const router = express.Router();

// GET /books - Retrieve all available books with quantity > 0
router.get('/', async (req, res) => {
    try {
        const { title } = req.query;

        // Find books with quantity greater than 0, and filter by title if provided
        const books = await Book.find({
            ...(title ? { title: { $regex: title, $options: 'i' } } : {})
        });

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
});


// POST /requests - Create a new book request
router.post('/request', async (req, res) => {
    console.log(`Request body is ${req.body}`)
    try {
        const { bookId, studentId } = req.body;
        console.log(`Book id is ${bookId} and the student id is ${studentId}`);

        // Check if book is available
        const book = await Book.findById(bookId);
        if (!book || book.quantity <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }

        // Create a new request
        const newRequest = new Request({
            book: bookId,
            student: studentId
        });

        await newRequest.save();

        res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting request', error: err.message });
    }
});

// PUT /requests/:id/issue - Mark request as issued by librarian
router.put('/:id/issue', async (req, res) => {
    try {
        const requestId = req.params.id;

        // Find the request
        const request = await Request.findById(requestId).populate('book');
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Check if book is still available
        if (request.book.quantity <= 0) {
            return res.status(400).json({ message: 'Book not available for issuing' });
        }

        // Mark as issued and update the book quantity
        request.isIssued = true;
        request.issuedAt = new Date();
        await request.save();

        request.book.quantity -= 1;
        await request.book.save();

        res.status(200).json({ message: 'Book issued successfully', request });
    } catch (err) {
        res.status(500).json({ message: 'Error issuing book', error: err.message });
    }
});

module.exports = router;
