import React from 'react';
import { Box, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';

import demoIcon from '../assets/PlayGroundTestIcon.png';
import { TextTransform } from '../styles/types';
import { theme } from '../styles/theme';

import OrderPackageAmount from './OrderPackageAmount';
import Button from './Button';
import SelectBox from './SelectBox';
import Image from './Image';
import { showErrorToaster, showSuccessToaster } from './Toaster';

const Playground: React.FunctionComponent = observer(() => {
    const { t } = useTranslation();

    const [selectBoxValue, setSelectBoxValue] = React.useState<string>('');
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [amountValue, setAmountValue] = React.useState<number>(0);

    // DateTime Picker Method
    const onChange = (newValue: Date | null) => {
        setDateValue(newValue);
    };

    // Method
    const btnOnClick = () => {
        alert('Button Clicked');
    };

    //Set up for Select Box
    const optionList = [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
    ];
    const selectBoxOnChange = (event: SelectChangeEvent<any>) => {
        setSelectBoxValue(event.target.value);
    };

    return (
        <>
            <Box display="flex" padding="3rem" flexDirection="column" rowGap="1rem">
                <Box display="flex" flexDirection="row" columnGap="10%" justifyContent="flex-start" alignItems="center">
                    <Typography>Order Package :</Typography>
                    <OrderPackageAmount value={amountValue} onChange={setAmountValue} />
                </Box>
                <Box display="flex" flexDirection="row" columnGap="10%" justifyContent="flex-start" alignItems="center">
                    <Typography>Date Time Picker :</Typography>

                    <DatePicker
                        value={dateValue}
                        disablePast
                        onChange={(newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                columnGap="10%"
                justifyContent="flex-start"
                alignItems="center"
                padding="2rem"
            >
                <Typography>Button :</Typography>
                <Button
                    content={'Đăng nhập'}
                    textTransform={TextTransform.None}
                    backgroundColor={theme.palette.primary.main}
                    hoverColor={theme.palette.common.white}
                    onClick={btnOnClick}
                    height="20%"
                    width="10%"
                />
                <Button
                    startIcon={<Image src={demoIcon} />}
                    backgroundColor="black"
                    hoverColor="white"
                    content={'Them vao don hang'}
                    textTransform={TextTransform.None}
                    onClick={btnOnClick}
                    height="100%"
                    width="12%"
                />
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                columnGap="10%"
                justifyContent="flex-start"
                alignItems="center"
                padding="2rem"
            >
                <Typography>SelectBox with Default Label: </Typography>
                <SelectBox
                    options={optionList}
                    value={selectBoxValue}
                    onChange={selectBoxOnChange}
                    label={'Chọn địa điểm'}
                />
            </Box>
            <Button
                margin="10rem"
                width="10rem"
                height="5rem"
                content="fail"
                backgroundColor={theme.palette.error.main}
                hoverColor={theme.palette.grey[100]}
                onClick={() => {
                    showErrorToaster(t('confirm_order.message.fail'));
                }}
            />
            <Button
                margin="10rem"
                width="10rem"
                height="5rem"
                content="successful"
                backgroundColor={theme.palette.primary.main}
                hoverColor={theme.palette.grey[100]}
                onClick={() => {
                    showSuccessToaster(t('confirm_order.message.success'));
                }}
            />
        </>
    );
});

export default Playground;
