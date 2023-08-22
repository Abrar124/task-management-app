require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    console.log('Register route accessed');
    try {
        const { username, email, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log("env variavle", process.env.REACT_APP_JWT_SECRET_KEY)
    try {
        const { username, password } = req.body;
        console.log('Received username:', username); // Log the received username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found'); // Log when user is not found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user); // Log the found user
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Invalid credentials'); // Log when credentials are invalid
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Login successful'); // Log when login is successful
        // Generate JWT and send response
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.log('Error:', error.message); // Log any errors
        res.status(500).json({ error: error.message });
    }
});


// Default route to check the server
router.get('/', (req, res) => {
    console.log('Reached the root endpoint');
    res.send('Welcome to the Task Management Application Backend');
});


module.exports = router;
