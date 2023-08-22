import React from 'react';
import { useNavigate } from 'react-router-dom';


function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Logged out successfully'); // Handle redirection or display success message

        // Navigate to login
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
