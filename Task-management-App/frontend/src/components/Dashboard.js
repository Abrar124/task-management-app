import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    // Function to update tasks after creating a new task
    const handleTaskCreated = (newTask) => {
        // Update the list of tasks by adding the new task
        setTasks([...tasks, newTask]);
    };
    return (
        <>
            <div className="flex justify-between items-center p-4 bg-slate-300">
                <h2 className="text-2xl mb-4">Task Management App</h2>
                <LogoutButton />
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </>

    );
}

export default Dashboard;
