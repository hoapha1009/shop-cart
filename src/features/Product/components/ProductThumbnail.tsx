import { Box } from '@material-ui/core';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_URL } from '../../../constants';

interface P {
    product: any;
    width: string | number;
    height: string | number;
}

const ProductThumbnail: React.FC<P> = ({ product, width, height }) => {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_URL}`;

    return (
        <Box>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width={width}
                height={height}
            />
        </Box>
    );
};

export default ProductThumbnail;
