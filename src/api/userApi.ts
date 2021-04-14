import axiosClient from './axiosClient';

interface ServerData {
    jwt: string;
    user: any;
}

interface ServerResponse {
    data: ServerData;
}

interface userData {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
}

const userApi = {
    register(data: userData) {
        const url = '/auth/local/register';
        return axiosClient.post<ServerResponse>(url, data);
    },
};

export default userApi;
