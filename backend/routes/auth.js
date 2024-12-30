const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const { username, password, role, studentRoll, studentName, studentCourse, studentSemester } = req.body;

        // Check if user already exists
        /* const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        } */

        // Create new user and save to the database
        const newUser = new User({ username, password, role, studentRoll, studentName, studentCourse, studentSemester });
        await newUser.save();

        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        console.log("In the Login API");
        const { username, password, role } = req.body; // Include role in the request body
        console.log(`username is ${username} and the password is ${password} and the role is ${role}`);

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        
        if (role && user.role !== role) {
            return res.status(403).json({ success: false, message: 'Unauthorized role' });
        }

       
        res.status(200).json({
            success: true,
            message: 'Login successful',
            role: user.role,
            userId: user._id 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error logging in', error: err.message });
    }
});



module.exports = router;
