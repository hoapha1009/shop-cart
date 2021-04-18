import { Box } from '@material-ui/core';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice, { IFilterByPrice } from './Filters/FilterByPrice';

export type P = {
    onChange?: (newCategoryId: number) => void;
    filters: any;
};

const ProductFilters: React.FC<P> = ({ onChange, filters }: P) => {
    const handleCategoryChange = (newCategoryId: number) => {
        console.log('newCategoryId', newCategoryId);

        if (!onChange) return;

        const newFilters = {
            ...filters,
            'category.id': newCategoryId,
        };

        onChange(newFilters);
    };

    const handlePriceChange = (filterByPriceValues: IFilterByPrice) => {
        console.log('filterByPriceValues', filterByPriceValues);
        if (!onChange) return;

        const { salePrice_gte, salePrice_lte } = filterByPriceValues;

        const newFilters = {
            ...filters,
            salePrice_gte,
            salePrice_lte,
        };

        onChange(newFilters);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
        </Box>
    );
};

export default ProductFilters;
