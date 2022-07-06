import { Box, Divider, FormControl, FormLabel, styled, TextareaAutosize, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useOrderStore } from '../store';
import { theme } from '../../../styles/theme';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import { OrderError, OrderErrorMessage, OrderErrorType } from '../../../types';
import { useAuthStore } from '../../Auth/store';

type Props = {
    onError: (error: OrderError) => void;
    isCartOrderError: boolean;
};
const DeliveryInfo: React.FunctionComponent<Props> = observer((props: Props) => {
    const { store } = useOrderStore();
    const { store: authStore } = useAuthStore();
    const { t } = useTranslation();
    const { onError, isCartOrderError } = props;
    const navigate = useNavigate();
    const [fullName, setFullName] = React.useState<string | undefined>('');
    const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>('');
    const [shippingAddress, setShippingAddress] = React.useState<string | undefined>();

    const onClickChangeShippingAddress = () => {
        // TO DO: DH-5449
    };

    const onChangeFullName = (value: string) => {
        setFullName(value);
        store.setDeliveryInfor({ ...store.deliveryInfor, fullName: value });
    };

    const onChangePhoneNumber = (value: string) => {
        setPhoneNumber(value);
        store.setDeliveryInfor({ ...store.deliveryInfor, phoneNumber: value });
    };

    const onChangeNote = (value: string) => {
        store.setDeliveryInfor({ ...store.deliveryInfor, note: value });
    };

    const completedOrder = () => {
        if (!validate() || isCartOrderError) return;

        navigate('/order/complete', { replace: true });
    };

    const validate = (): boolean => {
        const invalidProductCodes = getInvalidQuantityProducts();
        if (store.factoryId === '') {
            onError({
                type: OrderErrorType.UnselectedFactory,
                data: { message: OrderErrorMessage.UnselectedFactory },
            });

            return false;
        }

        if (store.cartOrder.some((cartOrderItem) => cartOrderItem.quantity === 0)) {
            onError({
                type: OrderErrorType.QuantityError,
                data: { productCodes: invalidProductCodes, message: OrderErrorMessage.QuantityError },
            });
            return false;
        } else {
            onError({ type: '' as OrderErrorType, data: null });
        }

        const invalidRDDProducts = getInvalidRDDProducts();
        if (invalidRDDProducts.length > 0) {
            onError({
                type: OrderErrorType.RDDError,
                data: { productCodes: invalidRDDProducts, message: OrderErrorMessage.RDDError },
            });

            return false;
        } else {
            onError({ type: '' as OrderErrorType, data: null });
        }

        if (phoneNumber?.trim() === '' || fullName?.trim() === '') {
            onError({
                type: OrderErrorType.DeliveryInfoError,
                data: { message: OrderErrorMessage.DeliveryInfoError },
            });

            return false;
        } else {
            onError({ type: '' as OrderErrorType, data: null });
        }

        const phoneNumberRegrex = /^\d{10}$/;
        if (!phoneNumber?.match(phoneNumberRegrex)) {
            onError({
                type: OrderErrorType.InvalidPhoneNumber,
                data: { message: OrderErrorMessage.InvalidPhoneNumber },
            });

            return false;
        } else {
            onError({ type: '' as OrderErrorType, data: null });
        }

        if (store.cartOrder.length === 0) {
            onError({
                type: OrderErrorType.EmptyCartOrder,
                data: { message: OrderErrorMessage.EmptyCartOrder },
            });

            return false;
        }

        return true;
    };

    const getInvalidRDDProducts = (): string[] => {
        const invalidRDDProductCodes: string[] = [];
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        store.cartOrder.forEach((cartOrderItem) => {
            cartOrderItem.requestedDeliveryDate.setHours(0, 0, 0, 0);
            if (cartOrderItem.requestedDeliveryDate < currentDay) {
                invalidRDDProductCodes.push(cartOrderItem.productCode);
            }
        });

        for (let item = 0; item < store.cartOrder.length - 1; item++) {
            for (let nextItem = item + 1; nextItem < store.cartOrder.length; nextItem++) {
                store.cartOrder[item].requestedDeliveryDate.setHours(0, 0, 0, 0);
                store.cartOrder[nextItem].requestedDeliveryDate.setHours(0, 0, 0, 0);
                if (
                    store.cartOrder[item].productCode === store.cartOrder[nextItem].productCode &&
                    store.cartOrder[item].requestedDeliveryDate.getTime() ===
                        store.cartOrder[nextItem].requestedDeliveryDate.getTime()
                ) {
                    invalidRDDProductCodes.push(store.cartOrder[item].productCode);
                }
            }
        }
        return invalidRDDProductCodes;
    };

    const getInvalidQuantityProducts = (): string[] => {
        const invalidProductCodes: string[] = [];
        store.cartOrder.forEach((cartOrderItem) => {
            if (cartOrderItem.quantity === 0) {
                invalidProductCodes.push(cartOrderItem.productCode);
                return;
            }
        });

        return invalidProductCodes;
    };

    React.useEffect(() => {
        store.getShippingAddress();
        setPhoneNumber('0905123159');
        setFullName(authStore.userProfile?.FullName as string);
    }, []);

    React.useEffect(() => {
        store.setFullName(fullName as string);
        store.setPhoneNumber(phoneNumber as string);
    }, [phoneNumber, fullName]);

    React.useEffect(() => {
        if (store.shippingAddresses.length > 0) setShippingAddress(store.shippingAddresses[0].Address);
    }, [store.shippingAddresses]);

    return (
        <Box bgcolor="common.white" padding="4%" borderRadius="0.25rem" width="92%">
            <Typography variant="body1">{t('delivery_information.delivery_info')}</Typography>
            <TextField
                label={t('delivery_information.full_name')}
                isRequired={true}
                paddingTop="1rem"
                paddingBottom="1rem"
                marginLeft="3rem"
                width="60%"
                value={fullName as string | ''}
                onChange={onChangeFullName}
            />
            <TextField
                label={t('delivery_information.phone_number')}
                isRequired={true}
                paddingBottom="1rem"
                marginLeft="1.75rem"
                width="60%"
                value={phoneNumber as string | ''}
                onChange={onChangePhoneNumber}
            />
            <InputWrapper>
                <Typography variant="body2">{t('delivery_information.delivery_address')}</Typography>
                <StyledChange onClick={onClickChangeShippingAddress} hidden>
                    {t('delivery_information.change')}
                </StyledChange>
            </InputWrapper>
            <InputWrapper>
                {shippingAddress !== undefined && <Typography variant="body2">{shippingAddress}</Typography>}
            </InputWrapper>
            <StyledDivider />
            <Typography paddingTop="1rem" variant="body1">
                {t('delivery_information.note')}
            </Typography>
            <StyledTextArea minRows={5} maxRows={5} onChange={(event) => onChangeNote(event.target.value)} />
            <Button
                height="2.5rem"
                margin="2% 2% 0 0"
                width="100%"
                content={t('delivery_information.finish')}
                backgroundColor={theme.palette.primary.main}
                hoverColor={theme.palette.common.white}
                onClick={completedOrder}
            />
        </Box>
    );
});

export default DeliveryInfo;

const InputWrapper = styled(FormControl)`
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem;
    width: 100%;
`;
const StyledChange = styled(FormLabel)`
    margin-left: 12.75rem;
    color: ${theme.palette.grey[600]};
    text-decoration: underline;
`;
const StyledDivider = styled(Divider)`
    width: 99%;
    justify-content: center;
    border: 1px solid ${theme.palette.grey[100]};
`;
const StyledTextArea = styled(TextareaAutosize)`
    width: 92%;
    border-radius: 0.25rem;
    background-color: ${theme.palette.grey[400]};
    margin-top: 0.5rem;
    padding: 1rem;
    resize: none;
    &:focus {
        outline: none;
    }
`;
