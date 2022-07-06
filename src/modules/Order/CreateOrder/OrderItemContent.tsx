import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { theme } from '../../../styles/theme';
import { OrderItemLine } from '../../../types';
import { useOrderStore } from '../store';

import OrderItemLineContent from './OrderItemLine';

type Props = {
    orderItemsByProductCode: OrderItemLine[];
    invalidCartOrder: any;
};

const OrderItemContent: React.FunctionComponent<Props> = observer((props: Props) => {
    const { store } = useOrderStore();
    const { orderItemsByProductCode, invalidCartOrder } = props;
    const isProductCodeError: boolean =
        store.unSupportedProductCodes.includes(orderItemsByProductCode[0].productCode) ||
        store.withoutPriceProductCodes.includes(orderItemsByProductCode[0].productCode)
            ? true
            : false;
    const isInvalidCartOrder = (): boolean => {
        if (invalidCartOrder === null) return false;
        if (invalidCartOrder && invalidCartOrder.includes(orderItemsByProductCode[0].productCode)) return true;
        return false;
    };

    return (
        <Grid
            marginBottom="0.5rem"
            width="100%"
            border={isProductCodeError || isInvalidCartOrder() ? `1px solid ${theme.palette.error.main}` : 'none'}
        >
            {orderItemsByProductCode.map((item, index) => (
                <OrderItemLineContent orderItemLine={item} key={index} />
            ))}
        </Grid>
    );
});

export default OrderItemContent;
