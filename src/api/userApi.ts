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

export interface registerAxiosRequest {
    data: userDataRegister;
}
export interface loginAxiosRequest {
    data: userDataLogin;
}

const userApi = {
    register(data: userDataRegister) {
        const url = '/auth/local/register';
        return axiosClient.post<registerAxiosRequest>(url, data);
    },
    login(data: userDataLogin) {
        const url = '/auth/local';
        return axiosClient.post<loginAxiosRequest>(url, data);
    },
};

export default userApi;
