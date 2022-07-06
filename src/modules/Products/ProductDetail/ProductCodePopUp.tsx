import React from 'react';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ProductCode } from '../../../types';
import { theme } from '../../../styles/theme';
import { ProductOrderType } from '../types';
import { useProductStore } from '../store';
type Props = {
    productCodes: ProductCode[];
    openDialog: boolean;
    onClose: () => void;
};

const ProductCodePopUp: React.FunctionComponent<Props> = (props: Props) => {
    const { productCodes, openDialog, onClose } = props;
    const { t } = useTranslation();
    const { store } = useProductStore();
    const navigate = useNavigate();

    return (
        <Dialog open={openDialog} keepMounted onClose={onClose} aria-describedby="alert-dialog-slide-description">
            <DialogTitle textTransform="uppercase" alignSelf="center" variant="caption">
                {t('product.detail.pop_up.product_codes')}
            </DialogTitle>
            <StyledDialogContent>
                {productCodes.map((item) => (
                    <DialogContentText width="100%" key={item.Id}>
                        <Box
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            flexDirection="row"
                            padding="0 0.3rem"
                            border={`1px solid ${theme.palette.primary.main}`}
                            borderRadius="1%"
                        >
                            <Typography variant="body2" color="primary.main">
                                {item.Code}
                            </Typography>
                            <Button
                                onClick={() => {
                                    navigate(
                                        `/products/${store.defaultCustomerCodeId}/${ProductOrderType.ProductCode}/${item.Id}`,
                                    );
                                    onClose();
                                }}
                            >
                                <StyledDialogTypo variant="h2" color="primary.main">
                                    {t('product.detail.pop_up.buy')}
                                </StyledDialogTypo>
                            </Button>
                        </Box>
                    </DialogContentText>
                ))}
            </StyledDialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onClose();
                    }}
                >
                    {t('product.detail.pop_up.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductCodePopUp;

const StyledDialogTypo = styled(Typography)`
    text-decoration: underline;
`;
const StyledDialogContent = styled(DialogContent)`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 2rem;
`;
