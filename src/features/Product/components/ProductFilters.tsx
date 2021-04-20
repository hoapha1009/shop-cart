import { Box } from '@material-ui/core';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

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

    const handlePriceChange = (filterByPriceValues: any) => {
        if (!onChange) return;

        onChange(filterByPriceValues);
    };

    const handleServiceChange = (filterByServiceValues: any) => {
        if (!onChange) return;

        onChange(filterByServiceValues);
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
