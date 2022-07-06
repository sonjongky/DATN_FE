import React from 'react';
import styled, { css } from 'styled-components';

import NoImage from '../assets/No_Image.png';

type Props = {
    src?: string;
    height?: string;
    width?: string;
};

const onDefaultImage = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    (event.target as HTMLImageElement).src = NoImage;
};

const Image: React.FunctionComponent<Props> = ({ src, height, width }: Props) => (
    <Img src={src || NoImage} height={height || 'initial'} width={width || 'initial'} onError={onDefaultImage} />
);
export default Image;

type ImgProps = {
    height: string;
    width: string;
};
const Img = styled.img<ImgProps>`
    ${({ height, width }) => css`
        height: ${height};
        width: ${width};
        object-fit: contain;
    `}
`;
