import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Complete from './Complete';
import CreateOrder from './CreateOrder';
import { OrderStoreProvider } from './store';

const Order: React.FunctionComponent = () => {
    return (
        <OrderStoreProvider>
            <Routes>
                <Route path="manage" element={<CreateOrder />} />
                <Route path="complete" element={<Complete />} />
                <Route path="" element={<Navigate to="manage" replace />} />
            </Routes>
        </OrderStoreProvider>
    );
};

export default Order;
