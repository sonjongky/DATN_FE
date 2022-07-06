import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, styled, SelectProps } from '@mui/material';

type Props = {
    options: { key: string; value: string }[];
    label?: string;
};
const SelectBox: React.FunctionComponent<Props & SelectProps> = (props: Props & SelectProps) => {
    const { options, label } = props;

    return (
        <StyledFormControl>
            {label ? (
                <>
                    <StyledInputLabel>{label}</StyledInputLabel>
                    <StyledSelect label={label} {...props}>
                        {options.map((item: any, index: number) => (
                            <MenuItem value={item.key} key={index}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </>
            ) : (
                <StyledSelect {...props}>
                    {options.map((item: any, index: number) => (
                        <MenuItem value={item.key} key={index}>
                            {item.value}
                        </MenuItem>
                    ))}
                </StyledSelect>
            )}
        </StyledFormControl>
    );
};
export default SelectBox;

const StyledFormControl = styled(FormControl)`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const StyledSelect = styled(Select)`
    height: 3rem;
    min-width: 12.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
`;
const StyledInputLabel = styled(InputLabel)`
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
