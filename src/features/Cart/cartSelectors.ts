import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

const cartItemsSelector = (state: RootState) => state.cart.cartItems;

export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    (cartItems) =>
        cartItems.reduce((count: number, item: any) => count + item.quantity, 0)
);

export const cartItemsTotalSelector = createSelector(
    cartItemsSelector,
    (cartItems) =>
        cartItems.reduce(
            (total: number, item: any) =>
                total + item.quantity * item.product.salePrice,
            0
        )
);
