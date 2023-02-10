import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = { text: '' };

const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    query(state, action) {
      state.text = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
