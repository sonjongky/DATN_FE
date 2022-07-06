import axios, { AxiosResponse } from 'axios';

const apiURL = `${process.env.REACT_APP_BACKEND_URL}`;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { statusCode, message } = error.response.data;

        if (statusCode === 401 && message === 'invalid token') {
            localStorage.clear();
        }

        return Promise.reject(error);
    },
);

export const $get = async (endpoint: string, option?: any) => {
    const config = {
        headers: {},
        ...option,
    };

    const response: AxiosResponse<any> = await axios.get(` ${apiURL}${endpoint}`, config);

    return response.data;
};

export const $post = async (endpoint: string, data?: any, option?: any) => {
    const config = {
        headers: {},
        ...option,
    };

    const response: AxiosResponse<any> = await axios.post(`${apiURL}${endpoint}`, data, config);

    return response.data;
};

export const $put = async (endpoint: string, data: any, option?: any) => {
    const config = {
        headers: {},
        ...option,
    };

    const response: AxiosResponse<any> = await axios.put(` ${apiURL}${endpoint}`, data, config);

    return response.data;
};

export const $delete = async (endpoint: string, option?: any) => {
    const config = {
        headers: {},
        ...option,
    };

    const response: AxiosResponse<any> = await axios.delete(` ${apiURL}${endpoint}`, config);

    return response.data;
};
