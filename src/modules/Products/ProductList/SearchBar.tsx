import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, IconButton, InputBase, Paper, styled, SelectChangeEvent, Typography } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import SelectBox from '../../../components/SelectBox';
import { useProductStore } from '../store';
import { theme } from '../../../styles/theme';

const SearchBar: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();
    const { store } = useProductStore();
    const location = useLocation();

    const [keyword, setKeyword] = React.useState<string>('');
    const [disableClear, setDisableClear] = React.useState<boolean>(false);

    const clearKeywordOnClick = async () => {
        setDisableClear(false);
        setKeyword('');
        store.reloadProduct();
    };

    const handleCustomerCodeChange = (event: SelectChangeEvent<any>) => {
        store.setDefaultCustomerCode(event.target.value);
    };

    const handleInputOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleFilterClick = () => {
        store.getAvailableProducts();
    };

    React.useEffect(() => {
        if (keyword !== '') setDisableClear(false);
        else setDisableClear(true);
    }, [keyword]);

    React.useEffect(() => {
        setKeyword('');
    }, [location.key]);
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            borderBottom={`0.031rem solid ${palette.common.black}`}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
                textAlign="center"
                columnGap="1rem"
                padding="1rem 0"
            ></Box>
        </Box>
    );
});

export default SearchBar;

const { palette } = theme;

const StyledPaper = styled(Paper)`
    display: flex;
    width: 30%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    width: 28.063rem;
    box-shadow: none;
    transition: ease-in-out 0.3s;
    border: solid 0.063rem ${palette.grey[200]};
    cursor: pointer;
    &:hover {
        border: solid 0.063rem ${palette.common.black};
    }
`;
const StyledInputBase = styled(InputBase)`
    height: 100%;
    flex: 1;
    padding: 0 0.625rem;
`;
const StyledIconButton = styled(IconButton)`
    padding: 0.625rem;
`;
