import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup, Typography } from '@mui/material';

import { useProductStore } from '../store';
import { Brands } from '../../../types';

const Sidebar: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();
    const { store } = useProductStore();

    return (
        <Box
            marginTop="2%"
            width="10%"
            paddingLeft="5%"
            rowGap="2rem"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            bgcolor="common.white"
        >
            <Box display="flex" justifyContent="center" flexDirection="column">
                <Typography color="common.black"> {t('product.brand')}</Typography>
                <FormGroup>
                    {store.brands.map((item) => {
                        const checked = store.selectedBrands.indexOf(item.Id);
                        const isChecked = checked !== -1;
                        return (
                            <FormControlLabel
                                key={item.Id}
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={() => {
                                            store.setSelectedBrands(item.Id);
                                        }}
                                    />
                                }
                                label={
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        columnGap="0.5rem"
                                        flexDirection="row"
                                    >
                                        <Typography variant="h2">{item.Name}</Typography>
                                    </Box>
                                }
                            />
                        );
                    })}
                </FormGroup>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column">
                <Typography color="common.black"> {t('product.category')}</Typography>
                <FormGroup>
                    {store.categories.map((item) => {
                        const checked = store.selectedCategories.indexOf(item.Id);
                        const isChecked = checked !== -1;
                        return (
                            <FormControlLabel
                                key={item.Id}
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={() => {
                                            store.setSelectedCategories(item.Id);
                                        }}
                                    />
                                }
                                label={
                                    <Box
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        columnGap="0.5rem"
                                        flexDirection="row"
                                    >
                                        <Typography variant="h2">{item.Name}</Typography>
                                    </Box>
                                }
                            />
                        );
                    })}
                </FormGroup>
            </Box>
        </Box>
    );
});

export default Sidebar;

const CheckboxCatgoryIcon = styled.img`
    filter: invert(99%) sepia(9%) saturate(524%) hue-rotate(173deg) brightness(119%) contrast(92%);
    height: 15%;
    width: 15%;
    object-fit: contain;
`;
