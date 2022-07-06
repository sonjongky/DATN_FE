import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../modules/Auth/store';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {
        store: { userProfile },
    } = useAuthStore();

    if (userProfile === null) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
