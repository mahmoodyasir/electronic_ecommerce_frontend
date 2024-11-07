import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../utils/utils";


interface ProductResponse {
  page: number;
  limit: number;
  total: number;
  data: Product[];
}

const initialState: ProductResponse = {
  page: 0,
  limit: 0,
  total: 0,
  data: []
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (_state, action: PayloadAction<ProductResponse>) => {
      return action.payload;
    }
  },
});


export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;