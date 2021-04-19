import { Box } from '@material-ui/core';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice, { IFilterByPrice } from './Filters/FilterByPrice';
import FilterByService, { IFilterByService } from './Filters/FilterByService';

export type P = {
    onChange?: (newCategoryId: number) => void;
    filters: any;
};

const ProductFilters: React.FC<P> = ({ onChange, filters }: P) => {
    const handleCategoryChange = (newCategoryId: number) => {
        if (!onChange) return;

        const newFilters = {
            ...filters,
            'category.id': newCategoryId,
        };

        onChange(newFilters);
    };

    const handlePriceChange = (filterByPriceValues: IFilterByPrice) => {
        if (!onChange) return;

        const { salePrice_gte, salePrice_lte } = filterByPriceValues;

        const newFilters = {
            ...filters,
            salePrice_gte,
            salePrice_lte,
        };

        onChange(newFilters);
    };

    const handleServiceChange = (filterByServiceValues: IFilterByService) => {
        if (!onChange) return;

        const { isPromotion, isFreeShip } = filterByServiceValues;

        const newFilters = {
            ...filters,
            isPromotion,
            isFreeShip,
        };

        onChange(newFilters);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
            <FilterByService filters={filters} onChange={handleServiceChange} />
        </Box>
    );
};

export default ProductFilters;
