import { Typography, styled, FormControl, FormLabel, TextField as MuiTextField } from '@mui/material';
import React from 'react';

import { theme } from '../styles/theme';

type Props = {
    isRequired?: boolean;
    label: string;
    paddingTop?: string;
    paddingBottom?: string;
    marginLeft?: string;
    width?: string;
    value: string;
    onChange: (value: string) => void;
};

const TextField: React.FunctionComponent<Props> = (props: Props) => {
    const { isRequired, label, value, onChange, paddingTop, paddingBottom, marginLeft, width } = props;

    return (
        <InputWrapper>
            <StyleLabel variant="body2" paddingTop={paddingTop} paddingBottom={paddingBottom}>
                {label} {isRequired && <Asterisk>*</Asterisk>}
            </StyleLabel>
            <StyleTextField
                variant="standard"
                size="small"
                fullWidth={true}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                paddingTop={paddingTop}
                paddingBottom={paddingBottom}
                marginLeft={marginLeft}
                width={width}
                required={isRequired}
            />
        </InputWrapper>
    );
};

export default TextField;

const StyleLabel = styled(Typography)(
    ({ paddingTop, paddingBottom }: { paddingTop: string | undefined; paddingBottom: string | undefined }) => ({
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
    }),
);

const StyleTextField = styled(MuiTextField)(
    ({
        paddingTop,
        paddingBottom,
        marginLeft,
        width,
    }: {
        paddingTop: string | undefined;
        paddingBottom: string | undefined;
        marginLeft: string | undefined;
        width: string | undefined;
    }) => ({
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        marginLeft: marginLeft,
        width: width,
        '&:before': {
            borderBottom: `0.025rem solid`,
        },
    }),
);

const InputWrapper = styled(FormControl)`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Asterisk = styled(FormLabel)`
    color: ${theme.palette.error.main};
`;
