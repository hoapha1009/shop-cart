import { createSlice } from '@reduxjs/toolkit';

export interface ICartState {
    showMiniCart: Boolean;
    cartItems: any | [];
}

const initialState: ICartState = {
    showMiniCart: false,
    cartItems: [],
};

const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        showMiniCartClick(state) {
            state.showMiniCart = true;
        },
        hideMiniCartClick(state) {
            state.showMiniCart = false;
        },
        addToCart(state, action) {
            // newItem = {id, product, quantity}
            const newItem = action.payload;
            const index = state.cartItems.findIndex(
                (x: any) => x.id === newItem.id
            );

            if (index < 0) {
                // add to cart
                state.cartItems.push(newItem);
            } else {
                //increase quantity
                state.cartItems[index].quantity += newItem.quantity;
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex((x: any) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter(
                (x: any) => x.id !== idNeedToRemove
            );
        },
    },
});

const { actions, reducer } = userSlice;
export const {
    showMiniCartClick,
    hideMiniCartClick,
    addToCart,
    setQuantity,
    removeFromCart,
} = actions;
export default reducer;
