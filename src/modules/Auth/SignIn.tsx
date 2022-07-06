import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { IconButton, Typography, Box, InputBase, styled } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';

import Button from '../../components/Button';
import Image from '../../components/Image';
import loginBackground from '../../assets/loginBackground.png';
import logoLogin from '../../assets/logoLogin.png';
import { userNameRegex } from '../../infra/regex';
import { TextTransform } from '../../styles/types';
import { theme } from '../../styles/theme';

import { useAuthStore } from './store';

const { palette } = theme;

const SignIn: React.FunctionComponent = () => {
    const [username, setUserName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const { store: authStore } = useAuthStore();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<boolean>(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        setHasError(false);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setHasError(false);
    };

    const onSignIn = async (event: any) => {
        event.preventDefault();
        setHasError(!userNameRegex.test(username) || !password);

        if (Object.values(hasError).some((err) => err)) {
            return;
        }
        try {
            await authStore.Login(username, password);
            navigate('/products');
        } catch {
            setHasError(true);
        }
    };

    if (authStore.userProfile) {
        return <Navigate to="/" replace />;
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={`1px solid ${palette.primary.main}`}
            bgcolor="grey.700"
            height="100vh"
        >
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="55%">
                <Box
                    component="form"
                    bgcolor="white"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="25vw"
                    onSubmit={onSignIn}
                >
                    <Typography color="grey.700" paddingTop="2%">
                        {t('login_page.login_with_your_account')}
                    </Typography>
                    <Box
                        width="80%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-around"
                        alignItems="center"
                        rowGap="1rem"
                        padding="1rem 0"
                    >
                        <Box
                            width="90%"
                            height="20%"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            columnGap="1rem"
                            border={`0.5px solid ${palette.primary.main}`}
                        >
                            <StyledPerson color="primary" />
                            <StyledInputBase
                                value={username}
                                type="text"
                                placeholder={t('login_page.user_name')}
                                onChange={handleUserName}
                            />
                        </Box>
                        <Box
                            width="90%"
                            height="20%"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            columnGap="1rem"
                            border={`0.5px solid ${palette.primary.main}`}
                        >
                            <StyledLock color="primary" />
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="85%"
                            >
                                <StyledInputBase
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('login_page.password')}
                                    onChange={handlePassword}
                                />

                                <IconButtonCustom edge="end" onClick={() => setShowPassword((s) => !s)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButtonCustom>
                            </Box>
                        </Box>
                        <Typography
                            width="100%"
                            fontSize="0.8rem"
                            height="0.8rem"
                            margin="0.1rem 0 0.5rem 2.2rem"
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-start"
                            color="error"
                        >
                            {hasError ? t('login_page.error') : null}
                        </Typography>
                        <Button
                            color="primary"
                            content="Đăng nhập"
                            textTransform={TextTransform.None}
                            onClick={onSignIn}
                            height="2.5rem"
                            width="90%"
                            backgroundColor={theme.palette.primary.main}
                            hoverColor={theme.palette.common.white}
                        />
                    </Box>
                </Box>
                <Image src={loginBackground} height="100%" width="initial" />
            </Box>
        </Box>
    );
};

export default observer(SignIn);

const StyledPerson = styled(Person)`
    margin-left: 2%;
    padding-right: 1%;
    min-width: 3%;
    height: 70%;
    border-right: 1px solid ${theme.palette.grey[100]};
`;

const StyledInputBase = styled(InputBase)`
    height: '100%';
    border: 'none';
    input:-webkit-autofill,
    input:-webkit-autofill:focus {
        transition: background-color 600000s 0s, color 600000s 0s;
    }
`;

const StyledLock = styled(Lock)`
    margin-left: 2%;
    padding-right: 1%;
    min-width: 3%;
    height: 70%;
    border-right: 1px solid ${theme.palette.grey[100]};
`;

const ImageCustome = styled(Image)`
    margin-top: 2rem;
`;

const IconButtonCustom = styled(IconButton)`
    margin-right: 1%;
    min-width: 4%;
`;
