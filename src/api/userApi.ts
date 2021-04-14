import axiosClient from './axiosClient';

interface ServerData {
    jwt: string;
    user: any;
}

interface ServerResponse {
    data: ServerData;
}

interface userDataRegister {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
}

interface userDataLogin {
    email?: string;
    password?: string;
}

const userApi = {
    register(data: userDataRegister) {
        const url = '/auth/local/register';
        return axiosClient.post<ServerResponse>(url, data);
    },
    login(data: userDataLogin) {
        const url = '/auth/local';
        return axiosClient.post<ServerResponse>(url, data);
    },
};

export default userApi;
