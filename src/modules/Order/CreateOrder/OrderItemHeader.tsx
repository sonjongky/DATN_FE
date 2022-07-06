import { Box } from '@mui/material';
import { common } from '@mui/material/colors';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderItemHeader: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();
    return (
        <Box
            width="100%"
            minHeight="3rem"
            marginBottom="0.25rem"
            bgcolor={common.white}
            marginTop="0.75rem"
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Box width="10%" textAlign="center" />
            <Box width="20%" textAlign="center">
                {t('order_item.product_code')}
            </Box>
            <Box width="30%" textAlign="center">
                {t('order_item.requesting_date')}
            </Box>
            <Box width="30%" textAlign="center">
                {t('order_item.quantity')}
            </Box>
            <Box width="20%" textAlign="center">
                {t('order_item.weight')}
            </Box>
            <Box width="10%" textAlign="center" />
        </Box>
    );
});

export default OrderItemHeader;
