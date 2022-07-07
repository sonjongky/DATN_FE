import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { theme } from '../styles/theme';

import Header from './Header';

const { palette } = theme;

const Navbar: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();
    const role = localStorage.getItem('Role');
    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="common.white"
        >
            <Header />
            <Box
                width="100%"
                height="3.375rem"
                bgcolor="primary.main"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    width="100%"
                    height="3.375rem"
                    bgcolor="primary.main"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        width="60%"
                        height="100%"
                        padding="0 1rem"
                        display="flex"
                        justifyContent="flex-start"
                        columnGap="1rem"
                    >
                        <StyledLink to="/products">
                            <Mode>{t('Mode.product')}</Mode>
                        </StyledLink>
                        {role == 'admin' && (
                            <StyledLink to="/addProducts">
                                <Mode>Thêm sản phẩm</Mode>
                            </StyledLink>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default Navbar;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Mode = styled(Typography)`
    height: 100%;
    display: flex;
    white-space: nowrap;
    align-self: center;
    align-items: center;
    color: ${palette.common.white};
    text-transform: uppercase;
    &:hover {
        cursor: pointer;
        color: ${palette.grey[200]};
    }
`;
