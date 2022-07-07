import React from 'react';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import { Star, AddBox } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import AddToCartImage from '../../../assets/AddToCartIcon.png';
import ActivePackageImage from '../../../assets/Package_Active.png';
import InActivePackageImage from '../../../assets/Package_Inactive.png';
import ActivePelletSizeImage from '../../../assets/PelletSize_Active.png';
import InActivePelletSizeImage from '../../../assets/PelletSize_InActive.png';
import { useProductStore } from '../store';
import Image from '../../../components/Image';
import { theme } from '../../../styles/theme';
import { OrderErrorType, OrderItemLine, Product, ProductCode } from '../../../types';
import { getRequestedDateDelivery } from '../../../infra/requestedDateDelivery';
import { removeDuplicatedItem } from '../../../infra/removeDuplicatedValue';
import { useOrderStore } from '../../Order/store';
import { showSuccessToaster } from '../../../components/Toaster';
import { ProductCodeOrderType } from '../types';

import ProductCodePopUp from './ProductCodePopUp';
import OrderItem from './OrderItem';

type Props = {
    isMarketingProduct: boolean;
    product?: Product;
    setError?: (type: OrderErrorType) => void;
    isError?: (noError: boolean) => void;
};

const ProductDetailContent: React.FunctionComponent<Props> = (props: Props) => {
    const { isMarketingProduct, setError, isError, product } = props;
    const { t } = useTranslation();
    const { store: productStore } = useProductStore();
    const { store: orderStore } = useOrderStore();

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [pelletSize, setPelletSize] = React.useState<number>(-1);
    const [pelletSizes, setPelletSizes] = React.useState<number[]>([]);
    const [productCodes, setProductCodes] = React.useState<ProductCode[]>([]);
    const [packagingType, setPackagingType] = React.useState<string>('');
    const [packagingTypes, setPackagingTypes] = React.useState<string[]>([]);
    const [disableRequest, setDisableRequest] = React.useState<boolean>(isMarketingProduct);
    const [orderItemLines, setOrderItemLines] = React.useState<OrderItemLine[]>([]);
    const [noError, setNoError] = React.useState<boolean>(true);

    const setNewPackageTypes = (packagingTypes: string[]) => {
        const uniquePackageTypes = removeDuplicatedItem(packagingTypes);
        setPackagingTypes(uniquePackageTypes);
    };

    const choosingPelletSizeItem = (item: number) => {
        setPelletSize(item);
        const filterProductCode = productStore.currentListProductCode.filter(
            (productCode) => productCode.Millimeter === item,
        );
        setNewPackageTypes(filterProductCode.map((item) => item.PackagingType).sort());
    };

    const choosingPackagingTypeItem = (item: string) => {
        setPackagingType(item);
    };

    const handleClickPelletSizeItem = (item: number) => {
        choosingPelletSizeItem(item);
        setDisableRequest(true);
        setPackagingType('');
    };
    const handleClickPackagingTypeItem = (item: string) => {
        choosingPackagingTypeItem(item);
        setDisableRequest(false);
        setOpenDialog(true);
    };

    const generateOrderItem = (cartOrder: OrderItemLine[], productCode: ProductCode) => {
        const isMoreThanOneOrder = orderItemLines.length >= 1;
        const nextOrdinal =
            orderItemLines.length === 0 ? cartOrder.length : orderItemLines[orderItemLines.length - 1].ordinal + 1;
        const newOrderItem: OrderItemLine = {
            productCodeId: productCode.Id,
            productCode: productCode.Code,
            quantity: 0,
            totalWeight: 0,
            orderType: productCode.OrderType,
            ordinal: isMoreThanOneOrder ? nextOrdinal : cartOrder.length,
            requestedDeliveryDate: getRequestedDateDelivery('Vietnam', productStore.addedDaysForRDD),
            weight: productCode.Weight,
        };

        return newOrderItem;
    };

    const formatDate = (date: Date) => {
        return moment(date).format('L');
    };

    const isDuplicatedDate = (arr: Date[]) => {
        let isError = false;
        arr.forEach((item, index) => {
            for (let i = index + 1; i < arr.length; i++) {
                if (formatDate(item) === formatDate(arr[i])) {
                    isError = true;
                    return isError;
                }
            }
        });
        return isError;
    };

    React.useEffect(() => {
        const uniquePelletSizes = removeDuplicatedItem(
            productStore.currentListProductCode.map((item) => item.Millimeter),
        );
        setPelletSizes(uniquePelletSizes.sort((a, b) => a - b));
    }, [productStore.currentListProductCode]);

    React.useEffect(() => {
        if (pelletSizes.length === 1) {
            const filterProductCode = productStore.currentListProductCode.filter(
                (item) => item.Millimeter === pelletSizes[0],
            );
            const filterPackagingType = filterProductCode.map((item) => item.PackagingType);
            setNewPackageTypes(filterPackagingType.sort());
            setPelletSize(pelletSizes[0]);
        }
    }, [pelletSizes]);

    React.useEffect(() => {
        const filteredProductCodes = productStore.currentListProductCode.filter(
            (i) => i.Millimeter === pelletSize && i.PackagingType === packagingType,
        );
        setProductCodes(filteredProductCodes);
        if (!isMarketingProduct) {
            return;
        }

        if (filteredProductCodes.length === 1) {
            productStore.setProductCode(filteredProductCodes[0]);
        } else {
            productStore.resetProductCode();
        }
    }, [packagingType]);

    React.useEffect(() => {
        if (productStore.productCode.Id === '') {
            setOrderItemLines([]);
        } else {
            const newOrderItemLine = generateOrderItem(orderStore.cartOrder, productStore.productCode);
            setOrderItemLines([newOrderItemLine]);
        }
    }, [productStore.productCode]);

    const isOnePelletProduct = pelletSizes.length === 1;
    const OrderAmountTitle =
        productStore.productCode.OrderType === ProductCodeOrderType.Package
            ? `${t('product.detail.package_amount')}`
            : `${t('product.detail.weight')}`;
    return (
        <>
            <Box display="flex" flexDirection="row" columnGap="10%" width="70%" maxWidth="70%">
                {isMarketingProduct ? (
                    <Image src={product?.Image} height="25rem" width="25rem" />
                ) : (
                    <Image height="25rem" width="25rem" />
                )}
                <Box width="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography textTransform="uppercase" variant="h6">
                            {product?.Name}
                        </Typography>
                    </Box>
                    <Box
                        width="40rem"
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        padding="1rem 0"
                    >
                        {!isMarketingProduct ? (
                            <>
                                {productStore.productCode.Millimeter !== 0 && (
                                    <Box paddingRight="1rem">
                                        <Typography textTransform="uppercase">Giá tiền</Typography>
                                        <Typography textTransform="uppercase">{product?.GiaTien}</Typography>
                                        <Box
                                            width="16rem"
                                            display="flex"
                                            flexDirection="row"
                                            justifyContent="flex-start"
                                            columnGap="1rem"
                                            flexWrap="wrap"
                                            padding="1rem 0"
                                        ></Box>
                                    </Box>
                                )}

                                <Box>
                                    <Box
                                        width="16rem"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        rowGap="1rem"
                                        flexWrap="wrap"
                                        padding="1rem 0"
                                    ></Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box>
                                    <Typography textTransform="uppercase">
                                        {t('product.detail.choose_pellet_size')}
                                    </Typography>
                                    <Typography textTransform="uppercase">{product?.GiaTien}</Typography>
                                    <Box
                                        width="16rem"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        flexWrap="wrap"
                                        padding="1rem 0"
                                    >
                                        {pelletSizes.map((item, index) => (
                                            <SelectButton
                                                key={index}
                                                onClick={() => {
                                                    handleClickPelletSizeItem(item);
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        item === pelletSize
                                                            ? ActivePelletSizeImage
                                                            : InActivePelletSizeImage
                                                    }
                                                    height="initial"
                                                    width="initial"
                                                />
                                                <PelletTypo
                                                    color={`${item === pelletSize ? 'common.white' : 'grey.300'}`}
                                                >
                                                    {item}
                                                </PelletTypo>
                                            </SelectButton>
                                        ))}
                                    </Box>
                                </Box>

                                <Box>
                                    <Box
                                        width="16rem"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        rowGap="1rem"
                                        flexWrap="wrap"
                                        padding="1rem 0"
                                    >
                                        {packagingTypes.map((item, index) => (
                                            <SelectButton
                                                key={index}
                                                onClick={() => {
                                                    handleClickPackagingTypeItem(item);
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        item === packagingType
                                                            ? ActivePackageImage
                                                            : InActivePackageImage
                                                    }
                                                    height="initial"
                                                    width="initial"
                                                />
                                                <PackageTypo color={`${item === packagingType ? 'white' : 'grey.300'}`}>
                                                    {item}
                                                </PackageTypo>
                                            </SelectButton>
                                        ))}
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                    {!disableRequest && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection="column"
                            columnGap="5%"
                            borderTop={`1px solid ${theme.palette.grey[100]}`}
                        >
                            <Typography width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption">{t('product.detail.requested_date')}</Typography>
                                <Typography variant="caption" marginRight="10%">
                                    {OrderAmountTitle}
                                </Typography>

                                <IconButton
                                    onClick={() => {
                                        const newOrderItemLine = generateOrderItem(
                                            orderStore.cartOrder,
                                            productStore.productCode,
                                        );
                                        setOrderItemLines([...orderItemLines, newOrderItemLine]);
                                    }}
                                >
                                    <AddBox color="primary" fontSize="large" />
                                </IconButton>
                            </Typography>
                            {orderItemLines.map((o, index) => (
                                <OrderItem
                                    index={index}
                                    key={o.productCodeId}
                                    orderItemLine={o}
                                    onOrderItemLineChanged={(orderItemLine: OrderItemLine) => {
                                        setOrderItemLines(
                                            orderItemLines.map((o) =>
                                                o.ordinal === orderItemLine.ordinal ? orderItemLine : o,
                                            ),
                                        );
                                    }}
                                    onOrderItemLineRemoved={(position: number) => {
                                        const updatedOrderItemLines = [...orderItemLines];
                                        updatedOrderItemLines.splice(position, 1);
                                        setOrderItemLines(updatedOrderItemLines);
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
            {productCodes.length > 1 && (
                <ProductCodePopUp
                    productCodes={productCodes}
                    openDialog={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                    }}
                />
            )}
        </>
    );
};

export default ProductDetailContent;

const StyledButton = styled(Button)`
    margin-top: 0.5rem;
    height: 3rem;
    width: 100%;
    text-transform: uppercase;
`;

const SelectButton = styled(Button)`
    display: block;
    text-align: center;
    height: 3.5rem;
    width: 4rem;
`;
const PackageTypo = styled(Typography)`
    position: relative;
    bottom: 2.65rem;
`;
const PelletTypo = styled(Typography)`
    position: relative;
    bottom: 2.5rem;
`;
