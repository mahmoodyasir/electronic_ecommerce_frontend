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
            const productId = product._id;
            // const total_price = product.price * quantity;
            const total_price = product?.discount_price && product?.discount_price > 0 ? product?.discount_price * quantity : product.price * quantity

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
                
                const calculated_price = state[productId].product.discount_price && Number(state[productId].product.discount_price) > 0 ? Number(state[productId].product.discount_price) : Number(state[productId].product.price)

                state[productId].total_price += calculated_price;
            }
        },

        decreaseCartItem: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state[productId]) {
                state[productId].quantity -= 1;

                const calculated_price = state[productId].product.discount_price && Number(state[productId].product.discount_price) > 0 ? Number(state[productId].product.discount_price) : Number(state[productId].product.price)
                state[productId].total_price -= calculated_price;

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