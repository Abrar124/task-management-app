import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); // State for login success

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
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            // Store JWT token in local storage
            localStorage.setItem('token', response.data.token);
            setLoginSuccess(true); // Set login success state
            // Redirect to dashboard when login is successful
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError('Invalid username or password.');
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="max-w-md p-6 bg-white rounded shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {loginSuccess && (
                    <div className="bg-green-100 text-green-800 border border-green-400 rounded p-2 mb-4">
                        {console.log("Login successful")}
                        {alert("Login successful")}
                        Login successful!
                    </div>
                )}
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
                    Login
                </button>
                <p className="mt-2 text-gray-600 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
                {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
