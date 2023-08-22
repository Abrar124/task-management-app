import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";


// Function to get user ID from token
const getUserIdFromToken = (token) => {
    const decodedToken = jwt_decode(token);
    return decodedToken.userId;
};

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dueDateError, setDueDateError] = useState('');
    const [statusError, setStatusError] = useState('');

    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isError = false;

        // Validate fields
        if (title === '') {
            setTitleError('Title is required.');
            isError = true;
        } else {
            setTitleError('');
        }

        if (description === '') {
            setDescriptionError('Description is required.');
            isError = true;
        } else {
            setDescriptionError('');
        }

        if (dueDate === '') {
            setDueDateError('Due Date is required.');
            isError = true;
        } else {
            setDueDateError('');
        }

        if (status === '') {
            setStatusError('Status is required.');
            isError = true;
        } else {
            setStatusError('');
        }

        if (isError) {
            return;
        }

        // create field in the backend
        try {
            const response = await axios.post('http://localhost:5000/api/tasks/create', {
                title,
                description,
                user: userId,
                dueDate,
                status,
            });
            console.log("status", status);
            // Notify the parent component that a new task has been created
            onTaskCreated(response.data.task);

            // Reset form fields
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('');
        } catch (error) {
            console.error(error.response.data); // Display error message
        }
    };

    return (
        <div className="flex justify-center items-center pt-10">
            <form onSubmit={handleSubmit} className="max-w-xl p-6 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {titleError && <p className="text-red-500">{titleError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {dueDateError && <p className="text-red-500">{dueDateError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full p-2 border rounded"
                    >
                        <option value="">Select status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {statusError && <p className="text-red-500">{statusError}</p>}
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                    type="submit"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
