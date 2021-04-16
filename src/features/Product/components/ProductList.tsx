import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { IProductList } from '../pages/ListPage';
import Product from './Product';

interface P {
    data?: IProductList;
}

const ProductList: React.FC<P> = ({ data }: P) => {
    return (
        <Box>
            <Grid container>
                {data?.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
