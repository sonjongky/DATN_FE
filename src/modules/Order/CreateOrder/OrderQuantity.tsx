import React from 'react';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useOrderStore } from '../store';
import { groupCartOrderByProductCode } from '../utils';

const OrderQuantity: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();
    const { store } = useOrderStore();

    const getTotalWeightOfOrder = (): string => {
        let weight = 0;
        store.cartOrder.forEach((orderItemLine) => {
            weight += orderItemLine.totalWeight;
        });

        const totalWeightInTon = weight / 1000;

        return totalWeightInTon.toFixed(3);
    };

    const products = groupCartOrderByProductCode(store.cartOrder);

    return (
        <Box height="10%" display="flex" flexDirection="row" width="100%">
            <Typography variant="body2" paddingTop="1.5rem" paddingLeft="1rem">
                {t('order_item.product')}
            </Typography>
            <Typography variant="body1" lineHeight="1.167rem" paddingTop="1.5rem" paddingLeft="0.3rem">
                {products.length}
            </Typography>
            <Typography variant="body2" lineHeight="1.167rem" paddingTop="1.75rem" paddingLeft="9rem">
                {t('order_item.weight')}
            </Typography>
            <Typography variant="body1" lineHeight="1.167rem" paddingTop="1.75rem" paddingLeft="0.3rem">
                {t('order_item.weight_ton', { weight: `${getTotalWeightOfOrder()}` })}
            </Typography>
        </Box>
    );
});

export default OrderQuantity;
