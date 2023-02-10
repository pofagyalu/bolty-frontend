import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = { products: [], couponApplied: false };

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addToCart(state, action) {
      state.products = action.payload;
    },
    couponApplied(state, action) {
      state.couponApplied = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
