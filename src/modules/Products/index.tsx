import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductList from './ProductList';
import ProductDetail from './ProductDetail/';
import { ProductsStoreProvider } from './store';

const Products: React.FunctionComponent = observer(() => {
    return (
        <ProductsStoreProvider>
            <Routes>
                <Route path="" element={<ProductList />} />
                <Route path=":Id" element={<ProductDetail />} />
            </Routes>
        </ProductsStoreProvider>
    );
});

export default Products;
