/* eslint-disable */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TaskList({ tasks, setTasks }) {
    // const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // for status filter
    const [statusFilter, setStatusFilter] = useState('All'); // Initialize with 'All' to show all tasks

    // state to update task data
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedDueDate, setUpdatedDueDate] = useState('');
    const [updatedStatus, setUpdatedStatus] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);


    // Fetch the user data from mongoDB database
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: token,
                },
            });
            setTasks(response.data);
            console.log("Tasks from API:", response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    // update handler to update the user edit in task
    const handleUpdate = async (e, taskId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}`,
                {
                    title: updatedTitle,
                    description: updatedDescription,
                    dueDate: updatedDueDate,
                    status: updatedStatus,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            fetchTasks(); // Refresh the task list after updating
            setEditingTaskId(null); // Exit edit mode
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Delete handler to delete task
    const handleDelete = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: {
                    Authorization: token,
                },
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // formate date handler to convert date in a readable format
    const formatDate = (dateString) => {
        if (!dateString) {
            return "";
        }
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // change the color according to the status
    const getStatusColor = (status) => {
        switch (status) {
            case 'To Do':
                return 'bg-red-300';
            case 'In Progress':
                return 'bg-yellow-300';
            case 'Completed':
                return 'bg-green-300';
            default:
                return '';
        }
    };

    // Handler for status filter
    const handleStatusFilterChange = (newStatus) => {
        setStatusFilter(newStatus);
    };

    // Handler for drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return; // No valid destination
        }

        const updatedTasks = [...tasks];
        const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, reorderedTask);

        // Update the task order in the state
        setTasks(updatedTasks);
    };

    return (
        <div className="mt-12">
            <div className="flex justify-end mb-4 mx-7">
                <label className="text-gray-600 mr-2">Filter Your Tasks:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="All">All</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="taskList" type="TASK">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-2 gap-4 py-12 px-12 border-t-4"
                        >
                            {tasks
                                .filter(task => statusFilter === 'All' || task.status === statusFilter)
                                .map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`bg-white p-4 rounded-lg shadow-md ${getStatusColor(task.status)}`}
                                            >
                                                {editingTaskId === task._id ? (
                                                    <form onSubmit={(e) => handleUpdate(e, task._id)}>
                                                        <input
                                                            type="text"
                                                            value={updatedTitle}
                                                            onChange={(e) => setUpdatedTitle(e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={updatedDescription}
                                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                        <input
                                                            type="date"
                                                            value={updatedDueDate}
                                                            onChange={(e) => setUpdatedDueDate(e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                        <select
                                                            value={updatedStatus}
                                                            onChange={(e) => setUpdatedStatus(e.target.value)}
                                                            className="block w-full p-2 border rounded"
                                                        >
                                                            <option value="To Do">To Do</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                        <button
                                                            type="submit"
                                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mx-2"
                                                            onClick={() => setEditingTaskId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                                                        <p className="text-gray-600 mb-2">{task.description}</p>
                                                        <p className="text-gray-600 mb-2">Due Date: {task.dueDate}</p>
                                                        <p className="text-gray-600">Status: {task.status}</p>
                                                        <div className="mt-4 flex space-x-2">
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                                onClick={() => {
                                                                    setUpdatedTitle(task.title); // Populate with task title
                                                                    setUpdatedDescription(task.description); // Populate with task description
                                                                    setUpdatedDueDate(formatDate(task.dueDate)); // Populate with task due date
                                                                    setUpdatedStatus(task.status); // Populate with task status
                                                                    setEditingTaskId(task._id); // Enter edit mode
                                                                }}
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                                onClick={() => handleDelete(task._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );

}

export default TaskList;

