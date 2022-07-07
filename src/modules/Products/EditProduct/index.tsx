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

const EditProduct: React.FunctionComponent = observer(() => {
    const defaultError: OrderError = { type: '' as OrderErrorType, data: null };
    const params = useParams();
    const { t } = useTranslation();
    const { store: productStore } = useProductStore();

    const { Id } = params;

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            Edit
        </Box>
    );
});

export default EditProduct;
