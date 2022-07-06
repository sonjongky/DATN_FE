import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './SignIn';

const Authentication: React.FunctionComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
    );
};

export default Authentication;
