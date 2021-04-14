import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';

export interface userDataRegister {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
}

export interface userDataLogin {
    email?: string;
    password?: string;
}

export interface registerAxiosResponse {
    url: string;
    config?: AxiosRequestConfig;
    data: userDataRegister;
}
export interface loginAxiosResponse {
    url: string;
    config?: AxiosRequestConfig;
    data: userDataLogin;
}

const userApi = {
    register(data: userDataRegister) {
        const url = '/auth/local/register';
        return axiosClient.post<registerAxiosResponse>(url, data);
    },
    login(data: userDataLogin) {
        const url = '/auth/local';
        return axiosClient.post<loginAxiosResponse>(url, data);
    },
};

export default userApi;
