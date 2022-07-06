import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Playground from '../components/PlayGround';
import ProtectedRoute from '../components/ProtectedRoute';
import Authentication from '../modules/Auth';
import { AuthStoreProvider } from '../modules/Auth/store';
import Order from '../modules/Order';
import { OrderStoreProvider } from '../modules/Order/store';
import Products from '../modules/Products';

const BrowserRouter = () => {
    return (
        <AuthStoreProvider>
            <OrderStoreProvider>
                <Router>
                    <Routes>
                        <Route path="/auth/*" element={<Authentication />} />
                        <Route path="/products/*" element={<Products />} />
                        <Route
                            path="/order/*"
                            element={
                                <ProtectedRoute>
                                    <Order />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/playground" element={<Playground />} />
                        <Route path="/*" element={<Navigate to="/products" replace />} />
                    </Routes>
                </Router>
            </OrderStoreProvider>
        </AuthStoreProvider>
    );
};
export default BrowserRouter;
