import {
    Box,
    Dialog,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../Auth/store';
import Navbar from '../../../components/Navbar';
import { theme } from '../../../styles/theme';
import GenericButton from '../../../components/Button';
import { showErrorToaster, showSuccessToaster } from '../../../components/Toaster';
import { removeDuplicatedItem } from '../../../infra/removeDuplicatedValue';
import { useOrderStore } from '../store';
const Complete: React.FunctionComponent = () => {
    const { store: authStore } = useAuthStore();

    const { store } = useOrderStore();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [shippingAddress, setShippingAddress] = React.useState<string | undefined>();

    const hasUnsupportedProductCodes = store.unSupportedProductCodes.length > 0;
    const hasNotPriceProductCodes = store.withoutPriceProductCodes.length > 0;

    const setOrderDetail = async () => {
        await store.getProductCodePriceDto();
        store.setOrderDetails();
    };

    React.useEffect(() => {
        store.customerName = authStore.userProfile?.FullName || '';
        store.getTotalWeight();
        store.getReciveDays();
        store.getUnSupportedProductCodesByCustomerId();
        setOrderDetail();
    }, []);

    React.useEffect(() => {
        if (store.shippingAddresses.length > 0) setShippingAddress(store.shippingAddresses[0].Address);
    }, [store.shippingAddresses]);

    const handleClickEditButton = () => {
        navigate('/order/manage');
    };

    const handleCancelConfirmOrder = () => {
        setOpen(false);
    };

    const handleClickConfirmOrder = async () => {
        try {
            setOpen(false);
            const respone = await store.createOrder();
            store.clearCartOrder();
            if (respone) {
                showSuccessToaster(t('confirm_order.message.success'));
                navigate('/itemlines');
            } else {
                showErrorToaster(t('confirm_order.message.fail'));
                return;
            }
        } catch (error) {
            showErrorToaster(t('confirm_order.message.fail'));
        }
    };

    const dollarUSLocale = Intl.NumberFormat('en-VN');
    const TotalMoneyInDecimal = dollarUSLocale.format(store.orderModel.totalOriginalPrice);
    const productCodeList = store.cartOrder.map((item) => item.productCode);
    const productCodeAmount = removeDuplicatedItem(productCodeList).length;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                height="100%"
                bgcolor="grey.50"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    margin="1% 0"
                    width="73%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h5"
                        lineHeight="1.5rem"
                        textTransform="uppercase"
                        color="grey.700"
                        minWidth="30%"
                    >
                        {t('confirm_order.bread_crumbs.order')} / {t('confirm_order.bread_crumbs.complete')}
                    </Typography>

                    {(hasUnsupportedProductCodes || hasNotPriceProductCodes) && (
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: '#ffcece' }}
                        >
                            <Box margin="0.5rem 0.6rem">
                                <WarningIcon color="error" fontSize="large" />
                            </Box>
                            <Box display="flex" flexDirection="column" paddingRight="0.1rem">
                                {hasUnsupportedProductCodes && (
                                    <Typography
                                        variant="subtitle2"
                                        lineHeight="1.4rem"
                                        minWidth="50%"
                                        color="error.main"
                                    >
                                        {t('confirm_order.product')}
                                        {store.unSupportedProductCodes.map((item, index) => {
                                            if (index === store.unSupportedProductCodes.length - 1)
                                                return ' ' + item + ' ';
                                            else return ' ' + item + ', ';
                                        })}
                                        {t('confirm_order.message_error.not_support')}
                                    </Typography>
                                )}

                                {hasNotPriceProductCodes && (
                                    <Typography
                                        variant="subtitle2"
                                        lineHeight="1.4rem"
                                        minWidth="50%"
                                        color="error.main"
                                    >
                                        {t('confirm_order.product')}
                                        {store.withoutPriceProductCodes.map((item, index) => {
                                            if (index === store.withoutPriceProductCodes.length - 1)
                                                return ' ' + item + ' ';
                                            else return ' ' + item + ', ';
                                        })}
                                        {t('confirm_order.message_error.dont_have_price')}
                                    </Typography>
                                )}

                                <Typography variant="subtitle2" lineHeight="1.4rem" minWidth="50%" color="error.main">
                                    {t('confirm_order.message_error.apologize')}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box width="100%" display="flex" flexDirection="row" justifyContent="center">
                    <Box width="45%" marginRight="1%">
                        <Box
                            width="100%"
                            height="10%"
                            bgcolor="white"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            boxShadow=" 0 0.05rem 0.4rem rgba(0, 0, 0, 0.25)"
                            borderRadius="0.3rem"
                        >
                            <Box display="flex" flexDirection="row" minWidth="40%" marginLeft="3%">
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700" minWidth="35%">
                                    {t('confirm_order.customer_code')}
                                </Typography>
                                <Typography variant="h4" lineHeight="1.5rem" color="primary.main">
                                    {store.customerCodes[0].ERPCustomerCode}
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700" minWidth="90%">
                                    {t('confirm_order.factory_name')}
                                </Typography>
                                <Typography variant="h4" lineHeight="1.5rem" color="primary.main" minWidth="50%">
                                    {store.receiveLocationName}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            width="100%"
                            bgcolor="white"
                            display="flex"
                            flexDirection="column"
                            boxShadow=" 0 0.05rem 0.4rem rgba(0, 0, 0, 0.25)"
                            borderRadius="0.3rem"
                            marginTop="2%"
                            paddingBottom="2% "
                        >
                            <Box display="flex" flexDirection="row" width="100%" margin="3%">
                                <Box display="flex" flexDirection="row" minWidth="20%">
                                    <Typography variant="h1" minWidth="48%" marginRight="1rem">
                                        {t('confirm_order.product')}
                                    </Typography>
                                    <Typography variant="h3">{productCodeAmount}</Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" width="40%">
                                    <Typography variant="h1" marginRight="1rem" minWidth="20%">
                                        {t('confirm_order.weight')}
                                    </Typography>
                                    <Typography variant="h3" minWidth="30%">
                                        {store.totalWeight / 1000} {t('confirm_order.ton')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" flexDirection="column" margin="0 3% 0 3%">
                                <Table size="small">
                                    <TableHead
                                        style={{
                                            borderBottom: `0.08rem solid ${theme.palette.grey[300]}`,
                                        }}
                                    >
                                        <TableRow>
                                            <TableCellCustom align="left">
                                                {t('confirm_order.product_code')}
                                            </TableCellCustom>
                                            <TableCellCustom align="center">
                                                {t('confirm_order.quantity')}
                                            </TableCellCustom>
                                            <TableCellCustom align="center">
                                                {t('confirm_order.weight')} ({t('confirm_order.ton')})
                                            </TableCellCustom>
                                            <TableCellCustom align="center">
                                                {t('confirm_order.date_request')}
                                            </TableCellCustom>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {store.cartOrder.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCellCustom align="left">{product.productCode}</TableCellCustom>
                                                <TableCellCustom align="center">{product.quantity}</TableCellCustom>
                                                <TableCellCustom align="center">
                                                    {(product.quantity * product.weight) / 1000}
                                                </TableCellCustom>
                                                <TableCellCustom align="center">
                                                    {product.requestedDeliveryDate.toLocaleDateString('pt-PT')}
                                                </TableCellCustom>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        width="25%"
                        bgcolor="white"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        boxShadow=" 0 0.05rem 0.4rem rgba(0, 0, 0, 0.25)"
                        borderRadius="0.3rem"
                        padding=" 1% 1% 2% 1%"
                        marginBottom="4rem"
                    >
                        <Box
                            borderBottom={`0.05rem  solid ${theme.palette.grey[100]}`}
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="space-evenly"
                            width="100%"
                            marginBottom="1rem"
                        >
                            <Typography variant="h6" lineHeight="1.5rem" color="grey.700" marginBottom="1rem">
                                {t('confirm_order.infor_order')}
                            </Typography>

                            <Box width="100%" display="flex" flexDirection="row" marginBottom="1rem">
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700" minWidth="50%">
                                    {t('confirm_order.full_name')}
                                </Typography>
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700">
                                    {store.deliveryInfor.fullName}
                                </Typography>
                            </Box>
                            <Box width="100%" display="flex" flexDirection="row" marginBottom="1rem">
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700" minWidth="50%">
                                    {t('confirm_order.phone_number')}
                                </Typography>
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.700">
                                    {store.deliveryInfor.phoneNumber}
                                </Typography>
                            </Box>
                            <Box width="100%" display="flex" flexDirection="column" marginBottom="1rem">
                                <Typography
                                    variant="subtitle2"
                                    lineHeight="1.5rem"
                                    color="grey.700"
                                    minWidth="50%"
                                    marginBottom="0.9rem"
                                >
                                    {t('confirm_order.address_order')}
                                </Typography>
                                <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.300" paddingLeft="1%">
                                    {shippingAddress}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            borderBottom={`0.05rem  solid ${theme.palette.grey[100]}`}
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="space-evenly"
                            width="100%"
                            marginBottom="1rem"
                        >
                            <Typography variant="h6" lineHeight="1.5rem" color="grey.700" marginBottom="1rem">
                                {t('confirm_order.note')}
                            </Typography>

                            <TextArea value={store.deliveryInfor.note} minRows="7" disabled={true} />
                            <Box display="flex" flex-flow="row">
                                <Typography
                                    variant="subtitle2"
                                    lineHeight="1.5rem"
                                    color="grey.300"
                                    marginBottom="1.1rem"
                                    paddingRight="0.2rem"
                                >
                                    {t('confirm_order.expect_data')}
                                </Typography>
                                {store.resultRequestDates.map((item, index) => {
                                    if (store.resultRequestDates.length === 1) {
                                        item = item + '.';
                                    } else if (0 < index && index < store.resultRequestDates.length - 1)
                                        item = `, ${item} `;
                                    else if (
                                        store.resultRequestDates.length !== 1 &&
                                        index === store.resultRequestDates.length - 1
                                    )
                                        item = '\xa0' + `và  ${item} .`;

                                    return (
                                        <Typography
                                            key={index}
                                            variant="subtitle2"
                                            lineHeight="1.5rem"
                                            color="grey.300"
                                            marginBottom="1.1rem"
                                        >
                                            {item}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </Box>

                        <Box flexDirection="column" alignItems="center" justifyContent="space-evenly" width="100%">
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="h6" lineHeight="1.5rem" color="grey.700" marginBottom="1rem">
                                    {t('confirm_order.total_cost')}
                                </Typography>
                                <Typography variant="h3" lineHeight="1.5rem" color="primary.main" marginLeft="1rem">
                                    {TotalMoneyInDecimal} {t('confirm_order.unit_VND')}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2" lineHeight="1.5rem" color="grey.300" marginBottom="2rem">
                                {t('confirm_order.cost_infor')}
                            </Typography>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <GenericButton
                                    height="2.5rem"
                                    margin="0 2% 0 0"
                                    width="45%"
                                    hoverColor={theme.palette.common.white}
                                    backgroundColor={theme.palette.secondary.main}
                                    content={t('confirm_order.edit')}
                                    onClick={handleClickEditButton}
                                />
                                <GenericButton
                                    height="2.5rem"
                                    margin="0 2% 0 0"
                                    width="45%"
                                    backgroundColor={theme.palette.primary.main}
                                    hoverColor={theme.palette.common.white}
                                    content={t('confirm_order.make_order')}
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Dialog onClose={handleCancelConfirmOrder} open={open}>
                <DialogTitle>{t('confirm_order.message.confirm')}</DialogTitle>
                <BoxOfButton>
                    <CancelButtonlCustom
                        onClick={handleCancelConfirmOrder}
                        backgroundColor={theme.palette.grey[400]}
                        hoverColor={theme.palette.common.white}
                    >
                        {t('confirm_order.no')}
                    </CancelButtonlCustom>
                    <ConfirmButtonlCustom
                        onClick={handleClickConfirmOrder}
                        backgroundColor={theme.palette.primary.main}
                        hoverColor={theme.palette.common.white}
                    >
                        {t('confirm_order.yes')}
                    </ConfirmButtonlCustom>
                </BoxOfButton>
            </Dialog>
        </Box>
    );
};

export default observer(Complete);

const TableCellCustom = styled(TableCell)`
    font-weight: 400;
    line-height: 1.5rem;
    height: 2.5rem;
    font-size: 18px;
    border-bottom: 0.01rem solid ${theme.palette.grey[100]};
`;

const TextArea = styled(TextareaAutosize)`
    resize: none;
    width: 96%;
    margin-bottom: 1rem;
    background-color: ${theme.palette.grey[50]};
    border: 0.05rem solid ${theme.palette.grey[100]};
    border-radius: 0.3rem;
    padding: 1% 2%;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5rem;
    color: '#686767';
    padding-left: 1%;
    font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'";
`;

const BoxOfButton = styled(Box)`
    margin: 2rem 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CancelButtonlCustom = styled(GenericButton)`
    width: 45%;
    height: 2.5rem;
    border-radius: 0.3rem;
    font-weight: 500;
    font-size: 1rem;
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.grey[100]};
    :hover {
        border: 2px solid ${theme.palette.grey[100]};
        color: ${theme.palette.grey[100]};
    }
`;

const ConfirmButtonlCustom = styled(CancelButtonlCustom)`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.common.white};
    :hover {
        border: 2px solid ${theme.palette.primary.main};
        color: ${theme.palette.primary.main};
    }
`;
