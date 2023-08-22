import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
                <div className="space-x-4">
                    <Link
                        to="/register"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
