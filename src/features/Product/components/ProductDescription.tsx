import { Paper } from '@material-ui/core';
import React from 'react';
import DOMPurify from 'dompurify';

interface Props {
    product: any | {};
}

const ProductDescription = (props: Props) => {
    const { product } = props;
    const safeDescription = DOMPurify.sanitize(product.description);
    return (
        <Paper elevation={0} style={{ padding: '15px' }}>
            <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </Paper>
    );
};

export default ProductDescription;
