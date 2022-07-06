import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button as MuiButton, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import iconShowButtonImage from '../../../assets/showOptionIcon.png';
import iconAddButtonImage from '../../../assets/AddToCartIcon.png';
import { OrderItemLine, Product, ProductCode, ProductDescriptionKey } from '../../../types';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { TextTransform } from '../../../styles/types';
import { useProductStore } from '../store';
import { ProductOrderType } from '../types';
import { theme } from '../../../styles/theme';
import { useOrderStore } from '../../Order/store';
import { getRequestedDateDelivery } from '../../../infra/requestedDateDelivery';
import { showSuccessToaster } from '../../../components/Toaster';

type Props = {
    productItem: Product;
};

const ProductItem: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation();
    const { store } = useProductStore();
    const { store: orderStore } = useOrderStore();

    const { productItem: product } = props;
    const navigate = useNavigate();

    const showProduct = (product: Product) => {
        navigate(`${product.Id}`);
    };

    const generateOrderItem = (cartOrder: OrderItemLine[], productCode: ProductCode) => {
        const isMoreThanOneOrder = cartOrder.length >= 1;
        const newOrderItem: OrderItemLine = {
            productCodeId: productCode.Id,
            productCode: productCode.Code,
            quantity: 0,
            totalWeight: 0,
            orderType: productCode.OrderType,
            ordinal: isMoreThanOneOrder ? cartOrder.length : 0,
            requestedDeliveryDate: getRequestedDateDelivery('Vietnam', store.addedDaysForRDD),
            weight: productCode.Weight,
        };

        return newOrderItem;
    };
    // const onProductAdded = async (productCodeId: string) => {
    //     await store.initProductCode(productCodeId);
    //     const newOrderItem = generateOrderItem(orderStore.cartOrder, store.productCode);
    //     orderStore.setCartOrder([newOrderItem]);
    //     showSuccessToaster(t('product.detail.message.success'));
    // };

    return (
        <Box
            width="17%"
            height="25rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <StyledButton
                onClick={() => {
                    showProduct(product);
                }}
            >
                <Image src={product.Image} height="10rem" width="100%" />
                <Typography
                    variant="body1"
                    width="80%"
                    color="common.black"
                    lineHeight="1rem"
                    minHeight="2rem"
                    paddingBottom="2%"
                >
                    {product.Name}
                </Typography>

                <Typography width="80%" paddingBottom="1rem" color="grey.300" noWrap={true} variant="body2">
                    {t('product.pellet_size')}: {product.Description}
                </Typography>
            </StyledButton>

            <Box display="flex" flexDirection="row" height="12%" width="100%" columnGap="2%">
                <StyledGenericButton
                    color="primary"
                    width="100%"
                    textTransform={TextTransform.Uppercase}
                    content={t('product.view')}
                    backgroundColor={theme.palette.secondary.main}
                    hoverColor={theme.palette.common.white}
                    onClick={() => {
                        showProduct(product);
                    }}
                />
            </Box>
        </Box>
    );
};

export default ProductItem;

const StyledButton = styled(MuiButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${theme.palette.common.white};
    width: 100%;
    text-transform: none;
    &:hover {
        background-color: ${theme.palette.common.white};
    }
    & > p {
        & > p {
            color: ${theme.palette.primary.main};
        }
    }
`;
const StyledGenericButton = styled(Button)`
    padding: 0;
    &:hover {
        padding: 0;
    }
`;
