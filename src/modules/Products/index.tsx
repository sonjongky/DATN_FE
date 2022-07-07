import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductList from './ProductList';
import ProductDetail from './ProductDetail/';
import { ProductsStoreProvider } from './store';
import EditProduct from './EditProduct';

const Products: React.FunctionComponent = observer(() => {
    return (
        <ProductsStoreProvider>
            <Routes>
                <Route path="" element={<ProductList />} />
                <Route path=":Id" element={<ProductDetail />} />
                <Route path="edit/:Id" element={<EditProduct />} />
            </Routes>
        </ProductsStoreProvider>
    );
});

export default Products;
