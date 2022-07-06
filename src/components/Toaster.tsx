import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { theme } from '../styles/theme';

export const showSuccessToaster = (message: string) => {
    toast.success(message, {
        style: { backgroundColor: `${theme.palette.secondary.main}` },
    });
};

export const showErrorToaster = (message: string) => {
    toast.error(message, {
        style: {
            backgroundColor: `${theme.palette.error.main}`,
        },
    });
};

export const showWarnToaster = (message: string) => {
    toast.warn(message, {
        style: {
            backgroundColor: `${theme.palette.warning.main}`,
        },
    });
};

export const ToasterProvider: React.FunctionComponent = () => (
    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        style={{ minWidth: '21rem' }}
    />
);
