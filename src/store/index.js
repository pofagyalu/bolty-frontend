import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import searchReducer from './search';
import cartReducer from './cart';
import drawerReducer from './drawer';
import codReducer from './cod';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    cod: codReducer,
  },
});

export default store;
