import React, { useEffect, useState } from 'react';
// import { Markup } from 'interweave';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Navbar from '../../../components/Navbar';
import { useProductStore } from '../store';
import { ProductCodeOrderType, ProductOrderType } from '../types';
import useAsyncFunction from '../../../infra/useAsyncFunction';
import ErrorComponent from '../../../components/Error';
import { OrderError, OrderErrorMessage, OrderErrorType, Product } from '../../../types';

import ProductDetailContent from './ProductDetailContent';

const Component: React.FunctionComponent = observer(() => {
    const defaultError: OrderError = { type: '' as OrderErrorType, data: null };
    const [product, setProduct] = useState<Product>();
    const params = useParams();
    const { t } = useTranslation();
    const { store: productStore } = useProductStore();

    const { Id } = params;

    const fetchProduct = (): Promise<Product> =>
        axios.get('http://localhost:4000/getProduct/' + Id).then(({ data }) => data);

    useEffect(() => {
        fetchProduct().then((data) => {
            setProduct(data);
        });
    }, []);
    console.log('product fetched', product);

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Navbar />

            <Box width="60%" display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
                <Typography padding="3rem 0" textTransform="uppercase" textAlign="start">
                    {product?.Name}
                </Typography>
                <ProductDetailContent isMarketingProduct={true} product={product} />
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignSelf="flex-start"
                    rowGap="2%"
                    padding="3.313rem 0"
                >
                    <Typography variant="caption" padding="1rem" textTransform="uppercase" bgcolor="grey.50">
                        {t('product.detail.product_description')}
                    </Typography>
                    <Typography padding="0.5rem 0 0 1rem">{product?.Description}</Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default Component;
