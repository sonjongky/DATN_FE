import { IndeterminateCheckBox } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import React from 'react';

import OrderPackageAmount from '../../../components/OrderPackageAmount';
import { OrderItemLine } from '../../../types';

type Props = {
    index: number;
    orderItemLine: OrderItemLine;
    onOrderItemLineRemoved: (index: number) => void;
    onOrderItemLineChanged: (orderItemLine: OrderItemLine) => void;
};

const OrderItem: React.FunctionComponent<Props> = observer((props: Props) => {
    const { onOrderItemLineChanged, onOrderItemLineRemoved, orderItemLine } = props;

    React.useEffect(() => {
        onOrderItemLineChanged(orderItemLine);
    }, [orderItemLine]);

    const removeOrderItemHanlde = () => {
        onOrderItemLineRemoved(props.index);
    };

    const { totalWeight, weight, requestedDeliveryDate, quantity } = orderItemLine;
    const totalWeightInTon = totalWeight / 1000;

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            columnGap="15%"
            width="100%"
        >
            <DatePicker
                disablePast
                inputFormat="dd/MM/yyyy"
                value={requestedDeliveryDate}
                onChange={(newValue) => {
                    onOrderItemLineChanged({ ...orderItemLine, requestedDeliveryDate: newValue as Date });
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginRight="-1rem"
            >
                <OrderPackageAmount
                    value={quantity}
                    onChange={(newQuantity) => {
                        onOrderItemLineChanged({
                            ...orderItemLine,
                            quantity: newQuantity,
                            totalWeight: newQuantity * weight,
                        });
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography width="110px" display="flex" noWrap={true}>
                    = {`${totalWeightInTon} ${t('product.detail.unit.weight.ton')}`}
                </Typography>
                <IconButton onClick={removeOrderItemHanlde}>
                    <IndeterminateCheckBox fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
});

export default OrderItem;
