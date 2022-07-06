import React from 'react';
// import { Markup } from 'interweave';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from '../../../components/Navbar';
import { useProductStore } from '../store';
import { ProductCodeOrderType, ProductOrderType } from '../types';
import useAsyncFunction from '../../../infra/useAsyncFunction';
import ErrorComponent from '../../../components/Error';
import { OrderError, OrderErrorMessage, OrderErrorType } from '../../../types';

import ProductDetailContent from './ProductDetailContent';

const Component: React.FunctionComponent = observer(() => {
    const defaultError: OrderError = { type: '' as OrderErrorType, data: null };
    const params = useParams();
    const { t } = useTranslation();
    const { store: productStore } = useProductStore();

    const { Id } = params;

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Navbar />

            <Box width="60%" display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
                <Typography padding="3rem 0" textTransform="uppercase" textAlign="start"></Typography>

                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignSelf="flex-start"
                    rowGap="2%"
                    padding="3.313rem 0"
                >
                    <Typography
                        variant="caption"
                        padding="1rem"
                        textTransform="uppercase"
                        bgcolor="grey.50"
                    ></Typography>
                    <Typography padding="0.5rem 0 0 1rem"></Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default Component;
