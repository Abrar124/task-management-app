const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Create a new task
router.post('/create', async (req, res) => {
    try {
        const { title, description, user, dueDate } = req.body;

        // Create a new task with the provided details
        const newTask = new Task({
            title,
            description,
            user, 
            dueDate,
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get tasks for a specific user
router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization; // Get the token from the request headers

        console.log('Received token:', token); // Log the received token

        const decodedToken = jwt.decode(token); // Decode the token

        if (!decodedToken || !decodedToken.userId) {
            throw new Error('Invalid token');
        }

        const userId = decodedToken.userId; // Extract the user ID

        console.log('Fetching tasks for user:', userId);

        const tasks = await Task.find({ user: userId });

        console.log('Tasks:', tasks);

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, status },
            { new: true }
        );
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
