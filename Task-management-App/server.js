// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Task = require('./models/Task');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); // Import the tasks routes


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); //Authentication route 
app.use('/api/tasks', taskRoutes);  // Create Task route

//Get the user tasks
app.get('/', (req, res) => {
    res.send('Welcome to the Task Management Application Backend');
});

// MongoDB connection
const mongoURI = 'mongodb+srv://abrar:abrar120@cluster0.fypri9h.mongodb.net/?retryWrites=true&w=majority';
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
