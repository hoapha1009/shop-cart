import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { IProduct } from '../../../api/productApi';
import { STATIC_HOST, THUMBNAIL_URL } from '../../../constants';

interface P {
    product: IProduct;
}

const Product: React.FC<P> = ({ product }: P) => {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_URL}`;

    return (
        <Box padding={1}>
            <Box padding={1}>
                <img src={thumbnailUrl} alt={product.name} width='100%' />
            </Box>
            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>
                <Box component='span' fontSize='16px' fontWeight='bold' mr={1}>
                    {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(product.salePrice)}
                </Box>
                {product.promotionPercent > 0
                    ? ` -${product.promotionPercent}%`
                    : ``}
            </Typography>
            <Skeleton width='60%' />
        </Box>
    );
};

export default Product;
