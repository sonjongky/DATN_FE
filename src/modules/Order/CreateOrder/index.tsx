import { Box, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '../../../components/Navbar';
import { useOrderStore } from '../store';
import { groupCartOrderByProductCode as groupCartOrderByProductCode } from '../utils';
import { OrderError, OrderErrorMessage, OrderErrorType } from '../../../types';
import Footer from '../../../components/Footer';
import ErrorComponent from '../../../components/Error';
import { removeDuplicatedItem } from '../../../infra/removeDuplicatedValue';

import OrderInfo from './OrderInfo';
import DeliveryInfo from './DeliveryInfo';
import OrderQuantity from './OrderQuantity';
import OrderItemHeader from './OrderItemHeader';
import OrderItemContent from './OrderItemContent';
import NonOrder from './NonOrder';

const CreateOrder: React.FunctionComponent = observer(() => {
    const { store } = useOrderStore();
    const { t } = useTranslation();
    const [isCartOrderError, setIsCartOrderError] = React.useState<boolean>(false);
    const [invalidCartOrder, setInvalidCartOrder] = React.useState<string[]>([]);
    const [error, setError] = React.useState<OrderError>({ type: '' as OrderErrorType, data: null });

    const onDeliveryHasError = (hasError: OrderError) => {
        if (hasError.type === OrderErrorType.UnselectedFactory) {
            setError(hasError);
        }
        if (hasError.type === OrderErrorType.QuantityError) {
            setError(hasError);
            setInvalidCartOrder(hasError.data.productCodes);
        }
        if (hasError.type === OrderErrorType.RDDError) {
            setError(hasError);
            setInvalidCartOrder(hasError.data.productCodes);
        }

        if (hasError.type === OrderErrorType.DeliveryInfoError) {
            setError(hasError);
        }
        if (hasError.type === OrderErrorType.InvalidPhoneNumber) {
            setError(hasError);
        }
        if (hasError.type === OrderErrorType.EmptyCartOrder) {
            setError(hasError);
        }
        if (
            error.type !== OrderErrorType.UnsupportedError &&
            error.type !== OrderErrorType.NoPriceError &&
            hasError.data === null
        ) {
            setError(hasError);
            setInvalidCartOrder([]);
        }
    };

    const cartOrderByProductCode = groupCartOrderByProductCode(store.cartOrder);

    React.useEffect(() => {
        if (store.customerCodes.length > 0) store.initFactoriesOfUser(store.customerCodeId);
        if (store.unSupportedProductCodes.length > 0) {
            setIsCartOrderError(true);
            const unSupportedProductCodes = removeDuplicatedItem(store.unSupportedProductCodes);
            setError({
                type: OrderErrorType.UnsupportedError,
                data: { productCodes: unSupportedProductCodes, message: OrderErrorMessage.UnsupportedError },
            });
        }
        if (store.unSupportedProductCodes.length === 0) {
            setError({ type: '' as OrderErrorType, data: null });
            setIsCartOrderError(false);
        }
    }, [store.customerCodeId]);

    React.useEffect(() => {
        const productCodeList: string[] = store.cartOrder.map((cartOrderItem) => cartOrderItem.productCode);
        const unsupportedProductCodes: string[] = store.unSupportedProductCodes.filter((productCode) =>
            productCodeList.includes(productCode),
        );
        if (unsupportedProductCodes.length > 0) {
            const finalUnSupportedProductCodes = removeDuplicatedItem(unsupportedProductCodes);
            setError({
                type: OrderErrorType.UnsupportedError,
                data: { productCodes: finalUnSupportedProductCodes, message: OrderErrorMessage.UnsupportedError },
            });
            setIsCartOrderError(true);
        }
        if (unsupportedProductCodes.length === 0) {
            setError({ type: '' as OrderErrorType, data: null });
            setIsCartOrderError(false);
        }
    }, [store.cartOrder.length]);

    React.useEffect(() => {
        async function setErrorForProductHasNoPrice() {
            await store.getProductCodePriceDto();
            const productCodeList: string[] = store.cartOrder.map((cartOrderItem) => cartOrderItem.productCode);
            const hasNoPriceProductCodes: string[] = store.withoutPriceProductCodes.filter((productCode) =>
                productCodeList.includes(productCode),
            );
            if (hasNoPriceProductCodes.length > 0) {
                const finalHasNoPriceProductCodes = removeDuplicatedItem(hasNoPriceProductCodes);
                setError({
                    type: OrderErrorType.NoPriceError,
                    data: { productCodes: finalHasNoPriceProductCodes, message: OrderErrorMessage.NoPriceError },
                });
                setIsCartOrderError(true);
            }
            if (hasNoPriceProductCodes.length === 0) {
                setError({ type: '' as OrderErrorType, data: null });
                setIsCartOrderError(false);
            }
        }
        setErrorForProductHasNoPrice();
    }, [store.factoryId, store.cartOrder.length]);

    React.useEffect(() => {
        if (store.customerCodes.length > 0) store.initFactoriesOfUser(store.customerCodeId);
    }, [store.customerCodeId]);

    return (
        <>
            <Box
                bgcolor="grey.400"
                minHeight="100vh"
                paddingBottom="2%"
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                alignItems="center"
            >
                <Navbar />
                <Box display="flex" justifyContent="flex-start" flexDirection="column" width="70%">
                    <Box
                        marginTop="1%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        width="100%"
                    >
                        <Typography variant="h3" width="20%" marginTop="2%">
                            {t('order_info.order')}
                        </Typography>
                        {error.data && <ErrorComponent orderError={{ type: error.type, data: error.data }} />}
                    </Box>
                    {store.cartOrder.length === 0 ? (
                        <NonOrder />
                    ) : (
                        <Box display="flex" justifyContent="space-between" marginTop="1%">
                            <Box width="67%" display="flex" flexDirection="column">
                                <OrderInfo />
                                <OrderQuantity />
                                <OrderItemHeader />
                                <Grid height="22rem" width="100%" overflow="auto">
                                    {cartOrderByProductCode.map((item, index) => (
                                        <OrderItemContent
                                            orderItemsByProductCode={item}
                                            key={index}
                                            invalidCartOrder={invalidCartOrder}
                                        />
                                    ))}
                                </Grid>
                            </Box>
                            <Box width="33%" marginLeft="2%">
                                <DeliveryInfo onError={onDeliveryHasError} isCartOrderError={isCartOrderError} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    );
});

export default CreateOrder;
