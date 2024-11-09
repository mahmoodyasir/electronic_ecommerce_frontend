import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/utils";


interface CartItem {
    product: Product;
    quantity: number;
    total_price: number;
    isCheckout: boolean;
};

export interface CartState {
    [productId: string | number]: CartItem;
};

const initialState: CartState = {};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const productId = product.id;
            const total_price = product.price * quantity;

            if (state[productId]) {
                state[productId].quantity += quantity;
                state[productId].total_price += total_price;
            } else {
                state[productId] = {
                    product,
                    quantity,
                    total_price,
                    isCheckout: true,
                };
            }
        },

        increaseCartItem: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state[productId] && state[productId].quantity < state[productId].product.inventory_product?.quantity) {
                state[productId].quantity += 1;
                state[productId].total_price += state[productId].product.price;
            }
        },

        decreaseCartItem: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state[productId]) {
                state[productId].quantity -= 1;
                state[productId].total_price -= state[productId].product.price;

                if (state[productId].quantity < 1) {
                    delete state[productId];
                }
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },

        clearCart: () => {
            return initialState;
        },
    }
});

export const {addToCart, increaseCartItem, decreaseCartItem, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;