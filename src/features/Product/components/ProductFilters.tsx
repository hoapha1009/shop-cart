import { Box } from '@material-ui/core';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';

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

    const handlePriceChange = (newCategoryId: number) => {
        if (!onChange) return;

        const newFilters = {
            ...filters,
            'category.id': newCategoryId,
        };

        onChange(newFilters);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByCategory onChange={handlePriceChange} />
        </Box>
    );
};

export default ProductFilters;
