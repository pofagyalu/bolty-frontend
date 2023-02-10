import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = { cod: false };

const codSlice = createSlice({
  name: 'cod',
  initialState: INITIAL_STATE,
  reducers: {
    cashOnDelivery(state, action) {
      state.cod = action.payload;
    },
  },
});

export const codActions = codSlice.actions;

export default codSlice.reducer;
