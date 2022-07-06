import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/Button';
import { theme } from '../../../styles/theme';
const NonOrder: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const routeToProductList = () => {
        navigate('/products');
    };
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            rowGap="5%"
            marginTop="1%"
            height="20rem"
            bgcolor="common.white"
        >
            <Typography>{t('confirm_order.order.no_product_in_cart')}</Typography>
            <Button
                backgroundColor={theme.palette.secondary.main}
                hoverColor={theme.palette.common.white}
                content={t('confirm_order.order.add_product')}
                height="10%"
                onClick={routeToProductList}
            />
        </Box>
    );
};
export default NonOrder;
