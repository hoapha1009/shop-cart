import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';

export interface IProductSort {
    activeSort: string;
    onChange: (value: string) => void;
}

const ProductSort: React.FC<IProductSort> = ({ onChange, activeSort }) => {
    const handleSortChange = (e: React.ChangeEvent<{}>, value: string) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <Box>
            <Tabs
                value={activeSort}
                indicatorColor='primary'
                textColor='primary'
                onChange={handleSortChange}
                aria-label='disabled tabs example'
            >
                <Tab label='Increase Price' value='salePrice:ASC' />
                <Tab label='Decrease price' value='salePrice:DESC' />
            </Tabs>
        </Box>
    );
};

export default ProductSort;
