import React from 'react';
import { Box, IconButton, styled, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { theme } from '../styles/theme';

type Props = {
    value: number;
    onChange: (newValue: number) => void;
};

const OrderPackageAmount: React.FunctionComponent<Props> = (props: Props) => {
    const { value, onChange } = props;
    const MAXIMUM_NUMBER = 999999;
    const MAXIMUM_INPUT_LENGTH = 6;
    const handleIncreasePackageAmount = () => {
        const increasedPackageAmount = Number(value) + 1;
        if (value >= 0 && value < MAXIMUM_NUMBER) {
            onChange(increasedPackageAmount);
        } else onChange(0);
    };
    const handleDecreasePackageAmount = () => {
        const decreasePackageAmount = Number(value);
        if (value > 0) {
            onChange(decreasePackageAmount - 1);
        }
    };
    const textFieldOnChange = (event: any) => {
        if (event.target.value) {
            const changedValue = event.target.value as string;
            if (changedValue.length <= MAXIMUM_INPUT_LENGTH) onChange(event.target.value);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="138px"
            border={`0.063rem solid ${theme.palette.grey[100]}`}
        >
            <StyledLeftIconButton onClick={handleDecreasePackageAmount}>
                <Remove />
            </StyledLeftIconButton>
            <StyledTextField
                type="number"
                InputProps={{
                    inputProps: {
                        style: { textAlign: 'center', height: '100%' },
                    },
                }}
                variant="standard"
                defaultValue={value}
                value={value}
                onChange={textFieldOnChange}
            />
            <StyledRightIconButton onClick={handleIncreasePackageAmount}>
                <Add />
            </StyledRightIconButton>
        </Box>
    );
};
export default OrderPackageAmount;

const StyledLeftIconButton = styled(IconButton)`
    height: '100%';
    width: '10%';
    border-right: 0.063rem solid ${theme.palette.grey[100]};
    border-radius: 0;
`;
const StyledRightIconButton = styled(IconButton)`
    height: '100%';
    width: '10%';
    border-left: 0.063rem solid ${theme.palette.grey[100]};
    border-radius: 0;
`;
const StyledTextField = styled(TextField)`
    height: '70%';
    width: '5%';
    padding: '0 1rem';
    text-align: 'center';
    border: none;
    &:hover {
        border: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
