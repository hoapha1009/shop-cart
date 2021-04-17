import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

const categoryApi = {
    getAll(params?: string): Promise<AxiosResponse<any>> {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },

    get(id: number): Promise<AxiosResponse<any>> {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },

    add(data: any): Promise<AxiosResponse<any>> {
        const url = '/categories';
        return axiosClient.post(url, data);
    },

    update(data: any): Promise<AxiosResponse<any>> {
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id: number): Promise<AxiosResponse<any>> {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};

export default categoryApi;
