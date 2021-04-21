import React from 'react';
import productApi from '../../../api/productApi';

const useProductDetail = ({ productId }: any) => {
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState({});

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const result: any = await productApi.get(productId);
                setProduct(result);
            } catch (error) {
                console.log('Failed to fetch product', error);
            }
        })();

        setLoading(false);
    }, [productId]);

    return { product, loading };
};

export default useProductDetail;
