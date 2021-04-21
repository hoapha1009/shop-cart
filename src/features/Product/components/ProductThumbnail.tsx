import { Box } from '@material-ui/core';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_URL } from '../../../constants';

interface P {
    product: any;
}

const ProductThumbnail: React.FC<P> = ({ product }) => {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_URL}`;

    return (
        <Box>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
                height='400px'
            />
        </Box>
    );
};

export default ProductThumbnail;
