import { observer } from 'mobx-react-lite';
import { AddBox, DisabledByDefault } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';

import OrderPackageAmount from '../../../components/OrderPackageAmount';
import { useOrderStore } from '../store';
import { getRequestedDateDelivery } from '../../../infra/requestedDateDelivery';
import { OrderItemLine } from '../../../types';

type Props = {
    orderItemLine: OrderItemLine;
};

const OrderItemLineContent: React.FunctionComponent<Props> = observer((props: Props) => {
    const { store } = useOrderStore();
    const { orderItemLine } = props;

    const onDateChanged = (newValue: Date | null) => {
        store.setOrderItemLine({ ...orderItemLine, requestedDeliveryDate: newValue as Date });
    };
    const onAddOrderItemLine = () => {
        const nextOrdinal = ordinal + 1;
        const defaultOrderItemLine: OrderItemLine = {
            productCodeId: productCodeId,
            productCode: productCode,
            // TODO: Get country from api /customerCode/getCustomerCodesOfUser
            requestedDeliveryDate: getRequestedDateDelivery('Vietnam', store.addedDaysForRDD),
            quantity: 0,
            weight: weight,
            orderType: orderType,
            totalWeight: 0,
            ordinal: nextOrdinal,
        };

        store.addOrderItemLinesIntoCartOrder(defaultOrderItemLine, ordinal);
    };

    const { productCodeId, productCode, requestedDeliveryDate, quantity, weight, orderType, totalWeight, ordinal } =
        orderItemLine;

    const onQuantityChanged = (newQuantity: number) => {
        const totalWeight = orderType === 0 ? newQuantity * weight : newQuantity;
        store.setOrderItemLine({ ...orderItemLine, quantity: newQuantity, totalWeight: totalWeight });
    };

    React.useEffect(() => {
        store.getRequestedDateDeliveryOfCustomerCode();
    }, []);

    const totalWeightInTon = totalWeight / 1000;
    return (
        <Box
            width="100%"
            minHeight="3rem"
            bgcolor="common.white"
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Box width="10%" textAlign="center">
                <IconButton onClick={onAddOrderItemLine}>
                    <AddBox color="secondary" fontSize="large" />
                </IconButton>
            </Box>
            <Box width="20%" textAlign="center" color="blue">
                <Typography variant="body1">{productCode}</Typography>
            </Box>
            <Box width="30%" textAlign="center">
                <DatePicker
                    disablePast
                    inputFormat="dd/MM/yyyy"
                    value={requestedDeliveryDate}
                    onChange={onDateChanged}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box width="30%" display="flex" justifyContent="center">
                <OrderPackageAmount value={quantity} onChange={(totalWeight) => onQuantityChanged(totalWeight)} />
            </Box>
            <Box width="20%" textAlign="center">
                {totalWeightInTon}
            </Box>
            <Box width="10%">
                <IconButton onClick={() => store.removeOrderItemOutOfCartOrder(ordinal)}>
                    <DisabledByDefault color="disabled" fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
});

export default OrderItemLineContent;
