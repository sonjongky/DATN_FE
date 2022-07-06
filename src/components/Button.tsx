import { Typography, styled, ButtonProps, Button } from '@mui/material';
import React from 'react';

import { theme } from '../styles/theme';
import { TextTransform } from '../styles/types';

type Props = {
    margin?: string;
    width?: string;
    height?: string;
    content?: string;
    backgroundColor: string;
    hoverColor: string;
    textTransform?: TextTransform;
};

const defaultProps: Props = {
    height: 'initial',
    width: 'initial',
    margin: '0',
    backgroundColor: theme.palette.primary.main,
    hoverColor: theme.palette.primary.main,
    textTransform: TextTransform.None,
};

interface GenericButtonProps extends Props, ButtonProps {}

const GenericButton: React.FunctionComponent<GenericButtonProps> = (props: GenericButtonProps) => {
    const { backgroundColor, hoverColor, height, width, textTransform, margin, content, children } = props;

    return (
        <StyledButton
            color="primary"
            height={height}
            width={width}
            margin={margin}
            textTransform={textTransform}
            bgColor={backgroundColor}
            bgHoverColor={hoverColor}
            {...props}
        >
            {content && <Typography variant="body2">{content}</Typography>}
            {children}
        </StyledButton>
    );
};
GenericButton.defaultProps = defaultProps;

export default GenericButton;

const StyledButton = styled(Button)(
    ({
        height,
        width,
        margin,
        textTransform,
        bgColor,
        bgHoverColor,
    }: {
        height: string | undefined;
        width: string | undefined;
        margin: string | undefined;
        textTransform: TextTransform | undefined;
        bgColor: string;
        bgHoverColor: string;
    }) => ({
        margin: margin,
        height: height,
        width: width,
        textTransform: textTransform,
        backgroundColor: bgColor,
        '&>p': {
            color: 'white',
        },
        '&:hover': {
            border: `1px solid ${bgColor}`,
            backgroundColor: bgHoverColor,
            '&>p': {
                color: bgColor,
            },
        },
    }),
);
