import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = { isVisible: false };

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: INITIAL_STATE,
  reducers: {
    setVisible(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const drawerActions = drawerSlice.actions;

export default drawerSlice.reducer;
