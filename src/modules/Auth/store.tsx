import React from 'react';
import { Typography } from '@mui/material';
import { makeAutoObservable, observable } from 'mobx';

import { $get, $post } from '../../infra/http';
import { asyncAction } from '../../infra/mobx';
import useAsyncFunction from '../../infra/useAsyncFunction';

const md5 = require('md5');

type StoreProviderProps = {
    children: React.ReactNode;
};

type User = {
    Username: string;
    FullName: string;
    Email: string;
    Role: string;
};

// type AuthenticationResponse = User & {
//     User: User;
//     AccessToken: string;
// };
class AuthStore {
    @observable FullName = '';
    @observable userProfile: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    @asyncAction
    public *Login(username: string, password: string) {
        const query: string = '/login/' + username + '/' + password;
        const responseOfFetchAuth: User = yield $get(query);
        console.log('responseOfFetchAuth', responseOfFetchAuth);
        localStorage.setItem('Username', responseOfFetchAuth.Username);
        localStorage.setItem('Role', responseOfFetchAuth.Role);
    }

    public LogOut() {
        localStorage.removeItem('Username');
        localStorage.removeItem('Role');
    }
}

const AuthStoreContext = React.createContext({} as { store: AuthStore });

let store: AuthStore | null = new AuthStore();

export const AuthStoreProvider = (props: StoreProviderProps) => {
    const { children } = props;
    if (!store) {
        store = new AuthStore();
    }

    return <AuthStoreContext.Provider value={{ store }}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = () => React.useContext(AuthStoreContext);
