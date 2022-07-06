import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        info: {
            main: '#F7941D',
        },
        primary: {
            main: '#006FB7',
        },
        secondary: { main: '#97be0d' },
        error: {
            main: '#EF413D',
            light: '#FFCECE',
        },
        grey: {
            50: '#FAFAFA',
            100: '#B2B2B2',
            200: '#DADADA',
            300: '#686767',
            400: '#F2F2F2',
            700: '#2d3743',
        },
    },
    typography: {
        allVariants: {
            fontFamily: 'inherit',
        },
        subtitle1: {
            fontSize: '0.75rem',
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        h1: {
            fontSize: '1.125rem',
        },
        h2: {
            fontSize: '0.75rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.125rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        h5: {
            fontStyle: '1.25rem',
            fontWeight: 400,
        },
        h6: {
            fontStyle: '1.563rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '0.938rem',
            fontWeight: 500,
        },
        body2: {
            fontSize: '0.813rem',
            fontWeight: 500,
        },

        caption: {
            fontSize: '16px',
            fontWeight: '500',
            textTransform: 'uppercase',
        },
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    width: '10rem',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: '0 0.5rem',
                    width: '6rem',
                    height: '2.625rem',
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: 'none',
                    },
                    '&:hover': {
                        '&:before': {
                            borderBottom: 'none',
                        },
                    },
                },
            },
        },
    },
});
