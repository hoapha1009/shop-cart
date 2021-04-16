import axiosClient from './axiosClient';

export interface TCategory {
    created_at: Date;
    created_by?: string;
    id: number;
    name: string;
    searchTerm: string;
    updated_at: Date;
    updated_by?: string;
}

export interface IProduct {
    category: TCategory;
    id: number;
    productId?: number;
    title?: number;
    create_at?: Date;
    create_by?: string;
    description: string;
    name: string;
    shortDescription: string;
    promotionPercent: number;
    isFreeShip: Boolean;
    isPromotion: Boolean;
    originalPrice: number;
    thumbnail: any;
    update_at: Date;
    update_by?: string;
    salePrice: number;
}

export interface IPagination {
    page: number;
    limit: number;
    total: any;
}

export interface IGetAllProductResponse {
    data: IProduct[];
    pagination?: IPagination;
}

export interface IGetCountProductResponse {
    count: number;
}

const productApi = {
    async getAll(params: any) {
        // Transform _page to _start
        const newParams = { ...params };
        newParams._start =
            !params._page || params._page <= 1
                ? 0
                : (params._page - 1) * (params._limit || 50);

        // Remove un-needed key
        delete newParams._page;

        // Fetch product list + count
        const productList = await axiosClient.get<IGetAllProductResponse>(
            '/products',
            {
                params: newParams,
            }
        );
        const count = await axiosClient.get<IGetCountProductResponse>(
            '/products/count',
            {
                params: newParams,
            }
        );

        // Build response and return
        return {
            data: productList,
            pagination: {
                page: params._page,
                limit: params._limit,
                total: count,
            },
        };
    },
};

export default productApi;
