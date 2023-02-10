import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { currentUser: null };

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
