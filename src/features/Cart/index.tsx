import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import CartItem from './cartItem';
import { cartItemsCountSelector } from './cartSelectors';

const CartFeature = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const cartItemsCount = useAppSelector(cartItemsCountSelector);

    return (
        <Box>
            <Container>
                <Typography variant='h6' style={{ padding: '10px' }}>
                    GIỎ HÀNG: {`${cartItemsCount} sản phẩm`}
                </Typography>
                {cartItems.map((product: any) => (
                    <CartItem key={product.id} product={product} />
                ))}
            </Container>
        </Box>
    );
};

export default CartFeature;
