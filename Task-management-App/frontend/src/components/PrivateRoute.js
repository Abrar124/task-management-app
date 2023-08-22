import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
        return <Route {...rest} element={<Component />} />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;
