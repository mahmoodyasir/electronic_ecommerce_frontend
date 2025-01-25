import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/utils";


type WishlistState = {
    items: Product[];
};

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                // If product exists in the wishlist, remove it
                state.items.splice(index, 1);
            } else {
                // If product doesn't exist, add it
                state.items.push(action.payload);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number | string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
