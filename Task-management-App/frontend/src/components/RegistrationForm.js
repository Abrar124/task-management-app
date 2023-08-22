import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isError = false;

        // Validate fields
        if (username === '') {
            setUsernameError('Username is required.');
            isError = true;
        } else {
            setUsernameError('');
        }

        if (email === '') {
            setEmailError('Email is required.');
            isError = true;
        } else {
            setEmailError('');
        }

        if (password === '') {
            setPasswordError('Password is required.');
            isError = true;
        } else {
            setPasswordError('');
        }

        if (isError) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });

            console.log(response.data); // Display success message or handle redirection
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error(error.response.data); // Display error message
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="max-w-md p-6 bg-white rounded shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4">
                    <label className="block font-semibold">Username:</label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="text-red-500">{usernameError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Email:</label>
                    <input
                        className="w-full p-2 border rounded"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Password:</label>
                    <input
                        className="w-full p-2 border rounded"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                    type="submit"
                >
                    Register
                </button>
                <p className="mt-2 text-gray-600 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default RegistrationForm;
