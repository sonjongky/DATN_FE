import React from 'react';
import {
    Typography,
    Badge,
    Box,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    styled,
    Button as MuiButton,
    IconButton,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logoImage from '../assets/logo.png';
import languageImage from '../assets/language.png';
import userImage from '../assets/user.png';
import cartImage from '../assets/cart.png';
import { theme } from '../styles/theme';
import GenericButton from '../components/Button';
import { useAuthStore } from '../modules/Auth/store';
import { useOrderStore } from '../modules/Order/store';
import { removeDuplicatedItem } from '../infra/removeDuplicatedValue';

import Image from './Image';

const Header: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const [itemWasChosen, setItemWasChosen] = React.useState<null | HTMLElement>(null);
    const isOpenDialog = Boolean(itemWasChosen);
    const [isLogOut, setIsLogOut] = React.useState(false);
    const { store: authStore } = useAuthStore();
    const { store: orderStore } = useOrderStore();

    const navigate = useNavigate();

    const handleClickUserName = (event: React.MouseEvent<HTMLButtonElement>) => {
        setItemWasChosen(event.currentTarget);
    };
    const handleClickLogOut = () => {
        setItemWasChosen(null);
        setIsLogOut(true);
    };

    const handleCancelLogOut = () => {
        setItemWasChosen(null);
        setIsLogOut(false);
    };
    const handleConfirmLogOut = () => {
        setItemWasChosen(null);
        setIsLogOut(false);
        authStore.LogOut();
        navigate('/auth/sign-in');
    };

    const userName = authStore.userProfile?.FullName;
    const productCodeList = orderStore.cartOrder.map((item) => item.productCode);
    const cartNumber = removeDuplicatedItem(productCodeList).length;
    return (
        <Box height="5.938rem" width="90%" display="flex" justifyContent="space-between" alignItems="center">
            <Link to="/">
                <Image src={logoImage} width="initial" height="initial" />
            </Link>
            <Box
                display="flex"
                flexDirection="row"
                padding="0 1rem"
                justifyContent="center"
                alignItems="center"
                columnGap="3%"
            >
                {/* Will Remove Hidden when Language Switcher Action Finish */}
                <ButtonSelect sx={{ visibility: 'hidden' }}>
                    <Image src={languageImage} width="initial" height="initial" />
                    <StyledTypo color="grey.300">{t('language')}</StyledTypo>
                </ButtonSelect>
                <ButtonSelect
                    id="buttonSelect"
                    color="inherit"
                    aria-controls={isOpenDialog ? 'menuCustom' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpenDialog ? 'true' : undefined}
                    onClick={handleClickUserName}
                >
                    <Image src={userImage} width="initial" height="initial" />
                    <StyledTypo color="grey.300">{userName}</StyledTypo>
                </ButtonSelect>
                <MenuCustom
                    id="menuCustom"
                    anchorEl={itemWasChosen}
                    open={isOpenDialog}
                    onClose={handleCancelLogOut}
                    MenuListProps={{
                        'aria-labelledby': 'buttonSelect',
                    }}
                >
                    <MenuItemCustom onClick={handleClickLogOut}>{t('logout.text')}</MenuItemCustom>
                </MenuCustom>
                <IconButton
                    onClick={() => {
                        navigate('/order');
                    }}
                >
                    <Box display="flex" justifyContent="center" flexDirection="column" marginLeft="5%">
                        <CartBadge color="error" badgeContent={cartNumber}>
                            <Image src={cartImage} width="initial" height="initial" />
                        </CartBadge>
                    </Box>
                </IconButton>
            </Box>

            <Dialog onClose={handleCancelLogOut} open={isLogOut}>
                <DialogTitle marginTop="2%" width="20vw">
                    {t('logout.confirm_message')}
                </DialogTitle>
                <BoxOfButton>
                    <CancelButtonlCustom
                        onClick={handleCancelLogOut}
                        backgroundColor={theme.palette.grey[400]}
                        hoverColor={theme.palette.common.white}
                    >
                        {t('No')}
                    </CancelButtonlCustom>
                    <ConfirmButtonlCustom
                        onClick={handleConfirmLogOut}
                        backgroundColor={theme.palette.primary.main}
                        hoverColor={theme.palette.common.white}
                    >
                        {t('Yes')}
                    </ConfirmButtonlCustom>
                </BoxOfButton>
            </Dialog>
        </Box>
    );
};

export default observer(Header);

const StyledTypo = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    text-align: center;
`;

const CartBadge = styled(Badge)`
    margin-right: 30%;
`;

const ButtonSelect = styled(MuiButton)`
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row;
    column-gap: 0.8rem;
`;

const MenuCustom = styled(Menu)`
    margin-top: 1rem;
    box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
`;

const MenuItemCustom = styled(MenuItem)`
    width: 10rem;
`;

const BoxOfButton = styled(Box)`
    margin: 0.5rem 5rem 2rem;
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
