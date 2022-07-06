import { Box, styled, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from 'react-i18next';

import { OrderError, OrderErrorType } from '../types';
import { theme } from '../styles/theme';

type Props = {
    orderError: OrderError;
};
const ErrorComponent: React.FunctionComponent<Props> = observer((props: Props) => {
    const { type, data } = props.orderError;
    const { t } = useTranslation();
    const renderErrorMessage = () => {
        switch (type) {
            case OrderErrorType.DeliveryInfoError:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            case OrderErrorType.QuantityError:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            case OrderErrorType.DuplicatedRequestedDate:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            case OrderErrorType.InvalidPhoneNumber:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            case OrderErrorType.EmptyCartOrder:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            case OrderErrorType.UnselectedFactory:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>{t(`confirm_order.message_error.${data.message}`) + ' '}</>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
            default:
                return (
                    <>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            <>
                                {t('confirm_order.product')}
                                {data.productCodes?.map((item: string, index: number) => {
                                    if (index === data.productCodes?.length - 1) return ' ' + item + ' ';
                                    else return ' ' + item + ', ';
                                })}
                                {t(`confirm_order.message_error.${data.message}`) + ' '}
                            </>
                        </Typography>
                        <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="20rem" color="error.main">
                            {t('confirm_order.message_error.thanks')}
                        </Typography>
                    </>
                );
        }
    };
    return (
        <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="flex-end"
            minWidth="30rem"
            marginTop="0.5rem"
            padding="0.4rem"
            bgcolor={theme.palette.error.light}
        >
            <Box display="flex" columnGap="0.5rem" justifyContent="center" alignItems="center">
                <Box padding="0.4rem">
                    <WarningIcon color="error" fontSize="large" />
                </Box>
                <Box display="flex" flexDirection="column" paddingRight="0.1rem">
                    {renderErrorMessage()}
                </Box>
            </Box>
        </Box>
    );
});

export default ErrorComponent;
