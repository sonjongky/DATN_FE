import React from 'react';
import { Box, Typography } from '@mui/material';

import { theme } from '../styles/theme';

const Footer: React.FunctionComponent = () => {
    const { palette } = theme;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="34.375rem" bgcolor="primary.main">
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" rowGap="2%" height="80%" width="80%">
                <Box width="23%">
                    <Typography
                        variant="h2"
                        textTransform="uppercase"
                        padding="1rem 0"
                        color="common.white"
                        borderBottom={`1px solid ${palette.common.white}`}
                    >
                        Title Heading
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                </Box>
                <Box width="23%">
                    <Typography
                        variant="h2"
                        textTransform="uppercase"
                        padding="1rem 0"
                        color="common.white"
                        borderBottom={`1px solid ${palette.common.white}`}
                    >
                        Title Heading
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                </Box>

                <Box width="23%">
                    <Typography
                        variant="h2"
                        textTransform="uppercase"
                        padding="1rem 0"
                        color="common.white"
                        borderBottom={`1px solid ${palette.common.white}`}
                    >
                        Title Heading
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                </Box>
                <Box width="23%">
                    <Typography
                        variant="h2"
                        textTransform="uppercase"
                        padding="1rem 0"
                        color="common.white"
                        borderBottom={`1px solid ${palette.common.white}`}
                    >
                        Title Heading
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                    <Typography variant="h4" color="common.white" paddingTop="0.5rem">
                        Subtitle Heading 1
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
